import {createClient} from "@/lib/supabase/server";


export async function getSales(){

const supabase = await createClient();


const {
data,
error
}=await supabase
.from("sales")
.select("*")
.order(
"created_at",
{
ascending:false
}
);


if(error)
throw error;


return data;

}
