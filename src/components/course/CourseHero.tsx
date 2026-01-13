"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Play } from "lucide-react";

interface CurriculumItem {
    id: number;
    title: string;
    duration?: string;
}

interface CourseHeroProps {
    category: string;
    title: string;
    lessonNumber: number;
    videoUrl?: string;
    instructorImage?: string;
    curriculum: CurriculumItem[];
}

export default function CourseHero({
    category,
    title,
    lessonNumber,
    videoUrl,
    instructorImage,
    curriculum,
}: CourseHeroProps) {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    return (
        <section className="relative pt-28 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Title Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg font-medium text-gray-700 mb-2"
                    >
                        {category}
                    </motion.h2>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900"
                    >
                        Ders {lessonNumber}: {title}
                    </motion.h1>
                </motion.div>

                {/* Video + Curriculum Grid - 3/4 + 1/4 */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Video Area - 3/4 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="lg:w-3/4"
                    >
                        <div className="aspect-video bg-gray-900/10 rounded-2xl overflow-hidden border-4 border-gray-900/20 shadow-2xl">
                            {videoUrl ? (
                                <video
                                    src={videoUrl}
                                    className="w-full h-full object-cover"
                                    controls
                                />
                            ) : instructorImage ? (
                                <img
                                    src={instructorImage}
                                    alt={title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                                    <div className="text-center text-white/60">
                                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                                            <Play className="w-10 h-10" />
                                        </div>
                                        <p className="text-lg font-medium">Eğitim Videosu</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Curriculum - 1/4 */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:w-1/4"
                    >
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 overflow-hidden h-full">
                            <div className="p-4 border-b border-gray-200 bg-gray-900">
                                <h3 className="font-bold text-white text-sm">Bu Derste Neler Var?</h3>
                            </div>
                            <div className="max-h-[400px] overflow-y-auto">
                                {curriculum.map((item, index) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                                        className="w-full p-3 text-left border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="flex-shrink-0 w-7 h-7 bg-gray-900 text-white rounded-lg flex items-center justify-center font-bold text-xs">
                                                {item.id}
                                            </span>
                                            <span className="text-sm font-medium text-gray-800 group-hover:text-gray-600 line-clamp-2">
                                                {item.title}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
