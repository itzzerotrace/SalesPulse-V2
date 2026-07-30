import DashboardShell from "@/components/layout/DashboardShell";
import GoalForm from "@/components/goals/GoalForm";


export default function ManageGoalsPage(){


return (

<DashboardShell>


<div className="space-y-8">


<div>

<h1 className="
text-4xl
font-black
">

Goal Management

</h1>


<p className="
mt-2
text-slate-500
">

Set monthly employee performance targets.

</p>


</div>


<GoalForm/>


</div>


</DashboardShell>

)

}
