import DashboardShell from "@/components/layout/DashboardShell";
import MetricCard from "@/components/dashboard/MetricCard";
import RankingCard from "@/components/dashboard/RankingCard";


export default function RegionalDashboard(){

return (

<DashboardShell>


<div className="space-y-8">


<section>

<p className="text-sm font-bold text-purple-600">
NORTHERN CALIFORNIA
</p>


<h1 className="mt-2 text-4xl font-black text-slate-900">
Regional Dashboard
</h1>


<p className="mt-2 text-lg text-slate-500">
Monitor store performance across your region.
</p>


</section>





<section className="grid gap-6 md:grid-cols-4">


<MetricCard
title="Total Stores"
value="--"
subtitle="Active locations"
/>


<MetricCard
title="Regional GP"
value="--"
subtitle="Monthly total"
/>


<MetricCard
title="Voice"
value="--"
subtitle="Regional activations"
/>


<MetricCard
title="HSI"
value="--"
subtitle="Internet sales"
/>


</section>





<section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">


<div className="flex items-center justify-between">


<div>

<h2 className="text-2xl font-black">
Store Performance
</h2>


<p className="mt-2 text-slate-500">
Compare locations across your region.
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

View Reports

</button>


</div>




<div className="mt-8 space-y-4">


{[
"El Dorado - Stockton",
"Store Location 2",
"Store Location 3"

].map((store,index)=>(


<div
key={store}
className="
flex
items-center
justify-between
rounded-2xl
bg-slate-50
p-5
"
>


<div>

<h3 className="font-bold">
{store}
</h3>


<p className="text-sm text-slate-500">
Performance tracking
</p>


</div>



<div className="
rounded-xl
bg-purple-100
px-4
py-2
font-black
text-purple-700
">

#{index + 1}

</div>


</div>


))}


</div>


</section>





<section className="grid gap-6 md:grid-cols-3">


<RankingCard
rank={1}
name="Top Store"
/>


<RankingCard
rank={2}
name="Second Store"
/>


<RankingCard
rank={3}
name="Third Store"
/>


</section>





<section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">


<h2 className="text-2xl font-black">
Regional Opportunities
</h2>


<p className="mt-2 text-slate-500">
Identify stores that need support.
</p>



<div className="mt-6 rounded-2xl bg-slate-50 p-6">

No opportunities identified.

</div>


</section>



</div>


</DashboardShell>

);

}
