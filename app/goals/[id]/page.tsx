import DashboardShell from "@/components/layout/DashboardShell";

import {createClient} from "@/lib/supabase/server";


export default async function EmployeeGoalsPage({

params

}:{

params:{
id:string
}

}){


const supabase = await createClient();



const {
data:employee
}=await supabase

.from("profiles")

.select(`
id,
full_name,
role
`)

.eq(
"id",
params.id
)

.single();





const {
data:goal
}=await supabase

.from("employee_goals")

.select("*")

.eq(
"employee_id",
params.id
)

.eq(
"month",
new Date().toLocaleString(
"en-US",
{
month:"long"
}
)

)

.eq(
"year",
new Date().getFullYear()
)

.maybeSingle();





return (

<DashboardShell>


<div className="
space-y-8
">



<div>

<p className="
text-purple-600
font-bold
">

EMPLOYEE GOALS

</p>


<h1 className="
text-4xl
font-black
">

{employee?.full_name}

</h1>


<p className="
text-slate-500
">

{employee?.role}

</p>


</div>






<div className="
rounded-3xl
border
bg-white
p-8
">



<h2 className="
text-2xl
font-black
">

Monthly Targets

</h2>




<form

action="/api/goals/update"

method="POST"

className="
mt-6
grid
gap-5
md:grid-cols-2
"

>


<input

type="hidden"

name="employee_id"

value={params.id}

/>



<input

name="gp_goal"

placeholder="GP Goal"

defaultValue={goal?.gp_goal || 0}

className="
rounded-xl
border
p-4
"

/>



<input

name="voice_goal"

placeholder="Voice Goal"

defaultValue={goal?.voice_goal || 0}

className="
rounded-xl
border
p-4
"

/>



<input

name="mim_goal"

placeholder="MiM Goal"

defaultValue={goal?.mim_goal || 0}

className="
rounded-xl
border
p-4
"

/>



<input

name="upgrade_goal"

placeholder="Upgrade Goal"

defaultValue={goal?.upgrade_goal || 0}

className="
rounded-xl
border
p-4
"

/>



<input

name="hsi_goal"

placeholder="HSI Goal"

defaultValue={goal?.hsi_goal || 0}

className="
rounded-xl
border
p-4
"

/>



<input

name="bts_goal"

placeholder="BTS Goal"

defaultValue={goal?.bts_goal || 0}

className="
rounded-xl
border
p-4
"

/>



<input

name="accessory_goal"

placeholder="Accessories Goal"

defaultValue={goal?.accessory_goal || 0}

className="
rounded-xl
border
p-4
"

/>



<button

className="
rounded-xl
bg-purple-600
px-6
py-4
font-bold
text-white
"

>

Save Goals

</button>



</form>


</div>



</div>


</DashboardShell>

)

}
