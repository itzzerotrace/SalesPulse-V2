import {NextResponse} from "next/server";
import {createClient} from "@/lib/supabase/server";


export async function POST(
request:Request
){

const form = await request.formData();


const employee_id =
String(form.get("employee_id"));



const supabase = await createClient();



const month =
new Date().toLocaleString(
"en-US",
{
month:"long"
}
);



const year =
new Date().getFullYear();




const goalData = {


employee_id,


month,


year,


gp_goal:
Number(form.get("gp_goal") || 0),


voice_goal:
Number(form.get("voice_goal") || 0),


mim_goal:
Number(form.get("mim_goal") || 0),


upgrade_goal:
Number(form.get("upgrade_goal") || 0),


hsi_goal:
Number(form.get("hsi_goal") || 0),


bts_goal:
Number(form.get("bts_goal") || 0),


accessory_goal:
Number(form.get("accessory_goal") || 0)

};




const {
error
}=await supabase

.from("employee_goals")

.upsert(

goalData,

{

onConflict:
"employee_id,month,year"

}

);




if(error){

console.error(error);

return NextResponse.json(

{
error:error.message
},

{
status:500
}

);

}




return NextResponse.redirect(

new URL(
"/team",
request.url
)

);

}
