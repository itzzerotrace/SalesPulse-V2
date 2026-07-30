import DashboardShell from "@/components/layout/DashboardShell";
import LogoutButton from "@/components/auth/LogoutButton";

import SettingsCard from "@/components/settings/SettingsCard";
import ProfileSettings from "@/components/settings/ProfileSettings";
import Preferences from "@/components/settings/Preferences";


export default function SettingsPage(){


return (

<DashboardShell>


<div className="
space-y-8
">


<div>

<h1 className="
text-4xl
font-black
">

Settings

</h1>


<p className="
mt-2
text-slate-500
">

Manage your SalesPulse account.

</p>


</div>



<div className="
grid
gap-6
lg:grid-cols-2
">


<SettingsCard title="Profile">

<ProfileSettings/>

</SettingsCard>




<SettingsCard title="Preferences">

<Preferences/>

</SettingsCard>



<SettingsCard title="Account">

<div className="
space-y-4
">


<p className="
text-slate-500
">

Manage your account access.

</p>


<LogoutButton/>


</div>


</SettingsCard>



</div>


</div>


</DashboardShell>

)

}
