import {createClient} from "@/lib/supabase/server";


export default async function StoreRankingList(){


const supabase = await createClient();



const {
data:sales,
error
}=await supabase

.from("sales")

.select(`

gp,

store_id,

stores(
name

)

`);




if(error){

throw error;

}



const rankings:any={};



(sales || []).forEach((sale:any)=>{


const storeName =
sale.stores?.name || "Unknown";


if(!rankings[storeName]){

rankings[storeName]=0;

}



rankings[storeName]+=Number(
sale.gp || 0
);



});




const rankedStores = Object.entries(rankings)

.map(([name,gp])=>({

name,

gp:Number(gp)

}))

.sort(
(a,b)=>b.gp-a.gp
);



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



{rankedStores.length===0 && (

<div className="
rounded-2xl
bg-slate-50
p-4
">

No sales data yet.

</div>

)}




{rankedStores.map((store,index)=>(


<div

key={store.name}

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

#{index+1} {store.name}

</span>



<span className="
font-black
text-purple-600
">

${store.gp.toFixed(0)}

</span>


</div>


))}



</div>


</div>

)

}
