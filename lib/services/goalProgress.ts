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




export async function getGoalProgress(
employeeName:string,
month:string,
year:number
){


const supabase = await createClient();



const {
data:goal,
error:goalError
}=await supabase

.from("employee_goals")

.select("*")

.eq(
"employee_name",
employeeName
)

.eq(
"month",
month
)

.eq(
"year",
year
)

.single();



if(goalError){

throw goalError;

}




const {
data:sales,
error:salesError
}=await supabase

.from("sales")

.select("*");



if(salesError){

throw salesError;

}




const current={

gp:0,

voice:0,

mim:0,

upgrade:0,

hsi:0,

bts:0,

accessories:0

};



(sales || []).forEach((sale:any)=>{


current.gp += Number(
sale.gp || 0
);

current.voice += Number(
sale.voice || 0
);

current.mim += Number(
sale.mim || 0
);

current.upgrade += Number(
sale.upgrade || 0
);

current.hsi += Number(
sale.hsi || 0
);

current.bts += Number(
sale.bts || 0
);

current.accessories += Number(
sale.accessories || 0
);


});





return {

gp:{
goal:goal.gp_goal,
current:current.gp,
percent:percent(
current.gp,
goal.gp_goal
)
},


voice:{
goal:goal.voice_goal,
current:current.voice,
percent:percent(
current.voice,
goal.voice_goal
)
},


mim:{
goal:goal.mim_goal,
current:current.mim,
percent:percent(
current.mim,
goal.mim_goal
)
},


upgrade:{
goal:goal.upgrade_goal,
current:current.upgrade,
percent:percent(
current.upgrade,
goal.upgrade_goal
)
},


hsi:{
goal:goal.hsi_goal,
current:current.hsi,
percent:percent(
current.hsi,
goal.hsi_goal
)
},


bts:{
goal:goal.bts_goal,
current:current.bts,
percent:percent(
current.bts,
goal.bts_goal
)
},


accessories:{
goal:goal.accessory_goal,
current:current.accessories,
percent:percent(
current.accessories,
goal.accessory_goal
)
}

};


}
