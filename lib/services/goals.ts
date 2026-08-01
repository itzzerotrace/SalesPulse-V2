import {createClient} from "@/lib/supabase/client";


export interface EmployeeGoalInput {

employee_id?:string;

employee_name:string;

month:string;

year:number;

gp_goal:number;

voice_goal:number;

upgrade_goal:number;

hsi_goal:number;

mim_goal:number;

bts_goal:number;

accessory_goal:number;

}



export async function createGoal(
goal:EmployeeGoalInput
){

const supabase=createClient();


const {
data,
error
}=await supabase

.from("employee_goals")

.insert(goal)

.select()

.single();



if(error){

throw error;

}


return data;

}





export async function getGoals(){


const supabase=createClient();



const {
data,
error
}=await supabase

.from("employee_goals")

.select("*")

.order(
"created_at",
{
ascending:false
}
);



if(error){

throw error;

}


return data || [];

}





export async function getEmployeeGoals(

employeeName:string,

month:string,

year:number

){


const supabase=createClient();



const {
data,
error
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



if(error){

throw error;

}


return data;

}
