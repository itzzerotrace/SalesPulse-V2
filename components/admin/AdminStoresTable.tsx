"use client";


import {useState} from "react";


export default function AdminStoresTable({

stores,

regions

}:{

stores:any[];

regions:any[];

}){


const [name,setName]=useState("");

const [city,setCity]=useState("");

const [region,setRegion]=useState("");

const [message,setMessage]=useState("");



async function createStore(){


await fetch(

"/api/admin/stores/create",

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name,

city,

region_id:region

})

}

);



setMessage(
"Store created"
);


setName("");

setCity("");

setRegion("");



}





return (

<div className="
space-y-8
">


<div className="
rounded-3xl
border
bg-white
p-8
">


<h2 className="
text-2xl
font-black
">

Create Store

</h2>



<div className="
grid
gap-4
md:grid-cols-3
mt-6
">


<input

className="
rounded-xl
border
p-3
"

placeholder="Store Name"

value={name}

onChange={(e)=>setName(e.target.value)}

/>



<input

className="
rounded-xl
border
p-3
"

placeholder="City"

value={city}

onChange={(e)=>setCity(e.target.value)}

/>



<select

className="
rounded-xl
border
p-3
"

value={region}

onChange={(e)=>setRegion(e.target.value)}

>

<option value="">

Select Region

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



</div>




<button

onClick={createStore}

className="
mt-6
rounded-xl
bg-purple-600
px-6
py-3
font-bold
text-white
"

>

Create Store

</button>



<p className="
mt-3
text-green-600
font-bold
">

{message}

</p>


</div>





<div className="
rounded-3xl
border
bg-white
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
Store
</th>

<th className="p-4">
City
</th>

<th className="p-4">
Region
</th>

</tr>

</thead>



<tbody>


{stores.map(store=>(


<tr

key={store.id}

className="
border-t
"


>


<td className="p-4 font-bold">

{store.name}

</td>


<td className="p-4">

{store.city}

</td>


<td className="p-4">

{store.regions?.name || "None"}

</td>


</tr>


))}


</tbody>


</table>


</div>


</div>

)

}
