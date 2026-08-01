interface PageHeaderProps{

title:string;

subtitle?:string;

}



export default function PageHeader({

title,

subtitle

}:PageHeaderProps){



const now = new Date();



const month = now.toLocaleString(
"en-US",
{
month:"long"
}
);



const year = now.getFullYear();



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

{month} {year} Performance

</p>



{subtitle && (

<p className="
mt-2
text-slate-500
">

{subtitle}

</p>

)}


</div>

);

}
