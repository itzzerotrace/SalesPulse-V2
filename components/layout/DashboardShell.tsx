import Sidebar from "./Sidebar";
import Topbar from "./Topbar";


export default function DashboardShell({
children,
}:{
children:React.ReactNode;
}){


return (

<div className="flex min-h-screen bg-slate-50">


<Sidebar/>


<div className="flex-1">

<Topbar/>


<main className="p-8">

{children}

</main>


</div>


</div>

);

}
