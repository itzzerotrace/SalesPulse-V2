interface ActionButtonProps{

children:React.ReactNode;

}


export default function ActionButton({
children
}:ActionButtonProps){


return (

<button className="
rounded-2xl
bg-gradient-to-r
from-purple-600
to-indigo-600
px-6
py-4
font-black
text-white
shadow-lg
shadow-purple-200
hover:scale-105
transition
">

{children}

</button>

);

}
