import {createClient} from "@/lib/supabase/server";
import {getUserContext} from "@/lib/auth/userContext";


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



export async function getRegionalGoalProgress(){


const supabase = await createClient();

const context = await getUserContext();



if(!context?.profile?.region_id){

return [];

}



const {
data:stores,
error:storeError
}=await supabase

.from("stores")

.select(`
id,
name
`)

.eq(
"region_id",
context.profile.region_id
);



if(storeError){

throw storeError;

}



const results=[];



for(const store of stores || []){


const {
data:sales
}=await supabase

.from("sales")

.select("*")

.eq(
"store_id",
store.id
);




const {
data:employees
}=await supabase

.from("profiles")

.select("id")

.eq(
"store_id",
store.id
);




const employeeIds=(employees || []).map(
(employee:any)=>employee.id
);




const {
data:goals
}=await supabase

.from("employee_goals")

.select("*")

.in(
"employee_id",
employeeIds
);





const totals={

gp:0,
voice:0,
mim:0,
upgrade:0,
hsi:0,
bts:0,
accessories:0

};



(sales || []).forEach((sale:any)=>{

totals.gp += Number(sale.gp || 0);

totals.voice += Number(sale.voice || 0);

totals.mim += Number(sale.mim || 0);

totals.upgrade += Number(sale.upgrade || 0);

totals.hsi += Number(sale.hsi || 0);

totals.bts += Number(sale.bts || 0);

totals.accessories += Number(sale.accessories || 0);

});





const targets={

gp:0,
voice:0,
mim:0,
upgrade:0,
hsi:0,
bts:0,
accessories:0

};



(goals || []).forEach((goal:any)=>{

targets.gp += Number(goal.gp_goal || 0);

targets.voice += Number(goal.voice_goal || 0);

targets.mim += Number(goal.mim_goal || 0);

targets.upgrade += Number(goal.upgrade_goal || 0);

targets.hsi += Number(goal.hsi_goal || 0);

targets.bts += Number(goal.bts_goal || 0);

targets.accessories += Number(goal.accessory_goal || 0);

});





results.push({

store:store.name,

gp:percent(totals.gp,targets.gp),

voice:percent(totals.voice,targets.voice),

mim:percent(totals.mim,targets.mim),

upgrade:percent(totals.upgrade,targets.upgrade),

hsi:percent(totals.hsi,targets.hsi),

bts:percent(totals.bts,targets.bts),

accessories:percent(
totals.accessories,
targets.accessories
)

});


}



return results;


}
