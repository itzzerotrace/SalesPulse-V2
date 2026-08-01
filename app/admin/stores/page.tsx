import DashboardLayout from "@/components/layout/DashboardLayout";

import AdminStoresTable from "@/components/admin/AdminStoresTable";

import {
getAdminStores,
getAdminRegions
} from "@/lib/services/adminStores";



export default async function AdminStoresPage(){


const stores = await getAdminStores();

const regions = await getAdminRegions();



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

Stores

</h1>


<p className="
text-slate-500
">

Create stores and assign regions.

</p>


</div>



<AdminStoresTable

stores={stores}

regions={regions}

/>


</div>


</DashboardLayout>

)

}
