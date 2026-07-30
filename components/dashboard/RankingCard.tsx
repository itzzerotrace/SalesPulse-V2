interface RankingCardProps {
rank:number;
name:string;
}


export default function RankingCard({
rank,
name
}:RankingCardProps){


return (

<div className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
">


<p className="text-sm text-slate-500">
Store Ranking
</p>


<div className="mt-3 flex items-center gap-4">


<div className="
flex
h-14
w-14
items-center
justify-center
rounded-2xl
bg-purple-100
text-2xl
font-black
text-purple-700
">

#{rank}

</div>


<div>

<h2 className="font-black text-xl">
{name}
</h2>


<p className="text-sm text-slate-500">
Current position
</p>


</div>


</div>


</div>

);

}
