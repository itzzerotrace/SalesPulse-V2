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
Radio
} from "lucide-react";


export default function Sidebar({

profile

}:{

profile:any;

}){


const role = profile?.role;



const dashboardHref =

role === "admin"

? "/admin/dashboard"

:

role === "manager"

? "/dashboard/manager"

:

role === "regional_manager"

? "/dashboard/regional"

:

"/dashboard/employee";




const navigation=[

{
title:"Dashboard",
href:dashboardHref,
icon:Home
},

{
title:"Enter Sale",
href:"/sales",
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
href:"/team",
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



if(
role === "manager" ||
role === "regional_manager" ||
role === "admin"
){

navigation.splice(
2,
0,
{
title:"Live Sales",
href:"/live-sales",
icon:Radio
}
);

}



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

key={item.title}

href={item.href}

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


<p className="font-bold">

{profile?.store?.name || "No Store"}

</p>


<p className="
text-xs
text-slate-400
">

{profile?.store?.city || ""}

</p>


</div>


</aside>

)

}
