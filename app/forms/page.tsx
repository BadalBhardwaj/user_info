"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userSchema, UserSchema } from "./schema";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import { getUsersFromLocalStorage, saveUserToLocalStorage } from "../api/users";


export default function UserForm() {
  const queryClient = useQueryClient();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  });

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersFromLocalStorage,
    staleTime: 1000 * 60 * 5, 
  });

  const mutation = useMutation({
    mutationFn: saveUserToLocalStorage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 3000);
    },
  });

  const onSubmit = (data: UserSchema) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">User Form</h2>
      
      {success && <p className="text-green-500">User saved successfully!</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <Input {...register("name")} placeholder="Enter your name" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <Input type="email" {...register("email")} placeholder="Enter your email" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Phone Number Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <Input type="tel" {...register("phone")} placeholder="Enter your phone number" />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">Submit</Button>
      </form>

      {/* Show users */}
      <h3 className="text-xl font-bold mt-6">Saved Users</h3>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className="mt-2">
          {users?.map((user: UserSchema, index: number) => (
            <li key={index} className="p-2 border-b">
              {user.name} - {user.email} - {user.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
