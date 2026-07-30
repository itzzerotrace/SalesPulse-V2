import RankBadge from "./RankBadge";
import PerformanceBadge from "./PerformanceBadge";


interface Props{
rank:number;
name:string;
score:string;
}


export default function EmployeeRankingCard({
rank,
name,
score
}:Props){


return (

<div className="
flex
items-center
justify-between
rounded-3xl
border
bg-white
p-6
shadow-sm
">


<div className="
flex
items-center
gap-5
">


<RankBadge rank={rank}/>


<div>

<h3 className="
font-black
text-lg
">

{name}

</h3>


<PerformanceBadge label="Top Performer"/>


</div>


</div>


<div className="
text-3xl
font-black
text-purple-600
">

{score}

</div>


</div>

)

}
