import DashboardShell from "@/components/layout/DashboardShell";
import GoalsHeader from "@/components/goals/GoalsHeader";
import GoalScore from "@/components/goals/GoalScore";
import GoalCard from "@/components/goals/GoalCard";


export default function GoalsPage(){

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


<GoalScore/>


<GoalCard
title="Gross Profit"
current="$14,400"
target="$20,000"
percent={72}
icon="💰"
/>


<GoalCard
title="Voice"
current="22"
target="30"
percent={73}
icon="📱"
/>


</div>




<div className="
grid
gap-6
md:grid-cols-3
">


<GoalCard
title="HSI"
current="10"
target="15"
percent={66}
icon="🌐"
/>


<GoalCard
title="BTS"
current="8"
target="12"
percent={67}
icon="🏢"
/>


<GoalCard
title="Accessories"
current="$900"
target="$1500"
percent={60}
icon="🎧"
/>


</div>



</div>


</DashboardShell>

)

}
