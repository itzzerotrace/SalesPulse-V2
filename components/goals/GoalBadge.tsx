interface Props{
status:string;
}


export default function GoalBadge({
status
}:Props){

return (

<span className="
rounded-full
bg-green-100
px-4
py-2
text-sm
font-black
text-green-700
">

{status}

</span>

)

}
