import {getAdminGoalAnalytics} from "@/lib/services/adminGoals";


export default async function AdminGoalAnalytics(){


const regions = await getAdminGoalAnalytics();



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

Goal Analytics

</h2>



<div className="
mt-6
space-y-4
">


{regions.map((region:any)=>(


<div

key={region.region}

className="
rounded-2xl
bg-slate-50
p-5
flex
justify-between
"

>


<span className="
font-black
">

{region.region}

</span>



<span className="
font-black
text-purple-600
">

{region.gp}%

</span>



</div>


))}


</div>


</div>

)

}
