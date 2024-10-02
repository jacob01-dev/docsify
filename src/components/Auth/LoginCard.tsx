"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Spinner from "../Spinner";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import PasswordInput from "./PasswordInput";
import { login } from "@/app/login/action";
import { createClient } from "@/utils/supabase/client";
import { useSearchParams } from "next/navigation";
import { useToast } from "../ui/use-toast";

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

const LoginCard = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const [isVerificationEmailSent, setIsVerificationEmailSent] =
    useState<boolean>(searchParams.get("e") === "true" ? true : false);

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    loggingIn?: string;
  }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const supabase = createClient();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const errorMessages = result.error.format();
      setErrors({
        email: errorMessages.email?._errors[0],
        password: errorMessages.password?._errors[0],
      });
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      await login(formData);
      setUserLoggedIn(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong during login.";
      setErrors({ loggingIn: errorMessage });
      toast({
        title: "Login failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const user = data.session?.user;
        if (user) {
          setUserLoggedIn(true);
        }
      } catch (error) {
        setUserLoggedIn(false);
      }
    };

    checkUserLoggedIn();
  }, [supabase.auth]);

  useEffect(() => {
    if (userLoggedIn) router.push("/dashboard");
  }, [userLoggedIn, router]);

  return (
    <div className="h-screen flex items-center justify-center py-12 dark bg-background text-foreground">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="john@example.com"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <PasswordInput
                password={password}
                setPassword={setPassword}
                name="password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            {isVerificationEmailSent && (
              <p className="text-xs text-center text-muted-foreground">
                Please check your email to verify your account.
              </p>
            )}
            <Button
              className={`w-full ${isLoading ? "pointer-events-none" : ""}`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Log in"}
            </Button>
            {/* <Button variant="outline" className="w-full">
            Login with Google
          </Button> */}
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LoginCard;
