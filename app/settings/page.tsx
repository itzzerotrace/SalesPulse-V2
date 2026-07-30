import DashboardShell from "@/components/layout/DashboardShell";
import LogoutButton from "@/components/auth/LogoutButton";


export default function SettingsPage(){


return (

<DashboardShell>


<div className="space-y-8">


<div>

<h1 className="
text-4xl
font-black
">

Settings

</h1>


<p className="
text-slate-500
mt-2
">

Manage your account preferences.

</p>


</div>



<div className="
rounded-3xl
border
bg-white
p-8
">


<h2 className="
text-xl
font-black
">

Account

</h2>


<p className="
mt-3
text-slate-500
">

Profile settings will appear here.

</p>


<div className="mt-6">

<LogoutButton/>

</div>


</div>


</div>


</DashboardShell>

)

}
