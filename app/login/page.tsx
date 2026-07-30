"use client";

import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/navigation";

import {login} from "@/lib/auth/login";
import {getProfile} from "@/lib/auth/profile";


export default function LoginPage(){

const router=useRouter();


const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const [error,setError]=useState("");

const [loading,setLoading]=useState(false);



async function handleLogin(){


try{

setLoading(true);

setError("");


const user=await login(
email,
password
);


const profile=await getProfile(
user.id
);



if(profile.status!=="approved"){

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


case "regional":

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
bg-slate-50
flex
items-center
justify-center
px-6
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
h-14
w-14
items-center
justify-center
rounded-2xl
bg-purple-600
text-2xl
font-black
text-white
">

S

</div>


<h1 className="
mt-4
text-3xl
font-black
">

SalesPulse

</h1>


<p className="
mt-2
text-slate-500
">

Wireless Retail Performance Platform

</p>


</div>




<div className="
rounded-3xl
border
bg-white
p-8
shadow-xl
">


<h2 className="
text-2xl
font-bold
">

Sign In

</h2>


<div className="
mt-6
space-y-4
">


<input

value={email}

onChange={(e)=>setEmail(e.target.value)}

className="
w-full
rounded-xl
border
px-4
py-3
"

placeholder="Email"

/>


<input

type="password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

className="
w-full
rounded-xl
border
px-4
py-3
"

placeholder="Password"

/>


{error &&

<p className="
text-red-500
font-bold
text-sm
">

{error}

</p>

}



<button

onClick={handleLogin}

disabled={loading}

className="
w-full
rounded-xl
bg-purple-600
py-3
font-bold
text-white
"

>

{loading
?"Signing in..."
:"Sign In"
}

</button>


</div>



<div className="
mt-6
text-center
text-sm
text-slate-500
">

Need an account?{" "}

<Link
href="/register"
className="font-bold text-purple-600"
>

Register

</Link>


</div>


</div>


</div>


</main>

)

}
