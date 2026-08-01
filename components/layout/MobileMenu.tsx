"use client";

import {useState} from "react";
import Link from "next/link";
import {Menu, X, LogOut} from "lucide-react";
import {createClient} from "@/lib/supabase/client";
import {useRouter} from "next/navigation";


const links = [

{
title:"Dashboard",
href:"/dashboard/employee"
},

{
title:"Enter Sale",
href:"/sales"
},

{
title:"Sales History",
href:"/sales"
},

{
title:"Goals",
href:"/goals"
},

{
title:"Team",
href:"/team"
},

{
title:"Reports",
href:"/reports"
},

{
title:"Settings",
href:"/settings"
}

];



export default function MobileMenu({

profile

}:{profile?:any}){


const [open,setOpen] = useState(false);

const router = useRouter();



async function logout(){

const supabase=createClient();

await supabase.auth.signOut();

router.push("/login");

router.refresh();

}



return (

<>

<button

onClick={()=>setOpen(true)}

className="
lg:hidden
rounded-xl
p-3
text-slate-900
hover:bg-slate-100
"

>

<Menu size={26}/>

</button>



{open &&

<div className="
fixed
inset-0
z-50
bg-black/40
lg:hidden
">


<div className="
absolute
left-0
top-0
h-full
w-72
bg-white
p-6
shadow-xl
">


<div className="
flex
items-center
justify-between
mb-8
">


<h2 className="
text-2xl
font-black
text-slate-900
">

SalesPulse

</h2>


<button

onClick={()=>setOpen(false)}

className="
rounded-xl
p-2
text-slate-900
"

>

<X/>

</button>


</div>



<div className="
space-y-2
">

{links.map((link)=>(

<Link

key={link.href}

href={link.href}

onClick={()=>setOpen(false)}

className="
block
rounded-xl
px-4
py-3
font-bold
text-slate-900
hover:bg-purple-100
"

>

{link.title}

</Link>

))}


<button

onClick={logout}

className="
mt-6
flex
w-full
items-center
gap-3
rounded-xl
bg-slate-900
px-4
py-3
font-bold
text-white
"

>

<LogOut size={18}/>

Logout

</button>


</div>


</div>


</div>

}


</>

)

}
