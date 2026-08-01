import KpiCard from "./KpiCard";
import {getDashboardStats} from "@/lib/dashboard/getDashboardStats";


export default async function ManagerKpis(){


const stats = await getDashboardStats();


const month = stats?.month || {

gp:0,
voice:0,
mim:0,
hsi:0,
bts:0,
accessories:0,
commission:0

};



return (

<div className="
grid
gap-6
md:grid-cols-4
">


<KpiCard

title="Store GP"

value={`$${month.gp.toFixed(0)}`}

change="Monthly"

icon="💰"

/>



<KpiCard

title="Voice"

value={String(month.voice)}

change="Monthly"

icon="📱"

/>



<KpiCard

title="MiM"

value={String(month.mim)}

change="Monthly"

icon="🔄"

/>



<KpiCard

title="HSI"

value={String(month.hsi)}

change="Monthly"

icon="🌐"

/>


</div>

);

}
