import {createClient} from "@/lib/supabase/client";


export async function getStoreEmployees(){


const supabase=createClient();



const {
data:{
user
}
}=await supabase.auth.getUser();



if(!user){

return [];

}



const {
data:profile,
error:profileError
}=await supabase

.from("profiles")

.select(`
store_id
`)

.eq(
"id",
user.id
)

.single();



if(profileError){

throw profileError;

}



if(!profile?.store_id){

return [];

}



const {
data,
error
}=await supabase

.from("profiles")

.select(`
id,
full_name,
email
`)

.eq(
"store_id",
profile.store_id
)

.eq(
"status",
"approved"
);



if(error){

throw error;

}



return data || [];

}





export async function getEmployeeGoal(

employeeId:string,

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
"employee_id",
employeeId
)

.eq(
"month",
month
)

.eq(
"year",
year
)

.maybeSingle();



if(error){

throw error;

}



return data;

}





export async function saveEmployeeGoal(

goal:any

){


const supabase=createClient();



const {
data,
error
}=await supabase

.from("employee_goals")

.upsert(

goal,

{
onConflict:
"employee_id,month,year"
}

)

.select()

.single();



if(error){

throw error;

}



return data;

}
