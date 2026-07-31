import {createClient} from "@/lib/supabase/client";


export async function getStores(){

const supabase=createClient();


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

.order("name");



if(error)

throw error;



return data || [];


}
