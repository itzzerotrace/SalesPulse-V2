interface Props{
label:string;
}


export default function PerformanceBadge({
label
}:Props){


return (

<span className="
rounded-full
bg-purple-100
px-4
py-2
text-xs
font-black
text-purple-700
">

{label}

</span>

)

}
