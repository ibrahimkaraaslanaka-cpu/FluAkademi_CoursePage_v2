import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Flu Akademi | Online Eğitim Platformu",
  description: "Türkiye'nin premium online eğitim platformu. Entelektüel eğitimler, dijital beceriler, etkinlikler ve 1'e 1 danışmanlık.",
  keywords: "online eğitim, kurs, akademi, dijital eğitim, danışmanlık",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${poppins.variable} antialiased bg-[#0a0a0a] text-[#ededed]`}>
        {children}
      </body>
    </html>
  );
}
