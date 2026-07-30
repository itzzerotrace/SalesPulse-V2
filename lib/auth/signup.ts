import { createClient } from "@/lib/supabase/client";

export async function signUp(
  email: string,
  password: string,
  fullName: string
) {

  const supabase = createClient();


  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });


  if (error) {
    throw error;
  }


  if (!data.user) {
    throw new Error("Account creation failed");
  }


  const { error: profileError } = await supabase
    .from("profiles")
    .insert({
      id: data.user.id,
      full_name: fullName,
      email: email,
      role: "employee",
      status: "pending"
    });


  if (profileError) {
    throw profileError;
  }


  return data.user;

}
