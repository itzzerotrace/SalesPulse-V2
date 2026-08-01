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



export async function getTeamGoalProgress(){


const supabase = await createClient();

const context = await getUserContext();



const storeId = context?.profile?.store?.id;



if(!storeId){

return [];

}




const {
data:employees,
error:employeeError
}=await supabase

.from("profiles")

.select(`
id,
full_name
`)

.eq(
"store_id",
storeId
)

.eq(
"status",
"approved"
);



if(employeeError){

throw employeeError;

}



const results=[];



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





results.push({

employee,


gp:totals.gp,


goals:{


gp:percent(
totals.gp,
goal?.gp_goal || 0
),


voice:percent(
totals.voice,
goal?.voice_goal || 0
),


mim:percent(
totals.mim,
goal?.mim_goal || 0
),


upgrade:percent(
totals.upgrade,
goal?.upgrade_goal || 0
),


hsi:percent(
totals.hsi,
goal?.hsi_goal || 0
),


bts:percent(
totals.bts,
goal?.bts_goal || 0
),


accessories:percent(
totals.accessories,
goal?.accessory_goal || 0
)


}


});


}



return results;


}
