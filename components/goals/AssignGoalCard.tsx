"use client";

import {useEffect,useState} from "react";

import {
getStoreEmployees,
getEmployeeGoal,
saveEmployeeGoal
} from "@/lib/services/managerGoals";


const fields=[

{
key:"gp_goal",
label:"💰 Gross Profit Goal",
prefix:"$"
},

{
key:"voice_goal",
label:"📱 Voice Goal"
},

{
key:"mim_goal",
label:"🔄 MiM Goal"
},

{
key:"upgrade_goal",
label:"⬆️ Upgrade Goal"
},

{
key:"hsi_goal",
label:"🌐 HSI Goal"
},

{
key:"bts_goal",
label:"📡 BTS Goal"
},

{
key:"accessory_goal",
label:"🎧 Accessories Goal",
prefix:"$"
}

];



export default function AssignGoalCard({

onEmployeeChange

}:{

onEmployeeChange?:(id:string)=>void

}){


const [employees,setEmployees]=useState<any[]>([]);

const [employee,setEmployee]=useState("");

const [selectedEmployee,setSelectedEmployee]=useState<any>(null);

const [message,setMessage]=useState("");



const [form,setForm]=useState<any>({

gp_goal:0,

voice_goal:0,

mim_goal:0,

upgrade_goal:0,

hsi_goal:0,

bts_goal:0,

accessory_goal:0

});



const month = new Date().toLocaleString(
"en-US",
{
month:"long"
}
);


const year = new Date().getFullYear();




useEffect(()=>{


getStoreEmployees()

.then(setEmployees)

.catch(console.error);


},[]);





async function selectEmployee(id:string){


setEmployee(id);



const selected = employees.find(
(e)=>e.id===id
);


setSelectedEmployee(selected || null);



if(onEmployeeChange){

onEmployeeChange(id);

}




const goal = await getEmployeeGoal(

id,

month,

year

);




setForm({

gp_goal:goal?.gp_goal || 0,

voice_goal:goal?.voice_goal || 0,

mim_goal:goal?.mim_goal || 0,

upgrade_goal:goal?.upgrade_goal || 0,

hsi_goal:goal?.hsi_goal || 0,

bts_goal:goal?.bts_goal || 0,

accessory_goal:goal?.accessory_goal || 0

});


}





function updateField(

key:string,

value:string

){


setForm({

...form,

[key]:Number(value)

});


}




async function save(){


if(!selectedEmployee){

setMessage(
"Select employee first"
);

return;

}



try{


await saveEmployeeGoal({

employee_id:selectedEmployee.id,

employee_name:selectedEmployee.full_name,

month,

year,

...form

});



setMessage(
"Goals saved successfully"
);


}

catch(error){

console.error(error);

setMessage(
"Error saving goals"
);

}


}




return (

<div className="
rounded-3xl
border
bg-white
p-8
shadow-sm
">


<h2 className="
text-2xl
font-black
">

Assign Team Goals

</h2>



<p className="
mt-2
text-slate-500
">

Create and edit monthly targets for employees.

</p>





<select

className="
mt-6
w-full
rounded-xl
border
p-4
"

value={employee}

onChange={(e)=>
selectEmployee(e.target.value)
}

>


<option value="">

Select Employee

</option>



{employees.map((employee)=>(


<option

key={employee.id}

value={employee.id}

>

{employee.full_name}

</option>


))}


</select>





{selectedEmployee && (

<div className="
mt-6
rounded-2xl
bg-purple-50
p-5
">

<p className="
text-sm
font-bold
text-purple-600
">

EDITING GOALS FOR

</p>


<h3 className="
text-2xl
font-black
">

{selectedEmployee.full_name}

</h3>


<p className="
text-slate-500
">

{selectedEmployee.role}

</p>


</div>

)}





<div className="
mt-8
grid
gap-5
md:grid-cols-2
">



{fields.map((field)=>(


<div key={field.key}>


<label className="
mb-2
block
font-bold
text-slate-700
">

{field.label}

</label>



<div className="
flex
items-center
rounded-xl
border
">


{field.prefix && (

<span className="
pl-4
font-bold
text-slate-500
">

{field.prefix}

</span>

)}



<input

className="
w-full
rounded-xl
p-4
outline-none
"

type="number"

value={form[field.key]}

onChange={(e)=>

updateField(
field.key,
e.target.value
)

}

/>


</div>


</div>


))}



</div>





<button

onClick={save}

className="
mt-8
rounded-xl
bg-purple-600
px-8
py-3
font-black
text-white
"

>

Save Goals

</button>




<p className="
mt-4
font-bold
text-green-600
">

{message}

</p>


</div>

)

}
