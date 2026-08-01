import Sidebar from "./Sidebar";
import Topbar from "./Topbar";


export default function DashboardShell({

children,

profile

}:{

children:React.ReactNode,

profile?:any

}){


return (

<div className="
flex
min-h-screen
bg-[#F8FAFC]
">


<Sidebar

profile={profile}

/>



<div className="
flex-1
">


<Topbar

profile={profile}

/>



<main className="
p-8
max-w-[1600px]
mx-auto
">

{children}

</main>


</div>


</div>

)

}
