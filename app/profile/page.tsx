import DashboardShell from "@/components/layout/DashboardShell";
import EmployeeProfileCard from "@/components/team/EmployeeProfileCard";
import EmployeePerformance from "@/components/team/EmployeePerformance";


export default function Profile(){

return (

<DashboardShell>


<div className="
space-y-8
">


<EmployeeProfileCard/>


<EmployeePerformance/>


</div>


</DashboardShell>

)

}
