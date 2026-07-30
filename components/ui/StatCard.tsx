interface StatCardProps{

title:string;

value:string;

change?:string;

}


export default function StatCard({

title,

value,

change

}:StatCardProps){


return (

<div className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
">


<p className="
text-sm
font-semibold
text-slate-500
">

{title}

</p>



<h2 className="
mt-3
text-4xl
font-black
text-slate-900
">

{value}

</h2>



{change && (

<p className="
mt-3
text-sm
font-bold
text-green-600
">

{change}

</p>

)}


</div>

);

}
