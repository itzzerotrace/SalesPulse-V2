"use client";

import {useState} from "react";
import {createGoal} from "@/lib/services/goals";


export default function GoalForm(){


const [employee,setEmployee]=useState("");

const [month,setMonth]=useState("August");

const [gp,setGp]=useState("");

const [voice,setVoice]=useState("");

const [upgrade,setUpgrade]=useState("");

const [hsi,setHsi]=useState("");

const [mim,setMim]=useState("");

const [bts,setBts]=useState("");

const [accessories,setAccessories]=useState("");

const [message,setMessage]=useState("");



async function save(){


try{


await createGoal({

employee_name:employee,

month,

year:2026,

gp_goal:Number(gp),

voice_goal:Number(voice),

upgrade_goal:Number(upgrade),

hsi_goal:Number(hsi),

mim_goal:Number(mim),

bts_goal:Number(bts),

accessory_goal:Number(accessories)

});



setMessage(
"Goals saved successfully"
);


}

catch(error){

console.error(error);

setMessage(
"Error saving goals"
);

}


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

Set Monthly Goals

</h2>



<div className="
mt-6
grid
gap-5
md:grid-cols-2
">



<input
className="rounded-xl border p-4"
placeholder="Employee Name"
value={employee}
onChange={(e)=>setEmployee(e.target.value)}
/>



<input
className="rounded-xl border p-4"
placeholder="Month"
value={month}
onChange={(e)=>setMonth(e.target.value)}
/>



<input
className="rounded-xl border p-4"
placeholder="GP Goal"
value={gp}
onChange={(e)=>setGp(e.target.value)}
/>



<input
className="rounded-xl border p-4"
placeholder="Voice Goal"
value={voice}
onChange={(e)=>setVoice(e.target.value)}
/>



<input
className="rounded-xl border p-4"
placeholder="Upgrade Goal"
value={upgrade}
onChange={(e)=>setUpgrade(e.target.value)}
/>



<input
className="rounded-xl border p-4"
placeholder="HSI Goal"
value={hsi}
onChange={(e)=>setHsi(e.target.value)}
/>



<input
className="rounded-xl border p-4"
placeholder="MiM Goal"
value={mim}
onChange={(e)=>setMim(e.target.value)}
/>



<input
className="rounded-xl border p-4"
placeholder="BTS Goal"
value={bts}
onChange={(e)=>setBts(e.target.value)}
/>



<input
className="rounded-xl border p-4"
placeholder="Accessory Goal"
value={accessories}
onChange={(e)=>setAccessories(e.target.value)}
/>



</div>




<button

onClick={save}

className="
mt-8
rounded-2xl
bg-purple-600
px-8
py-4
font-black
text-white
"

>

Save Goals

</button>




<p className="
mt-4
font-bold
text-green-600
">

{message}

</p>



</div>

)

}
