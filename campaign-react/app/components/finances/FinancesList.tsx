'use client'

import { useState, useEffect, useCallback } from "react";
import { ReceivablesType, PayablesType, PartyMemberType } from "@/app/hooks/DjangoTypes";
import CampaignJournal from "@/services/django";
import { calcSingleTransaction,calcIndivFunds, calcTotalFunds } from "@/app/hooks/calculations";
import { useParams  } from "next/navigation";
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
  } from '@tanstack/react-table'
import EditIncomeModal from "../modals/editModals/EditIncomeModal";
import useEditIncomeModal from "@/app/hooks/Modals/EditModals/useEditIncomeModal";
import EditPaymentModal from "../modals/editModals/EditPaymentsModal";
import useEditPaymentsModal from "@/app/hooks/Modals/EditModals/useEditPaymentsModal";
import AddIncomeModal from "@/app/components/modals/addModals/AddIncomeModal";
import useAddIncomeModal from "@/app/hooks/Modals/AddModals/useAddIncomeModal";
import AddPaymentModal from "@/app/components/modals/addModals/AddPaymentsModal";
import useAddPaymentsModal from "@/app/hooks/Modals/AddModals/useAddPaymentsModal";
import FinancesListItem from "./FinancesListItem";

type FinanceRow =
    | (ReceivablesType & { type: 'income'; payee?: undefined })
    | (PayablesType & { type: 'payment' });

interface Funds {
    TotalGold: number;
    totalIncome: number;
    totalPayments: number;
}

interface IndivFund {
    id: string;
    name: string;
    totalFunds: number;
}


