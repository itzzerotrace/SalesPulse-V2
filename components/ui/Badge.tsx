interface BadgeProps{
children:React.ReactNode;
type?:"success"|"warning"|"danger"|"default";
}


export default function Badge({
children,
type="default"
}:BadgeProps){


const styles={

success:"bg-green-100 text-green-700",

warning:"bg-yellow-100 text-yellow-700",

danger:"bg-red-100 text-red-700",

default:"bg-slate-100 text-slate-700"

};



return (

<span
className={`
rounded-full
px-3
py-1
text-xs
font-bold
${styles[type]}
`}
>

{children}

</span>

);

}
