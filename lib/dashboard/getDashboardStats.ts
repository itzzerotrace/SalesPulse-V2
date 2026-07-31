import {createClient} from "@/lib/supabase/server";
import {getUserContext} from "@/lib/auth/userContext";


function calculateSales(sales:any[]){

return {

gp:sales.reduce(
(sum,s)=>sum + Number(s.gp || 0),
0
),

voice:sales.reduce(
(sum,s)=>sum + Number(s.voice || 0),
0
),

mim:sales.reduce(
(sum,s)=>sum + Number(s.mim || 0),
0
),

upgrade:sales.reduce(
(sum,s)=>sum + Number(s.upgrade || 0),
0
),

hsi:sales.reduce(
(sum,s)=>sum + Number(s.hsi || 0),
0
),

bts:sales.reduce(
(sum,s)=>sum + Number(s.bts || 0),
0
),

accessories:sales.reduce(
(sum,s)=>sum + Number(s.accessories || 0),
0
),

commission:
sales.reduce(
(sum,s)=>sum + Number(s.mrc || 0),
0
) * .10

};

}



export async function getDashboardStats(){


const supabase = await createClient();

const context = await getUserContext();


console.log(
"DASHBOARD CONTEXT",
context
);



if(!context?.user || !context.profile){

return null;

}



const role=context.profile.role;


let sales:any[]=[];



if(role==="employee"){

const {data,error}=await supabase
.from("sales")
.select("*")
.eq("employee_id",context.user.id);


if(error) throw error;

sales=data || [];

}



if(role==="manager"){

const {data,error}=await supabase
.from("sales")
.select("*")
.eq("store_id",context.profile.store_id);


if(error) throw error;

sales=data || [];

}



if(role==="regional_manager"){

const {data:stores,error:storeError}=await supabase
.from("stores")
.select("id")
.eq("region_id",context.profile.region_id);


if(storeError) throw storeError;


const ids=(stores || []).map(
(store:any)=>store.id
);


console.log(
"REGIONAL STORES",
ids
);



const {data,error}=await supabase
.from("sales")
.select("*")
.in("store_id",ids);


if(error) throw error;


sales=data || [];

}



if(role==="admin"){

const {data,error}=await supabase
.from("sales")
.select("*");


if(error) throw error;

sales=data || [];

}



console.log(
"DASHBOARD SALES",
sales
);



const now=new Date();

const monthStart=new Date(
now.getFullYear(),
now.getMonth(),
1
);



const monthSales=sales.filter(
(s:any)=>
new Date(s.created_at)>=monthStart
);



const todaySales=sales.filter(
(s:any)=>
new Date(s.created_at).toDateString()
===
now.toDateString()
);



return {

month:calculateSales(monthSales),

today:calculateSales(todaySales),

total:calculateSales(sales)

};


}
