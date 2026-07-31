import dotenv from "dotenv";

dotenv.config({
path:".env.local"
});


import { createClient } from "@supabase/supabase-js";


const supabase=createClient(

process.env.NEXT_PUBLIC_SUPABASE_URL!,

process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

);


async function check(){


const {

data,

error

}=await supabase

.from("profiles")

.select("*")

.limit(5);



console.log(
"PROFILES:"
);


console.log(
JSON.stringify(data,null,2)
);



console.log(
"ERROR:"
);


console.log(error);


}


check();
