import {getRegionalGoalProgress} from "@/lib/services/regionalGoals";


export default async function RegionalGoalProgress(){


const stores = await getRegionalGoalProgress();



return (

<div className="
rounded-3xl
border
bg-white
p-8
shadow-sm
">


<h2 className="
text-2xl
font-black
">

Regional Goal Performance

</h2>



<div className="
mt-6
space-y-4
">


{stores.map((store:any)=>(


<div

key={store.store}

className="
rounded-2xl
bg-slate-50
p-5
"

>


<h3 className="
font-black
text-lg
">

{store.store}

</h3>



<div className="
mt-4
grid
grid-cols-2
gap-3
md:grid-cols-4
font-bold
">


<p>
GP {store.gp}%
</p>

<p>
Voice {store.voice}%
</p>

<p>
MiM {store.mim}%
</p>

<p>
Upgrade {store.upgrade}%
</p>

<p>
HSI {store.hsi}%
</p>

<p>
BTS {store.bts}%
</p>

<p>
ACC {store.accessories}%
</p>


</div>


</div>


))}


</div>


</div>

)

}
