import Link from "next/link";
import { ArrowRight, Activity, BarChart3, ChevronRight, CircleDollarSign, ShieldCheck, Smartphone, Sparkles, Target, Trophy, Users, Zap } from "lucide-react";

const cards = [
  {label:"Gross Profit",value:"$84,250",progress:84,icon:CircleDollarSign},
  {label:"Voice",value:"428",progress:91,icon:Smartphone},
  {label:"Team Momentum",value:"86%",progress:86,icon:Users},
  {label:"Goal Pacing",value:"78%",progress:78,icon:Target},
];
export default function Home() {
 return <main className="relative min-h-screen overflow-hidden bg-[#0B0614] text-[#F8F5FF]">
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_10%,rgba(124,58,237,0.25),transparent_45%),radial-gradient(ellipse_at_0%_70%,rgba(168,85,247,0.10),transparent_40%)]"/>
  <div className="pointer-events-none absolute inset-0 opacity-[0.035]" style={{backgroundImage:"linear-gradient(#ffffff 1px,transparent 1px),linear-gradient(90deg,#ffffff 1px,transparent 1px)",backgroundSize:"54px 54px"}}/>
  <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:py-8">
   <Link href="/" className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-300/25 bg-gradient-to-br from-violet-600 to-[#321257] shadow-[0_8px_30px_rgba(124,58,237,0.3)]"><Activity size={24}/></span><span><span className="block text-lg font-black tracking-tight">SalesPulse<span className="text-violet-400">.</span></span><span className="block text-[9px] font-bold uppercase tracking-[0.21em] text-violet-300/70">Performance Intelligence</span></span></Link>
   <Link href="/login" className="inline-flex items-center gap-2 rounded-xl border border-violet-300/25 bg-white/[0.05] px-4 py-2.5 text-xs font-extrabold transition hover:bg-white/10">Sign In <ArrowRight size={15}/></Link>
  </header>
  <section className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-12 sm:px-8 sm:pt-20 lg:grid-cols-[1.03fr_0.97fr] lg:items-center lg:gap-16 lg:pb-28 lg:pt-24">
   <div>
    <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-400/10 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-violet-200"><Sparkles size={14}/> The performance command center</span>
    <h1 className="mt-7 max-w-2xl text-[clamp(3.25rem,7vw,6.5rem)] font-black leading-[0.98] tracking-[-0.065em]">Every goal.<br/><span className="bg-gradient-to-r from-[#C4B5FD] via-[#A78BFA] to-[#E9D5FF] bg-clip-text text-transparent">Every win.</span><br/>One pulse.</h1>
    <p className="mt-7 max-w-xl text-base leading-7 text-[#C3B4D8] sm:text-lg">A sharper way to lead retail performance. Track your pace, uncover opportunities, and celebrate the people moving your business forward.</p>
    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
     <Link href="/login" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#6D28D9] to-[#A855F7] px-7 text-sm font-black shadow-[0_15px_40px_rgba(109,40,217,0.3)] transition hover:brightness-110">Open SalesPulse <ArrowRight size={19}/></Link>
     <Link href="/register" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-violet-300/20 bg-white/[0.05] px-7 text-sm font-bold transition hover:bg-white/10">Request Access <ChevronRight size={18}/></Link>
    </div>
    <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-violet-200/70"><span className="flex items-center gap-2"><ShieldCheck size={16} className="text-violet-300"/> Role-based access</span><span className="flex items-center gap-2"><Zap size={16} className="text-violet-300"/> Actionable daily pacing</span></div>
   </div>
   <div className="relative">
    <div className="absolute -inset-6 rounded-[48px] bg-violet-500/10 blur-3xl"/>
    <div className="relative rounded-[32px] border border-violet-300/20 bg-[#160D28]/95 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.4)] sm:p-6">
     <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-5"><div><p className="text-[10px] font-black uppercase tracking-[0.19em] text-violet-300">SalesPulse / Overview</p><h2 className="mt-2 text-xl font-black">Performance at a glance</h2></div><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-200"><BarChart3 size={22}/></span></div>
     <div className="mt-5 rounded-[24px] border border-violet-300/20 bg-gradient-to-br from-[#351958] to-[#211036] p-5"><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-violet-200">Overall goal progress</p><p className="mt-3 text-5xl font-black tracking-tight">84.3<span className="text-2xl text-violet-300">%</span></p><div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[84.3%] rounded-full bg-gradient-to-r from-violet-600 to-violet-300"/></div><p className="mt-3 text-xs text-violet-200/75">Stay focused. Finish strong.</p></div>
     <div className="mt-3 grid grid-cols-2 gap-3">{cards.map(card=>{const Icon=card.icon;return <div key={card.label} className="rounded-[20px] border border-violet-300/15 bg-[#1D112E] p-4"><div className="flex items-center justify-between gap-2 text-violet-300"><span className="text-[11px] font-semibold">{card.label}</span><Icon size={17}/></div><p className="mt-3 text-2xl font-black">{card.value}</p><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-violet-400" style={{width:`${card.progress}%`}}/></div></div>})}</div>
     <p className="mt-4 text-center text-[10px] text-violet-200/50">Illustrative dashboard • Example figures, not live account data</p>
    </div>
   </div>
  </section>
  <section className="relative z-10 border-t border-violet-300/10 bg-white/[0.025]"><div className="mx-auto grid max-w-7xl gap-4 px-5 py-10 sm:grid-cols-3 sm:px-8">{[{icon:Target,title:"Know your pace",text:"Clear targets and daily requirements."},{icon:Trophy,title:"Recognize excellence",text:"Rankings that celebrate performance."},{icon:Users,title:"Lead with clarity",text:"One view for stores, teams, and leaders."}].map(item=>{const Icon=item.icon;return <div key={item.title} className="rounded-[22px] border border-violet-300/10 bg-white/[0.025] p-5"><Icon className="text-violet-300" size={23}/><h3 className="mt-3 text-base font-black">{item.title}</h3><p className="mt-1 text-sm text-violet-200/60">{item.text}</p></div>})}</div></section>
  <footer className="relative z-10 border-t border-violet-300/10 px-5 py-6 text-center text-xs text-violet-200/45">SalesPulse • Built for teams that move the numbers.</footer>
 </main>
}