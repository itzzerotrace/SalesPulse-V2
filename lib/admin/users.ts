import { createClient } from "@/lib/supabase/client";


export async function getPendingUsers(){

const supabase = createClient();


const {data,error}=await supabase
.from("profiles")
.select("*")
.eq("status","pending");


if(error) throw error;


return data;

}



export async function approveUser(
id:string,
role:string
){

const supabase=createClient();


const {error}=await supabase
.from("profiles")
.update({
status:"approved",
role:role
})
.eq("id",id);


if(error) throw error;

}
