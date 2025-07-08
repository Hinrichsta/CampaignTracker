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

const PaymentsList = () => {
    const params = useParams();
    const { campaign_id } = params;
    const [paymentsData, setPaymentsData] = useState<PayablesType[]>([]);
    const [partyMembers, setPartyMembers] = useState<PartyMemberType[]>([]);
    const [sorting, setSorting] = useState<SortingState>([{ id: 'irl_date', desc: true }]); //tanstack sorting
    const [editEntry, setEditEntry] = useState<PayablesType>()
    const PaymentsModal = useEditPaymentsModal();

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
        PaymentsModal.open();
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
                <div className="mb-4">
                    <input type="text" value={''} onChange={(e) => table.setGlobalFilter(String(e.target.value))} placeholder="Search" className="p-2 border rounded text-black"/>
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

//'use client'
//
//import { useState, useEffect } from "react";
//import { ReceivablesType,PartyMemberType } from "@/app/hooks/DjangoTypes";
//import CampaignJournal from "@/services/django";
//import { calcSingleTransaction } from "@/app/hooks/calculations";
//import { useParams  } from "next/navigation";
//
//
//const PaymentsList = () => {
//    const params = useParams();
//    const { campaign_id } = params;
//    const [PaymentsData, setPaymentsData] = useState<ReceivablesType[]>([]);
//    const [partyMembers, setPartyMembers] = useState<PartyMemberType[]>([]);
//
//    const getPayments = async () => {
//        const party = await CampaignJournal.get(`/campaigncore/${campaign_id}/party/`)
//        setPartyMembers(party);
//        const payments = await CampaignJournal.get(`/campaigncore/${campaign_id}/payables/`);
//        setPaymentsData(payments);
//    }
//
//    useEffect(() => {
//        getPayments();
//    }, []);
//
//    return (
//        <div className="mx-5">
//        {PaymentsData.length > 0 ? (
//            <table className="w-full text-center table-fixed border-black">
//                <thead className="bg-blue-700 text-white border-b-4 border-black">
//                    <tr className="border-black">
//                        <th className="w-10 border-2 border-separate border-black">Date</th>
//                        <th className="w-16 border-2 border-separate border-black">Game Date</th>
//                        <th className="w-36 border-2 border-separate border-black">Description</th>
//                        <th className="w-10 border-2 border-separate border-black">Platinum</th>
//                        <th className="w-10 border-2 border-separate border-black">Gold</th>
//                        <th className="w-10 border-2 border-separate border-black">Silver</th>
//                        <th className="w-10 border-2 border-separate border-black">Copper</th>
//                        <th className="w-10 border-2 border-separate border-black">Total in GP</th>
//                        <th className="w-10 border-2 border-separate border-black">Owner</th>
//                    </tr>
//                </thead>
//                <tbody className="text-white ">
//                    {PaymentsData.map((entry) => (
//                        <tr key={entry.id} className="border-2 border-separate border-black even:bg-slate-500 odd:bg-transparent">
//                            <td className="border-2 border-separate border-black">{String(entry.irl_date)}</td>
//                            <td className="border-2 border-separate border-black">{entry.ig_date}</td>
//                            <td className="border-2 border-separate border-black">{entry.description}</td>
//                            <td className="border-2 border-separate border-black">{entry.pp}</td>
//                            <td className="border-2 border-separate border-black">{entry.gp}</td>
//                            <td className="border-2 border-separate border-black">{entry.sp}</td>
//                            <td className="border-2 border-separate border-black">{entry.cp}</td>
//                            <td className="border-2 border-separate border-black">{calcSingleTransaction(entry)}</td>
//                            { entry.party_trans ? ( 
//                                <td className="border-2 border-separate border-black">Party</td>
//                            ) : ( 
//                                <td className="border-2 border-separate border-black">{partyMembers[partyMembers.findIndex(index => index.id === entry.payer)].character_name}</td>
//                            )}
//                        </tr>
//                    ))}
//                </tbody>
//            </table>
//            ) : ( 
//                <div className="text-5xl text-center">
//                    <h1>
//                        There are no transactions
//                    </h1>
//                </div>
//            )}
//        </div>
//    )
//}
//
//export default PaymentsList;