import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/nav/Navbar";
import Footer from "./components/layout/footer/Footer";
import { ModalProvider } from "./contexts/Modal/ModalContext";
import Modal from "./components/layout/modal/Modal";
import StatsDisplay from "./components/layout/stats/StatsDisplay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MatchaFinder",
  description: "Quest to find the best matcha in Ireland",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased py-5 px-8 h-screen w-full flex flex-col`}
      >
        <ModalProvider>
          <Navbar />
          <StatsDisplay />
          <main className="flex-1 p-4">{children}</main>
          <Modal />
          <Footer />

        </ModalProvider>
      </body>
    </html>
  );
}
