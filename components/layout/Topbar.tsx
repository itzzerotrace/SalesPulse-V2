"use client";

import {createClient} from "@/lib/supabase/client";
import {useRouter} from "next/navigation";


export default function Topbar({

profile

}:{

profile?:any;

}){


const router = useRouter();



async function logout(){


const supabase=createClient();


await supabase.auth.signOut();


router.push("/login");

router.refresh();


}




const name =

profile?.full_name ||

profile?.name ||

profile?.email?.split("@")[0] ||

"User";



const role =

profile?.role ||

"";




return (

<header className="
h-20
border-b
bg-white
px-8
flex
items-center
justify-between
">


<div>

<h1 className="
text-2xl
font-black
text-slate-900
">

SalesPulse

</h1>


</div>




<div className="
flex
items-center
gap-4
">


<div className="
text-right
hidden
md:block
">


<p className="
font-bold
text-slate-900
">

{name}

</p>


<p className="
text-xs
text-slate-500
capitalize
">

{role}

</p>


</div>




<div className="
h-12
w-12
rounded-full
bg-purple-100
flex
items-center
justify-center
font-black
text-purple-700
text-lg
">

{name.charAt(0).toUpperCase()}

</div>




<button

onClick={logout}

className="
rounded-xl
bg-slate-900
px-5
py-2
text-sm
font-bold
text-white
hover:bg-slate-700
"

>

Logout

</button>


</div>


</header>

)

}
