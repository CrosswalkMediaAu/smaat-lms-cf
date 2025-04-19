import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
// import { Theme } from "@radix-ui/themes";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./components/theme-provider";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SMAAT Training",
  description: "SMAAT Training",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* <AuthProvider> */}
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
          {/* </AuthProvider> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
