"use client";

import { logout } from "@/lib/auth/logout";
import { useRouter } from "next/navigation";


export default function LogoutButton(){

const router = useRouter();


async function handleLogout(){

await logout();

router.push("/login");

}


return (

<button

onClick={handleLogout}

className="
rounded-xl
bg-red-500
px-5
py-3
font-bold
text-white
hover:bg-red-600
transition
"

>

Logout

</button>

)

}
