import DashboardShell from "@/components/layout/DashboardShell";
import PageHeader from "@/components/ui/PageHeader";

import RegionalScore from "@/components/dashboard/RegionalScore";
import RegionalKpis from "@/components/dashboard/RegionalKpis";
import StoreRankingList from "@/components/dashboard/StoreRankingList";
import RegionalChart from "@/components/dashboard/RegionalChart";
import AlertPanel from "@/components/dashboard/AlertPanel";

import KpiCard from "@/components/dashboard/KpiCard";

import {getDashboardStats} from "@/lib/dashboard/getDashboardStats";


export const dynamic = "force-dynamic";


export default async function RegionalDashboard(){


const stats = await getDashboardStats();


console.log(
"REGIONAL DASHBOARD STATS",
stats
);



const month = stats?.month || {

gp:0,
voice:0,
mim:0,
upgrade:0,
hsi:0,
bts:0,
accessories:0,
commission:0

};



return (

<DashboardShell>


<div className="space-y-8">


<PageHeader

title="NorCal Region Overview"

subtitle="Performance across all stores"

/>



<div className="
grid
gap-6
md:grid-cols-4
">


<KpiCard
title="Gross Profit"
value={`$${month.gp}`}
change="Region MTD"
icon="💰"
/>


<KpiCard
title="Voice"
value={String(month.voice)}
change="Region MTD"
icon="📱"
/>


<KpiCard
title="MiM"
value={String(month.mim)}
change="Region MTD"
icon="🔄"
/>


<KpiCard
title="Upgrade"
value={String(month.upgrade)}
change="Region MTD"
icon="⬆️"
/>


<KpiCard
title="HSI"
value={String(month.hsi)}
change="Region MTD"
icon="🌐"
/>


<KpiCard
title="BTS"
value={String(month.bts)}
change="Region MTD"
icon="📡"
/>


<KpiCard
title="Accessories"
value={`$${month.accessories}`}
change="Region MTD"
icon="🎧"
/>


<KpiCard
title="Commission"
value={`$${month.commission.toFixed(2)}`}
change="Region MTD"
icon="💵"
/>


</div>



<RegionalKpis/>


<div className="
grid
gap-6
lg:grid-cols-3
">

<RegionalScore/>

<StoreRankingList/>

<AlertPanel/>

</div>


<RegionalChart/>


</div>


</DashboardShell>

);

}
