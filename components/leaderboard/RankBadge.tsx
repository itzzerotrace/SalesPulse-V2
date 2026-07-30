interface Props{
rank:number;
}


export default function RankBadge({
rank
}:Props){


return (

<div className={`
h-12
w-12
rounded-2xl
flex
items-center
justify-center
font-black
text-lg
${rank===1
?"bg-yellow-100 text-yellow-700"
:rank===2
?"bg-slate-100 text-slate-700"
:"bg-orange-100 text-orange-700"}
`}>

#{rank}

</div>

)

}
