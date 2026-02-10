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

const siteUrl = "https://fluakademi.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Flu Akademi | Online Eğitim Platformu",
    template: "%s | Flu Akademi",
  },
  description: "Türkiye'nin premium online eğitim platformu. Felsefe, mitoloji, psikoloji, siyaset bilimi, sosyoloji ve sanat alanlarında uzman eğitmenlerden dersler.",
  keywords: ["online eğitim", "kurs", "akademi", "felsefe", "mitoloji", "psikoloji", "siyaset bilimi", "sosyoloji", "sanat", "danışmanlık", "Flu Akademi"],
  authors: [{ name: "Flu Akademi" }],
  creator: "Flu Akademi",
  publisher: "Flu Akademi",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: "Flu Akademi",
    title: "Flu Akademi | Online Eğitim Platformu",
    description: "Türkiye'nin premium online eğitim platformu. Felsefe, mitoloji, psikoloji, siyaset bilimi ve daha fazlası.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flu Akademi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flu Akademi | Online Eğitim Platformu",
    description: "Türkiye'nin premium online eğitim platformu. Uzman eğitmenlerden online dersler.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
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
