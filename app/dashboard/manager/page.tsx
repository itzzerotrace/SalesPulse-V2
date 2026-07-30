import DashboardShell from "@/components/layout/DashboardShell";
import PageHeader from "@/components/ui/PageHeader";
import ManagerKpis from "@/components/dashboard/ManagerKpis";
import StoreScore from "@/components/dashboard/StoreScore";
import EmployeeLeaderboard from "@/components/dashboard/EmployeeLeaderboard";
import TeamGoalCard from "@/components/dashboard/TeamGoalCard";
import CoachingCenter from "@/components/dashboard/CoachingCenter";
import SalesChart from "@/components/dashboard/SalesChart";


export default function ManagerDashboard(){


return (

<DashboardShell>


<div className="space-y-8">


<PageHeader

title="El Dorado Store"

subtitle="Manager performance overview"

/>



<ManagerKpis/>




<div className="
grid
gap-6
lg:grid-cols-3
">


<StoreScore/>

<TeamGoalCard/>

<CoachingCenter/>


</div>




<div className="
grid
gap-6
lg:grid-cols-2
">


<EmployeeLeaderboard/>

<SalesChart/>


</div>


</div>


</DashboardShell>

);

}
