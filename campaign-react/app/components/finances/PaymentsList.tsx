'use client'

import { useState, useEffect } from "react";
import { PartyMemberType, PayablesType } from "@/app/hooks/DjangoTypes";
import CampaignJournal from "@/services/django";
import { calcSingleTransaction } from "@/app/hooks/calculations";
import { useParams  } from "next/navigation";
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
  } from '@tanstack/react-table'
import EditPaymentModal from "../modals/editModals/EditPaymentsModal";
import useEditPaymentsModal from "@/app/hooks/Modals/EditModals/useEditPaymentsModal";
import AddPaymentModal from "@/app/components/modals/addModals/AddPaymentsModal";
import useAddPaymentsModal from "@/app/hooks/Modals/AddModals/useAddPaymentsModal";


const PaymentsList = () => {
    const params = useParams();
    const { campaign_id } = params;
    const [paymentsData, setPaymentsData] = useState<PayablesType[]>([]);
    const [partyMembers, setPartyMembers] = useState<PartyMemberType[]>([]);
    const [sorting, setSorting] = useState<SortingState>([{ id: 'irl_date', desc: true }]); //tanstack sorting
    const [editEntry, setEditEntry] = useState<PayablesType>()
    const editPaymentsModal = useEditPaymentsModal();
    const addPaymentsModal = useAddPaymentsModal();

    const getPayments = async () => {
        const party = await CampaignJournal.get(`/campaigncore/${campaign_id}/party/`)
        setPartyMembers(party);
        const payments = await CampaignJournal.get(`/campaigncore/${campaign_id}/payables/`);
        setPaymentsData(payments);
    }

    useEffect(() => {
        getPayments();
    }, []);

    const columns = [
        {
            accessorKey: 'irl_date',
            header: 'Date',
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
            cell: (info: any) => calcSingleTransaction(info.row.original),
            enableSorting: true,
        },
        {
            accessorKey: 'payer',
            header: 'Owner',
            cell: (info: any) => {
                const partyMember = partyMembers.find((member) => member.id === info.getValue());
                return partyMember ? partyMember.character_name : 'Party';
            },
        },
    ];

    const table = useReactTable({
        data: paymentsData,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const handleRowClick = (rowData: PayablesType) => {
        setEditEntry(rowData); // Set the selected row data
        editPaymentsModal.open();
    }

    return (
        <div className="mx-5">
            {editEntry !== undefined ? ( 
                <EditPaymentModal entry={editEntry}/>
            ) : (
                <></>
            )}
        {paymentsData.length > 0 ? (
            <>
                <AddPaymentModal />
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
                        <button className="hover:scale-105 p-2 w-32 h-16 rounded-lg bg-red-700 border-neutral-800 border-2 shadow-lg" onClick={() => {addPaymentsModal.open();}}>
                            Add Payment
                        </button>
                    </div>
                </div>
                <table className="w-full text-center table-fixed border-black">
                    <thead className="bg-blue-700 text-white border-b-4 border-black">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className="border-black">
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="w-10 border-2 border-separate border-black" onClick={header.column.getToggleSortingHandler()}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {{
                                            asc: ' 🔼',
                                            desc: ' 🔽',
                                        }[header.column.getIsSorted() as string] ?? null}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="text-white ">
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="border-2 border-separate border-black even:bg-slate-500 odd:bg-transparent" onClick={() => handleRowClick(row.original)}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="border-2 border-separate border-black">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
            ) : ( 
                <div className="flex w-50% h-5 pt-10 items-center justify-center text-center align-bottom">
                    <h1 className="text-5xl">
                        There are no transactions
                    </h1>
                </div>
            )}
        </div>
    )
}

export default PaymentsList;