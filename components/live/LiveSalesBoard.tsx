import {getLiveSales} from "@/lib/services/liveSales";


export default async function LiveSalesBoard(){


const sales = await getLiveSales();



return (

<div className="
min-h-screen
rounded-3xl
bg-[#0B0924]
p-8
text-white
">


<div className="
flex
justify-between
items-center
mb-8
">


<div>

<h1 className="
text-4xl
font-black
">

LIVE SALES COMMAND CENTER

</h1>


<p className="
text-slate-400
">

Real time store activity

</p>


</div>



<div className="
bg-green-500/20
text-green-400
px-5
py-2
rounded-full
font-black
">

● LIVE

</div>


</div>



<div className="
space-y-4
">


{sales.length === 0 && (

<div className="
bg-white/10
rounded-2xl
p-6
">

No sales yet today.

</div>

)}



{sales.map((sale:any)=>(


<div

key={sale.id}

className="
bg-white/10
rounded-2xl
p-6
flex
justify-between
"

>


<div>

<p className="
font-black
text-xl
">

{sale.profiles?.full_name || "Employee"}

</p>


<p className="
text-slate-400
">

{sale.stores?.name}

</p>


</div>



<div className="
text-purple-400
font-black
text-2xl
">

Sale

</div>


</div>


))}


</div>


</div>

)

}
