import RankBadge from "./RankBadge";


interface Props{
rank:number;
store:string;
}


export default function StoreRankingCard({
rank,
store
}:Props){


return (

<div className="
flex
items-center
gap-5
rounded-3xl
border
bg-white
p-6
shadow-sm
">


<RankBadge rank={rank}/>


<div>

<h3 className="
font-black
text-xl
">

{store}

</h3>


<p className="
text-sm
text-slate-500
">

Store performance

</p>


</div>


</div>

)

}
