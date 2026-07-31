import dotenv from "dotenv";

dotenv.config({
path:".env.local"
});


import {createClient} from "@supabase/supabase-js";


const supabase=createClient(

process.env.NEXT_PUBLIC_SUPABASE_URL!,

process.env.SUPABASE_SERVICE_ROLE_KEY!

);



async function addColumn(){


const {
error
}=await supabase.rpc(
"exec_sql",
{
sql:`
ALTER TABLE sales
ADD COLUMN IF NOT EXISTS mrc numeric DEFAULT 0;
`
}
);



console.log(error || "MRC column added");


}



addColumn();
