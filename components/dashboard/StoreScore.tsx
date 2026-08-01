interface StoreScoreProps{

score:number;

}



export default function StoreScore({

score

}:StoreScoreProps){


const status =

score >= 90

?

"Elite Performance"

:

score >= 75

?

"Excellent Performance"

:

score >= 50

?

"On Track"

:

"Needs Improvement";



return (

<div className="
rounded-3xl
bg-gradient-to-br
from-purple-600
to-indigo-600
p-8
text-white
shadow-lg
">


<p className="
text-sm
font-bold
opacity-80
">

Store Performance Score

</p>



<h2 className="
mt-4
text-6xl
font-black
">

{Math.round(score)}

</h2>



<p className="
mt-3
font-bold
">

{status}

</p>



<div className="
mt-6
rounded-xl
bg-white/20
px-4
py-3
text-sm
font-bold
">

Based on current goal completion

</div>


</div>

);

}
