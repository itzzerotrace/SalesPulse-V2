"use client";

import Link from "next/link";
import {
  Home,
  BarChart3,
  Target,
  Users,
  Trophy,
  Settings,
} from "lucide-react";


const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Sales",
    href: "/sales",
    icon: BarChart3,
  },
  {
    name: "Goals",
    href: "/goals",
    icon: Target,
  },
  {
    name: "Team",
    href: "/employees",
    icon: Users,
  },
  {
    name: "Rankings",
    href: "/leaderboard",
    icon: Trophy,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];


export default function Sidebar(){

return (

<aside className="hidden w-72 border-r border-slate-200 bg-white p-6 lg:block">


<div className="flex items-center gap-3 mb-10">

<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-600 text-xl font-black text-white">
S
</div>

<div>

<h1 className="font-black text-xl">
SalesPulse
</h1>

<p className="text-xs text-slate-500">
Retail Performance
</p>

</div>

</div>



<nav className="space-y-2">

{links.map((link)=>{

const Icon = link.icon;


return (

<Link
key={link.name}
href={link.href}
className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 hover:bg-purple-50 hover:text-purple-700"
>

<Icon size={20}/>

<span className="font-semibold">
{link.name}
</span>

</Link>

);

})}

</nav>


</aside>

);

}
