"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as z from "zod";
import { useEffect } from "react";

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

type UserType = z.infer<typeof userSchema>;

export default function UserForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserType>({ resolver: zodResolver(userSchema) });

  const queryClient = useQueryClient();

  const saveUserMutation = useMutation({
    mutationFn: async (user: UserType) => {
      return new Promise<void>((resolve) => {
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const newUsers = [...existingUsers, user];
        localStorage.setItem("users", JSON.stringify(newUsers));
        resolve(); // ✅ Ensures a Promise is returned
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      reset();
      alert("User added successfully!");
    },
  });
  

  const onSubmit = (data: UserType) => {
    saveUserMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded shadow-lg max-w-md mx-auto space-y-3">
      <div>
        <label className="block font-semibold">Name:</label>
        <input {...register("name")} className="w-full border p-2 rounded" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block font-semibold">Email:</label>
        <input {...register("email")} className="w-full border p-2 rounded" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block font-semibold">Phone:</label>
        <input {...register("phone")} className="w-full border p-2 rounded" />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Submit</button>
    </form>
  );
}
