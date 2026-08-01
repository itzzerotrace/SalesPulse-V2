import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileMenu from "./MobileMenu";


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


<header className="
flex
items-center
border-b
bg-white
px-4
lg:hidden
">


<MobileMenu

profile={profile}

/>


<div className="
ml-3
text-xl
font-black
text-slate-900
">

SalesPulse

</div>


</header>




<Topbar

profile={profile}

/>



<main className="
p-4
sm:p-6
lg:p-8
max-w-[1600px]
mx-auto
">

{children}

</main>


</div>


</div>

)

}
