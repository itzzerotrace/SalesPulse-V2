import KpiCard from "@/components/dashboard/KpiCard";


export default function SalesSummary(){

return (

<div className="
grid
gap-6
md:grid-cols-3
lg:grid-cols-6
">


<KpiCard
title="Today's GP"
value="$--"
change="Today"
icon="💰"
/>


<KpiCard
title="New Voice"
value="--"
change="Today"
icon="📱"
/>


<KpiCard
title="MiM"
value="--"
change="Today"
icon="🔄"
/>


<KpiCard
title="HSI"
value="--"
change="Today"
icon="🌐"
/>


<KpiCard
title="BTS"
value="--"
change="Today"
icon="🏢"
/>


<KpiCard
title="Commission"
value="$--"
change="Estimated"
icon="💵"
/>


</div>

)

}
