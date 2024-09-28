"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Spinner from "../Spinner";
import { signup } from "@/app/login/action";

const signupSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[@$!%*?&#%]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SignupCard = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    loggingIn?: string;
  }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userSignedUp, setUserSignedUp] = useState<boolean>(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async () => {
    const result = signupSchema.safeParse({ email, password, confirmPassword });

    if (!result.success) {
      const errorMessages = result.error.format();
      setErrors({
        email: errorMessages.email?._errors[0],
        password: errorMessages.password?._errors[0],
        confirmPassword: errorMessages.confirmPassword?._errors[0],
      });
    } else {
      setIsLoading(true);
      setErrors({});

      try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        await signup(formData);
      } catch (error) {
        setErrors({ loggingIn: "Something went wrong. Please try again" });
      }
    }
  };

  useEffect(() => {
    const checkUserSignedUp = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const user = data.session?.user;
        if (user) {
          setUserSignedUp(true);
        }
      } catch (error) {
        setUserSignedUp(false);
      }
    };

    checkUserSignedUp();
  }, [supabase.auth]);

  useEffect(() => {
    if (userSignedUp) {
      router.push("/dashboard");
    }
  }, [userSignedUp, router]);

  return (
    <div className="h-screen flex items-center justify-center py-12 dark bg-background text-foreground">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-balance text-muted-foreground">
            Enter your information to create an account
          </p>
        </div>
        <form>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="confirm_password">Confirm Password</Label>
              </div>
              <Input
                id="confirm_password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>
            <Button
              type="submit"
              className={`w-full ${isLoading ? "pointer-events-none" : ""}`}
              formAction={handleSubmit}
            >
              {isLoading ? <Spinner /> : "Sign up"}
            </Button>
            {errors.loggingIn && (
              <p className="text-red-500 text-sm text-center">
                {errors.loggingIn}
              </p>
            )}
            {/* <Button variant="outline" className="w-full">
            Sign up with Google
          </Button> */}
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupCard;
