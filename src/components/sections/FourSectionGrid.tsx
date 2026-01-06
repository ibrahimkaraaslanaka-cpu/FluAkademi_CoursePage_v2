"use client";

import { motion } from "framer-motion";
import { BookOpen, Laptop, Calendar, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

interface SectionCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    href: string;
    variant: "yellow" | "dark";
    badge?: string;
    stats?: { label: string; value: string }[];
}

function SectionCard({
    title,
    description,
    icon,
    href,
    variant,
    badge,
    stats,
}: SectionCardProps) {
    const isYellow = variant === "yellow";

    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className={`relative overflow-hidden rounded-2xl p-8 h-full min-h-[320px] flex flex-col ${isYellow
                    ? "bg-gradient-to-br from-[#FFBC0B] to-[#E5A800] text-black"
                    : "bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] text-white border border-[#262626]"
                }`}
        >
            {/* Badge */}
            {badge && (
                <span
                    className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full ${isYellow ? "bg-black/20 text-black" : "bg-[#FFBC0B] text-black"
                        }`}
                >
                    {badge}
                </span>
            )}

            {/* Icon */}
            <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${isYellow ? "bg-black/10" : "bg-[#FFBC0B]/10"
                    }`}
            >
                <div className={isYellow ? "text-black" : "text-[#FFBC0B]"}>{icon}</div>
            </div>

            {/* Content */}
            <h3 className="text-2xl font-bold mb-3">{title}</h3>
            <p className={`mb-6 flex-grow ${isYellow ? "text-black/70" : "text-gray-400"}`}>
                {description}
            </p>

            {/* Stats */}
            {stats && (
                <div className="flex gap-6 mb-6">
                    {stats.map((stat, i) => (
                        <div key={i}>
                            <div className={`text-2xl font-bold ${isYellow ? "text-black" : "text-[#FFBC0B]"}`}>
                                {stat.value}
                            </div>
                            <div className={`text-sm ${isYellow ? "text-black/60" : "text-gray-500"}`}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* CTA Button */}
            <Link
                href={href}
                className={`inline-flex items-center gap-2 font-semibold group ${isYellow ? "text-black" : "text-[#FFBC0B]"
                    }`}
            >
                Keşfet
                <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                />
            </Link>

            {/* Decorative Element */}
            <div
                className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full opacity-20 ${isYellow ? "bg-black" : "bg-[#FFBC0B]"
                    }`}
            />
        </motion.div>
    );
}

export default function FourSectionGrid() {
    return (
        <section className="py-20 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Öğrenme Yolculuğunuzu Seçin
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Entelektüel içeriklerden dijital becerilere, etkinliklerden kişisel
                        danışmanlığa kadar geniş bir yelpaze
                    </p>
                </motion.div>

                {/* 2x2 Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Flu Akademi */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <SectionCard
                            title="Flu Akademi"
                            description="Dönemlik entelektüel eğitimler. Felsefe, tarih, sanat ve daha fazlası ile zihinsel ufkunuzu genişletin."
                            icon={<BookOpen size={28} />}
                            href="/akademi"
                            variant="yellow"
                            badge="2. Dönem Açık"
                            stats={[
                                { label: "Aktif Kurs", value: "24" },
                                { label: "Eğitmen", value: "12" },
                            ]}
                        />
                    </motion.div>

                    {/* Flu Dijital Akademi */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <SectionCard
                            title="Flu Dijital Akademi"
                            description="Hedefe yönelik beceri eğitimleri. Yazılım, tasarım, pazarlama ve dijital yetkinlikler kazanın."
                            icon={<Laptop size={28} />}
                            href="/dijital"
                            variant="dark"
                            badge="Yeni"
                            stats={[
                                { label: "Kurs", value: "48" },
                                { label: "Saat İçerik", value: "320+" },
                            ]}
                        />
                    </motion.div>

                    {/* Etkinlikler */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <SectionCard
                            title="Etkinlikler"
                            description="Online ve offline etkinlikler ile toplulukla buluşun. Workshop'lar, webinarlar ve özel buluşmalar."
                            icon={<Calendar size={28} />}
                            href="/etkinlikler"
                            variant="dark"
                            stats={[
                                { label: "Yaklaşan", value: "8" },
                                { label: "Bu Ay", value: "3" },
                            ]}
                        />
                    </motion.div>

                    {/* Danışmanlıklar */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <SectionCard
                            title="Danışmanlıklar"
                            description="Eğitmenlerden 1'e 1 özel dersler. Size özel hedefe yönelik kişiselleştirilmiş mentorluk."
                            icon={<Users size={28} />}
                            href="/danismanlik"
                            variant="dark"
                            stats={[
                                { label: "Danışman", value: "15" },
                                { label: "Seans/Hafta", value: "50+" },
                            ]}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
