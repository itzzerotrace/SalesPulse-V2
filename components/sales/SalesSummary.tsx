import KpiCard from "@/components/dashboard/KpiCard";


export default function SalesSummary(){

return (

<div className="
grid
gap-6
md:grid-cols-4
">


<KpiCard
title="Today's GP"
value="$--"
change="Today"
icon="💰"
/>


<KpiCard
title="Voice"
value="--"
change="Today"
icon="📱"
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


</div>

)

}
