import {createClient} from "@/lib/supabase/server";
import {getUserContext} from "@/lib/auth/userContext";


export default async function StoreRanking(){


const supabase = await createClient();

const context = await getUserContext();



const {
data:stores
}=await supabase

.from("stores")

.select(`
id,
name
`);





const now = new Date();

const monthStart = new Date(
now.getFullYear(),
now.getMonth(),
1
);




const {
data:sales
}=await supabase

.from("sales")

.select("*")

.gte(
"created_at",
monthStart.toISOString()
);




const rankings=(stores || []).map((store:any)=>{


const gp=(sales || [])

.filter(
(s:any)=>
s.store_id===store.id
)

.reduce(

(sum:number,sale:any)=>

sum + Number(
sale.gp || 0
),

0

);



return {

id:store.id,

name:store.name,

gp

};


})

.sort(

(a:any,b:any)=>

b.gp-a.gp

);





const myStore=context?.profile?.store_id;



const myRank = rankings.findIndex(

(store:any)=>

store.id===myStore

)+1;



return (

<div className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
">


<h2 className="
font-black
text-xl
">

Store Ranking

</h2>




<div className="
mt-6
space-y-3
">


{rankings.map((store:any,index:number)=>(


<div

key={store.id}

className={`

flex

justify-between

items-center

rounded-2xl

p-4

${

store.id===myStore

?

"bg-purple-50 border border-purple-200"

:

"bg-slate-50"

}

`}

>


<div>

<p className="
font-black
">

#{index+1} {store.name}

</p>


{store.id===myStore && (

<p className="
text-xs
font-bold
text-purple-600
">

Your Store

</p>

)}

</div>



<p className="
font-black
text-purple-600
">

${store.gp.toLocaleString()}

</p>



</div>


))}


</div>





{myRank > 0 && (

<p className="
mt-5
text-sm
font-bold
text-slate-500
">

Your store rank: #{myRank}

</p>

)}



</div>

)

}
