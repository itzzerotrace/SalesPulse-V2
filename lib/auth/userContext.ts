import {createClient} from "@/lib/supabase/server";


export async function getUserContext(){


const supabase = await createClient();



const {
data:{
user
}
}=await supabase.auth.getUser();



if(!user){

return null;

}



const {
data:profile,
error:profileError
}=await supabase

.from("profiles")

.select("*")

.eq(
"id",
user.id
)

.single();



if(profileError){

console.log(
"PROFILE FETCH ERROR",
profileError
);

return {

user,

profile:null

};

}



let store=null;



if(profile.store_id){


const {
data
}=await supabase

.from("stores")

.select(`
id,
name,
region_id
`)

.eq(
"id",
profile.store_id
)

.single();


store=data;


}



let region=null;



if(profile.region_id){


const {
data
}=await supabase

.from("regions")

.select("*")

.eq(
"id",
profile.region_id
)

.single();


region=data;


}



return {

user,

profile:{

...profile,

store,

region

}

};


}
