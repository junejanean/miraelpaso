"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User } from "lucide-react"; // Keeping User as there's no custom equivalent
import { CustomIcon } from "@/components/ui/custom-icon";
import AuthPopover from "@/components/auth/AuthPopover";
import { useEffect } from "react";
import Head from "next/head";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Add custom styles to override browser autofill background
  useEffect(() => {
    // This injects a style tag to override the autofill background color
    const style = document.createElement('style');
    style.innerHTML = `
      input:-webkit-autofill,
      input:-webkit-autofill:hover, 
      input:-webkit-autofill:focus, 
      input:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px #7ED957 inset !important;
        -webkit-text-fill-color: black !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setIsLoading(false);
        return;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mira-beige">
      <AuthPopover title="LOG IN">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <div className="relative">
            <div className="flex items-center border-b-4 border-black pb-2">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="block w-full bg-mira-green border-none focus:outline-none font-source-code normal-case placeholder:text-black placeholder:font-bold placeholder:uppercase"
                placeholder="USERNAME"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <User className="h-6 w-6 text-black ml-2 stroke-2" />
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center border-b-4 border-black pb-2">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="block w-full bg-mira-green border-none focus:outline-none font-source-code normal-case placeholder:text-black placeholder:font-bold placeholder:uppercase"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1"
              >
                {showPassword ? (
                  <CustomIcon name="notvisible" size={24} className="text-black" />
                ) : (
                  <CustomIcon name="eye" size={24} className="text-black" />
                )}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black uppercase font-source-code"
            >
              {isLoading ? "SIGNING IN..." : "SIGN IN"}
            </button>
          </div>

          <div className="mt-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-black"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-mira-green text-black font-source-code font-bold uppercase">
                  CONTINUE WITH
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => signIn('facebook', { callbackUrl: '/' })}
                className="bg-black text-white p-2 rounded-md hover:bg-black/80 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => {
                  console.log('Google sign-in button clicked');
                  signIn('google', { 
                    callbackUrl: window.location.origin,
                    redirect: true
                  });
                }}
                className="bg-black text-white p-2 rounded-md hover:bg-black/80 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z" fillRule="evenodd" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="text-center mt-6">
              <p className="text-sm font-source-code">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-black underline hover:text-gray-800"
                >
                  SIGN UP
                </Link>
              </p>
            </div>
          </div>
        </form>
      </AuthPopover>
    </div>
  );
}
