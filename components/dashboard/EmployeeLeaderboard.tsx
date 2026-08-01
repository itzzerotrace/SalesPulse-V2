import {getTeamGoalProgress} from "@/lib/services/teamGoalProgress";


export default async function EmployeeLeaderboard(){


const employees = await getTeamGoalProgress();



const ranked = employees.map((item:any)=>{


const scores = [

item.goals.gp,
item.goals.voice,
item.goals.mim,
item.goals.upgrade,
item.goals.hsi,
item.goals.bts,
item.goals.accessories

];


const average =

scores.reduce(
(sum:number,value:number)=>sum + value,
0
) / scores.length;



return {

id:item.employee.id,

name:item.employee.full_name,

percent:average,

gp:item.goals.gp

};


})
.sort(
(a:any,b:any)=>b.percent-a.percent
);





return (

<div className="
rounded-3xl
border
border-slate-200
bg-white
p-5
sm:p-8
shadow-sm
">



<h2 className="
text-xl
font-black
text-slate-900
">

Team Leaderboard

</h2>





<div className="
mt-5
space-y-3
">



{ranked.length === 0 && (

<div className="
rounded-2xl
bg-slate-100
p-4
font-bold
text-slate-700
">

No team data available

</div>

)}




{ranked.map((employee:any,index:number)=>(


<div

key={employee.id}

className="
flex
items-center
justify-between
rounded-2xl
bg-slate-100
p-4
"

>




<div className="
flex
items-center
gap-3
">


<div className="
flex
h-10
w-10
shrink-0
items-center
justify-center
rounded-full
bg-purple-100
font-black
text-purple-700
">

{index+1}

</div>




<div>


<p className="
font-black
text-slate-900
">

{employee.name}

</p>



<p className="
text-sm
font-semibold
text-slate-700
">

GP Goal: {employee.gp}%

</p>


</div>


</div>





<div className="
rounded-xl
bg-purple-100
px-3
py-2
font-black
text-purple-700
">

{Math.round(employee.percent)}%

</div>



</div>


))}




</div>


</div>

)

}
