const stores=[
"El Dorado",
"Stockton",
"Sacramento",
"Roseville"
];


export default function StoreRankingList(){

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
Store Rankings
</h2>


<div className="
mt-6
space-y-3
">

{stores.map((store,index)=>(

<div
key={store}
className="
flex
justify-between
rounded-2xl
bg-slate-50
p-4
">

<span className="font-bold">
#{index+1} {store}
</span>


<span className="font-black text-purple-600">
$--
</span>


</div>

))}

</div>


</div>

)

}
