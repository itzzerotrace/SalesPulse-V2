import DashboardShell from "@/components/layout/DashboardShell";
import MetricCard from "@/components/dashboard/MetricCard";
import PerformanceTable from "@/components/dashboard/PerformanceTable";
import RankingCard from "@/components/dashboard/RankingCard";


export default function ManagerDashboard(){

return (

<DashboardShell>


<div className="space-y-8">


<section>

<p className="text-sm font-bold text-purple-600">
EL DORADO STORE
</p>


<h1 className="mt-2 text-4xl font-black text-slate-900">
Store Manager Dashboard
</h1>


<p className="mt-2 text-lg text-slate-500">
Manage your team performance and store goals.
</p>


</section>




<section className="grid gap-6 md:grid-cols-4">


<MetricCard
title="Store GP"
value="--"
subtitle="Monthly performance"
/>


<MetricCard
title="Voice"
value="--"
subtitle="Store activations"
/>


<MetricCard
title="HSI"
value="--"
subtitle="Internet sales"
/>


<MetricCard
title="BTS"
value="--"
subtitle="Business services"
/>


</section>





<section>

<PerformanceTable/>

</section>





<section className="grid gap-6 md:grid-cols-3">


<RankingCard
rank={1}
name="Top Performer"
/>


<RankingCard
rank={2}
name="Second Place"
/>


<RankingCard
rank={3}
name="Third Place"
/>


</section>





<section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">


<div className="flex items-center justify-between">


<div>

<h2 className="text-2xl font-black">
Coaching Center
</h2>


<p className="mt-2 text-slate-500">
Track opportunities and team improvement.
</p>


</div>



<button className="
rounded-xl
bg-purple-600
px-5
py-3
font-bold
text-white
">

Add Note

</button>


</div>




<div className="mt-6 rounded-2xl bg-slate-50 p-6">


<p className="font-bold">
No coaching opportunities yet.
</p>


<p className="mt-1 text-sm text-slate-500">
Employee coaching notes will appear here.
</p>


</div>


</section>



</div>


</DashboardShell>

);

}
