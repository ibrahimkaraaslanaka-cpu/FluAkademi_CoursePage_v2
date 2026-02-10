import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Destek Merkezi",
    description:
        "Flu Akademi destek merkezi: Sıkça sorulan sorular, teknik destek ve yardım. İhtiyacınız olan her türlü desteği burada bulabilirsiniz.",
    openGraph: {
        title: "Destek Merkezi — Flu Akademi",
        description: "Flu Akademi destek merkezi ve yardım.",
        url: "/destek",
    },
    alternates: {
        canonical: "/destek",
    },
};

export default function DestekLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
