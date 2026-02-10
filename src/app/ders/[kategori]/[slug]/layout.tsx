import type { Metadata } from "next";
import { getCourseBySlug } from "@/data/courses";

type Props = {
    params: Promise<{ kategori: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { kategori, slug } = await params;
    const course = getCourseBySlug(kategori, slug);

    if (!course) {
        return {
            title: "Ders Bulunamadı",
        };
    }

    const title = `${course.title} — ${course.category} Dersi`;
    const description =
        course.description ||
        `${course.title}: ${course.category} alanında Flu Akademi online dersi. ${course.instructor} tarafından hazırlanmıştır.`;

    const image = course.coverImage;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `/ders/${kategori}/${slug}`,
            type: "article",
            ...(image
                ? {
                    images: [
                        {
                            url: image,
                            width: 1200,
                            height: 630,
                            alt: course.title,
                        },
                    ],
                }
                : {}),
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            ...(image ? { images: [image] } : {}),
        },
        alternates: {
            canonical: `/ders/${kategori}/${slug}`,
        },
    };
}

export default function DersDetailLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
