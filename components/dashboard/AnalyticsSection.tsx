import ChartWrapper from "./ChartWrapper";
import SalesTrendChart from "./SalesTrendChart";
import GoalBreakdown from "./GoalBreakdown";


export default function AnalyticsSection(){

return (

<div className="
grid
gap-6
lg:grid-cols-2
">


<ChartWrapper
title="Sales Performance"
subtitle="Monthly trend"
>

<SalesTrendChart/>

</ChartWrapper>



<ChartWrapper
title="Goal Completion"
subtitle="Current progress"
>

<GoalBreakdown/>

</ChartWrapper>



</div>

)

}
