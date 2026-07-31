import {createClient} from "@/lib/supabase/server";
import {getUserContext} from "@/lib/auth/userContext";


export async function getDashboardStats(){


const context = await getUserContext();


if(!context || !context.profile){

return {

gp:0,
voice:0,
hsi:0,
bts:0,
accessories:0,
commission:0,

today:{
gp:0,
voice:0,
hsi:0,
bts:0,
accessories:0,
commission:0
}

};

}



const supabase = await createClient();



let query = supabase

.from("sales")

.select("*");



if(
context.profile.role === "employee"
){

query = query.eq(
"employee_id",
context.user.id
);


}


if(
context.profile.role === "manager"
){

query = query.eq(
"store_id",
context.profile.store_id
);

}



const {

data:sales,

error

}=await query;



if(error)

throw error;



const allSales = sales || [];



const now = new Date();



const startMonth = new Date(

now.getFullYear(),

now.getMonth(),

1

);



const todaySales = allSales.filter((sale:any)=>{

const date=new Date(
sale.created_at
);

return date.toDateString() === now.toDateString();

});



const monthSales = allSales.filter((sale:any)=>{

return new Date(
sale.created_at
) >= startMonth;

});



function calculate(items:any[]){


const gp = items.reduce(

(sum,s)=>sum + Number(s.gp || 0),

0

);



const voice = items.reduce(

(sum,s)=>sum + Number(s.voice || 0),

0

);



const hsi = items.reduce(

(sum,s)=>sum + Number(s.hsi || 0),

0

);



const bts = items.reduce(

(sum,s)=>sum + Number(s.bts || 0),

0

);



const accessories = items.reduce(

(sum,s)=>sum + Number(s.accessories || 0),

0

);



const mrc = items.reduce(

(sum,s)=>sum + Number(s.mrc || 0),

0

);



return {

gp,

voice,

hsi,

bts,

accessories,

commission:mrc * .10

};


}



return {

...calculate(monthSales),

today:calculate(todaySales)

};


}
