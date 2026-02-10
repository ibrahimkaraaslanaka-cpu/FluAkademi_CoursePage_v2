"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, GraduationCap, BookOpen } from "lucide-react";
import Link from "next/link";
import FloatingHeader from "@/components/layout/FloatingHeader";
import Footer from "@/components/layout/Footer";
import { useTheme } from "@/context/ThemeContext";
import { instructors } from "@/data/instructors";

export default function EgitmenlerPage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <main className="min-h-screen bg-[var(--theme-bg-primary)] transition-colors duration-300">
            <FloatingHeader />

            {/* Hero — matches eğitimler page pattern */}
            <section className="relative pt-28 pb-12 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-1/4 w-96 h-96 bg-[var(--theme-accent)]/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.02]" />
                </div>

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                            style={{
                                background: isDark ? "rgba(255, 188, 11, 0.08)" : "rgba(5, 17, 30, 0.06)",
                                border: isDark ? "1px solid rgba(255, 188, 11, 0.15)" : "1px solid rgba(5, 17, 30, 0.10)",
                            }}
                        >
                            <Sparkles size={14} className={isDark ? "text-[#FFBC0B]" : "text-[#05111E]"} />
                            <span className={`text-xs font-medium ${isDark ? 'text-[#FFBC0B]' : 'text-[#05111E]'}`}>Alanında Uzman Kadro</span>
                        </motion.div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--theme-text-primary)] mb-4 leading-tight">
                            Eğitmenlerimiz
                        </h1>
                        <p className="text-[var(--theme-text-secondary)] text-base sm:text-lg max-w-2xl mx-auto mb-8">
                            Akademik derinlik ve eleştirel düşünce becerilerini bir araya getiren,
                            alanında uzman eğitmenlerle tanışın.
                        </p>

                        {/* Stats */}
                        <div className="flex items-center justify-center gap-8 sm:gap-12">
                            {[
                                { value: "6", label: "Eğitmen" },
                                { value: "6", label: "Kategori" },
                                { value: "150+", label: "Saat İçerik" },
                                { value: "14", label: "Eğitim" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-2xl sm:text-3xl font-bold text-[var(--theme-text-primary)]">{stat.value}</div>
                                    <div className="text-xs text-[var(--theme-text-muted)] mt-0.5">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Instructor Grid */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {instructors.map((inst, i) => (
                        <motion.div
                            key={inst.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.5 }}
                        >
                            <Link
                                href={`/egitmenler/${inst.slug}`}
                                className={`group block rounded-2xl overflow-hidden transition-all duration-300 ${isDark
                                    ? "bg-[var(--theme-bg-card)] border border-white/[0.06] hover:border-white/[0.12]"
                                    : "bg-white border border-black/[0.06] shadow-md hover:shadow-xl"
                                    }`}
                            >
                                {/* Photo */}
                                <div className="relative aspect-[4/5] overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                        style={{ backgroundImage: `url(${inst.image})` }}
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                                    {/* Field badge */}
                                    <div className="absolute top-4 left-4">
                                        <span
                                            className="px-3 py-1.5 rounded-full text-[11px] font-bold text-white backdrop-blur-md"
                                            style={{ background: `${inst.fieldColor}CC` }}
                                        >
                                            {inst.field}
                                        </span>
                                    </div>

                                    {/* Name & title on photo */}
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <h2 className="text-xl font-bold text-white mb-0.5 leading-tight">
                                            {inst.firstName} {inst.lastName}
                                        </h2>
                                        <p className="text-sm text-white/60">{inst.title}</p>
                                    </div>
                                </div>

                                {/* Card body */}
                                <div className="p-5">
                                    <p className="text-sm text-[var(--theme-text-muted)] leading-relaxed mb-4 line-clamp-3">
                                        {inst.shortBio}
                                    </p>

                                    {/* Course pill */}
                                    <div className={`flex items-center justify-between p-3 rounded-xl mb-3 ${isDark
                                        ? "bg-white/[0.04] border border-white/[0.04]"
                                        : "bg-[var(--theme-bg-secondary)] border border-black/[0.03]"
                                        }`}>
                                        <div>
                                            <div className="text-[10px] uppercase tracking-wider text-[var(--theme-text-muted)] font-semibold mb-0.5">
                                                Ders
                                            </div>
                                            <div className="text-sm font-semibold text-[var(--theme-text-primary)]">
                                                {inst.courseTitle}
                                            </div>
                                        </div>
                                        <ArrowRight size={16} className="text-[var(--theme-text-muted)] group-hover:translate-x-1 transition-transform" />
                                    </div>

                                    {/* Meta */}
                                    <div className="flex items-center gap-3 text-xs text-[var(--theme-text-muted)]">
                                        <span className="flex items-center gap-1">
                                            <GraduationCap size={12} /> {inst.universities.length} Üniversite
                                        </span>
                                        {inst.works.length > 0 && (
                                            <span className="flex items-center gap-1">
                                                <BookOpen size={12} /> {inst.works.length} Eser
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`relative rounded-3xl overflow-hidden p-10 md:p-14 text-center ${isDark
                        ? "bg-gradient-to-br from-[#FFBC0B]/8 via-transparent to-transparent border border-white/[0.06]"
                        : "bg-gradient-to-br from-[#FFBC0B]/10 via-[#FFBC0B]/5 to-transparent border border-black/[0.06]"
                        }`}
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--theme-text-primary)] mb-3">
                        Eğitmenlerimize Danışın
                    </h2>
                    <p className="text-[var(--theme-text-muted)] mb-6 max-w-lg mx-auto">
                        Uzmanlarımızla birebir görüşmek, sorularınızı sormak veya projelerinizi
                        danışmak için randevu alın.
                    </p>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                        <Link
                            href="/danismanlik"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFBC0B] text-black font-semibold text-sm hover:bg-[#e5a800] transition-colors"
                        >
                            Danışmanlık Sayfası
                            <ArrowRight size={16} />
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
