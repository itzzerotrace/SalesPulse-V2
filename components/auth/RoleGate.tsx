"use client";


import {
useEffect,
useState
} from "react";


import {
createClient
} from "@/lib/supabase/client";



interface Props{

allowedRoles:string[];

children:React.ReactNode;

}



export default function RoleGate({

allowedRoles,

children

}:Props){


const [allowed,setAllowed]=useState(false);

const [loading,setLoading]=useState(true);



useEffect(()=>{


async function loadRole(){


const supabase=createClient();


const {

data:{
user

}

}=await supabase.auth.getUser();



if(!user){

setLoading(false);

return;

}



const {

data:profile

}=await supabase

.from("profiles")

.select("role")

.eq("id",user.id)

.single();



setAllowed(

!!profile &&

allowedRoles.includes(profile.role)

);



setLoading(false);


}



loadRole();


},[allowedRoles]);



if(loading){

return null;

}


if(!allowed){

return null;

}



return children;


}
