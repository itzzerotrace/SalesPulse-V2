"use client";


import {useState} from "react";



export default function AdminUsersTable({

users,

stores,

regions

}:{

users:any[];

stores:any[];

regions:any[];

}){


const [data,setData]=useState(users);



async function save(user:any){


await fetch(
"/api/admin/users/update",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(user)

}

);


}




function updateUser(

id:string,

field:string,

value:string

){


setData(

data.map(user=>

user.id===id

?

{
...user,
[field]:value
}

:

user

)

);


}





return (

<div className="
rounded-3xl
border
bg-white
shadow-sm
overflow-hidden
">


<table className="
w-full
">


<thead className="
bg-slate-100
">

<tr>

<th className="p-4 text-left">
User
</th>

<th className="p-4">
Role
</th>

<th className="p-4">
Store
</th>

<th className="p-4">
Region
</th>

<th className="p-4">
Action
</th>

</tr>

</thead>



<tbody>


{data.map(user=>(


<tr

key={user.id}

className="
border-t
"

>


<td className="p-4">


<p className="font-bold">

{user.full_name}

</p>


<p className="text-sm text-slate-500">

{user.email}

</p>


</td>




<td className="p-4">


<select

value={user.role || ""}

onChange={(e)=>

updateUser(
user.id,
"role",
e.target.value
)

}

className="
rounded-xl
border
p-2
"

>

<option value="employee">
Employee
</option>

<option value="manager">
Manager
</option>

<option value="regional_manager">
Regional Manager
</option>

<option value="admin">
Admin
</option>


</select>


</td>




<td className="p-4">


<select

value={user.store_id || ""}

onChange={(e)=>

updateUser(
user.id,
"store_id",
e.target.value
)

}

className="
rounded-xl
border
p-2
"

>


<option value="">
No Store
</option>


{stores.map(store=>(

<option

key={store.id}

value={store.id}

>

{store.name}

</option>

))}


</select>


</td>




<td className="p-4">


<select

value={user.region_id || ""}

onChange={(e)=>

updateUser(
user.id,
"region_id",
e.target.value
)

}

className="
rounded-xl
border
p-2
"

>


<option value="">
No Region
</option>


{regions.map(region=>(

<option

key={region.id}

value={region.id}

>

{region.name}

</option>

))}


</select>


</td>




<td className="p-4">


<button

onClick={()=>save(user.id)}

className="
rounded-xl
bg-purple-600
px-4
py-2
font-bold
text-white
"

>

Save

</button>


</td>



</tr>


))}


</tbody>


</table>


</div>

)

}
