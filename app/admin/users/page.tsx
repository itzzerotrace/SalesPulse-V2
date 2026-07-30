"use client";

import {useEffect,useState} from "react";
import {getPendingUsers,approveUser} from "@/lib/admin/users";


export default function AdminUsers(){

const [users,setUsers]=useState<any[]>([]);


async function load(){

const data=await getPendingUsers();

setUsers(data);

}


useEffect(()=>{
load();
},[]);



async function approve(
id:string,
role:string
){

await approveUser(
id,
role
);

load();

}



return (

<main className="min-h-screen bg-slate-50 p-8">

<h1 className="text-4xl font-black">
Pending User Approvals
</h1>


<div className="mt-8 space-y-4">


{users.map((user)=>(


<div
key={user.id}
className="bg-white rounded-2xl border p-6 shadow"
>


<h2 className="text-xl font-bold">
{user.full_name}
</h2>


<p className="text-slate-500">
{user.email}
</p>



<div className="flex gap-3 mt-5">


<button
onClick={()=>approve(user.id,"employee")}
className="bg-purple-600 text-white px-5 py-2 rounded-xl"
>
Approve Employee
</button>



<button
onClick={()=>approve(user.id,"manager")}
className="bg-blue-600 text-white px-5 py-2 rounded-xl"
>
Approve Manager
</button>



<button
onClick={()=>approve(user.id,"regional")}
className="bg-green-600 text-white px-5 py-2 rounded-xl"
>
Approve Regional
</button>



</div>


</div>


))}


</div>


</main>

);

}
