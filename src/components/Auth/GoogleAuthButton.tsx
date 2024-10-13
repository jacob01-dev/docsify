// components/GoogleSignInButton.tsx
"use client";

import { signInWithGoogle } from "@/app/login/action";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";

export default function GoogleSignInButton() {
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Google sign in error:", error);
    }
  };

  return (
    <Button
      onClick={() => handleGoogleSignIn()}
      className="w-full flex items-center justify-center gap-2 -mt-2"
    >
      <FaGoogle /> Continue with Google
    </Button>
  );
}
