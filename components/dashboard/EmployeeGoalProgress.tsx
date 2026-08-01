import GoalProgressCard from "./GoalProgressCard";


export default function EmployeeGoalProgress({

goals

}:{

goals:any

}){


return (

<div className="
grid
gap-6
md:grid-cols-2
lg:grid-cols-3
">


<GoalProgressCard

title="Gross Profit"

current={`$${goals.gp.current}`}

goal={`$${goals.gp.goal}`}

percent={goals.gp.percent}

/>



<GoalProgressCard

title="Voice"

current={String(goals.voice.current)}

goal={String(goals.voice.goal)}

percent={goals.voice.percent}

/>



<GoalProgressCard

title="MiM"

current={String(goals.mim.current)}

goal={String(goals.mim.goal)}

percent={goals.mim.percent}

/>



<GoalProgressCard

title="Upgrade"

current={String(goals.upgrade.current)}

goal={String(goals.upgrade.goal)}

percent={goals.upgrade.percent}

/>



<GoalProgressCard

title="HSI"

current={String(goals.hsi.current)}

goal={String(goals.hsi.goal)}

percent={goals.hsi.percent}

/>



<GoalProgressCard

title="BTS"

current={String(goals.bts.current)}

goal={String(goals.bts.goal)}

percent={goals.bts.percent}

/>



<GoalProgressCard

title="Accessories"

current={`$${goals.accessories.current}`}

goal={`$${goals.accessories.goal}`}

percent={goals.accessories.percent}

/>


</div>

)

}
