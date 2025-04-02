"use client";
import UserForm from "@/components/UserForm";
import UserTable from "@/components/UserTable";

import {QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const queryClient = new QueryClient();
export default function Home() {
  const [showPage, setShowPage] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
    <div className="max-w-2xl mx-auto mt-8 p-4 text-center mb-2.5">
    <h1 className="text-2xl font-bold mb-4">User Management</h1>
    <UserForm />
      {!showPage ? (
        <button
          onClick={() => setShowPage(true)}
          className=" p-3 rounded-lg shadow-md transition mt-5 bg-amber-200"
        >
          Open User Management
        </button>
      ) : (
        <div>
          <button
            onClick={() => setShowPage(false)}
            className=" p-2 rounded-lg shadow-mdtransition mb-4 mt-5 bg-amber-100" 
          >
            Close User Management
            <UserTable />
          </button>
        </div>
      )}
    </div>
  </QueryClientProvider>
  );
}
