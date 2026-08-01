import {createClient} from "@/lib/supabase/server";


export async function getAdminStores(){


const supabase = await createClient();


const {
data,
error

}=await supabase

.from("stores")

.select(`
id,
name,
city,
region_id,
regions(
id,
name
)
`)

.order(
"name"
);



if(error){

throw error;

}


return data || [];

}




export async function getAdminRegions(){


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
