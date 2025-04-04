Project Overview: User Management System
You built a User Management System using:

Next.js (App Router)

TypeScript

React Hook Form + Zod for form handling and validation

TanStack Query (@tanstack/react-query) for data fetching and mutation

TanStack Table for user table display

LocalStorage (or MongoDB optionally) for saving data

🧱 Main Features
1. Add User Form
Built using React Hook Form

Form Fields: Name, Email, Phone

Validation using Zod Schema

On submit:

Validates the input

Saves the user to localStorage

Triggers a mutation with React Query

Shows a success message

2. User List (Table View)
Displays all saved users in a TanStack Table

Data is fetched using useQuery

When a row is clicked → navigates to User Detail Page

3. User Detail Page
Uses dynamic routing via /users/[id]/page.tsx

Fetches the user data based on the id from URL

Displays user details (name, email, phone)

 Data Handling:
Since you used localStorage:

All users are stored as an array in browser storage

The localStorage is read and updated using utility functions (getUsers, addUser, getUserById)

If you switch to MongoDB later:

Replace localStorage functions with real API endpoints and use fetch inside React Query.

💡 Why This Stack Is Great
✅ Type-safe (TypeScript + Zod)

✅ Fast Development (localStorage = no backend needed)

✅ Modern React with app router

✅ Scalable — Easily upgrade to MongoDB or another backend
