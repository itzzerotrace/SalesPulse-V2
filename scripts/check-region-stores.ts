import dotenv from "dotenv";

dotenv.config({
path:".env.local"
});

import {createClient} from "@supabase/supabase-js";


const supabase=createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
);


async function check(){

const region="904feb9a-21fb-4ab1-b114-4e25494dc1a9";


const {
data,
error
}=await supabase

.from("stores")

.select(`
id,
name,
region_id
`)

.eq(
"region_id",
region
);


console.log("REGION STORES:");
console.log(JSON.stringify(data,null,2));


console.log("ERROR:");
console.log(error);


}


check();
