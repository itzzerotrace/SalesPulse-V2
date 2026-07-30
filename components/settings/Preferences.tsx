"use client";


import {useState} from "react";


export default function Preferences(){


const [notifications,setNotifications]=useState(true);



return (

<div className="
space-y-6
">


<div className="
flex
justify-between
items-center
">


<div>

<p className="
font-bold
">

Notifications

</p>


<p className="
text-sm
text-slate-500
">

Receive sales alerts

</p>


</div>



<button

onClick={()=>setNotifications(!notifications)}

className={`
rounded-full
px-5
py-2
font-bold
text-white
${notifications
?"bg-green-500"
:"bg-slate-400"}
`}

>

{notifications
?"ON"
:"OFF"
}

</button>


</div>


</div>

)

}
