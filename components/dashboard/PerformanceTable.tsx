const employees = [
{
name:"Employee",
gp:"--",
goal:"--"
}
];


export default function PerformanceTable(){

return (

<div className="
overflow-hidden
rounded-3xl
border
border-slate-200
bg-white
shadow-sm
">


<div className="p-6">

<h2 className="text-xl font-black">
Team Performance
</h2>


<p className="text-sm text-slate-500">
Employee sales progress
</p>

</div>



<table className="w-full">


<thead className="bg-slate-50">


<tr>

<th className="p-5 text-left text-sm font-bold text-slate-500">
Employee
</th>


<th className="p-5 text-left text-sm font-bold text-slate-500">
GP
</th>


<th className="p-5 text-left text-sm font-bold text-slate-500">
Goal
</th>


</tr>


</thead>


<tbody>

{employees.map((employee)=>(


<tr
key={employee.name}
className="border-t"
>


<td className="p-5 font-semibold">
{employee.name}
</td>


<td className="p-5">
{employee.gp}
</td>


<td className="p-5">
{employee.goal}
</td>


</tr>


))}


</tbody>


</table>


</div>

);

}
