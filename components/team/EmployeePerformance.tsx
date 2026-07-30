import KpiCard from "@/components/dashboard/KpiCard";


export default function EmployeePerformance(){

return (

<div className="
grid
gap-6
md:grid-cols-4
">


<KpiCard
title="Gross Profit"
value="$--"
change="Monthly"
icon="💰"
/>


<KpiCard
title="Voice"
value="--"
change="Monthly"
icon="📱"
/>


<KpiCard
title="HSI"
value="--"
change="Monthly"
icon="🌐"
/>


<KpiCard
title="BTS"
value="--"
change="Monthly"
icon="🏢"
/>


</div>

)

}
