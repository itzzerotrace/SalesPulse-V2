import { createClient } from "@/lib/supabase/client";


export async function getStores(){

const supabase=createClient();


const {data,error}=await supabase
.from("stores")
.select(`
*
`);


if(error) throw error;


return data;

}



export async function createStore(
name:string,
city:string
){

const supabase=createClient();


const {error}=await supabase
.from("stores")
.insert({
name,
city
});


if(error) throw error;

}
