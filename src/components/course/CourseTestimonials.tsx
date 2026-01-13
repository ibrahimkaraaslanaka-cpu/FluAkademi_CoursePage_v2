"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface Testimonial {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
    comment: string;
    date: string;
}

interface CourseTestimonialsProps {
    testimonials: Testimonial[];
    title?: string;
}

export default function CourseTestimonials({
    testimonials,
    title = "Eğitime Katılanların Yorumları",
}: CourseTestimonialsProps) {
    return (
        <section className="py-16 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl font-bold text-white mb-10 text-center"
                >
                    {title}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-800 rounded-2xl p-6 relative"
                        >
                            {/* Quote Icon */}
                            <div className="absolute top-4 right-4 text-[var(--flu-yellow)]/20">
                                <Quote className="w-10 h-10" />
                            </div>

                            {/* User Info */}
                            <div className="flex items-center gap-4 mb-4">
                                {testimonial.avatar ? (
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--flu-yellow)] to-amber-500 flex items-center justify-center text-gray-900 font-bold text-lg">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-400">{testimonial.date}</p>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-1 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < testimonial.rating
                                                ? "text-[var(--flu-yellow)] fill-[var(--flu-yellow)]"
                                                : "text-gray-600"
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Comment */}
                            <p className="text-gray-300 text-sm leading-relaxed">
                                "{testimonial.comment}"
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
