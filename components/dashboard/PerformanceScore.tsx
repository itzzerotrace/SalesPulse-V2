interface PerformanceScoreProps{
score:number;
}


export default function PerformanceScore({
score
}:PerformanceScoreProps){


return (

<div className="
rounded-3xl
border
border-slate-200
bg-white
p-8
shadow-sm
text-center
">


<h2 className="
font-black
text-slate-900
">

Performance Score

</h2>



<div className="
mx-auto
mt-6
h-36
w-36
rounded-full
border-[14px]
border-purple-600
flex
items-center
justify-center
">

<div>

<p className="
text-4xl
font-black
">

{score}

</p>


<p className="
text-xs
font-bold
text-purple-600
">

Excellent

</p>


</div>

</div>


<p className="
mt-5
text-sm
text-slate-500
">

Based on your sales performance

</p>


</div>

);

}
