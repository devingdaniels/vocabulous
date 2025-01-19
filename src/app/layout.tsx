import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import { AuthProvider } from "../context/AuthContext";
import "@radix-ui/themes/styles.css";
import "./globals.css";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Vocabulous ✨",
  description: "Real-time language learning platform with Generative AI ✨",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <AuthProvider>
          <Theme accentColor="blue" grayColor="sand" radius="large" scaling="95%">
            {children}
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
