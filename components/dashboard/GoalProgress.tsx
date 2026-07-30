interface GoalProgressProps {
percent:number;
}


export default function GoalProgress({
percent
}:GoalProgressProps){


return (

<div className="
rounded-3xl
border
border-slate-200
bg-white
p-8
shadow-sm
">


<div className="flex justify-between items-center">


<div>

<h2 className="text-xl font-black text-slate-900">
Monthly Goal
</h2>


<p className="text-sm text-slate-500">
Progress toward target
</p>

</div>



<span className="
rounded-full
bg-purple-100
px-4
py-2
font-black
text-purple-700
">
{percent}%
</span>


</div>



<div className="mt-6 h-4 rounded-full bg-slate-100">


<div
className="
h-4
rounded-full
bg-purple-600
transition-all
"
style={{
width:`${percent}%`
}}
/>


</div>



</div>

);

}
