import {getTeamGoalProgress} from "@/lib/services/teamGoalProgress";


export default async function TeamGoalProgress(){


const employees = await getTeamGoalProgress();



return (

<div className="
rounded-3xl
border
bg-white
p-8
shadow-sm
">


<h2 className="
text-xl
font-black
">

Team Goal Progress

</h2>



<div className="
mt-6
space-y-4
">


{employees.map((item:any)=>(


<div

key={item.employee.id}

className="
rounded-2xl
bg-slate-50
p-5
"

>


<h3 className="
font-black
text-lg
">

{item.employee.full_name}

</h3>



<div className="
mt-4
grid
grid-cols-2
gap-3
md:grid-cols-4
">


<p>
GP {item.goals.gp}%
</p>

<p>
Voice {item.goals.voice}%
</p>

<p>
MiM {item.goals.mim}%
</p>

<p>
Upgrade {item.goals.upgrade}%
</p>

<p>
HSI {item.goals.hsi}%
</p>

<p>
BTS {item.goals.bts}%
</p>

<p>
ACC {item.goals.accessories}%
</p>


</div>


</div>


))}


</div>


</div>

)

}
