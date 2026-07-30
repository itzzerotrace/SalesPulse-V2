import Sidebar from "./Sidebar";
import Topbar from "./Topbar";


export default function DashboardShell({
children
}:{
children:React.ReactNode
}){


return (

<div className="
flex
min-h-screen
bg-[#F8FAFC]
">


<Sidebar/>


<div className="
flex-1
">


<Topbar/>


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
