import DashboardShell from "@/components/layout/DashboardShell";
import SalesHeader from "@/components/sales/SalesHeader";
import SalesSummary from "@/components/sales/SalesSummary";
import SalesFormCard from "@/components/sales/SalesFormCard";
import RecentSales from "@/components/sales/RecentSales";
import RoleGate from "@/components/auth/RoleGate";


export default function SalesPage(){


return (

<DashboardShell>


<div className="space-y-8">


<SalesHeader/>


<SalesSummary/>



<div className="
grid
gap-6
xl:grid-cols-[1fr_360px]
">


<div>

<SalesFormCard/>

</div>




<RoleGate

allowedRoles={[
"manager",
"regional",
"admin"
]}

>


<div className="
sticky
top-6
h-fit
">

<RecentSales/>

</div>


</RoleGate>



</div>



</div>


</DashboardShell>

)

}
