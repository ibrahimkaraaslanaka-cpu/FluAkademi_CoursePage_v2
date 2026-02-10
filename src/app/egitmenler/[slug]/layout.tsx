import type { Metadata } from "next";
import { getInstructorBySlug } from "@/data/instructors";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const instructor = getInstructorBySlug(slug);

    if (!instructor) {
        return {
            title: "Eğitmen Bulunamadı",
        };
    }

    const fullName = `${instructor.firstName} ${instructor.lastName}`;
    const title = `${fullName} — ${instructor.field} Eğitmeni`;
    const description = `${fullName}: ${instructor.title}. ${instructor.field} alanında Flu Akademi eğitmeni. ${instructor.universities.length} üniversitede ders vermiştir.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `/egitmenler/${slug}`,
            type: "profile",
            images: [
                {
                    url: instructor.image,
                    width: 800,
                    height: 800,
                    alt: fullName,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [instructor.image],
        },
        alternates: {
            canonical: `/egitmenler/${slug}`,
        },
    };
}

export default function EgitmenDetailLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
