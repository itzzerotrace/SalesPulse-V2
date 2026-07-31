import dotenv from "dotenv";

dotenv.config({
path:".env.local"
});


import {createClient} from "@supabase/supabase-js";


const supabase=createClient(

process.env.NEXT_PUBLIC_SUPABASE_URL!,

process.env.SUPABASE_SERVICE_ROLE_KEY!

);



async function seed(){


const {

data,

error

}=await supabase

.from("regions")

.insert({

name:"NorCal"

})

.select();



console.log(data);

console.log(error);


}


seed();
