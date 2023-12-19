import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import Navbar from "./components/Navbar";
import AuthProvider from "@/context/AuthProvider";
import Footer from "./components/Footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shopuya",
  description: "A higher form of shopping.",
  metadataBase: new URL("https://shopuya-bysnowmann.netlify.app/"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme appearance="light" accentColor="blue">
          <AuthProvider>
            <Navbar />
            <Toaster richColors />
            <main className="mx-auto max-w-7xl">{children}</main>
            <Footer />
          </AuthProvider>
        </Theme>
      </body>
    </html>
  );
}
