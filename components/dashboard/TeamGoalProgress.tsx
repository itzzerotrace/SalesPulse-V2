import {getTeamGoalProgress} from "@/lib/services/teamGoalProgress";


export default async function TeamGoalProgress(){


const employees = await getTeamGoalProgress();



return (

<div className="
rounded-3xl
border
border-slate-200
bg-white
p-5
sm:p-8
shadow-sm
">


<h2 className="
text-xl
font-black
text-slate-900
">

Team Goal Progress

</h2>




<div className="
mt-5
space-y-5
">


{employees.map((item:any)=>(


<div

key={item.employee.id}

className="
rounded-2xl
bg-slate-100
p-5
"

>


<h3 className="
text-lg
font-black
text-slate-900
">

{item.employee.full_name}

</h3>





<div className="
mt-4
grid
grid-cols-2
gap-3
lg:grid-cols-4
">



<div className="font-bold text-slate-900">
GP
<span className="block text-purple-700">
{item.goals.gp}%
</span>
</div>


<div className="font-bold text-slate-900">
Voice
<span className="block text-purple-700">
{item.goals.voice}%
</span>
</div>


<div className="font-bold text-slate-900">
MiM
<span className="block text-purple-700">
{item.goals.mim}%
</span>
</div>


<div className="font-bold text-slate-900">
Upgrade
<span className="block text-purple-700">
{item.goals.upgrade}%
</span>
</div>


<div className="font-bold text-slate-900">
HSI
<span className="block text-purple-700">
{item.goals.hsi}%
</span>
</div>


<div className="font-bold text-slate-900">
BTS
<span className="block text-purple-700">
{item.goals.bts}%
</span>
</div>


<div className="font-bold text-slate-900">
ACC
<span className="block text-purple-700">
{item.goals.accessories}%
</span>
</div>



</div>


</div>


))}


</div>


</div>

)

}
