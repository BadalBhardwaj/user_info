"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ColumnDef, useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { useEffect, useState } from "react";

type UserType = { name: string; email: string; phone: string };

export default function UsersTable() {
  const [users, setUsers] = useState<UserType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);
  }, []);

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: () => JSON.parse(localStorage.getItem("users") || "[]"),
  });

  const columns: ColumnDef<UserType>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone" },
  ];

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Users List</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border p-2 bg-gray-100">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="cursor-pointer hover:bg-gray-200"
              onClick={() => router.push(`/users/${row.id}`)}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
