"use client";

import { useParams } from "next/navigation";

export default function UserDetailPage() {

const { id } = useParams();
const userId = Array.isArray(id) ? id[0] : id; // Convert to single string

if (!userId) return <p>User not found</p>;

const users = JSON.parse(localStorage.getItem("users") || "[]");
const user = users.find((u: { id: string }) => u.id === userId); 

if (!user) return <p>User not found</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">User Details</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
    </div>
  );
}
