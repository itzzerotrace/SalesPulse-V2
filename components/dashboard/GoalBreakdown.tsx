"use client";

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts";


const data=[
{
name:"GP",
value:80
},
{
name:"Voice",
value:90
},
{
name:"HSI",
value:65
},
{
name:"BTS",
value:75
}
];


export default function GoalBreakdown(){

return (

<ResponsiveContainer width="100%" height={250}>

<BarChart data={data}>


<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>


<Bar
dataKey="value"
fill="#7C3AED"
radius={[10,10,0,0]}
/>


</BarChart>

</ResponsiveContainer>

)

}
