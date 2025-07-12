import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/providers/auth-provider";
import Navbar from "@/components/navbar";
import LoadingAnimation from "@/components/LoadingAnimation";
import ReplayLoadingButton from "@/components/ReplayLoadingButton";

// Fonts are now managed through globals.css and font-loader.tsx

export const metadata: Metadata = {
  title: "Mira El Paso - Discover Local Events",
  description: "Find and explore events in El Paso, Texas. Connect with your community and discover what's happening around you.",
  keywords: ["El Paso", "events", "local events", "community", "Texas"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body className="antialiased">
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LoadingAnimation />
            <Navbar />
            {children}
            <Toaster />
            <ReplayLoadingButton />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
