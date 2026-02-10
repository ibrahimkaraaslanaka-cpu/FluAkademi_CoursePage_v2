import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Danışmanlık Hizmetleri",
    description:
        "Flu Akademi danışmanlık: Alanında uzman akademisyenlerle birebir danışmanlık seansları. Kişisel gelişim ve akademik rehberlik.",
    openGraph: {
        title: "Danışmanlık Hizmetleri",
        description:
            "Uzman akademisyenlerle birebir danışmanlık seansları.",
        url: "/danismanlik",
    },
    alternates: {
        canonical: "/danismanlik",
    },
};

export default function DanismanlikLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
