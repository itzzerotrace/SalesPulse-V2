import {createClient} from "@/lib/supabase/server";


function percent(
current:number,
goal:number
){

if(!goal){

return 0;

}

return Number(
((current / goal) * 100).toFixed(1)
);

}



export async function getAdminGoalAnalytics(){


const supabase = await createClient();



const {
data:regions
}=await supabase

.from("regions")

.select(`
id,
name
`);




const results=[];



for(const region of regions || []){


const {
data:stores
}=await supabase

.from("stores")

.select(`
id,
name
`)

.eq(
"region_id",
region.id
);





let regionCurrent=0;

let regionGoal=0;



for(const store of stores || []){


const {
data:employees
}=await supabase

.from("profiles")

.select("id")

.eq(
"store_id",
store.id
);




const ids=(employees || []).map(
(employee:any)=>employee.id
);




const {
data:sales
}=await supabase

.from("sales")

.select("*")

.in(
"employee_id",
ids
);




const {
data:goals
}=await supabase

.from("employee_goals")

.select("*")

.in(
"employee_id",
ids
);





(sales || []).forEach((sale:any)=>{

regionCurrent += Number(
sale.gp || 0
);

});





(goals || []).forEach((goal:any)=>{

regionGoal += Number(
goal.gp_goal || 0
);

});


}




results.push({

region:region.name,

gp:percent(
regionCurrent,
regionGoal
)

});


}




return results;


}
