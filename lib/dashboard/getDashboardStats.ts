import {createClient} from "@/lib/supabase/server";
import {getUserContext} from "@/lib/auth/userContext";


function calculateSales(sales:any[]){

return {

gp:sales.reduce(
(total,s)=>total + Number(s.gp || 0),
0
),

voice:sales.reduce(
(total,s)=>total + Number(s.voice || 0),
0
),

mim:sales.reduce(
(total,s)=>total + Number(s.mim || 0),
0
),

upgrade:sales.reduce(
(total,s)=>total + Number(s.upgrade || 0),
0
),

hsi:sales.reduce(
(total,s)=>total + Number(s.hsi || 0),
0
),

bts:sales.reduce(
(total,s)=>total + Number(s.bts || 0),
0
),

accessories:sales.reduce(
(total,s)=>total + Number(s.accessories || 0),
0
),

commission:sales.reduce(
(total,s)=>total + Number(s.mrc || 0),
0
) * .10

};

}



export async function getDashboardStats(){


const supabase = await createClient();


const context = await getUserContext();



if(!context?.user || !context.profile){

return null;

}



let query = supabase

.from("sales")

.select("*");



const role=context.profile.role;



if(role==="employee"){


query=query.eq(
"employee_id",
context.user.id
);


}



if(role==="manager"){


query=query.eq(
"store_id",
context.profile.store_id
);


}



if(role==="regional_manager"){



const {

data:stores

}=await supabase

.from("stores")

.select("id")

.eq(
"region_id",
context.profile.region_id
);



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

data:sales,

error

}=await query;



if(error)

throw error;



const allSales=sales || [];



const now=new Date();



const monthStart=new Date(

now.getFullYear(),

now.getMonth(),

1

);



const monthSales=allSales.filter(
(sale:any)=>

new Date(
sale.created_at
)>=monthStart

);



const todaySales=allSales.filter(
(sale:any)=>

new Date(
sale.created_at
).toDateString()
===now.toDateString()

);



return {

month:calculateSales(monthSales),

today:calculateSales(todaySales),

total:calculateSales(allSales)

};


}
