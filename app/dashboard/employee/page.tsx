import DashboardShell from "@/components/layout/DashboardShell";

import KpiCard from "@/components/dashboard/KpiCard";
import PerformanceScore from "@/components/dashboard/PerformanceScore";
import GoalProgressCard from "@/components/dashboard/GoalProgressCard";
import StoreRanking from "@/components/dashboard/StoreRanking";
import SalesChart from "@/components/dashboard/SalesChart";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import CoachingInsight from "@/components/dashboard/CoachingInsight";
import ActionButton from "@/components/ui/ActionButton";


export default function EmployeeDashboard(){


return (

<DashboardShell>


<div className="space-y-8">


<div className="
flex
justify-between
items-center
">


<div>

<p className="
text-purple-600
font-black
text-sm
">

EL DORADO • STOCKTON

</p>


<h1 className="
text-4xl
font-black
mt-2
">

Good morning Bryce 👋

</h1>


<p className="
text-slate-500
mt-2
">

Here is your performance overview.

</p>


</div>



<ActionButton>

+ Enter Sale

</ActionButton>


</div>





<div className="
grid
gap-6
md:grid-cols-4
">


<KpiCard
title="Gross Profit"
value="$--"
change="Tracking"
icon="💰"
/>


<KpiCard
title="Voice"
value="--"
change="Monthly"
icon="📱"
/>


<KpiCard
title="HSI"
value="--"
change="Monthly"
icon="🌐"
/>


<KpiCard
title="Accessories"
value="--"
change="Monthly"
icon="🎧"
/>


</div>





<div className="
grid
gap-6
lg:grid-cols-3
">


<PerformanceScore
score={86}
/>


<GoalProgressCard
title="Monthly Goal"
current="$--"
goal="$--"
percent={75}
/>


<StoreRanking/>


</div>





<SalesChart/>





<div className="
grid
gap-6
lg:grid-cols-2
">


<ActivityFeed/>


<CoachingInsight/>


</div>



</div>


</DashboardShell>

);

}
