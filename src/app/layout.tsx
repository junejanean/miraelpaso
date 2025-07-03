import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/providers/auth-provider";
import Navbar from "@/components/navbar";

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
            <Navbar />
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
