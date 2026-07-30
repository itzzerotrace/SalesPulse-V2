"use client";

import { useState } from "react";
import { signUp } from "@/lib/auth/signup";
import { useRouter } from "next/navigation";


export default function RegisterPage(){

const router = useRouter();

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [message,setMessage] = useState("");



async function handleSignup(){

try{

await signUp(
 email,
 password,
 name
);


setMessage(
"Account created. Waiting for admin approval."
);


setTimeout(()=>{
 router.push("/login");
},2000);


}catch(error:any){

setMessage(error.message);

}

}



return (

<main className="min-h-screen bg-slate-50 flex items-center justify-center">


<div className="bg-white border rounded-3xl shadow-xl p-8 w-full max-w-md">


<h1 className="text-3xl font-black">
Request Access
</h1>


<p className="text-slate-500 mt-2">
Your account will be reviewed by an administrator.
</p>


<div className="mt-6 space-y-4">


<input
className="w-full border rounded-xl p-3"
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>


<input
className="w-full border rounded-xl p-3"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>


<input
type="password"
className="w-full border rounded-xl p-3"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>


<button
onClick={handleSignup}
className="w-full bg-purple-600 text-white rounded-xl p-3 font-bold"
>
Create Account
</button>


{message && (
<p className="text-sm text-center mt-3">
{message}
</p>
)}


</div>


</div>


</main>

);

}
