interface CoachingCenterProps{

metric:string;

message:string;

}



export default function CoachingCenter({

metric,

message

}:CoachingCenterProps){



return (

<div className="
rounded-3xl
border
border-yellow-200
bg-yellow-50
p-8
">


<h2 className="
text-xl
font-black
">

Coaching Center

</h2>



<p className="
mt-3
text-slate-600
">

Areas requiring attention

</p>




<div className="
mt-6
rounded-2xl
bg-white
p-5
">


<p className="
font-bold
">

{metric || "No issues detected"}

</p>



<p className="
text-sm
text-slate-500
">

{message || "Team is currently meeting goals."}

</p>



</div>


</div>

);

}
