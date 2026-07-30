interface PageHeaderProps{

title:string;

subtitle:string;

}


export default function PageHeader({
title,
subtitle
}:PageHeaderProps){


return (

<div>

<h1 className="
text-4xl
font-black
text-slate-900
">

{title}

</h1>


<p className="
mt-2
text-lg
text-slate-500
">

{subtitle}

</p>


</div>

)

}
