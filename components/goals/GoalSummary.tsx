"use client";


import {useEffect,useState} from "react";

import {createClient} from "@/lib/supabase/client";



function percent(

current:number,

goal:number

){


if(!goal){

return 0;

}


return Number(

((current / goal) * 100).toFixed(1)

);


}



const metrics=[


{
key:"gp",
label:"💰 Gross Profit",
goal:"gp_goal",
prefix:"$"
},


{
key:"voice",
label:"📱 Voice",
goal:"voice_goal"
},


{
key:"mim",
label:"🔄 MiM",
goal:"mim_goal"
},


{
key:"upgrade",
label:"⬆️ Upgrade",
goal:"upgrade_goal"
},


{
key:"hsi",
label:"🌐 HSI",
goal:"hsi_goal"
},


{
key:"bts",
label:"📡 BTS",
goal:"bts_goal"
},


{
key:"accessories",
label:"🎧 Accessories",
goal:"accessory_goal",
prefix:"$"
}

];




export default function GoalSummary({

employeeId

}:{

employeeId:string

}){


const [data,setData]=useState<any>(null);



useEffect(()=>{


async function load(){


if(!employeeId){

return;

}



const supabase=createClient();



const month = new Date().toLocaleString(

"en-US",

{

month:"long"

}

);



const year = new Date().getFullYear();






const {

data:goal

}=await supabase

.from("employee_goals")

.select("*")

.eq(

"employee_id",

employeeId

)

.eq(

"month",

month

)

.eq(

"year",

year

)

.maybeSingle();







const {

data:sales

}=await supabase

.from("sales")

.select("*")

.eq(

"employee_id",

employeeId

);






const totals:any={


gp:0,

voice:0,

mim:0,

upgrade:0,

hsi:0,

bts:0,

accessories:0


};




(sales || []).forEach((sale:any)=>{


const saleDate = new Date(
sale.created_at
);


const now = new Date();



if(

saleDate.getMonth() === now.getMonth()

&&

saleDate.getFullYear() === now.getFullYear()

){


totals.gp += Number(sale.gp || 0);

totals.voice += Number(sale.voice || 0);

totals.mim += Number(sale.mim || 0);

totals.upgrade += Number(sale.upgrade || 0);

totals.hsi += Number(sale.hsi || 0);

totals.bts += Number(sale.bts || 0);

totals.accessories += Number(sale.accessories || 0);


}


});






const result:any={};



metrics.forEach(metric=>{


result[metric.key]={


current:totals[metric.key],


goal:goal?.[metric.goal] || 0,


percent:percent(

totals[metric.key],

goal?.[metric.goal] || 0

)


};


});




setData(result);



}



load();



},[employeeId]);






if(!data){

return null;

}




return (


<div className="
rounded-3xl
border
bg-white
p-8
shadow-sm
">



<h2 className="
text-2xl
font-black
">

Current Performance

</h2>




<div className="
mt-6
grid
gap-5
md:grid-cols-2
lg:grid-cols-3
">



{metrics.map((metric)=>(


<div

key={metric.key}

className="
rounded-2xl
bg-slate-50
p-5
"

>


<h3 className="
font-black
">

{metric.label}

</h3>



<p className="
mt-3
text-xl
font-black
">

{metric.prefix}

{data[metric.key].current}


<span className="
text-slate-400
">

 / {metric.prefix}

{data[metric.key].goal}

</span>


</p>




<div className="
mt-4
h-3
rounded-full
bg-slate-200
">


<div

className="
h-3
rounded-full
bg-purple-600
"

style={{

width:`${Math.min(

data[metric.key].percent,

100

)}%`

}}

/>



</div>




<p className="
mt-2
font-bold
text-purple-600
">

{data[metric.key].percent}%

</p>



</div>


))}



</div>


</div>


)

}
