import DashboardShell from "@/components/layout/DashboardShell";
import PageHeader from "@/components/ui/PageHeader";

import RegionalScore from "@/components/dashboard/RegionalScore";
import RegionalKpis from "@/components/dashboard/RegionalKpis";
import StoreRankingList from "@/components/dashboard/StoreRankingList";
import RegionalChart from "@/components/dashboard/RegionalChart";
import AlertPanel from "@/components/dashboard/AlertPanel";
import RegionalGoalProgress from "@/components/dashboard/RegionalGoalProgress";


export default function RegionalDashboard(){


return (

<DashboardShell>


<div className="
space-y-8
">



<PageHeader

title="West Region Overview"

subtitle="Performance across all stores"

/>




<RegionalKpis/>






<div className="
grid
gap-6
lg:grid-cols-3
">


<RegionalScore/>


<StoreRankingList/>


<AlertPanel/>


</div>





<RegionalGoalProgress/>






<RegionalChart/>




</div>


</DashboardShell>

)

}
