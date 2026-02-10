import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Eğitmenler — Alanında Uzman Akademisyenler",
    description:
        "Flu Akademi eğitmenleri: Felsefe, mitoloji, psikoloji, siyaset bilimi, sosyoloji ve sanat alanlarında Türkiye'nin önde gelen akademisyen ve düşünürleri.",
    openGraph: {
        title: "Eğitmenler — Alanında Uzman Akademisyenler",
        description:
            "Flu Akademi eğitmenleri: Türkiye'nin önde gelen akademisyen ve düşünürleriyle tanışın.",
        url: "/egitmenler",
    },
    alternates: {
        canonical: "/egitmenler",
    },
};

export default function EgitmenlerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
