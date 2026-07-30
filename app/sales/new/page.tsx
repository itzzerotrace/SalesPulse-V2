import DashboardShell from "@/components/layout/DashboardShell";
import SalesHeader from "@/components/sales/SalesHeader";
import SalesSummary from "@/components/sales/SalesSummary";
import SalesFormCard from "@/components/sales/SalesFormCard";
import RecentSales from "@/components/sales/RecentSales";


export default function SalesPage(){

return (

<DashboardShell>


<div className="
space-y-8
">


<SalesHeader/>


<SalesSummary/>



<div className="
grid
gap-6
lg:grid-cols-2
">


<SalesFormCard/>


<RecentSales/>


</div>


</div>


</DashboardShell>

)

}
