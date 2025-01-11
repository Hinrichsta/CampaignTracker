'use client'

import { useState, useEffect } from "react";
import { ReceivablesType,PartyMemberType } from "@/app/hooks/DjangoTypes";
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

const IncomeList = () => {
    const params = useParams();
    const { campaign_id } = params;
    const [incomeData, setIncomeData] = useState<ReceivablesType[]>([]);
    const [partyMembers, setPartyMembers] = useState<PartyMemberType[]>([]);
    const [sorting, setSorting] = useState<SortingState>([{ id: 'irl_date', desc: true }]); //tanstack sorting

    const getIncome = async () => {
        const party = await CampaignJournal.get(`/campaigncore/${campaign_id}/party/`)
        setPartyMembers(party);
        const income = await CampaignJournal.get(`/campaigncore/${campaign_id}/receivables/`);
        setIncomeData(income);
    }

    useEffect(() => {
        getIncome();
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
        data: incomeData,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="mx-5">
        {incomeData.length > 0 ? (
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
                            <tr key={row.id} className="border-2 border-separate border-black even:bg-slate-500 odd:bg-transparent">
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
                <div className="text-5xl text-center">
                    <h1>
                        There are no transactions
                    </h1>
                </div>
            )}
        </div>
    )
}

export default IncomeList;