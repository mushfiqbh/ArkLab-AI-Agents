import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/provider/ThemeProvider";
import { ReduxProvider } from "@/components/provider/ReduxProvider";
import AuthProvider from "@/components/provider/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ArkLab AI Agents Catalog - Discover Powerful AI Solutions",
  description:
    "Explore our comprehensive collection of AI agents designed to streamline your business operations. Find the perfect AI solution for customer service, marketing, development, and more.",
  keywords:
    "AI agents, artificial intelligence, automation, business solutions, customer service, marketing, development",
  authors: [{ name: "ArkLab" }],
  creator: "ArkLab",
  publisher: "ArkLab",
  robots: "index, follow",
  openGraph: {
    title: "ArkLab AI Agents Catalog",
    description:
      "Discover and explore our comprehensive collection of AI agents designed to streamline your business operations",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArkLab AI Agents Catalog",
    description:
      "Discover and explore our comprehensive collection of AI agents designed to streamline your business operations",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            <ReduxProvider>{children}</ReduxProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
