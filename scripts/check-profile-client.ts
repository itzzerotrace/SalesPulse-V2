import dotenv from "dotenv";

dotenv.config({
  path: ".env.local"
});

import {createClient} from "@supabase/supabase-js";


const supabase=createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


async function check(){

const {data,error}=await supabase
.from("profiles")
.select("*")
.eq(
"id",
"ecebec7c-846f-4a69-beec-5679777355e7"
);


console.log("PROFILE CLIENT:");
console.log(data);

console.log("ERROR:");
console.log(error);

}

check();
