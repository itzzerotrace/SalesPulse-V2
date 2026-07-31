"use client";

import {useEffect,useState} from "react";

import {
getPendingUsers,
approveUser
} from "@/lib/admin/users";

import {
getStores
} from "@/lib/services/storesClient";



export default function AdminUsers(){


const [users,setUsers]=useState<any[]>([]);

const [stores,setStores]=useState<any[]>([]);



async function load(){


const pending =
await getPendingUsers();


setUsers(pending);



const storeList =
await getStores();


setStores(storeList);


}



useEffect(()=>{

load();

},[]);




async function approve(

id:string,

role:string,

store_id:string

){


await approveUser(

id,

role,

store_id

);


load();


}



return (

<main className="
min-h-screen
bg-slate-50
p-8
">


<h1 className="
text-4xl
font-black
">

Pending User Approvals

</h1>



<div className="
mt-8
space-y-5
">


{
users.map((user)=>(


<UserCard

key={user.id}

user={user}

stores={stores}

approve={approve}

/>


))
}


</div>


</main>

)

}




function UserCard({

user,

stores,

approve

}:any){


const [store,setStore]=useState("");



return (

<div className="
bg-white
rounded-2xl
border
p-6
shadow
">


<h2 className="
text-xl
font-bold
">

{user.full_name}

</h2>


<p className="
text-slate-500
">

{user.email}

</p>



<select

value={store}

onChange={(e)=>setStore(e.target.value)}

className="
mt-4
border
rounded-xl
p-2
"

>


<option value="">

Select Store

</option>


{
stores.map((s:any)=>(


<option

key={s.id}

value={s.id}

>

{s.name}

</option>


))
}


</select>



<div className="
flex
gap-3
mt-5
flex-wrap
">


<button

onClick={()=>approve(
user.id,
"employee",
store
)}

className="
bg-purple-600
text-white
px-5
py-2
rounded-xl
"

>

Employee

</button>



<button

onClick={()=>approve(
user.id,
"manager",
store
)}

className="
bg-blue-600
text-white
px-5
py-2
rounded-xl
"

>

Manager

</button>



<button

onClick={()=>approve(
user.id,
"regional_manager",
store
)}

className="
bg-green-600
text-white
px-5
py-2
rounded-xl
"

>

Regional Manager

</button>



</div>


</div>

)

}
