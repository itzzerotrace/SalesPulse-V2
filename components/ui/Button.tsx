interface ButtonProps {
children:React.ReactNode;
className?:string;
}


export default function Button({
children,
className=""
}:ButtonProps){


return (

<button

className={`
rounded-xl
bg-gradient-to-r
from-purple-600
to-indigo-600
px-6
py-3
font-bold
text-white
shadow-lg
shadow-purple-200
transition
hover:scale-[1.02]
${className}
`}

>

{children}

</button>

);

}
