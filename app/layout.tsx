import type { Metadata } from "next";
import { Baloo_2, Comic_Neue } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-heading",
  subsets: ["latin"],
});

const comicNeue = Comic_Neue({
  variable: "--font-sans",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

import Providers from "@/components/providers";
import { SuperAdminTrigger } from "@/components/SuperAdminTrigger";

export const metadata: Metadata = {
  title: "Belajarkuu",
  description: "Vibrant & modern learning management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${baloo.variable} ${comicNeue.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SuperAdminTrigger />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
