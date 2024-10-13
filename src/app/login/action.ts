"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

// Existing login schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&]/, {
      message: "Password must contain at least one special character",
    }),
});

// Regular email/password login
export async function login(formData: FormData) {
  const supabase = createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    throw new Error(error.message || "Something went wrong during login.");
  }
  revalidatePath("/", "layout");
  redirect("/dashboard");
}

// Google sign in
export async function signInWithGoogle() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo:
        process.env.NEXT_PUBLIC_PRODUCTION === "true"
          ? `https://www.docsify.tech/auth/callback`
          : "http://localhost:3000/auth/callback",
    },
  });

  if (data.url) redirect(data.url);
}

// Regular email/password signup
export async function signup(formData: FormData) {
  const supabase = createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = loginSchema.safeParse(data);
  if (!result.success) {
    redirect("/signup");
  }

  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        plan: "free",
      },
      emailRedirectTo: "https://www.docsify.tech/login",
    },
  });

  console.log(error);

  if (error) {
    redirect("/signup");
  }

  revalidatePath("/", "layout");
  redirect("/login?e=true");
}

// Google signup (will be called after OAuth callback)
