import dotenv from "dotenv";

dotenv.config({
path:".env.local"
});

import {createClient} from "@supabase/supabase-js";


const supabase=createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
);


const USER_ID="ecebec7c-846f-4a69-beec-5679777355e7";

const REGION_ID="904feb9a-21fb-4ab1-b114-4e25494dc1a9";


async function update(){


const {
error
}=await supabase

.from("profiles")

.update({

role:"regional_manager",

region_id:REGION_ID,

store_id:null

})

.eq(
"id",
USER_ID
);



console.log("ERROR:");

console.log(error);


}


update();
