import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "./lib/AuthContext";
import { SocketStatusProvider } from "./lib/SocketStatusContext";
import AppWrapper from "./components/AppWrapper";
import TabManager from "./components/TabManager";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Safary",
  description: "Your partner in seamless travel management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TabManager />
        <AuthProvider>
          <SocketStatusProvider>
            <AppWrapper>{children}</AppWrapper>
          </SocketStatusProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
