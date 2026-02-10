import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Eğitimler — Online Kurs Kataloğu",
    description:
        "Flu Akademi eğitim kataloğu: Felsefe, mitoloji, psikoloji, siyaset bilimi, sosyoloji ve sanat alanlarında online dersler ve paketler.",
    openGraph: {
        title: "Eğitimler — Online Kurs Kataloğu",
        description:
            "Flu Akademi eğitim kataloğu. Online dersler ve paketler.",
        url: "/egitimler",
    },
    alternates: {
        canonical: "/egitimler",
    },
};

export default function EgitimlerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
