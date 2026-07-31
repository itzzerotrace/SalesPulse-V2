"use client";

import RoleGate from "./RoleGate";


export default function RoleTest(){

return (

<div>

<RoleGate
allowedRoles={[
"manager",
"regional",
"admin"
]}
>

<div className="
rounded-xl
bg-green-100
p-4
font-bold
">

Manager Access Granted

</div>


</RoleGate>


</div>

)

}
