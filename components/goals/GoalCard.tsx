interface Props{
title:string;
current:string;
target:string;
percent:number;
icon:string;
}


export default function GoalCard({
title,
current,
target,
percent,
icon
}:Props){


return (

<div className="
rounded-3xl
border
bg-white
p-6
shadow-sm
">


<div className="
flex
justify-between
items-start
">


<div className="
h-12
w-12
rounded-2xl
bg-purple-100
flex
items-center
justify-center
text-2xl
">

{icon}

</div>



<span className="
font-black
text-purple-600
">

{percent}%

</span>


</div>



<h3 className="
mt-5
font-black
text-xl
">

{title}

</h3>



<p className="
mt-2
text-sm
text-slate-500
">

{current} / {target}

</p>



<div className="
mt-5
h-3
rounded-full
bg-slate-100
">


<div

className="
h-3
rounded-full
bg-gradient-to-r
from-purple-600
to-indigo-600
"

style={{
width:`${percent}%`
}}

/>


</div>


</div>

)

}
