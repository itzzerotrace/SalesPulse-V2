interface Props{

name?:string;

role?:string;

store?:string;

}


export default function EmployeeProfileCard({

name="Bryce Walding",

role="Sales Associate",

store="El Dorado"

}:Props){


return (

<div className="
rounded-3xl
border
bg-white
p-8
shadow-sm
">


<div className="
flex
items-center
gap-5
">


<div className="
h-16
w-16
rounded-2xl
bg-purple-600
flex
items-center
justify-center
text-2xl
font-black
text-white
">

{name.charAt(0)}

</div>


<div>

<h2 className="
text-2xl
font-black
">

{name}

</h2>


<p className="
text-slate-500
">

{role}

</p>


<p className="
text-sm
text-slate-400
">

{store}

</p>


</div>


</div>


</div>

)

}
