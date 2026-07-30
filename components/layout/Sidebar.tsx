"use client";

import Link from "next/link";
import {
Home,
PlusCircle,
Clock,
Target,
Trophy,
Users,
BarChart3,
Settings,
Store
} from "lucide-react";


const navigation=[

{
title:"Dashboard",
href:"/dashboard/employee",
icon:Home
},

{
title:"Enter Sale",
href:"/sales/new",
icon:PlusCircle
},

{
title:"Sales History",
href:"/sales",
icon:Clock
},

{
title:"Goals",
href:"/goals",
icon:Target
},

{
title:"Rankings",
href:"/leaderboard",
icon:Trophy
},

{
title:"Team",
href:"/employees",
icon:Users
},

{
title:"Reports",
href:"/reports",
icon:BarChart3
},

{
title:"Settings",
href:"/settings",
icon:Settings
}

];


export default function Sidebar(){


return (

<aside className="
hidden
lg:flex
w-72
min-h-screen
flex-col
bg-[#0B0924]
p-6
text-white
">


<div className="
flex
items-center
gap-3
mb-10
">


<div className="
h-12
w-12
rounded-2xl
bg-gradient-to-br
from-purple-500
to-indigo-600
flex
items-center
justify-center
font-black
text-xl
">

S

</div>


<div>

<h1 className="
text-xl
font-black
">

SalesPulse

</h1>


<p className="
text-xs
text-slate-400
">

Retail Intelligence

</p>


</div>


</div>




<nav className="
space-y-2
flex-1
">


{navigation.map((item)=>{


const Icon=item.icon;


return (

<Link

href={item.href}

key={item.title}

className="
flex
items-center
gap-4
rounded-xl
px-4
py-3
text-slate-300
transition
hover:bg-purple-600
hover:text-white
"

>

<Icon size={20}/>

<span className="font-semibold">
{item.title}
</span>


</Link>

)


})}


</nav>



<div className="
rounded-2xl
bg-white/10
p-4
">


<div className="
flex
items-center
gap-3
">


<div className="
h-10
w-10
rounded-xl
bg-purple-600
flex
items-center
justify-center
font-bold
">

E

</div>


<div>

<p className="font-bold">
El Dorado
</p>


<p className="
text-xs
text-slate-400
">

Stockton, CA

</p>


</div>


</div>


<div className="
mt-4
text-xs
text-green-400
font-bold
">

● Store Active

</div>


</div>


</aside>

);

}
