interface Props{
title:string;
description:string;
}


export default function QuickAction({
title,
description
}:Props){


return (

<div className="
rounded-2xl
border
bg-white
p-5
hover:shadow-md
transition
">


<h3 className="font-black">
{title}
</h3>


<p className="
mt-1
text-sm
text-slate-500
">

{description}

</p>


</div>

);

}
