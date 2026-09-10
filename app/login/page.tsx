"use client";

import Link from "next/link";

import {
  ArrowRight,
  BarChart3,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  login,
} from "@/lib/auth/login";

import {
  getProfile,
} from "@/lib/auth/profile";

export default function LoginPage() {
  const router =
    useRouter();

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  async function handleLogin(
    event?: React.FormEvent
  ) {
    event?.preventDefault();

    try {
      setLoading(true);
      setError("");

      const user =
        await login(
          email,
          password
        );

      const profile =
        await getProfile(
          user.id
        );

      if (
        profile.status !==
        "approved"
      ) {
        throw new Error(
          "Account pending approval"
        );
      }

      switch (
        profile.role
      ) {
        case "admin":
          router.push(
            "/admin/dashboard"
          );
          break;

        case "manager":
          router.push(
            "/dashboard/manager"
          );
          break;

        case "regional_manager":
          router.push(
            "/dashboard/regional"
          );
          break;

        default:
          router.push(
            "/dashboard/employee"
          );
      }
    } catch (
      err: any
    ) {
      setError(
        err.message ||
          "Unable to sign in."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#120B27] text-white">
      <div className="pointer-events-none fixed -left-32 top-1/3 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />
      <div className="pointer-events-none fixed -right-32 -top-20 h-[420px] w-[420px] rounded-full bg-pink-500/15 blur-3xl" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden flex-col justify-between px-10 py-10 lg:flex xl:px-16 xl:py-14">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="salespulse-gradient flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-black shadow-lg shadow-pink-500/20">
              S
            </div>

            <div>
              <p className="text-xl font-black tracking-tight">
                SalesPulse
              </p>

              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/35">
                Performance
                Platform
              </p>
            </div>
          </Link>

          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-pink-300">
              <Sparkles
                size={13}
              />
              Own the day
            </span>

            <h1 className="mt-6 text-5xl font-black leading-[0.98] tracking-[-0.045em] xl:text-6xl">
              Turn goals into
              <span className="block text-pink-400">
                momentum.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base font-medium leading-7 text-white/50">
              SalesPulse keeps
              teams focused on the
              numbers that matter,
              the pace required,
              and the next goal to
              crush.
            </p>

            <div className="mt-9 grid grid-cols-2 gap-3">
              {[
                {
                  label:
                    "Daily Progress",
                  icon:
                    BarChart3,
                },
                {
                  label:
                    "Goal Tracking",
                  icon: Target,
                },
                {
                  label:
                    "Team Rankings",
                  icon: Trophy,
                },
                {
                  label:
                    "Team Focus",
                  icon: Users,
                },
              ].map(
                (item) => {
                  const Icon =
                    item.icon;

                  return (
                    <div
                      key={
                        item.label
                      }
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4"
                    >
                      <Icon
                        size={18}
                        className="text-purple-300"
                      />

                      <span className="text-xs font-black">
                        {
                          item.label
                        }
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          <p className="text-xs font-bold text-white/25">
            SalesPulse • Retail
            performance, simplified.
          </p>
        </section>

        <section className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
          <div className="w-full max-w-md">
            <div className="mb-7 flex items-center gap-3 lg:hidden">
              <div className="salespulse-gradient flex h-11 w-11 items-center justify-center rounded-2xl text-lg font-black shadow-lg shadow-pink-500/20">
                S
              </div>

              <div>
                <p className="text-lg font-black">
                  SalesPulse
                </p>

                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/35">
                  Performance
                  Platform
                </p>
              </div>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-white p-5 text-[#17102F] shadow-[0_30px_100px_rgba(0,0,0,0.28)] sm:p-8">
              <div className="salespulse-gradient flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-lg shadow-purple-500/20">
                <Zap
                  size={20}
                />
              </div>

              <h2 className="mt-5 text-3xl font-black tracking-[-0.035em]">
                Welcome back.
              </h2>

              <p className="mt-2 text-sm font-medium text-slate-500">
                Sign in to your
                SalesPulse account.
              </p>

              <form
                onSubmit={
                  handleLogin
                }
                className="mt-7 space-y-5"
              >
                <label className="block">
                  <span className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-slate-500">
                    <Mail
                      size={14}
                      className="text-purple-600"
                    />
                    Email
                  </span>

                  <input
                    type="email"
                    value={email}
                    onChange={(
                      e
                    ) =>
                      setEmail(
                        e.target
                          .value
                      )
                    }
                    required
                    autoComplete="email"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-[#F8F7FC] px-4 py-3.5 text-base font-bold text-[#17102F] outline-none transition placeholder:text-slate-400 focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100"
                    placeholder="Enter email"
                  />
                </label>

                <label className="block">
                  <span className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-slate-500">
                    <LockKeyhole
                      size={14}
                      className="text-purple-600"
                    />
                    Password
                  </span>

                  <div className="relative mt-2">
                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={
                        password
                      }
                      onChange={(
                        e
                      ) =>
                        setPassword(
                          e.target
                            .value
                        )
                      }
                      required
                      autoComplete="current-password"
                      className="w-full rounded-xl border border-slate-200 bg-[#F8F7FC] px-4 py-3.5 pr-12 text-base font-bold text-[#17102F] outline-none transition placeholder:text-slate-400 focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100"
                      placeholder="Enter password"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-slate-400 transition hover:text-purple-600"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff
                          size={
                            18
                          }
                        />
                      ) : (
                        <Eye
                          size={
                            18
                          }
                        />
                      )}
                    </button>
                  </div>
                </label>

                {error && (
                  <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={
                    loading
                  }
                  className="salespulse-gradient flex min-h-13 w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-black text-white shadow-lg shadow-purple-500/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading
                    ? "Signing in..."
                    : "Sign In"}

                  {!loading && (
                    <ArrowRight
                      size={
                        18
                      }
                    />
                  )}
                </button>
              </form>

              <div className="mt-6 border-t border-slate-100 pt-5 text-center text-sm font-semibold text-slate-500">
                Need an account?{" "}

                <Link
                  href="/register"
                  className="font-black text-purple-600 transition hover:text-pink-600"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
