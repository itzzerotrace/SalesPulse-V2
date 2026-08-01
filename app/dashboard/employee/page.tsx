import DashboardShell from "@/components/layout/DashboardShell";

import KpiCard from "@/components/dashboard/KpiCard";
import PerformanceScore from "@/components/dashboard/PerformanceScore";
import GoalProgressCard from "@/components/dashboard/GoalProgressCard";
import StoreRanking from "@/components/dashboard/StoreRanking";
import SalesChart from "@/components/dashboard/SalesChart";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import CoachingInsight from "@/components/dashboard/CoachingInsight";
import ActionButton from "@/components/ui/ActionButton";

import {getDashboardStats} from "@/lib/dashboard/getDashboardStats";



export default async function EmployeeDashboard(){


const stats = await getDashboardStats();



if(!stats){

return null;

}



const month = stats.month;

const goals = stats.goals;



const score = Math.round(

(

goals.gp.percent +

goals.voice.percent +

goals.mim.percent +

goals.upgrade.percent +

goals.hsi.percent +

goals.bts.percent +

goals.accessories.percent

) / 7

);




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


<KpiCard title="Gross Profit" value={`$${month.gp.toFixed(0)}`} change="MTD" icon="💰"/>

<KpiCard title="Voice" value={String(month.voice)} change="MTD" icon="📱"/>

<KpiCard title="MiM" value={String(month.mim)} change="MTD" icon="🔄"/>

<KpiCard title="Upgrade" value={String(month.upgrade)} change="MTD" icon="⬆️"/>

<KpiCard title="HSI" value={String(month.hsi)} change="MTD" icon="🌐"/>

<KpiCard title="BTS" value={String(month.bts)} change="MTD" icon="📡"/>

<KpiCard title="Accessories" value={`$${month.accessories.toFixed(0)}`} change="MTD" icon="🎧"/>

<KpiCard title="Commission" value={`$${month.commission.toFixed(2)}`} change="MTD" icon="💵"/>


</div>




<div className="
grid
gap-6
lg:grid-cols-3
">


<PerformanceScore

score={score}

/>


<GoalProgressCard

title="Gross Profit"

current={`$${goals.gp.current}`}

goal={`$${goals.gp.goal}`}

percent={goals.gp.percent}

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
