import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "İletişim",
    description:
        "Flu Akademi ile iletişime geçin. Sorularınız, önerileriniz ve işbirliği teklifleriniz için bize ulaşın.",
    openGraph: {
        title: "İletişim — Flu Akademi",
        description: "Flu Akademi ile iletişime geçin.",
        url: "/iletisim",
    },
    alternates: {
        canonical: "/iletisim",
    },
};

export default function IletisimLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
