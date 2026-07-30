import DashboardShell from "@/components/layout/DashboardShell";
import StatCard from "@/components/ui/StatCard";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ChartCard from "@/components/dashboard/ChartCard";
import ActivityCard from "@/components/dashboard/ActivityCard";


export default function EmployeeDashboard(){


return (

<DashboardShell>


<div className="space-y-8">


<section className="
flex
items-center
justify-between
">


<div>

<p className="
text-sm
font-black
text-purple-600
">

EL DORADO • STOCKTON

</p>


<h1 className="
mt-2
text-4xl
font-black
text-slate-900
">

Good morning, Bryce 👋

</h1>


<p className="
mt-2
text-lg
text-slate-500
">

Here's your sales performance today.

</p>


</div>



<Button>

+ Enter Sale

</Button>


</section>





<section className="
grid
gap-6
md:grid-cols-4
">


<StatCard
title="Gross Profit"
value="--"
change="Tracking"
/>


<StatCard
title="Voice"
value="--"
change="Monthly"
/>


<StatCard
title="HSI"
value="--"
change="Monthly"
/>


<StatCard
title="Accessories"
value="--"
change="Monthly"
/>


</section>





<section className="
grid
gap-6
lg:grid-cols-3
">


<div className="lg:col-span-2">

<ChartCard

title="Performance Trend"

subtitle="Your sales activity over time"

>

<div className="
h-48
rounded-2xl
bg-slate-50
flex
items-center
justify-center
text-slate-400
font-semibold
">

Chart coming soon

</div>


</ChartCard>


</div>




<Card className="p-8">


<h2 className="
text-xl
font-black
">

Goal Progress

</h2>


<div className="
mt-6
h-4
rounded-full
bg-slate-100
">


<div className="
h-4
w-[0%]
rounded-full
bg-gradient-to-r
from-purple-600
to-indigo-600
">

</div>


</div>


<p className="
mt-4
text-sm
text-slate-500
">

Monthly goal tracking

</p>


</Card>



</section>





<section>


<Card className="p-8">


<h2 className="
text-xl
font-black
mb-6
">

Recent Activity

</h2>


<div className="space-y-4">


<ActivityCard

title="No sales recorded"

description="Your recent sales will appear here."

/>



</div>


</Card>


</section>




</div>


</DashboardShell>

);

}
