interface Props{

name:string;

role:string;

}


export default function TeamMemberCard({

name,

role

}:Props){


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

GP

</p>

<p className="
font-black
">

--

</p>

</div>


<div>

<p className="
text-xs
text-slate-500
">

Voice

</p>

<p className="
font-black
">

--

</p>

</div>


<div>

<p className="
text-xs
text-slate-500
">

HSI

</p>

<p className="
font-black
">

--

</p>

</div>


</div>


</div>

)

}
