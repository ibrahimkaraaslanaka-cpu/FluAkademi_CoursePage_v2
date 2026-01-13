"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RelatedCourse {
    id: string;
    category: string;
    title: string;
    description: string;
    slug: string;
    image?: string;
}

interface RelatedCoursesProps {
    courses: RelatedCourse[];
}

export default function RelatedCourses({ courses }: RelatedCoursesProps) {
    const categoryColors: Record<string, string> = {
        "Mitoloji": "bg-amber-100 text-amber-800",
        "Psikoloji": "bg-purple-100 text-purple-800",
        "Siyaset Bilimi": "bg-slate-200 text-slate-800",
        "Felsefe": "bg-emerald-100 text-emerald-800",
        "Tarih": "bg-red-100 text-red-800",
        "Sanat": "bg-pink-100 text-pink-800",
    };

    return (
        <section className="bg-gray-900 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl font-bold text-white mb-8"
                >
                    {courses[0]?.title} eğitimine katılanlar, bunlara da göz attı!
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                href={`/ders/${course.slug}`}
                                className="block bg-gray-800 rounded-2xl overflow-hidden hover:bg-gray-750 transition-all group h-full"
                            >
                                {/* Course Image */}
                                <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
                                    {course.image ? (
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                                                <svg
                                                    className="w-8 h-8 text-white/60"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.5}
                                                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.5}
                                                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <span
                                        className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-3 ${categoryColors[course.category] ||
                                            "bg-gray-100 text-gray-800"
                                            }`}
                                    >
                                        {course.category}
                                    </span>
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[var(--flu-yellow)] transition-colors">
                                        {course.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                                        {course.description}
                                    </p>
                                    <div className="flex items-center text-[var(--flu-yellow)] font-medium text-sm group-hover:gap-2 transition-all">
                                        <span>Derse Git</span>
                                        <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
