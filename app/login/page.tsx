import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-600 text-2xl font-black text-white">
            S
          </div>

          <h1 className="mt-4 text-3xl font-black text-slate-900">
            SalesPulse
          </h1>

          <p className="mt-2 text-slate-500">
            Wireless Retail Performance Platform
          </p>
        </div>


        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">

          <h2 className="text-2xl font-bold text-slate-900">
            Sign In
          </h2>

          <p className="mt-2 text-slate-500">
            Access your performance dashboard
          </p>


          <div className="mt-6 space-y-4">

            <input
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
              placeholder="Email"
            />

            <input
              type="password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
              placeholder="Password"
            />


            <button className="w-full rounded-xl bg-purple-600 py-3 font-bold text-white hover:bg-purple-700">
              Sign In
            </button>

          </div>


          <div className="mt-6 text-center text-sm text-slate-500">

            Need an account?{" "}

            <Link
              href="/register"
              className="font-bold text-purple-600"
            >
              Register
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}
