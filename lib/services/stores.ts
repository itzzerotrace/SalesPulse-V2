import {createClient} from "@/lib/supabase/server";


export async function getStores(){

const supabase = await createClient();


const {
data,
error
}=await supabase
.from("stores")
.select("*");


if(error)
throw error;


return data;

}
