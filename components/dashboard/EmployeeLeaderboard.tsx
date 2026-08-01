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
bg-white
p-8
shadow-sm
">


<h2 className="
text-xl
font-black
">

Team Leaderboard

</h2>



<div className="
mt-6
space-y-3
">


{ranked.length === 0 && (

<div className="
rounded-2xl
bg-slate-50
p-4
text-slate-500
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
bg-slate-50
p-4
"

>


<div className="
flex
items-center
gap-4
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

{index+1}

</div>



<div>


<p className="
font-bold
">

{employee.name}

</p>


<p className="
text-xs
text-slate-500
">

GP Goal: {employee.gp}%

</p>


</div>


</div>




<p className="
font-black
text-purple-600
">

{Math.round(employee.percent)}%

</p>



</div>


))}



</div>


</div>

);

}
