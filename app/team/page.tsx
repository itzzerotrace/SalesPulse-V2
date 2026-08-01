import DashboardShell from "@/components/layout/DashboardShell";
import TeamHeader from "@/components/team/TeamHeader";
import TeamMemberCard from "@/components/team/TeamMemberCard";

import {getUserContext} from "@/lib/auth/userContext";
import {createClient} from "@/lib/supabase/server";


export default async function TeamPage(){


const supabase = await createClient();

const context = await getUserContext();


const storeId = context?.profile?.store?.id;



let employees:any[] = [];




if(storeId){


const {
data
}=await supabase

.from("profiles")

.select(`
id,
full_name,
role
`)

.eq(
"store_id",
storeId
)

.eq(
"status",
"approved"
);



employees=data || [];

}




const employeesWithGoals = await Promise.all(

employees.map(async(employee)=>{


const {
data:goal
}=await supabase

.from("employee_goals")

.select("*")

.eq(
"employee_id",
employee.id
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



return {

...employee,

goals:goal

};


})

);





return (

<DashboardShell>


<div className="
space-y-8
">


<TeamHeader/>




<div className="
rounded-3xl
bg-purple-600
p-8
text-white
">


<h2 className="
text-3xl
font-black
">

{context?.profile?.store?.name || "Store"}

</h2>



<p className="
mt-2
opacity-80
">

{employees.length} Employees

</p>


</div>





<div className="
grid
gap-6
md:grid-cols-3
">



{employeesWithGoals.map((employee)=>(


<TeamMemberCard

key={employee.id}

id={employee.id}

name={employee.full_name}

role={employee.role}

viewerRole={context?.profile?.role}

goals={employee.goals}

/>


))}



{employeesWithGoals.length===0 && (

<div className="
rounded-3xl
border
bg-white
p-8
">

No employees found.

</div>

)}



</div>



</div>


</DashboardShell>

)

}
