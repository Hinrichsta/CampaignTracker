'use client'

import { useState, useEffect } from "react";
import { MagicItemsType, PartyMemberType } from "@/app/hooks/DjangoTypes";
import CampaignJournal from "@/services/django";
import { useParams  } from "next/navigation";
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
  } from '@tanstack/react-table'
import AddMagicItemModal from "../modals/addModals/AddMagicItemModal";
import useAddMagicItemModal from "@/app/hooks/Modals/AddModals/useAddMagicItemModal";
import EditMagicItemModal from "../modals/editModals/EditMagicItemModal";
import useEditMagicItemModal from "@/app/hooks/Modals/EditModals/useEditMagicItemModal";

const MagicItemsList = () => {
    const params = useParams();
    const { campaign_id } = params;
    const [magicItemData, setMagicItemData] = useState<MagicItemsType[]>([])
    const [partyMembers, setPartyMembers] = useState<PartyMemberType[]>([]);
    const [sorting, setSorting] = useState<SortingState>([{ id: 'irl_date', desc: true }]); //tanstack sorting
    const [editEntry, setEditEntry] = useState<MagicItemsType>()
    const editMagicItemModal = useEditMagicItemModal();
    const addMagicItemModal = useAddMagicItemModal();

    const getMagicItems = async () => {
        const party = await CampaignJournal.get(`/campaigncore/${campaign_id}/party/`)
        setPartyMembers(party);
        const income = await CampaignJournal.get(`/campaigncore/${campaign_id}/magic-items/`);
        setMagicItemData(income);
    }

    useEffect(() => {
        getMagicItems();
    }, []);

    const rarityMapping: { [key: string]: string } = {
        C: "Common",
        U: "Uncommon",
        R: "Rare",
        V: "Very Rare",
        L: "Legendary",
        A: "Artifact"
    };

    const statusMapping: { [key: string]: string } = {
        A: "Active",
        B: "Stored",
        D: "Destroyed",
        S: "Sold",
        L: "Lost",
        T: "Stolen",
        U: "Used"
    };

    const sourceMapping: { [key: string]: string } = {
        O: "Official",
        H: "Homebrew",
    };

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
                accessorKey: 'name',
                header: 'Item Name',
                enableSorting: true,
            },
            {
                accessorKey: 'notes',
                header: 'Notes',
            },
            {
                accessorKey: 'rarity',
                header: 'Rarity',
                cell: (info: any) => rarityMapping[info.getValue()] || 'Unknown',
                enableSorting: true,
            },
            {
                accessorKey: 'status',
                header: 'Current Status',
                cell: (info: any) => statusMapping[info.getValue()] || 'Unknown',
                enableSorting: true,
            },
            {
                accessorKey: 'creator',
                header: 'Source',
                cell: (info: any) => sourceMapping[info.getValue()] || 'Unknown',
                enableSorting: true,
            },
            {
                accessorKey: 'link',
                header: 'Link',
            },
            //{
            //    accessorKey: 'owner_group',
            //    header: 'Owner Group',
            //    cell: (info: any) => {
            //        const { status, powner, vowner, howner } = info.row.original;
            //        if (status === 'active') {
            //            if (powner) return 'Party';
            //            if (vowner) return 'Vehicle';
            //            if (howner) return 'Hireling';
            //        }
            //        return '';
            //    },
            //},
            {
                accessorKey: 'owner_value',
                header: 'Owner',
                cell: (info: any) => {
                    const { status, powner, vowner, howner } = info.row.original;

                    if (status === 'A') {
                        if (powner) {
                            const partyMember = partyMembers.find((member) => member.id === powner);
                            return partyMember ? partyMember.character_name : 'Unknown Party Member';
                        };  // You can adjust to show name based on your logic
                        if (vowner){
                            return `#${vowner}`;
                        } 
                        if (howner) {
                            return `#${howner}`;
                        }
                    }
                    return 'No Owner';
                },
            },
        ];
        const table = useReactTable({
        data: magicItemData,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const handleRowClick = (rowData: MagicItemsType) => {
        setEditEntry(rowData); // Set the selected row data
        editMagicItemModal.open();
    }

    return (
        <div className="mx-5">
            {editEntry !== undefined ? ( 
                <EditMagicItemModal entry={editEntry}/>
            ) : (
                <></>
            )}
            <AddMagicItemModal />
            {magicItemData.length > 0 ? ( 
                <>
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
                            <button className="hover:scale-105 p-2 w-32 h-16 rounded-lg bg-green-700 border-neutral-800 border-2 shadow-lg" onClick={() => {addMagicItemModal.open();}}>
                                Add Magic Item
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
                                <tr key={row.id} className="border-2 border-separate border-black even:bg-slate-500 odd:bg-transparent cursor-pointer" onClick={() => handleRowClick(row.original)}>
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
                        There are no Magic Items
                    </h1>
                </div>
            )}
        </div>
    )
}

export default MagicItemsList;