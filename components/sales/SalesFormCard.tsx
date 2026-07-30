"use client";

import {useState} from "react";


export default function SalesFormCard(){

const [gp,setGp]=useState("");
const [voice,setVoice]=useState("");
const [hsi,setHsi]=useState("");
const [bts,setBts]=useState("");
const [accessories,setAccessories]=useState("");


function submit(){

console.log({
gp,
voice,
hsi,
bts,
accessories
});


alert("Sale saved");

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

Enter Sale

</h2>


<p className="
mt-2
text-slate-500
">

Record today's performance.

</p>



<div className="
mt-8
grid
gap-5
md:grid-cols-2
">


<input
className="rounded-xl border p-4"
placeholder="Gross Profit"
value={gp}
onChange={(e)=>setGp(e.target.value)}
/>


<input
className="rounded-xl border p-4"
placeholder="Voice Activations"
value={voice}
onChange={(e)=>setVoice(e.target.value)}
/>


<input
className="rounded-xl border p-4"
placeholder="HSI"
value={hsi}
onChange={(e)=>setHsi(e.target.value)}
/>


<input
className="rounded-xl border p-4"
placeholder="BTS"
value={bts}
onChange={(e)=>setBts(e.target.value)}
/>


<input
className="rounded-xl border p-4 md:col-span-2"
placeholder="Accessories Revenue"
value={accessories}
onChange={(e)=>setAccessories(e.target.value)}
/>


</div>




<button
onClick={submit}
className="
mt-8
rounded-2xl
bg-gradient-to-r
from-purple-600
to-indigo-600
px-8
py-4
font-black
text-white
"
>

Save Sale

</button>


</div>

)

}
