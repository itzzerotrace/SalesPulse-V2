"use client";


import {
Phone,
Wifi,
Repeat,
Radio,
ArrowUp
} from "lucide-react";


const sales=[

{
employee:"Bryce",
type:"New Voice",
quantity:1,
icon:Phone
},

{
employee:"Sarah",
type:"New HSI",
quantity:1,
icon:Wifi
},

{
employee:"Mike",
type:"New MiM",
quantity:1,
icon:Repeat
},

{
employee:"Anthony",
type:"New BTS",
quantity:1,
icon:Radio
},

{
employee:"Jorge",
type:"Upgrade",
quantity:1,
icon:ArrowUp
},

{
employee:"Melina",
type:"New Voice",
quantity:2,
icon:Phone
}

];


export default function RecentSales(){


return (

<div className="
rounded-3xl
bg-[#0B0924]
border
border-purple-500/30
shadow-xl
overflow-hidden
text-white
">


<div className="
flex
items-center
justify-between
p-5
border-b
border-white/10
">


<div>

<h2 className="
font-black
text-lg
">

LIVE SALES

</h2>


<p className="
text-xs
text-slate-400
">

Store activity

</p>


</div>


<div className="
flex
items-center
gap-2
rounded-full
bg-green-500/20
px-3
py-1
">


<div className="
h-2.5
w-2.5
rounded-full
bg-green-400
animate-pulse
"/>


<span className="
text-xs
font-black
text-green-400
">

LIVE

</span>


</div>


</div>




<div className="
max-h-[650px]
overflow-y-auto
">


{sales.map((sale,index)=>{


const Icon=sale.icon;


return (

<div

key={index}

className="
flex
items-center
gap-4
p-5
border-b
border-white/10
"

>


<div className="
h-12
w-12
rounded-xl
bg-purple-600/30
flex
items-center
justify-center
">

<Icon size={22}/>

</div>



<div>

<p className="
font-black
">

{sale.employee}

</p>


<p className="
text-sm
text-slate-400
">

{sale.type}

</p>


</div>


<div className="
ml-auto
font-black
text-purple-400
text-xl
">

+{sale.quantity}

</div>


</div>


)


})}


</div>


</div>

)

}
