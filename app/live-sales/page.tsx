import DashboardShell from "@/components/layout/DashboardShell";
import LiveSalesBoard from "@/components/live/LiveSalesBoard";
import {getUserRole} from "@/lib/auth/getRole";


export default async function LiveSalesPage(){


const role = await getUserRole();



if(
role !== "manager" &&
role !== "regional_manager" &&
role !== "admin"
){

return null;

}



return (

<DashboardShell>

<LiveSalesBoard/>

</DashboardShell>

)

}
