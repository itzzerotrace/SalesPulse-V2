import {createClient} from "@/lib/supabase/server";


export async function getStores(){


const supabase = await createClient();



const {

data,

error

}=await supabase

.from("stores")

.select(`
*,
regions(
id,
name
)
`)

.order(
"name"
);



if(error)

throw error;



return data;


}



export async function getStoresByRegion(
regionId:string
){


const supabase = await createClient();



const {

data,

error

}=await supabase

.from("stores")

.select("*")

.eq(
"region_id",
regionId
);



if(error)

throw error;



return data;


}
