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
    <main className="relative min-h-screen overflow-hidden bg-[#0B0614] text-[#F8F5FF]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_85%_5%,rgba(124,58,237,0.25),transparent_45%),radial-gradient(ellipse_at_0%_85%,rgba(168,85,247,0.12),transparent_40%)]"/>
      <div className="relative mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">
        <section className="hidden flex-col justify-between p-12 lg:flex xl:p-16">
          <Link href="/" className="flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/25 bg-gradient-to-br from-violet-600 to-[#321257]"><Zap size={25}/></span><span><span className="block text-xl font-black">SalesPulse<span className="text-violet-400">.</span></span><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300/70">Performance Intelligence</span></span></Link>
          <div><span className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-400/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-violet-200"><Sparkles size={14}/> Your command center awaits</span><h1 className="mt-7 text-6xl font-black leading-[1.02] tracking-[-0.055em]">Own the pace.<br/><span className="text-violet-300">Lead the way.</span></h1><p className="mt-6 max-w-lg text-base leading-7 text-violet-200/65">One powerful place to track performance, see what matters, and keep your team moving toward the next win.</p><div className="mt-9 grid grid-cols-2 gap-3">{[{icon:BarChart3,label:"Live performance"},{icon:Target,label:"Goal pacing"},{icon:Trophy,label:"Rep rankings"},{icon:Users,label:"Team insights"}].map(item=>{const Icon=item.icon;return <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-violet-300/15 bg-white/[0.04] p-4 text-xs font-bold"><Icon size={19} className="text-violet-300"/>{item.label}</div>})}</div></div>
          <p className="text-xs text-violet-200/40">SalesPulse • Built for teams that move the numbers.</p>
        </section>
        <section className="flex min-h-screen flex-col justify-center px-5 py-10 sm:px-8 lg:px-12">
          <Link href="/" className="mb-9 flex items-center gap-3 lg:hidden"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-[#321257]"><Zap size={23}/></span><span><span className="block text-xl font-black">SalesPulse<span className="text-violet-400">.</span></span><span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-violet-300/70">Performance Intelligence</span></span></Link>
          <div className="w-full max-w-md self-center rounded-[30px] border border-violet-300/20 bg-[#190F2A]/95 p-6 shadow-[0_25px_90px_rgba(0,0,0,0.35)] sm:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-200"><LockKeyhole size={23}/></div>
            <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-violet-300">Secure access</p><h2 className="mt-2 text-3xl font-black tracking-tight">Welcome back.</h2><p className="mt-2 text-sm text-violet-200/65">Sign in to your SalesPulse command center.</p>
            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              <label className="block"><span className="flex items-center gap-2 text-xs font-bold text-violet-200"><Mail size={15}/> Email address</span><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="email" placeholder="you@company.com" className="mt-2 min-h-13 w-full rounded-2xl border border-violet-300/20 bg-[#10091F] px-4 py-3.5 text-base text-white outline-none transition placeholder:text-violet-200/35 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20"/></label>
              <label className="block"><span className="flex items-center gap-2 text-xs font-bold text-violet-200"><LockKeyhole size={15}/> Password</span><span className="relative mt-2 block"><input type={showPassword?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} required autoComplete="current-password" placeholder="Enter your password" className="min-h-13 w-full rounded-2xl border border-violet-300/20 bg-[#10091F] px-4 py-3.5 pr-12 text-base text-white outline-none transition placeholder:text-violet-200/35 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20"/><button type="button" onClick={()=>setShowPassword(!showPassword)} aria-label={showPassword?"Hide password":"Show password"} className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-violet-200/70">{showPassword?<EyeOff size={19}/>:<Eye size={19}/>}</button></span></label>
              {error&&<div role="alert" className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200">{error}</div>}
              <button type="submit" disabled={loading} className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#6D28D9] to-[#A855F7] px-5 font-black text-white shadow-[0_12px_35px_rgba(109,40,217,0.28)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60">{loading?"Signing in...":"Sign In"}{!loading&&<ArrowRight size={19}/>}</button>
            </form>
            <p className="mt-7 border-t border-violet-300/15 pt-6 text-center text-sm text-violet-200/65">Need an account? <Link href="/register" className="font-black text-violet-300 hover:text-white">Request access</Link></p>
          </div>
          <p className="mt-7 text-center text-xs text-violet-200/35">Protected access • SalesPulse</p>
        </section>
      </div>
    </main>
  );
}
