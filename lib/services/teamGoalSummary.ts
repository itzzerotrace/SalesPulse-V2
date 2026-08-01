import {createClient} from "@/lib/supabase/server";
import {getUserContext} from "@/lib/auth/userContext";


function percent(
current:number,
goal:number
){

if(!goal){

return 0;

}


return (current / goal) * 100;

}



export async function getTeamGoalSummary(){


const supabase = await createClient();

const context = await getUserContext();



const storeId = context?.profile?.store?.id;



if(!storeId){

return 0;

}



const {
data:employees
}=await supabase

.from("profiles")

.select("id")

.eq(
"store_id",
storeId
)

.eq(
"status",
"approved"
);



let totalCurrent=0;

let totalGoal=0;



for(const employee of employees || []){


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




const {
data:sales
}=await supabase

.from("sales")

.select("*")

.eq(
"employee_id",
employee.id
);




const gp = (sales || []).reduce(

(sum:number,sale:any)=>

sum + Number(sale.gp || 0),

0

);



totalCurrent += gp;

totalGoal += Number(goal?.gp_goal || 0);



}



return percent(
totalCurrent,
totalGoal
);

}
