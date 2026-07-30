const sales=[
{
type:"Voice Activation",
amount:"+1"
},
{
type:"HSI Upgrade",
amount:"+1"
},
{
type:"Accessory Sale",
amount:"+$--"
}
];


export default function RecentSales(){

return (

<div className="
rounded-3xl
border
bg-white
p-8
shadow-sm
">


<h2 className="
text-xl
font-black
">

Recent Sales

</h2>


<p className="
mt-2
text-sm
text-slate-500
">

Latest activity

</p>



<div className="
mt-6
space-y-4
">


{sales.map((sale)=>(


<div
key={sale.type}
className="
flex
items-center
justify-between
rounded-2xl
bg-slate-50
p-5
"
>


<div>

<p className="font-bold">
{sale.type}
</p>


<p className="text-sm text-slate-500">
Today
</p>


</div>



<p className="
font-black
text-purple-600
">

{sale.amount}

</p>


</div>


))}


</div>


</div>

)

}
