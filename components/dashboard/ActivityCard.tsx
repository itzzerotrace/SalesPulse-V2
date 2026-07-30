interface ActivityCardProps{
title:string;
description:string;
}


export default function ActivityCard({
title,
description
}:ActivityCardProps){


return (

<div className="
flex
items-start
gap-4
rounded-2xl
bg-slate-50
p-5
">


<div className="
h-10
w-10
rounded-full
bg-purple-100
flex
items-center
justify-center
font-black
text-purple-700
">

+

</div>



<div>

<h3 className="
font-bold
text-slate-900
">

{title}

</h3>


<p className="
text-sm
text-slate-500
">

{description}

</p>


</div>


</div>

);

}
