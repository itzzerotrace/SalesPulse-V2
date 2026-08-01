import {NextResponse} from "next/server";

import {createClient} from "@/lib/supabase/server";


export async function POST(

request:Request

){


const supabase = await createClient();


const body = await request.json();



const {

error

}=await supabase

.from("stores")

.insert({

name:body.name,

city:body.city,

region_id:body.region_id || null

});



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
