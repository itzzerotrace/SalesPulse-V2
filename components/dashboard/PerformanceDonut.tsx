"use client";


import {
PieChart,
Pie,
Cell,
ResponsiveContainer
} from "recharts";


const data=[
{
name:"Complete",
value:82
},
{
name:"Remaining",
value:18
}
];


export default function PerformanceDonut(){

return (

<ResponsiveContainer width="100%" height={250}>


<PieChart>

<Pie
data={data}
innerRadius={60}
outerRadius={90}
dataKey="value"
>


<Cell fill="#7C3AED"/>

<Cell fill="#E5E7EB"/>


</Pie>


</PieChart>


</ResponsiveContainer>

)

}
