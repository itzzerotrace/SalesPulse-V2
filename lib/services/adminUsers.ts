import {createClient} from "@/lib/supabase/server";


export async function getAdminUsers(){

const supabase = await createClient();



const {
data:users,
error:userError
}=await supabase

.from("profiles")

.select(`
id,
full_name,
email,
role,
store_id,
region_id
`)

.order(
"full_name"
);



if(userError){

console.log(
"USERS ERROR",
userError
);

throw new Error(userError.message);

}



const {
data:stores
}=await supabase

.from("stores")

.select(`
id,
name,
city
`);



const {
data:regions
}=await supabase

.from("regions")

.select(`
id,
name
`);




return (users || []).map((user:any)=>({


...user,


stores:

stores?.find(
(store:any)=>
store.id===user.store_id
)||null,



regions:

regions?.find(
(region:any)=>
region.id===user.region_id
)||null



}));



}




export async function getStores(){


const supabase = await createClient();


const {
data,
error

}=await supabase

.from("stores")

.select("*")

.order(
"name"
);



if(error){

throw error;

}


return data || [];

}




export async function getRegions(){


const supabase = await createClient();


const {
data,
error

}=await supabase

.from("regions")

.select("*")

.order(
"name"
);



if(error){

throw error;

}


return data || [];

}
