import DashboardLayout from "@/components/layout/DashboardLayout";

import AdminUsersTable from "@/components/admin/AdminUsersTable";

import {
getAdminUsers,
getStores,
getRegions
} from "@/lib/services/adminUsers";



export default async function AdminUsersPage(){


const users = await getAdminUsers();

const stores = await getStores();

const regions = await getRegions();



return (

<DashboardLayout>


<div className="
space-y-8
">


<div>

<p className="
text-purple-600
font-bold
">

ADMIN MANAGEMENT

</p>


<h1 className="
text-4xl
font-black
">

Users & Permissions

</h1>


<p className="
text-slate-500
mt-2
">

Manage employees, managers, regional managers, and stores.

</p>


</div>




<AdminUsersTable

users={users}

stores={stores}

regions={regions}

/>



</div>


</DashboardLayout>

)

}
