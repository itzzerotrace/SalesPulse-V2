import DashboardShell from "@/components/layout/DashboardShell";
import AssignGoalCard from "@/components/goals/AssignGoalCard";


export default function ManagerGoals(){

return (

<DashboardShell>

<div className="space-y-8">


<h1 className="
text-4xl
font-black
">

Team Goals

</h1>


<AssignGoalCard/>


</div>

</DashboardShell>

)

}
