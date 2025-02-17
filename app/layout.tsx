import FlagsProvider from "@/components/flags-provider";
import { lightThemeFlag, showNotesFlag } from "@/lib/flags";
import { VercelToolbar } from "@vercel/toolbar/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const showNotes = await showNotesFlag();
  const lightTheme = await lightThemeFlag();
  return (
    <html lang="en" className={lightTheme ? "light" : "dark"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground h-screen w-screen`}
      >
        <FlagsProvider flags={{ showNotes }}>
          {children}
          <div className="z-index-50">
            <VercelToolbar />
          </div>
        </FlagsProvider>
      </body>
    </html>
  );
}
