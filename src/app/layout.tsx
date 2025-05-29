import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Crypto Security Monitor",
  description: "Crypto security dashboard powered by Messari",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-950 text-gray-100 min-h-screen">{children}</body>
    </html>
  );
}
