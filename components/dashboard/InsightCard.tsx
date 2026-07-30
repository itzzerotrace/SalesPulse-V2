interface Props{
title:string;
message:string;
}


export default function InsightCard({
title,
message
}:Props){


return (

<div className="
rounded-3xl
bg-gradient-to-br
from-purple-50
to-indigo-50
p-6
border
border-purple-100
">


<h3 className="
font-black
text-lg
">

{title}

</h3>


<p className="
mt-3
text-slate-600
">

{message}

</p>


</div>

)

}
