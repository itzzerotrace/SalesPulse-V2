import DashboardShell from "@/components/layout/DashboardShell";
import MetricCard from "@/components/dashboard/MetricCard";


export default function AdminDashboard(){

return (

<DashboardShell>


<div className="space-y-8">


<section>

<p className="text-sm font-bold text-purple-600">
ADMIN CENTER
</p>


<h1 className="mt-2 text-4xl font-black text-slate-900">
SalesPulse Command Center
</h1>


<p className="mt-2 text-lg text-slate-500">
Manage users, stores, permissions, and company performance.
</p>


</section>





<section className="grid gap-6 md:grid-cols-4">


<MetricCard
title="Total Users"
value="--"
subtitle="Employees and leaders"
/>


<MetricCard
title="Pending Approvals"
value="--"
subtitle="Needs review"
/>


<MetricCard
title="Active Stores"
value="1"
subtitle="Locations"
/>


<MetricCard
title="Regions"
value="--"
subtitle="Company coverage"
/>


</section>





<section className="grid gap-6 lg:grid-cols-2">


<div className="
rounded-3xl
border
border-slate-200
bg-white
p-8
shadow-sm
">


<div className="flex items-center justify-between">


<div>

<h2 className="text-2xl font-black">
User Management
</h2>


<p className="mt-2 text-slate-500">
Review and approve new users.
</p>


</div>


<a
href="/admin/users"
className="
rounded-xl
bg-purple-600
px-5
py-3
font-bold
text-white
"
>
Manage Users
</a>


</div>


<div className="
mt-6
rounded-2xl
bg-slate-50
p-5
">


<p className="font-bold">
Pending approvals
</p>


<p className="mt-1 text-sm text-slate-500">
New accounts waiting for approval.
</p>


</div>


</div>





<div className="
rounded-3xl
border
border-slate-200
bg-white
p-8
shadow-sm
">


<div className="flex items-center justify-between">


<div>

<h2 className="text-2xl font-black">
Store Management
</h2>


<p className="mt-2 text-slate-500">
Manage locations and teams.
</p>


</div>


<a
href="/admin/stores"
className="
rounded-xl
bg-purple-600
px-5
py-3
font-bold
text-white
"
>
Manage Stores
</a>


</div>



<div className="
mt-6
rounded-2xl
bg-slate-50
p-5
">


<p className="font-bold">
El Dorado
</p>


<p className="mt-1 text-sm text-slate-500">
Stockton location
</p>


</div>


</div>


</section>





<section className="
rounded-3xl
border
border-slate-200
bg-white
p-8
shadow-sm
">


<h2 className="text-2xl font-black">
Recent Activity
</h2>


<p className="mt-2 text-slate-500">
System changes and important events.
</p>



<div className="
mt-6
space-y-3
">


<div className="
rounded-2xl
bg-slate-50
p-5
">

User approval activity will appear here.

</div>


<div className="
rounded-2xl
bg-slate-50
p-5
">

Store updates will appear here.

</div>


</div>


</section>




</div>


</DashboardShell>

);

}
