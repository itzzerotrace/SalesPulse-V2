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
flex
items-center
gap-5
">


<div className="
h-14
w-14
rounded-full
bg-purple-100
flex
items-center
justify-center
font-black
text-purple-700
">

{name.charAt(0)}

</div>


<div>

<h3 className="
font-black
">

{name}

</h3>


<p className="
text-sm
text-slate-500
">

{role}

</p>


</div>


</div>

)

}
