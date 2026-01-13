"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

interface InstructorSectionProps {
    name: string;
    image?: string;
    bio: string;
    title?: string;
}

export default function InstructorSection({
    name,
    image,
    bio,
    title = "Eğitmen Önsözü",
}: InstructorSectionProps) {
    return (
        <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200"
            >
                <div className="flex flex-col sm:flex-row gap-6">
                    {/* Instructor Image */}
                    <div className="flex-shrink-0">
                        {image ? (
                            <img
                                src={image}
                                alt={name}
                                className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover"
                            />
                        ) : (
                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gray-900 flex items-center justify-center">
                                <User className="w-12 h-12 text-white/60" />
                            </div>
                        )}
                    </div>

                    {/* Instructor Info */}
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{name}</h3>
                        <p className="text-gray-700 leading-relaxed">{bio}</p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
