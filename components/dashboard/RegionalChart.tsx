import {createClient} from "@/lib/supabase/server";


export default async function RegionalChart(){


const supabase = await createClient();



const {
data:sales,
error
}=await supabase

.from("sales")

.select(`

gp,

stores(
name
)

`);



if(error){

throw error;

}



const stores:any={};



(sales || []).forEach((sale:any)=>{


const name =
sale.stores?.name || "Unknown";



if(!stores[name]){

stores[name]=0;

}



stores[name]+=Number(
sale.gp || 0
);



});



const ranking = Object.entries(stores)

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

Performance By Store

</h2>



<div className="
mt-8
space-y-3
">


{ranking.length===0 && (

<div className="
rounded-2xl
bg-slate-50
p-5
text-slate-500
">

No sales data yet.

</div>

)}



{ranking.map((store,index)=>(


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
