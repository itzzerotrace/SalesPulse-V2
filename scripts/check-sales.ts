import dotenv from "dotenv";

dotenv.config({
path:".env.local"
});


import { createClient } from "@supabase/supabase-js";


const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;


console.log("Supabase URL:", url ? "Loaded" : "Missing");

console.log("Supabase Key:", key ? "Loaded" : "Missing");



if(!url || !key){

throw new Error(
"Missing Supabase environment variables"
);

}



const supabase = createClient(
url,
key
);



async function check(){


const {

data,

error

}=await supabase

.from("sales")

.select("*")

.limit(1);



console.log(
JSON.stringify(data,null,2)
);


console.log(error);


}


check();
