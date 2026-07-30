import DashboardShell from "@/components/layout/DashboardShell";
import TeamHeader from "@/components/team/TeamHeader";
import TeamMemberCard from "@/components/team/TeamMemberCard";


export default function TeamPage(){

return (

<DashboardShell>


<div className="space-y-8">


<TeamHeader/>


<div className="
grid
gap-6
md:grid-cols-3
">


<TeamMemberCard
name="Bryce"
role="Sales Associate"
/>


<TeamMemberCard
name="Sarah"
role="Sales Associate"
/>


<TeamMemberCard
name="Mike"
role="Sales Associate"
/>


</div>


</div>


</DashboardShell>

)

}
