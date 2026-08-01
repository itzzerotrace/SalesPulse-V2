interface TeamGoalCardProps{

percent:number;

}



export default function TeamGoalCard({

percent

}:TeamGoalCardProps){



const status =

percent >= 90

?

"Excellent"

:

percent >= 70

?

"On Track"

:

percent >= 50

?

"Needs Focus"

:

"Behind";



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

Team Monthly Goal

</h2>




<div className="
mt-6
h-4
rounded-full
bg-slate-100
">


<div

className="
h-4
rounded-full
bg-gradient-to-r
from-purple-600
to-indigo-600
"

style={{

width:`${Math.min(percent,100)}%`

}}

/>


</div>





<div className="
mt-4
flex
justify-between
text-sm
font-bold
">


<span>

{Math.round(percent)}% Complete

</span>



<span className="
text-purple-600
">

{status}

</span>



</div>


</div>

);

}
