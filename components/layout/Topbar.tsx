"use client";


export default function Topbar(){

return (

<header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-5">


<div>

<h2 className="text-2xl font-black text-slate-900">
Dashboard
</h2>

<p className="text-sm text-slate-500">
Track your performance and goals
</p>

</div>


<button className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold">

Account

</button>


</header>

);

}
