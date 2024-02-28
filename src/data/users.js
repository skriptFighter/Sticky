import supabase from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error);
  return data;
}

export async function signUp({ email, password }) {
  const { data: authUser, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw new Error(authError);

  const { data, error } = await supabase
    .from("users")
    .insert([{ user_id: authUser.user.id }])
    .select();

  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not authenticated");
  }
  return user;
}