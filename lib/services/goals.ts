import {createClient} from "@/lib/supabase/server";


export async function getGoals(){

const supabase = await createClient();


const {
data,
error
}=await supabase
.from("goals")
.select("*");


if(error)
throw error;


return data;

}
