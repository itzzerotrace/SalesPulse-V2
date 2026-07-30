"use client";

import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts";


const data=[
{name:"Jan",value:4000},
{name:"Feb",value:6500},
{name:"Mar",value:5200},
{name:"Apr",value:9000},
{name:"May",value:12000}
];


export default function SalesTrendChart(){

return (

<ResponsiveContainer width="100%" height={280}>

<LineChart data={data}>


<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>


<Line
type="monotone"
dataKey="value"
stroke="#7C3AED"
strokeWidth={4}
/>


</LineChart>


</ResponsiveContainer>

)

}
