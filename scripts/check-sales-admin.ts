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

.from("sales")

.select("*")

.order(
"created_at",
{
ascending:false
}
);



console.log("SALES:");

console.log(JSON.stringify(data,null,2));


console.log("ERROR:");

console.log(error);


}



check();
