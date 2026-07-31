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

const EL_DORADO="2e6d39a1-2b91-4b56-9ed1-8daee84040e0";


async function fix(){


const {error:profileError}=await supabase

.from("profiles")

.update({

store_id:EL_DORADO,

role:"manager"

})

.eq(
"id",
USER_ID
);



const {error:salesError}=await supabase

.from("sales")

.update({

store_id:EL_DORADO

})

.eq(
"employee_id",
USER_ID
);



console.log("PROFILE ERROR:");

console.log(profileError);


console.log("SALES ERROR:");

console.log(salesError);


}


fix();
