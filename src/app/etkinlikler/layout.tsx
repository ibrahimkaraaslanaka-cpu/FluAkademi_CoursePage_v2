import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Etkinlikler — Canlı Seminerler ve Atölyeler",
    description:
        "Flu Akademi etkinlikleri: Canlı seminerler, atölyeler ve özel etkinliklerle öğrenme deneyiminizi zenginleştirin.",
    openGraph: {
        title: "Etkinlikler — Canlı Seminerler ve Atölyeler",
        description:
            "Flu Akademi canlı etkinlikleri, seminerler ve atölyeler.",
        url: "/etkinlikler",
    },
    alternates: {
        canonical: "/etkinlikler",
    },
};

export default function EtkinliklerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
