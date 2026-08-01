import {getUserContext} from "@/lib/auth/userContext";


export async function getUserProfile(){


const context = await getUserContext();


if(!context?.profile){

return null;

}



return {

name: context.profile.full_name || "User",

role: context.profile.role || "",

store: context.profile.store?.name || "",

region: context.profile.region?.name || "",

city: context.profile.store?.city || ""


};


}
