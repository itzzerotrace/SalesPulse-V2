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



if(context.profile.role === "manager"){


query = query.eq(

"store_id",

context.profile.store_id

);


}



if(context.profile.role === "regional_manager"){



const storeId = context.profile.store_id;



const {

data:store

}=await supabase

.from("stores")

.select("region_id")

.eq("id",storeId)

.single();



if(store){


const {

data:stores

}=await supabase

.from("stores")

.select("id")

.eq(
"region_id",
store.region_id
);



const ids =
stores?.map(
(store)=>store.id
) || [];



query=query.in(
"store_id",
ids
);


}



}



const {

data,

error

}=await query;



if(error)

throw error;



return data || [];


}
