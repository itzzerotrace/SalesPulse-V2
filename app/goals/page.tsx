import DashboardShell from "@/components/layout/DashboardShell";

import GoalsHeader from "@/components/goals/GoalsHeader";
import GoalScore from "@/components/goals/GoalScore";
import GoalCard from "@/components/goals/GoalCard";

import {getDashboardStats} from "@/lib/dashboard/getDashboardStats";



export default async function GoalsPage(){


const stats = await getDashboardStats();



if(!stats){

return null;

}



const goals = stats.goals;



const score = Math.round(

(

goals.gp.percent +

goals.voice.percent +

goals.mim.percent +

goals.upgrade.percent +

goals.hsi.percent +

goals.bts.percent +

goals.accessories.percent

) / 7

);



return (

<DashboardShell>


<div className="
space-y-8
">


<GoalsHeader/>




<div className="
grid
gap-6
lg:grid-cols-3
">


<GoalScore

score={score}

/>



<GoalCard

title="Gross Profit"

current={`$${goals.gp.current.toLocaleString()}`}

target={`$${goals.gp.goal.toLocaleString()}`}

percent={goals.gp.percent}

icon="💰"

/>



<GoalCard

title="Voice"

current={String(goals.voice.current)}

target={String(goals.voice.goal)}

percent={goals.voice.percent}

icon="📱"

/>



</div>





<div className="
grid
gap-6
md:grid-cols-3
">


<GoalCard

title="MiM"

current={String(goals.mim.current)}

target={String(goals.mim.goal)}

percent={goals.mim.percent}

icon="🔄"

/>



<GoalCard

title="Upgrade"

current={String(goals.upgrade.current)}

target={String(goals.upgrade.goal)}

percent={goals.upgrade.percent}

icon="⬆️"

/>



<GoalCard

title="HSI"

current={String(goals.hsi.current)}

target={String(goals.hsi.goal)}

percent={goals.hsi.percent}

icon="🌐"

/>



<GoalCard

title="BTS"

current={String(goals.bts.current)}

target={String(goals.bts.goal)}

percent={goals.bts.percent}

icon="🏢"

/>



<GoalCard

title="Accessories"

current={`$${goals.accessories.current.toLocaleString()}`}

target={`$${goals.accessories.goal.toLocaleString()}`}

percent={goals.accessories.percent}

icon="🎧"

/>



</div>



</div>


</DashboardShell>

)

}
