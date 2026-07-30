interface MetricCardProps {
  title:string;
  value:string;
  subtitle?:string;
  trend?:string;
}


export default function MetricCard({
  title,
  value,
  subtitle,
  trend
}:MetricCardProps){

return (

<div className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
transition
hover:shadow-md
">


<div className="flex items-start justify-between">

<div>

<p className="text-sm font-semibold text-slate-500">
{title}
</p>


<h2 className="mt-3 text-4xl font-black text-slate-900">
{value}
</h2>

</div>


<div className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
bg-purple-100
text-purple-700
font-black
">
%
</div>


</div>



{subtitle && (

<p className="mt-4 text-sm text-slate-500">
{subtitle}
</p>

)}



{trend && (

<p className="mt-2 text-sm font-bold text-green-600">
{trend}
</p>

)}


</div>

);

}
