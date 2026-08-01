"use client";

import {useEffect,useState} from "react";
import {createClient} from "@/lib/supabase/client";


function percent(current:number,goal:number){

if(!goal){

return 0;

}

return Number(
((current / goal) * 100).toFixed(1)
);

}



export default function TeamGoalOverview(){


const [employees,setEmployees]=useState<any[]>([]);



useEffect(()=>{


async function load(){


const supabase=createClient();



const {
data:profiles
}=await supabase

.from("profiles")

.select(`
id,
full_name
`)

.eq(
"status",
"approved"
);




const results=[];



for(const employee of profiles || []){


const {
data:goal
}=await supabase

.from("employee_goals")

.select("*")

.eq(
"employee_id",
employee.id
)

.eq(
"month",
"August"
)

.eq(
"year",
2026
)

.maybeSingle();




const {
data:sales
}=await supabase

.from("sales")

.select("*")

.eq(
"employee_id",
employee.id
);




let gp=0;
let voice=0;
let hsi=0;
let bts=0;



(sales || []).forEach((sale:any)=>{

gp += Number(sale.gp || 0);

voice += Number(sale.voice || 0);

hsi += Number(sale.hsi || 0);

bts += Number(sale.bts || 0);

});



results.push({

name:employee.full_name,

gp:percent(gp,goal?.gp_goal),

voice:percent(voice,goal?.voice_goal),

hsi:percent(hsi,goal?.hsi_goal),

bts:percent(bts,goal?.bts_goal)

});


}



setEmployees(results);


}


load();


},[]);




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

Team Goal Overview

</h2>



<div className="
mt-6
space-y-4
">


{employees.map((employee:any)=>(


<div

key={employee.name}

className="
rounded-2xl
bg-slate-50
p-5
"

>


<h3 className="
font-black
">

{employee.name}

</h3>



<div className="
mt-3
grid
grid-cols-4
gap-3
text-sm
font-bold
">


<p>
GP {employee.gp}%
</p>


<p>
Voice {employee.voice}%
</p>


<p>
HSI {employee.hsi}%
</p>


<p>
BTS {employee.bts}%
</p>


</div>


</div>


))}


</div>


</div>

)

}
