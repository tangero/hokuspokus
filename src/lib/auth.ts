import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
  if (error) throw error;
};

export const signInWithPassword = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
};

export const signUp = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        email,
      },
    },
  });

  if (error) {
    console.error("Signup error:", error);
    throw error;
  }

  if (!data?.user) {
    console.error("No user data returned");
    throw new Error("No user data returned");
  }

  // Create user profile
  const { error: profileError } = await supabase.from("user_profiles").insert({
    id: data.user.id,
    first_name: firstName,
    last_name: lastName,
    email,
  });

  if (profileError) {
    console.error("Profile creation error:", profileError);
    throw profileError;
  }

  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
