import DashboardShell from "@/components/layout/DashboardShell";
import ManagerGoalsClient from "@/components/goals/ManagerGoalsClient";


export default function ManagerGoals(){


return (

<DashboardShell>


<div className="
space-y-8
">


<h1 className="
text-4xl
font-black
">

Team Goals

</h1>



<ManagerGoalsClient/>


</div>


</DashboardShell>

)

}
