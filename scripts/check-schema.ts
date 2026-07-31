import dotenv from "dotenv";

dotenv.config({
path:".env.local"
});


import {createClient} from "@supabase/supabase-js";


const supabase=createClient(

process.env.NEXT_PUBLIC_SUPABASE_URL!,

process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

);


async function check(){


const {

data,

error

}=await supabase

.rpc("get_schema");



console.log(data);

console.log(error);


}


check();
