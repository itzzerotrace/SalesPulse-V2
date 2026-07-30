import DashboardShell from "@/components/layout/DashboardShell";
import SalesHistoryTable from "@/components/sales/SalesHistoryTable";


export default function SalesHistory(){

return (

<DashboardShell>


<div className="space-y-8">


<div>

<h1 className="
text-4xl
font-black
">

Sales History

</h1>


<p className="
mt-2
text-slate-500
">

Review your submitted sales.

</p>


</div>


<SalesHistoryTable/>


</div>


</DashboardShell>

)

}
