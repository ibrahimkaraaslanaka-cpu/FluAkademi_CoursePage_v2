import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["900"],
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
    <html lang="tr" data-theme="dark" suppressHydrationWarning>
      <body className={`${poppins.variable} ${montserrat.variable} antialiased bg-[var(--theme-bg-primary)] text-[var(--theme-text-primary)] transition-colors duration-300`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
