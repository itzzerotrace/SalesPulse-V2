import KpiCard from "./KpiCard";


export default function ManagerKpis(){


return (

<div className="
grid
gap-6
md:grid-cols-4
">


<KpiCard
title="Store GP"
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

);

}
