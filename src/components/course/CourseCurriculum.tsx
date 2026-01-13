"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Play } from "lucide-react";

interface CurriculumItem {
    id: number;
    title: string;
    duration?: string;
}

interface CourseCurriculumProps {
    curriculum: CurriculumItem[];
    title?: string;
}

export default function CourseCurriculum({
    curriculum,
    title = "Bu Derste Neler Var?",
}: CourseCurriculumProps) {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
            <div className="space-y-3">
                {curriculum.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <button
                            onClick={() => toggleExpand(item.id)}
                            className="w-full bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-gray-200 hover:border-gray-400 transition-all group"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <span className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center font-bold text-sm">
                                        {item.id}
                                    </span>
                                    <div className="text-left">
                                        <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                                            {item.title}
                                        </h3>
                                        {item.duration && (
                                            <p className="text-sm text-gray-500">{item.duration}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Play className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                                    <motion.div
                                        animate={{ rotate: expandedId === item.id ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ChevronDown className="w-5 h-5 text-gray-400" />
                                    </motion.div>
                                </div>
                            </div>

                            <AnimatePresence>
                                {expandedId === item.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-4 mt-4 border-t border-gray-200 text-left">
                                            <p className="text-gray-600 text-sm">
                                                Bu bölümde {item.title.toLowerCase()} konusunu derinlemesine inceliyoruz.
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
