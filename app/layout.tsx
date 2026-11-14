import type { Metadata } from "next";
import { Lilita_One } from "next/font/google";
import "./globals.css";

const lilita = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lilita",
});

export const metadata: Metadata = {
  title: "Tic-Tac-Toe",
  description: "Kiwi vs. Apple tic-tac-toe with a turn timer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={lilita.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
