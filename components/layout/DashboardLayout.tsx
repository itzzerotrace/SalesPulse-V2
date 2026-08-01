import DashboardShell from "./DashboardShell";
import {getUserProfile} from "@/lib/auth/userProfile";


export default async function DashboardLayout({

children

}:{

children:React.ReactNode

}){


const profile = await getUserProfile();



return (

<DashboardShell

profile={profile}

>

{children}

</DashboardShell>

)

}
