import dotenv from "dotenv";

dotenv.config({
path:".env.local"
});


import {createClient} from "@supabase/supabase-js";


const supabase=createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
);


async function test(){


const regionId="904feb9a-21fb-4ab1-b114-4e25494dc1a9";



const {
data:stores,
error:storeError
}=await supabase

.from("stores")

.select("id,name")

.eq(
"region_id",
regionId
);



console.log("STORES:");
console.log(stores);


const ids=(stores || [])
.map(
(store:any)=>store.id
);



console.log("STORE IDS:");
console.log(ids);



const {
data:sales,
error:salesError
}=await supabase

.from("sales")

.select("*")

.in(
"store_id",
ids
);



console.log("SALES:");
console.log(JSON.stringify(sales,null,2));


console.log("ERROR:");
console.log(salesError);



}


test();
