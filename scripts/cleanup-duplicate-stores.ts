import dotenv from "dotenv";

dotenv.config({
path:".env.local"
});


import {createClient} from "@supabase/supabase-js";


const supabase=createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
);


// Keep these stores
const keepIds=[
"29104492-531f-4e9e-b807-882c92876128", // Pacific
"5c25532c-16f8-46b5-ae8f-6512571891d6", // N Hunter
"2e6d39a1-2b91-4b56-9ed1-8daee84040e0", // El Dorado
"9e6a8e08-9cfc-45ae-9206-ae58cacba3e7"  // Fremont
];


async function cleanup(){


// Find duplicates

const {
data:stores,
error:fetchError
}=await supabase

.from("stores")

.select("*");


if(fetchError){

console.log(fetchError);

return;

}



const deleteIds =
(stores || [])

.filter(
(store:any)=>!keepIds.includes(store.id)
)

.map(
(store:any)=>store.id
);



console.log("Deleting:");

console.log(deleteIds);



if(deleteIds.length){


const {
error:deleteError
}=await supabase

.from("stores")

.delete()

.in(
"id",
deleteIds
);



console.log("DELETE ERROR:");

console.log(deleteError);


}



const {
data:remaining,
error
}=await supabase

.from("stores")

.select("*");



console.log("FINAL STORES:");

console.log(remaining);


console.log("ERROR:");

console.log(error);


}



cleanup();
