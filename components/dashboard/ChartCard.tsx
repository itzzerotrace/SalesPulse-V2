interface ChartCardProps {
title:string;
subtitle?:string;
children?:React.ReactNode;
}


export default function ChartCard({
title,
subtitle,
children
}:ChartCardProps){


return (

<div className="
rounded-3xl
border
border-slate-200
bg-white
p-8
shadow-sm
">


<div>

<h2 className="
text-xl
font-black
text-slate-900
">

{title}

</h2>


{subtitle && (

<p className="
mt-1
text-sm
text-slate-500
">

{subtitle}

</p>

)}

</div>



<div className="
mt-8
">

{children}


</div>


</div>

);

}
