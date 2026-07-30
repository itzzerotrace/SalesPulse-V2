"use client";

import { useState } from "react";
import Link from "next/link";
import { signUp } from "@/lib/auth/signup";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleRegister() {

    try {

      setLoading(true);
      setError("");

      await signUp(
        email,
        password,
        name,
        role
      );

      router.push("/dashboard");

    } catch (err: any) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  }


  return (

    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        <div className="rounded-3xl border bg-white p-8 shadow-xl">

          <h1 className="text-3xl font-black">
            Create Account
          </h1>

          <p className="mt-2 text-slate-500">
            Join your SalesPulse team
          </p>


          <div className="mt-6 space-y-4">


            <input
              className="w-full rounded-xl border px-4 py-3"
              placeholder="Full Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />


            <input
              className="w-full rounded-xl border px-4 py-3"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />


            <input
              type="password"
              className="w-full rounded-xl border px-4 py-3"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />


            <select
              className="w-full rounded-xl border px-4 py-3"
              value={role}
              onChange={(e)=>setRole(e.target.value)}
            >

              <option value="employee">
                Employee
              </option>

              <option value="manager">
                Store Manager
              </option>

              <option value="regional">
                Regional Manager
              </option>

            </select>


            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full rounded-xl bg-purple-600 py-3 font-bold text-white"
            >

              {loading ? "Creating..." : "Create Account"}

            </button>


            {error && (
              <p className="text-sm text-red-600">
                {error}
              </p>
            )}


          </div>


          <p className="mt-6 text-center text-sm">

            Already have an account?{" "}

            <Link
              href="/login"
              className="font-bold text-purple-600"
            >
              Sign In
            </Link>

          </p>


        </div>

      </div>

    </main>

  );
}
