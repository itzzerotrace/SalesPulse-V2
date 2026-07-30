"use client";

import {useState} from "react";


export default function NewSalePage(){


const [gp,setGp]=useState("");
const [voice,setVoice]=useState("");
const [hsi,setHsi]=useState("");
const [bts,setBts]=useState("");
const [accessories,setAccessories]=useState("");



function submitSale(){

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

<div className="min-h-screen bg-slate-50 p-8">


<div className="mx-auto max-w-3xl">


<p className="text-sm font-bold text-purple-600">
SALES ENTRY
</p>


<h1 className="mt-2 text-4xl font-black">
Add Sale
</h1>


<p className="mt-2 text-slate-500">
Record today's performance.
</p>




<div className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">


<div className="grid gap-5 md:grid-cols-2">



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
className="rounded-xl border p-4"
placeholder="Accessories"
value={accessories}
onChange={(e)=>setAccessories(e.target.value)}
/>


</div>




<button
onClick={submitSale}
className="
mt-8
rounded-xl
bg-purple-600
px-8
py-4
font-bold
text-white
"
>

Save Sale

</button>


</div>


</div>


</div>

);

}
