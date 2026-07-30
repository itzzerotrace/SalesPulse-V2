const activities=[
{
title:"No sales recorded",
description:"Your recent sales will appear here."
},
{
title:"Goal tracking active",
description:"Monthly targets are being monitored."
}
];


export default function ActivityFeed(){


return (

<div className="
rounded-3xl
border
border-slate-200
bg-white
p-8
shadow-sm
">


<h2 className="
text-xl
font-black
">

Recent Activity

</h2>


<p className="
mt-1
text-sm
text-slate-500
">

Latest sales updates

</p>



<div className="
mt-6
space-y-4
">


{activities.map((item)=>(


<div
key={item.title}
className="
flex
gap-4
rounded-2xl
bg-slate-50
p-5
"
>


<div className="
h-10
w-10
rounded-xl
bg-purple-100
flex
items-center
justify-center
font-black
text-purple-600
">

+

</div>



<div>

<h3 className="
font-bold
">

{item.title}

</h3>


<p className="
text-sm
text-slate-500
">

{item.description}

</p>


</div>


</div>


))}


</div>


</div>

);

}
