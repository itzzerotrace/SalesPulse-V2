const employees=[
{
name:"Bryce",
score:"86%"
},
{
name:"Sarah",
score:"74%"
},
{
name:"Mike",
score:"68%"
}
];


export default function EmployeeLeaderboard(){


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


{employees.map((employee,index)=>(


<div
key={employee.name}
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


<p className="font-bold">

{employee.name}

</p>


</div>



<p className="
font-black
text-purple-600
">

{employee.score}

</p>


</div>


))}


</div>


</div>

);

}
