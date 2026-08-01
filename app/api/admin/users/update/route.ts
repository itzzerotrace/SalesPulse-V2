import {NextResponse} from "next/server";
import {createClient} from "@/lib/supabase/server";


export async function POST(

request:Request

){


const supabase = await createClient();



const {

data:{
user

}

}=await supabase.auth.getUser();



if(!user){

return NextResponse.json(
{
error:"Not authenticated"
},
{
status:401
}
);

}




const {

data:admin

}=await supabase

.from("profiles")

.select("role")

.eq(
"id",
user.id
)

.single();



if(admin?.role !== "admin"){


return NextResponse.json(
{
error:"Unauthorized"
},
{
status:403
}
);

}




const body = await request.json();



const {

error

}=await supabase

.from("profiles")

.update({

role:body.role,

store_id:body.store_id || null,

region_id:body.region_id || null

})

.eq(
"id",
body.id
);



if(error){

return NextResponse.json(
{
error:error.message
},
{
status:500
}
);

}



return NextResponse.json({

success:true

});


}
