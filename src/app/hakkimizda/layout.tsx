import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Hakkımızda — Flu Akademi'yi Tanıyın",
    description:
        "Flu Akademi: Bilgi ve eleştirel düşüncenin buluşma noktası. Misyonumuz, vizyonumuz ve ekibimiz hakkında bilgi edinin.",
    openGraph: {
        title: "Hakkımızda — Flu Akademi'yi Tanıyın",
        description:
            "Bilgi ve eleştirel düşüncenin buluşma noktası.",
        url: "/hakkimizda",
    },
    alternates: {
        canonical: "/hakkimizda",
    },
};

export default function HakkimizdaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
