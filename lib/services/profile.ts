import {createClient} from "@/lib/supabase/server";


export async function getProfileById(
id:string
){


const supabase = await createClient();



const {

data,

error

}=await supabase

.from("profiles")

.select(`
*,
stores(
id,
name,
region_id,
regions(
name
)
)
`)

.eq(
"id",
id
)

.single();



if(error)

throw error;



return data;


}
