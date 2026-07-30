interface GoalProgressCardProps{
title:string;
current:string;
goal:string;
percent:number;
}


export default function GoalProgressCard({
title,
current,
goal,
percent
}:GoalProgressCardProps){


return (

<div className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
">


<div className="flex justify-between">


<h3 className="font-black">
{title}
</h3>


<span className="
font-bold
text-purple-600
">

{percent}%

</span>


</div>



<p className="
mt-2
text-sm
text-slate-500
">

{current} / {goal}

</p>



<div className="
mt-5
h-3
rounded-full
bg-slate-100
">


<div
className="
h-3
rounded-full
bg-gradient-to-r
from-purple-600
to-indigo-600
"
style={{
width:`${percent}%`
}}
/>


</div>


</div>

);

}
