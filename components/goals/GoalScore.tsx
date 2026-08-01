interface GoalScoreProps{

score:number;

}



export default function GoalScore({

score

}:GoalScoreProps){


const status =

score >= 90

?

"Elite"

:

score >= 75

?

"On Track"

:

score >= 50

?

"Needs Focus"

:

"Behind";



return (

<div className="
rounded-3xl
bg-gradient-to-br
from-purple-600
to-indigo-600
p-8
text-white
">



<p className="
font-bold
">

Overall Goal Progress

</p>



<h2 className="
mt-5
text-6xl
font-black
">

{score}%

</h2>



<p className="
mt-2
font-bold
">

{status}

</p>



</div>

)

}
