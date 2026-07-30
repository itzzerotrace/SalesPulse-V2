import DashboardShell from "@/components/layout/DashboardShell";
import StoreRankingCard from "@/components/leaderboard/StoreRankingCard";


export default function StoreLeaderboard(){

return (

<DashboardShell>


<div className="space-y-8">


<h1 className="
text-4xl
font-black
">

Store Rankings

</h1>



<StoreRankingCard
rank={1}
store="El Dorado"
/>


<StoreRankingCard
rank={2}
store="Stockton"
/>


<StoreRankingCard
rank={3}
store="Sacramento"
/>


</div>


</DashboardShell>

)

}
