import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import Navbar from "./components/Navbar";
import AuthProvider from "@/context/AuthProvider";
import Footer from "./components/Footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shopuya",
  description: "A Higher Form of Shopping",
  metadataBase: new URL("https://shopuya-bysnowmann.netlify.app/"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${inter.className} bg-blue-50`}>
        <Theme
          appearance="light"
          accentColor="violet"
          grayColor="slate"
          radius="small"
          scaling="95%"
        >
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
