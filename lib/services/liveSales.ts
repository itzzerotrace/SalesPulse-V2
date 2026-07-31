import {createClient} from "@/lib/supabase/server";
import {getUserContext} from "@/lib/auth/userContext";


export async function getLiveSales(){


const context = await getUserContext();


if(!context || !context.profile){

return [];

}



const supabase = await createClient();



let query = supabase

.from("sales")

.select(`

*,

profiles(
full_name
),

stores(
name,
region_id
)

`)

.order(
"created_at",
{
ascending:false
}
);



const role=context.profile.role;



if(role==="manager"){


query=query.eq(

"store_id",

context.profile.store_id

);


}



if(role==="regional_manager"){


const {
data:stores,
error
}=await supabase

.from("stores")

.select("id")

.eq(

"region_id",

context.profile.region_id

);



if(error){

throw error;

}



const ids=(stores || [])

.map(
(store:any)=>store.id
);



query=query.in(

"store_id",

ids

);



}



const {
data,
error
}=await query;



if(error){

throw error;

}



return data || [];


}
