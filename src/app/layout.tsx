import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs';
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "sonner";
import { ChatInterface } from "./chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Veritrust",
  description: "Veritrust",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster 
              position="top-center" 
              closeButton
              theme="light"
              className="toaster-override"
              toastOptions={{
                className: "toast-override",
                style: {
                  background: "hsl(var(--card))",
                  color: "hsl(var(--card-foreground))",
                  border: "1px solid hsl(var(--border))",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  zIndex: 9999,
                },
                actionButtonStyle: {
                  backgroundColor: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  fontSize: "12px",
                  fontWeight: "500",
                  borderRadius: "4px",
                },
              }}
            />
            <div className="relative">
              {children}
              <ChatInterface />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
