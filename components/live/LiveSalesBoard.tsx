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





<div className="space-y-4">



{sales.length===0 && (

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
"

>



<div className="
flex
justify-between
items-start
">


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

{sale.stores?.name || "Store"}

</p>


</div>



<div className="
text-right
">


<p className="
text-3xl
font-black
text-purple-400
">

${sale.gp || 0}

</p>


<p className="
text-sm
text-slate-400
">

Gross Profit

</p>


</div>


</div>





<div className="
grid
grid-cols-4
gap-3
mt-6
">


<div className="bg-white/10 rounded-xl p-3">

<p className="text-slate-400 text-xs">
Voice
</p>

<p className="font-black">
{sale.voice || 0}
</p>

</div>



<div className="bg-white/10 rounded-xl p-3">

<p className="text-slate-400 text-xs">
MiM
</p>

<p className="font-black">
{sale.mim || 0}
</p>

</div>



<div className="bg-white/10 rounded-xl p-3">

<p className="text-slate-400 text-xs">
Upgrade
</p>

<p className="font-black">
{sale.upgrade || 0}
</p>

</div>



<div className="bg-white/10 rounded-xl p-3">

<p className="text-slate-400 text-xs">
HSI
</p>

<p className="font-black">
{sale.hsi || 0}
</p>

</div>


</div>





<div className="
grid
grid-cols-3
gap-3
mt-3
">


<div className="bg-white/10 rounded-xl p-3">

<p className="text-slate-400 text-xs">
BTS
</p>

<p className="font-black">
{sale.bts || 0}
</p>

</div>



<div className="bg-white/10 rounded-xl p-3">

<p className="text-slate-400 text-xs">
Accessories
</p>

<p className="font-black">
${sale.accessories || 0}
</p>

</div>



<div className="bg-white/10 rounded-xl p-3">

<p className="text-slate-400 text-xs">
Commission
</p>

<p className="font-black text-green-400">
${((sale.mrc || 0) * .10).toFixed(2)}
</p>

</div>


</div>




<p className="
mt-4
text-xs
text-slate-400
">

{new Date(sale.created_at).toLocaleString()}

</p>



</div>


))}



</div>


</div>

)

}
