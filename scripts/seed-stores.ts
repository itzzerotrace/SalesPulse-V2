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

data:region,

error:regionError

}=await supabase

.from("regions")

.select("*")

.eq("name","NorCal")

.single();



if(regionError){

console.log(regionError);

throw new Error("NorCal region not found");

}



const stores=[

{
name:"Pacific",
city:"Stockton",
region:"NorCal",
region_id:region.id
},

{
name:"N Hunter",
city:"Stockton",
region:"NorCal",
region_id:region.id
},

{
name:"El Dorado",
city:"Stockton",
region:"NorCal",
region_id:region.id
},

{
name:"Fremont",
city:"Stockton",
region:"NorCal",
region_id:region.id
}

];



const {

data,

error

}=await supabase

.from("stores")

.insert(stores)

.select();



console.log("CREATED:");

console.log(data);



console.log("ERROR:");

console.log(error);


}


seed();
