"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

interface CourseFAQProps {
    faqs: FAQItem[];
    title?: string;
}

export default function CourseFAQ({
    faqs,
    title = "Sıkça Sorulan Sorular",
}: CourseFAQProps) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
            <div className="space-y-3">
                {faqs.map((faq, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 overflow-hidden"
                    >
                        <button
                            onClick={() => toggleExpand(index)}
                            className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <HelpCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                <span className="font-medium text-gray-900">{faq.question}</span>
                            </div>
                            <motion.div
                                animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex-shrink-0"
                            >
                                <ChevronDown className="w-5 h-5 text-gray-400" />
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {expandedIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="px-5 pb-5 pt-0 border-t border-gray-100">
                                        <p className="text-gray-600 pl-8">{faq.answer}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
