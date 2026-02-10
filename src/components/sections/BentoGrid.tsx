"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Laptop, Calendar, Users, ArrowRight, ChevronRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const sections = [
    {
        id: "akademi",
        title: "Flu Akademi",
        subtitle: "Entelektüel Yolculuk",
        description: "Felsefe, tarih, sanat ve mitoloji üzerine derinlemesine eğitimler. Dönemlik programlarla zihinsel ufkunuzu genişletin.",
        icon: BookOpen,
        color: "#FFBC0B",
        bgImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
        stats: [
            { value: "24", label: "Aktif Kurs" },
            { value: "12", label: "Uzman Eğitmen" },
            { value: "2.4K", label: "Öğrenci" },
        ],
        featured: ["Felsefe Tarihi", "Mitoloji", "Sanat Tarihi"],
    },
    {
        id: "dijital",
        title: "Dijital Akademi",
        subtitle: "Kariyer Dönüşümü",
        description: "Yazılım, tasarım, yapay zeka ve dijital pazarlama. Geleceğin becerilerini kazanın, kariyerinizi dönüştürün.",
        icon: Laptop,
        color: "#00D9FF",
        bgImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
        stats: [
            { value: "48", label: "Kurs" },
            { value: "320+", label: "Saat İçerik" },
            { value: "89%", label: "Tamamlama" },
        ],
        featured: ["Web Development", "UI/UX Design", "AI & ML"],
    },
    {
        id: "etkinlik",
        title: "Etkinlikler",
        subtitle: "Canlı Deneyimler",
        description: "Online webinarlar, workshop'lar ve yüz yüze buluşmalar. Topluluğun bir parçası olun.",
        icon: Calendar,
        color: "#FF6B6B",
        bgImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
        stats: [
            { value: "8", label: "Yaklaşan" },
            { value: "50+", label: "Geçmiş" },
            { value: "1.2K", label: "Katılımcı" },
        ],
        featured: ["AI Workshop", "Career Talk", "Networking"],
    },
    {
        id: "danismanlik",
        title: "Danışmanlık",
        subtitle: "Birebir Mentorluk",
        description: "Alanında uzman eğitmenlerden kişiselleştirilmiş rehberlik. Hedefinize en hızlı şekilde ulaşın.",
        icon: Users,
        color: "#A855F7",
        bgImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800",
        stats: [
            { value: "15", label: "Danışman" },
            { value: "50+", label: "Seans/Hafta" },
            { value: "4.9", label: "Ortalama Puan" },
        ],
        featured: ["Kariyer Koçluğu", "Teknik Mentorluk", "Proje Review"],
    },
];

export default function BentoGrid() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <section className="relative py-24 bg-[var(--theme-bg-primary)] overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FFBC0B]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#5E55FF]/5 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className={`inline-block px-4 py-2 rounded-full text-sm mb-6 ${isDark
                            ? 'bg-white/5 border border-white/10 text-gray-400'
                            : 'bg-black/5 border border-black/10 text-[var(--theme-text-muted)]'
                            }`}
                    >
                        ✨ Öğrenme Deneyiminizi Seçin
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--theme-text-primary)] mb-6">
                        Dört Farklı Yol,
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFBC0B] via-[#FF6B6B] to-[#A855F7]">
                            Sonsuz Olasılık
                        </span>
                    </h2>
                    <p className="text-xl text-[var(--theme-text-muted)] max-w-2xl mx-auto">
                        Entelektüel derinlikten dijital becerilere, canlı etkinliklerden birebir mentorluğa
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    {sections.map((section, index) => {
                        const Icon = section.icon;
                        const isHovered = hoveredId === section.id;
                        const isFirst = index === 0;

                        return (
                            <motion.div
                                key={section.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                onHoverStart={() => setHoveredId(section.id)}
                                onHoverEnd={() => setHoveredId(null)}
                                onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                                className={`relative group cursor-pointer rounded-3xl overflow-hidden ${isFirst ? "md:col-span-2 md:row-span-2" : ""
                                    }`}
                                style={{ minHeight: isFirst ? "480px" : "240px" }}
                            >
                                {/* Background */}
                                <div className="absolute inset-0">
                                    <motion.div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${section.bgImage})` }}
                                        animate={{ scale: isHovered ? 1.1 : 1 }}
                                        transition={{ duration: 0.6 }}
                                    />
                                    <div
                                        className="absolute inset-0 transition-all duration-500"
                                        style={{
                                            background: isHovered
                                                ? `linear-gradient(135deg, ${section.color}90 0%, rgba(5,17,30,0.94) 100%)`
                                                : `linear-gradient(135deg, rgba(5,17,30,0.88) 0%, rgba(5,17,30,0.94) 100%)`,
                                        }}
                                    />
                                </div>

                                {/* Glowing Border on Hover */}
                                <motion.div
                                    className="absolute inset-0 rounded-3xl pointer-events-none"
                                    animate={{
                                        boxShadow: isHovered
                                            ? `inset 0 0 0 2px ${section.color}60, 0 0 40px ${section.color}20`
                                            : "inset 0 0 0 1px rgba(255,255,255,0.1)",
                                    }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Content */}
                                <div className="relative h-full p-6 lg:p-8 flex flex-col">
                                    {/* Icon */}
                                    <motion.div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                                        style={{
                                            background: `${section.color}20`,
                                            border: `1px solid ${section.color}40`,
                                        }}
                                        animate={{
                                            scale: isHovered ? 1.1 : 1,
                                            boxShadow: isHovered ? `0 0 30px ${section.color}40` : "none",
                                        }}
                                    >
                                        <Icon size={24} style={{ color: section.color }} />
                                    </motion.div>

                                    {/* Title & Subtitle */}
                                    <div className="mb-4">
                                        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-1">
                                            {section.title}
                                        </h3>
                                        <p className="text-sm" style={{ color: section.color }}>
                                            {section.subtitle}
                                        </p>
                                    </div>

                                    {/* Description - Show on first card or hover */}
                                    <AnimatePresence>
                                        {(isFirst || isHovered) && (
                                            <motion.p
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="text-gray-300 text-sm mb-4 line-clamp-3"
                                            >
                                                {section.description}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>

                                    {/* Stats - Show on first card */}
                                    {isFirst && (
                                        <div className="flex gap-6 mb-6">
                                            {section.stats.map((stat, i) => (
                                                <div key={i}>
                                                    <div
                                                        className="text-2xl font-bold"
                                                        style={{ color: section.color }}
                                                    >
                                                        {stat.value}
                                                    </div>
                                                    <div className="text-xs text-gray-400">{stat.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Featured Tags */}
                                    {isFirst && (
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {section.featured.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 text-xs rounded-full bg-white/5 text-gray-300 border border-white/10"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* CTA */}
                                    <div className="mt-auto">
                                        <motion.button
                                            className="flex items-center gap-2 font-medium group/btn"
                                            style={{ color: section.color }}
                                            whileHover={{ x: 5 }}
                                        >
                                            Keşfet
                                            <ChevronRight
                                                size={18}
                                                className="group-hover/btn:translate-x-1 transition-transform"
                                            />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
