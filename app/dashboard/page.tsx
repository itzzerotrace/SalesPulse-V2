import DashboardShell from "@/components/layout/DashboardShell";


export default function DashboardPage(){

return (

<DashboardShell>


<div className="grid gap-6 md:grid-cols-4">


{[
"GP Performance",
"Voice Activations",
"HSI",
"Accessories"
].map((item)=>(

<div
key={item}
className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
>

<p className="text-sm text-slate-500">
{item}
</p>

<h2 className="mt-3 text-3xl font-black">
--
</h2>

</div>

))}


</div>



<div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8">


<h2 className="text-2xl font-black">
Performance Overview
</h2>


<p className="mt-3 text-slate-500">
Your sales metrics and goals will appear here.
</p>


</div>


</DashboardShell>

);

}
