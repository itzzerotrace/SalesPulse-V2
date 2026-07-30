import DashboardShell from "@/components/layout/DashboardShell";
import TeamHeader from "@/components/team/TeamHeader";
import TeamMemberCard from "@/components/team/TeamMemberCard";


export default function TeamPage(){

return (

<DashboardShell>


<div className="
space-y-8
">


<TeamHeader/>


<div className="
rounded-3xl
bg-purple-600
p-8
text-white
">


<h2 className="
text-3xl
font-black
">

El Dorado

</h2>


<p className="
mt-2
opacity-80
">

3 Employees

</p>


</div>



<div className="
grid
gap-6
md:grid-cols-3
">


<TeamMemberCard
name="Bryce"
role="Manager"
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
