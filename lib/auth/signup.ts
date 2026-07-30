import { createClient } from "@/lib/supabase/client";

export async function signUp(
  email: string,
  password: string,
  fullName: string,
  role: string
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
    throw new Error("User creation failed");
  }


  const { error: profileError } = await supabase
    .from("profiles")
    .insert({
      id: data.user.id,
      email,
      full_name: fullName,
      role,
    });


  if (profileError) {
    throw profileError;
  }


  return data.user;
}
