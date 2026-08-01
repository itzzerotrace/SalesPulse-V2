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
rounded-2xl
border
border-slate-200
bg-white
p-4
sm:p-6
shadow-sm
transition
hover:shadow-md
">



<div className="
flex
items-start
justify-between
">


<div className="
h-9
w-9
sm:h-12
sm:w-12
rounded-xl
bg-purple-100
flex
items-center
justify-center
text-lg
sm:text-2xl
">

{icon}

</div>


</div>





<p className="
mt-3
sm:mt-5
text-xs
sm:text-sm
font-bold
text-slate-600
">

{title}

</p>




<h2 className="
mt-1
text-2xl
sm:text-4xl
font-black
text-slate-900
break-words
">

{value}

</h2>




<p className={`
mt-2
text-xs
sm:text-sm
font-bold
${positive ? "text-green-600":"text-red-500"}
`}>

{change}

</p>



</div>

)

}
