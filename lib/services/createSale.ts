import {createClient} from "@/lib/supabase/client";


export async function createSale(data:any){


const supabase=createClient();



const {
data:{
user
}

}=await supabase.auth.getUser();



if(!user){

throw new Error(
"User not logged in"
);

}



const {
data:profile,
error:profileError
}=await supabase

.from("profiles")

.select("store_id")

.eq("id",user.id)

.single();



if(profileError)

throw profileError;



const {
error
}=await supabase

.from("sales")

.insert({

employee_id:user.id,

store_id:profile.store_id,

gp:Number(data.gp || 0),

voice:Number(data.voice || 0),

mim:Number(data.mim || 0),

upgrade:Number(data.upgrade || 0),

hsi:Number(data.hsi || 0),

bts:Number(data.bts || 0),

accessories:Number(data.accessories || 0),

mrc:Number(data.mrc || 0),

sale_date:new Date()
.toISOString()
.split("T")[0]

});



if(error)

throw error;



return true;


}
