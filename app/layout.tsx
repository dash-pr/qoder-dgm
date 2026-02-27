import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Onboard — Enterprise SaaS Onboarding AI Agent",
  description: "An AI agent that orchestrates enterprise SaaS onboarding end-to-end",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="relative z-[2]">
          {children}
        </div>
      </body>
    </html>
  );
}
