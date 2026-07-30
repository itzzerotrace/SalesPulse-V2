interface Props{
title:string;
children:React.ReactNode;
}


export default function SettingsCard({
title,
children
}:Props){


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
text-slate-900
">

{title}

</h2>


<div className="
mt-6
">

{children}

</div>


</div>

)

}