const FinancesList = () => {
    const params = useParams();
    const { campaign_id } = params;
    const [paymentsData, setPaymentsData] = useState<PayablesType[]>([]);
    const [incomeData, setIncomeData] = useState<ReceivablesType[]>([]);
    const [partyMembers, setPartyMembers] = useState<PartyMemberType[]>([]);
    const [sorting, setSorting] = useState<SortingState>([{ id: 'irl_date', desc: true }]); //tanstack sorting
    const [editIncomeEntry, setEditIncomeEntry] = useState<ReceivablesType>()
    const [editPaymentsEntry, setEditPaymentsEntry] = useState<ReceivablesType>()
    const editIncomeModal = useEditIncomeModal();
    const editPaymentsModal = useEditPaymentsModal();
    const addIncomeModal = useAddIncomeModal();
    const addPaymentsModal = useAddPaymentsModal();
    const [mergedData, setMergedData] = useState<FinanceRow[]>([]);

    const [totalFunds, setTotalFunds] = useState<Funds | undefined>(undefined);
    const [indivFunds, setIndivFunds] = useState<IndivFund[]>([]);


    const getData = useCallback(async () => {
        const party = await CampaignJournal.get(`/campaigncore/${campaign_id}/party/`);
        setPartyMembers(party);

        const [income, payments] = await Promise.all([
            CampaignJournal.get(`/campaigncore/${campaign_id}/receivables/`),
            CampaignJournal.get(`/campaigncore/${campaign_id}/payables/`)
        ]);

        setIncomeData(income);
        setPaymentsData(payments);

        const merged: FinanceRow[] = [
            ...income.map((entry: ReceivablesType) => ({ ...entry, type: 'income' as const })),
            ...payments.map((entry: PayablesType) => ({ ...entry, type: 'payment' as const })),
        ];
        setMergedData(merged);
    }, [campaign_id]);

    useEffect(() => {
        getData();
    }, [getData]);

    useEffect(() => {
        const getFunds = async () => {
            const total = await calcTotalFunds(incomeData,paymentsData);
            setTotalFunds(total);
            const indiv = await calcIndivFunds(incomeData,paymentsData,partyMembers);
            setIndivFunds(indiv);
        }
        getFunds();
    }, [partyMembers, incomeData, paymentsData])
    
    const columns = [
        {
            accessorKey: 'irl_date',
            header: 'Date',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            cell: (info: any) => String(info.getValue()),
        },
        {
            accessorKey: 'ig_date',
            header: 'Game Date',
        },
        {
            accessorKey: 'description',
            header: 'Description',
        },
        {
            accessorKey: 'payee',
            header: 'Paid To',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            cell: (info: any) => info.getValue() ?? '',
        },
        {
            accessorKey: 'pp',
            header: 'Platinum',
            enableSorting: true,
        },
        {
            accessorKey: 'gp',
            header: 'Gold',
            enableSorting: true,
        },
        {
            accessorKey: 'sp',
            header: 'Silver',
            enableSorting: true,
        },
        {
            accessorKey: 'cp',
            header: 'Copper',
            enableSorting: true,
        },
        {
            accessorKey: 'total_gp',
            header: 'Total in Gold',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            cell: (info: any) => calcSingleTransaction(info.row.original),
            enableSorting: true,
        },
        {
            accessorKey: 'payer',
            header: 'Owner',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            cell: (info: any) => {
                const partyMember = partyMembers.find((member) => member.id === info.getValue());
                return partyMember ? partyMember.character_name : 'Party';
            },
        },
    ];

    const table = useReactTable({
        data: mergedData,
        columns,
        state: { 
            sorting 
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const handleRowClick = (rowData: FinanceRow) => {
        if (rowData.type === 'income') {
            setEditIncomeEntry(rowData);
            editIncomeModal.open();
        } else {
            setEditPaymentsEntry(rowData);
            editPaymentsModal.open();
        }
    };

    return (
        <div className="mx-5">
            {editIncomeEntry && <EditIncomeModal entry={editIncomeEntry as ReceivablesType} />}
            {editPaymentsEntry && <EditPaymentModal entry={editPaymentsEntry as PayablesType} />}
            <AddIncomeModal />
            <AddPaymentModal />

            {mergedData.length > 0 ? (
                <div>
                    <div className="flex w-full min-h-60 border-b-2 border-black items-center">
                        <div className="flex w-1/4 h-full items-center justify-center">
                            <div className="flex flex-col hover:scale-105 border-black rounded-lg min-w-80 m-6 shadow-xl bg-blue-800 cursor-pointer">
                                <div className="flex flex-col w-full min-h-32 text-center justify-between">
                                    <div className="p-1 text-3xl font-bold text-white border-b-black border-b">
                                        <h1>Party Finances</h1>
                                    </div>
                                    <div className="p-1 text-2xl font-bold text-white flex-grow flex items-center justify-center">
                                    {totalFunds !== undefined ? ( 
                                        <h2>{totalFunds.TotalGold} GP</h2>
                                    ) : (
                                        <h2>Loading...</h2>
                                    )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap w-3/4 h-full items-center justify-center">
                            {indivFunds.filter((entry) => {
                                const member = partyMembers.find((member) => member.id === Number(entry.id));
                                return member && (member.active || entry.totalFunds !== 0);
                            })
                            .sort((a, b) => {
                                const aMember = partyMembers.find((member) => member.id === Number(a.id));
                                const bMember = partyMembers.find((member) => member.id === Number(b.id));
                            
                                const aInactive = aMember && !aMember.active;
                                const bInactive = bMember && !bMember.active;
                            
                                // Sort inactive members to the bottom of the list
                                if (aInactive && !bInactive) return 1;
                                if (!aInactive && bInactive) return -1;
                            
                                // If both are either active or both are inactive, maintain the current order
                                return 0;
                            })
                            .map((entry) => (
                                <FinancesListItem
                                    key={entry.id}
                                    indivFunds={entry}
                                    active={(partyMembers.find((member) => member.id === Number(entry.id))?.active)}
                                />
                            ))}

                        </div>
                    </div>
                    <div className="flex w-full">
                        <div className="py-4 px-2 flex w-full justify-start">
                            <input
                                type="text"
                                placeholder="Search"
                                className="p-2 border rounded text-black"
                                onChange={(e) => table.setGlobalFilter?.(e.target.value)}
                            />
                        </div>
                        <div className="p-2 flex justify-end">
                            <button className="hover:scale-105 p-2 w-32 h-16 rounded-lg bg-green-700 border-neutral-800 border-2 shadow-lg" onClick={() => {addIncomeModal.open();}}>
                                Add Income
                            </button>
                            <button className="hover:scale-105 p-2 w-32 h-16 rounded-lg bg-red-700 border-neutral-800 border-2 shadow-lg" onClick={() => {addPaymentsModal.open();}}>
                                Add Payment
                            </button>
                        </div>
                    </div>

                    <table className="w-full text-center table-fixed border-black">
                        <thead className="bg-blue-700 text-white border-b-4 border-black">
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th
                                            key={header.id}
                                            className="w-10 border-2 border-separate border-black cursor-pointer"
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {header.column.getIsSorted() === 'asc' ? ' 🔼' : header.column.getIsSorted() === 'desc' ? ' 🔽' : ''}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="text-white">
                            {table.getRowModel().rows.map(row => (
                                <tr
                                    key={row.id}
                                    onClick={() => handleRowClick(row.original)}
                                    className={`border-2 border-separate border-black cursor-pointer ${
                                        row.original.type === 'income' ? 'bg-green-700' : 'bg-red-700'
                                    }`}
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="border-2 border-black">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="flex w-full h-5 pt-10 items-center justify-center text-center">
                    <h1 className="text-5xl">There are no transactions</h1>
                </div>
            )}
        </div>
    );

};

export default FinancesList;