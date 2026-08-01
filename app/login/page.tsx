"use client";

import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/navigation";

import {login} from "@/lib/auth/login";
import {getProfile} from "@/lib/auth/profile";


export default function LoginPage(){

const router = useRouter();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [error,setError] = useState("");
const [loading,setLoading] = useState(false);



async function handleLogin(){

try{

setLoading(true);
setError("");


const user = await login(
email,
password
);


const profile = await getProfile(
user.id
);



if(profile.status !== "approved"){

throw new Error(
"Account pending approval"
);

}



switch(profile.role){

case "admin":

router.push("/admin/dashboard");

break;


case "manager":

router.push("/dashboard/manager");

break;


case "regional_manager":

router.push("/dashboard/regional");

break;


default:

router.push("/dashboard/employee");

}


}

catch(err:any){

setError(err.message);

}

finally{

setLoading(false);

}

}



return (

<main className="
min-h-screen
bg-slate-100
flex
items-center
justify-center
px-4
py-8
">


<div className="
w-full
max-w-md
">


<div className="
text-center
mb-8
">


<div className="
mx-auto
flex
h-16
w-16
items-center
justify-center
rounded-2xl
bg-purple-600
text-3xl
font-black
text-white
">

S

</div>


<h1 className="
mt-5
text-4xl
font-black
text-gray-900
">

SalesPulse

</h1>


<p className="
mt-2
text-base
font-semibold
text-gray-700
">

Wireless Retail Performance Platform

</p>


</div>





<div className="
rounded-3xl
border
border-gray-200
bg-white
p-6
sm:p-8
shadow-xl
">


<h2 className="
text-2xl
font-black
text-gray-900
">

Sign In

</h2>



<p className="
mt-2
text-sm
font-medium
text-gray-600
">

Access your sales dashboard

</p>





<div className="
mt-6
space-y-5
">



<div>

<label className="
mb-2
block
text-sm
font-bold
text-gray-900
">

Email

</label>


<input

value={email}

onChange={(e)=>setEmail(e.target.value)}

className="
w-full
rounded-xl
border
border-gray-300
bg-white
px-4
py-3
text-gray-900
placeholder:text-gray-500
focus:border-purple-600
focus:outline-none
focus:ring-2
focus:ring-purple-200
"

placeholder="Enter email"

/>

</div>




<div>

<label className="
mb-2
block
text-sm
font-bold
text-gray-900
">

Password

</label>


<input

type="password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

className="
w-full
rounded-xl
border
border-gray-300
bg-white
px-4
py-3
text-gray-900
placeholder:text-gray-500
focus:border-purple-600
focus:outline-none
focus:ring-2
focus:ring-purple-200
"

placeholder="Enter password"

/>

</div>





{error &&

<div className="
rounded-xl
bg-red-50
p-3
text-sm
font-bold
text-red-700
">

{error}

</div>

}






<button

onClick={handleLogin}

disabled={loading}

className="
w-full
rounded-xl
bg-purple-600
py-4
font-black
text-white
transition
hover:bg-purple-700
disabled:opacity-50
"

>

{

loading

?

"Signing in..."

:

"Sign In"

}

</button>




</div>





<div className="
mt-6
text-center
text-sm
font-semibold
text-gray-700
">

Need an account?{" "}


<Link

href="/register"

className="
font-black
text-purple-600
"

>

Register

</Link>


</div>



</div>


</div>


</main>

)

}
