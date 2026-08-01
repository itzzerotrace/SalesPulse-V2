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


const date = sale.sale_date || "Unknown";


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
p-5
sm:p-8
shadow-sm
">



<h2 className="
text-xl
font-black
text-slate-900
">

Sales Performance Trend

</h2>



<p className="
mt-1
text-sm
font-semibold
text-slate-600
">

Your performance over time

</p>






<div className="
mt-5
space-y-3
">



{days.length===0 && (

<div className="
rounded-2xl
bg-slate-100
p-5
font-bold
text-slate-700
">

No sales data yet.

</div>

)}






{days.map(([date,gp])=>(


<div

key={date}

className="
flex
items-center
justify-between
rounded-2xl
bg-slate-100
p-4
"

>


<div>


<p className="
font-black
text-slate-900
">

{date}

</p>


<p className="
text-xs
font-semibold
text-slate-600
">

Gross Profit

</p>


</div>





<div className="
rounded-xl
bg-purple-100
px-3
py-2
font-black
text-purple-700
">

${Number(gp).toFixed(0)}

</div>




</div>


))}





</div>



</div>

)

}
