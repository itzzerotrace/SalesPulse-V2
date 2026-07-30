"use client";


import {
Bell,
ChevronDown
} from "lucide-react";


export default function Topbar(){


return (

<header className="
h-24
bg-white
border-b
border-slate-200
flex
items-center
justify-between
px-8
">


<div>

<h2 className="
text-xl
font-black
text-slate-900
">

El Dorado • Stockton

</h2>


<p className="
text-sm
text-slate-500
">

May 2026 Performance

</p>


</div>



<div className="
flex
items-center
gap-4
">


<button className="
rounded-xl
border
p-3
hover:bg-slate-50
">

<Bell size={20}/>

</button>



<button className="
flex
items-center
gap-3
rounded-xl
border
px-4
py-2
">


<div className="
h-10
w-10
rounded-full
bg-purple-600
flex
items-center
justify-center
text-white
font-bold
">

B

</div>


<div>

<p className="font-bold">
Bryce

</p>

<p className="
text-xs
text-slate-500
">

Sales Associate

</p>

</div>


<ChevronDown size={16}/>


</button>


</div>


</header>

);

}
