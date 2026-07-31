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


const {

data,

error

}=await supabase

.from("regions")

.select("*");



console.log("REGIONS:");

console.log(data);

console.log("ERROR:");

console.log(error);


}


check();
