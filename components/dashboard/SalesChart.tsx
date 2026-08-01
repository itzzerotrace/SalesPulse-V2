import {createClient} from "@/lib/supabase/server";


export default async function SalesChart(){


const supabase = await createClient();



const {
data:sales,
error
}=await supabase

.from("sales")

.select(`
gp,
sale_date
`);



if(error){

throw error;

}



const totals:any = {};



(sales || []).forEach((sale:any)=>{


const date =
sale.sale_date || "Unknown";


if(!totals[date]){

totals[date]=0;

}


totals[date]+=Number(
sale.gp || 0
);


});



const days = Object.entries(totals)

.sort(
(a,b)=>
new Date(a[0]).getTime()
-
new Date(b[0]).getTime()
);



return (

<div className="
rounded-3xl
border
border-slate-200
bg-white
p-8
shadow-sm
">


<h2 className="
text-xl
font-black
">

Sales Performance Trend

</h2>


<p className="
text-sm
text-slate-500
">

Your performance over time

</p>




<div className="
mt-8
space-y-3
">


{days.length===0 && (

<div className="
rounded-2xl
bg-slate-50
p-5
text-slate-500
">

No sales data yet.

</div>

)}



{days.map(([date,gp])=>(


<div

key={date}

className="
flex
justify-between
rounded-2xl
bg-slate-50
p-4
"

>


<span className="
font-bold
">

{date}

</span>



<span className="
font-black
text-purple-600
">

${Number(gp).toFixed(0)}

</span>


</div>


))}



</div>


</div>

);

}
