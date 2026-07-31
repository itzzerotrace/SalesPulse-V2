import {createClient} from "@/lib/supabase/client";


export async function getPendingUsers(){


const supabase=createClient();



const {

data,

error

}=await supabase

.from("profiles")

.select(`
*,
stores(
name
)
`)

.eq(
"status",
"pending"
);



if(error)

throw error;



return data;


}



export async function approveUser(

id:string,

role:string,

store_id?:string

){


const supabase=createClient();



const {

error

}=await supabase

.from("profiles")

.update({

status:"approved",

role,

store_id:store_id || null,

approved_at:new Date().toISOString()

})

.eq(
"id",
id
);



if(error)

throw error;


}
