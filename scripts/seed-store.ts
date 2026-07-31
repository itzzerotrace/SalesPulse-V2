import dotenv from "dotenv";

dotenv.config({
path:".env.local"
});


import {createClient} from "@supabase/supabase-js";


const supabase=createClient(

process.env.NEXT_PUBLIC_SUPABASE_URL!,

process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

);



async function seed(){


const stores=[

{
name:"Pacific",
city:"Stockton",
district:"NorCal"
},

{
name:"N Hunter",
city:"Stockton",
district:"NorCal"
},

{
name:"El Dorado",
city:"Stockton",
district:"NorCal"
},

{
name:"Fremont",
city:"Stockton",
district:"NorCal"
}

];



const {

data,

error

}=await supabase

.from("stores")

.insert(stores)

.select();



console.log("CREATED STORES:");

console.log(data);



console.log("ERROR:");

console.log(error);


}


seed();
