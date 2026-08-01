interface Props{

id:string;

name:string;

role:string;

viewerRole?:string;

goals?:any;

}



export default function TeamMemberCard({

id,

name,

role,

viewerRole,

goals

}:Props){



const canEditGoals =

viewerRole === "manager" ||

viewerRole === "admin" ||

viewerRole === "regional_manager";



return (

<div className="
rounded-3xl
border
bg-white
p-6
shadow-sm
">



<div className="
flex
items-center
justify-between
">


<div className="
flex
items-center
gap-4
">


<div className="
h-14
w-14
rounded-full
bg-purple-100
flex
items-center
justify-center
text-xl
font-black
text-purple-700
">

{name.charAt(0)}

</div>



<div>

<h2 className="
text-xl
font-black
">

{name}

</h2>


<p className="
text-slate-500
font-semibold
">

{role}

</p>


</div>


</div>





{canEditGoals && (

<a

href={`/goals/${id}`}

className="
rounded-xl
bg-purple-600
px-4
py-2
text-sm
font-bold
text-white
"

>

Goals

</a>

)}



</div>





<div className="
mt-6
grid
grid-cols-3
gap-3
">



<div>

<p className="
text-xs
text-slate-500
">

GP Goal

</p>

<p className="font-black">

{goals?.gp_goal || 0}

</p>

</div>



<div>

<p className="
text-xs
text-slate-500
">

Voice Goal

</p>

<p className="font-black">

{goals?.voice_goal || 0}

</p>

</div>



<div>

<p className="
text-xs
text-slate-500
">

HSI Goal

</p>

<p className="font-black">

{goals?.hsi_goal || 0}

</p>

</div>



<div>

<p className="
text-xs
text-slate-500
">

MiM Goal

</p>

<p className="font-black">

{goals?.mim_goal || 0}

</p>

</div>



<div>

<p className="
text-xs
text-slate-500
">

Upgrade Goal

</p>

<p className="font-black">

{goals?.upgrade_goal || 0}

</p>

</div>



<div>

<p className="
text-xs
text-slate-500
">

BTS Goal

</p>

<p className="font-black">

{goals?.bts_goal || 0}

</p>

</div>



</div>



</div>

)

}
