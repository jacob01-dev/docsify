"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
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
    },
  });

  if (error) {
    redirect("/signup");
  }

  // Create initial records after successful signup
  if (authData.user) {
    const userId = authData.user.id;

    // Create initial subscription record
    const { error: subscriptionError } = await supabase
      .from("subscriptions")
      .insert({
        user_id: userId,
        stripe_subscription_id: null,
        status: "inactive", // Set to inactive
        price_id: null,
        product_id: null,
        current_period_start: null,
        current_period_end: null,
      });

    if (subscriptionError) {
      console.error(
        "Error creating initial subscription record:",
        subscriptionError
      );
      // Consider how you want to handle this error (e.g., log it, show a message to the user)
    }

    // Create initial question usage record
    const { error: usageError } = await supabase.from("question_usage").insert({
      user_id: userId,
      questions_remaining: 0,
      reset_date: null,
    });

    if (usageError) {
      console.error(
        "Error creating initial question usage record:",
        usageError
      );
    }
  }

  revalidatePath("/", "layout");
  redirect("/login?e=true");
}
