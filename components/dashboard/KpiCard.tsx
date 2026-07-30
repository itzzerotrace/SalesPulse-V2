interface KpiCardProps {
title:string;
value:string;
change:string;
icon:string;
positive?:boolean;
}


export default function KpiCard({
title,
value,
change,
icon,
positive=true
}:KpiCardProps){


return (

<div className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
hover:shadow-md
transition
">


<div className="flex justify-between">


<div className="
h-12
w-12
rounded-2xl
bg-purple-100
flex
items-center
justify-center
text-2xl
">

{icon}

</div>


</div>



<p className="
mt-5
text-sm
font-semibold
text-slate-500
">

{title}

</p>



<h2 className="
mt-2
text-4xl
font-black
text-slate-900
">

{value}

</h2>



<p className={`
mt-3
text-sm
font-bold
${positive ? "text-green-600":"text-red-500"}
`}>

{change}

</p>


</div>

);

}
