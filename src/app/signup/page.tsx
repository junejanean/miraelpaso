"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { User, Eye, EyeOff, Mail, Building } from "lucide-react";
import AuthPopover from "@/components/auth/AuthPopover";
import Head from "next/head";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isBusinessOwner, setIsBusinessOwner] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
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

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          isBusinessOwner,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      router.push("/login?registered=true");
    } catch (error: any) {
      setError(error.message || "An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mira-beige">
      <AuthPopover title="SIGN UP">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <div className="relative">
            <div className="flex items-center border-b-4 border-black pb-2">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="block w-full bg-mira-green border-none focus:outline-none font-source-code normal-case placeholder:text-black placeholder:font-bold placeholder:uppercase"
                placeholder="FULL NAME"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <User className="h-6 w-6 text-black ml-2 stroke-2" />
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center border-b-4 border-black pb-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full bg-mira-green border-none focus:outline-none font-source-code normal-case placeholder:text-black placeholder:font-bold placeholder:uppercase"
                placeholder="EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail className="h-6 w-6 text-black ml-2 stroke-2" />
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center border-b-4 border-black pb-2">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
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
                  <EyeOff className="h-6 w-6 text-black stroke-2" />
                ) : (
                  <Eye className="h-6 w-6 text-black stroke-2" />
                )}
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center border-b-4 border-black pb-2">
              <input
                id="confirm-password"
                name="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className="block w-full bg-mira-green border-none focus:outline-none font-source-code normal-case placeholder:text-black placeholder:font-bold placeholder:uppercase"
                placeholder="CONFIRM PASSWORD"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="p-1"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-6 w-6 text-black stroke-2" />
                ) : (
                  <Eye className="h-6 w-6 text-black stroke-2" />
                )}
              </button>
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              id="is-business-owner"
              name="is-business-owner"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
              checked={isBusinessOwner}
              onChange={(e) => setIsBusinessOwner(e.target.checked)}
            />
            <label
              htmlFor="is-business-owner"
              className="ml-2 block text-sm font-source-code"
            >
              I am a business owner or event organizer
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black uppercase font-source-code"
            >
              {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
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
                onClick={() => signIn('google', { callbackUrl: '/' })}
                className="bg-black text-white p-2 rounded-md hover:bg-black/80 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z" fillRule="evenodd" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="text-center mt-6">
              <p className="text-sm font-source-code">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-black underline hover:text-gray-800"
                >
                  LOG IN
                </Link>
              </p>
            </div>
          </div>
        </form>
      </AuthPopover>
    </div>
  );
}
