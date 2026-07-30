import KpiCard from "./KpiCard";


export default function RegionalKpis(){

return (

<div className="
grid
gap-6
md:grid-cols-4
">

<KpiCard
title="Total GP"
value="$--"
change="12%"
icon="💰"
/>

<KpiCard
title="Voice"
value="--"
change="8%"
icon="📱"
/>

<KpiCard
title="HSI"
value="--"
change="6%"
icon="🌐"
/>

<KpiCard
title="BTS"
value="--"
change="10%"
icon="🏢"
/>

</div>

)

}
