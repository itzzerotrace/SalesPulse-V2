import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/ui/PageHeader";

import StoreScore from "@/components/dashboard/StoreScore";
import EmployeeLeaderboard from "@/components/dashboard/EmployeeLeaderboard";
import TeamGoalCard from "@/components/dashboard/TeamGoalCard";
import CoachingCenter from "@/components/dashboard/CoachingCenter";
import SalesChart from "@/components/dashboard/SalesChart";
import KpiCard from "@/components/dashboard/KpiCard";
import TeamGoalProgress from "@/components/dashboard/TeamGoalProgress";

import {getDashboardStats} from "@/lib/dashboard/getDashboardStats";
import {getUserProfile} from "@/lib/auth/userProfile";
import {getTeamGoalSummary} from "@/lib/services/teamGoalSummary";



export default async function ManagerDashboard(){


const stats = await getDashboardStats();

const profile = await getUserProfile();

const teamPercent = await getTeamGoalSummary();



const month = stats?.month || {

gp:0,
voice:0,
mim:0,
upgrade:0,
hsi:0,
bts:0,
accessories:0,
commission:0

};



return (

<DashboardLayout>


<div className="
space-y-5
sm:space-y-8
">



<PageHeader

title={`${profile?.store?.name || "Store"} Store`}

subtitle={`${profile?.store?.name || "Store"} manager performance overview`}

/>





<div className="
grid
grid-cols-2
gap-3
sm:gap-5
lg:grid-cols-4
">



<KpiCard

title="Gross Profit"

value={`$${month.gp.toFixed(0)}`}

change="Store MTD"

icon="💰"

/>



<KpiCard

title="Voice"

value={String(month.voice)}

change="Store MTD"

icon="📱"

/>



<KpiCard

title="MiM"

value={String(month.mim)}

change="Store MTD"

icon="🔄"

/>



<KpiCard

title="Upgrade"

value={String(month.upgrade)}

change="Store MTD"

icon="⬆️"

/>



<KpiCard

title="HSI"

value={String(month.hsi)}

change="Store MTD"

icon="🌐"

/>



<KpiCard

title="BTS"

value={String(month.bts)}

change="Store MTD"

icon="📡"

/>



<KpiCard

title="Accessories"

value={`$${month.accessories.toFixed(0)}`}

change="Store MTD"

icon="🎧"

/>



<KpiCard

title="Commission"

value={`$${month.commission.toFixed(2)}`}

change="Store MTD"

icon="💵"

/>



</div>







<div className="
grid
gap-5
lg:grid-cols-3
">



<StoreScore

score={teamPercent}

/>



<TeamGoalCard

percent={teamPercent}

/>



<CoachingCenter

metric="Live coaching"

message="Performance insights will be generated from team results."

/>



</div>







<TeamGoalProgress/>







<div className="
grid
gap-5
lg:grid-cols-2
">



<EmployeeLeaderboard/>

<SalesChart/>



</div>





</div>


</DashboardLayout>

);

}
