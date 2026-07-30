import { createClient } from "@/lib/supabase/client";


export async function getProfile(
id:string
){


const supabase=createClient();


const {
data,
error
}=await supabase
.from("profiles")
.select("*")
.eq("id",id)
.single();


if(error){

throw error;

}


return data;

}
