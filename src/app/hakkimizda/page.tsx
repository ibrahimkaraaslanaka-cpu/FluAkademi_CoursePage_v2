"use client";

import { motion } from "framer-motion";
import {
    Users,
    Target,
    BookOpen,
    Lightbulb,
    Award,
    Heart,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";
import FloatingHeader from "@/components/layout/FloatingHeader";
import Footer from "@/components/layout/Footer";
import { useTheme } from "@/context/ThemeContext";

// ——— Data ———

const values = [
    {
        icon: Lightbulb,
        title: "Eleştirel Düşünce",
        description: "Bilgiyi sorgulamayı, analiz etmeyi ve bağımsız düşünmeyi teşvik ediyoruz.",
        color: "#FFBC0B",
    },
    {
        icon: BookOpen,
        title: "Akademik Kalite",
        description: "Alanında uzman eğitmenlerle, üniversite düzeyinde içerikler sunuyoruz.",
        color: "#00D9FF",
    },
    {
        icon: Users,
        title: "Topluluk",
        description: "Öğrenmeyi bireysel bir eylemden topluluk deneyimine dönüştürüyoruz.",
        color: "#A855F7",
    },
    {
        icon: Target,
        title: "Erişilebilirlik",
        description: "Kaliteli eğitimi herkes için erişilebilir kılmayı amaçlıyoruz.",
        color: "#10B981",
    },
    {
        icon: Award,
        title: "Sürekli Gelişim",
        description: "İçeriklerimizi sürekli güncelliyoruz ve genişletiyoruz.",
        color: "#F43F5E",
    },
    {
        icon: Heart,
        title: "Tutkuyla Üretim",
        description: "Her içerik, alanına tutkuyla bağlı insanlar tarafından hazırlanıyor.",
        color: "#FF6B6B",
    },
];

const stats = [
    { value: "10+", label: "Uzman Eğitmen" },
    { value: "15+", label: "Online Eğitim" },
    { value: "10K+", label: "Öğrenci" },
    { value: "50+", label: "Etkinlik" },
];

const team = [
    { name: "Nevzat Kaya", role: "Kurucu & Mitoloji Eğitmeni", emoji: "🏛️" },
    { name: "Ömer Aygün", role: "Felsefe Profesörü", emoji: "📚" },
    { name: "Alper Hasanoğlu", role: "Psikoloji Eğitmeni", emoji: "🧠" },
    { name: "Ömer Gemalmaz", role: "Siyaset Bilimi Eğitmeni", emoji: "⚖️" },
    { name: "Besim Dellaloğlu", role: "Sosyoloji Profesörü", emoji: "🌍" },
    { name: "İlker Canikligil", role: "Temel Sanat Eğitmeni", emoji: "🎨" },
];

// ——— Component ———

export default function HakkimizdaPage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <main className="min-h-screen bg-[var(--theme-bg-primary)]">
            <FloatingHeader />

            {/* Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 right-[10%] w-80 h-80 bg-[#FFBC0B]/8 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-[15%] w-72 h-72 bg-[#A855F7]/6 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${isDark
                                ? "bg-[#A855F7]/10 text-[#A855F7] border border-[#A855F7]/20"
                                : "bg-[#A855F7]/10 text-[#7c3aed] border border-[#A855F7]/30"
                                }`}
                        >
                            <Heart size={14} />
                            Hakkımızda
                        </motion.div>

                        <h1 className="text-4xl md:text-6xl font-bold text-[var(--theme-text-primary)] mb-6 leading-tight">
                            Bilgiyi{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFBC0B] to-[#A855F7]">
                                Demokratikleştiriyoruz
                            </span>
                        </h1>
                        <p className="text-lg text-[var(--theme-text-muted)] max-w-2xl mx-auto mb-10">
                            Flu Akademi, eleştirel düşünce ve derin analizlere önem verenler için
                            Türkiye&apos;nin premium online öğrenme platformudur.
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
                            {stats.map((s, i) => (
                                <motion.div
                                    key={s.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-3xl sm:text-4xl font-bold text-[var(--theme-text-primary)]">
                                        {s.value}
                                    </div>
                                    <div className="text-xs text-[var(--theme-text-muted)] mt-1">{s.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Story */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`rounded-3xl p-8 md:p-12 ${isDark
                        ? "bg-white/[0.03] border border-white/[0.06]"
                        : "bg-[var(--theme-bg-secondary)] border border-black/[0.06]"
                        }`}
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--theme-text-primary)] mb-6">
                        Hikayemiz
                    </h2>
                    <div className="space-y-4 text-[var(--theme-text-muted)] leading-relaxed">
                        <p>
                            Flu Akademi, FluTV bünyesinde doğan ve Türkiye&apos;nin en kapsamlı online
                            eğitim platformu olma vizyonuyla kurulmuş bir oluşumdur. Amacımız,
                            alanında uzman akademisyen ve eğitmenlerle hazırlanan içerikleri geniş
                            kitlelere ulaştırmaktır.
                        </p>
                        <p>
                            Mitolojiden felsefeye, psikolojiden siyaset bilimine, sosyolojiden
                            sanata kadar geniş bir yelpazede sunduğumuz eğitimlerle, öğrenmeyi bir
                            ayrıcalık olmaktan çıkarıp herkes için erişilebilir kılıyoruz.
                        </p>
                        <p>
                            Sadece bilgi vermekle kalmıyor; eleştirel düşünceyi, sorgulamayı ve
                            bağımsız analizi teşvik eden bir öğrenme kültürü oluşturuyoruz.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* Values */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--theme-text-primary)]">
                        Değerlerimiz
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {values.map((v, i) => (
                        <motion.div
                            key={v.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06 }}
                            className={`p-6 rounded-2xl transition-all ${isDark
                                ? "bg-[var(--theme-bg-card)] border border-white/[0.06] hover:border-white/10"
                                : "bg-white border border-black/[0.06] shadow-md hover:shadow-lg"
                                }`}
                        >
                            <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                                style={{ background: `${v.color}15` }}
                            >
                                <v.icon size={20} style={{ color: v.color }} />
                            </div>
                            <h3 className="text-base font-bold text-[var(--theme-text-primary)] mb-2">
                                {v.title}
                            </h3>
                            <p className="text-sm text-[var(--theme-text-muted)] leading-relaxed">
                                {v.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Team */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--theme-text-primary)]">
                        Eğitmenlerimiz
                    </h2>
                    <p className="text-[var(--theme-text-muted)] mt-3 max-w-xl mx-auto">
                        Alanında uzman akademisyen ve profesyonellerden oluşan ekibimiz
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {team.map((t, i) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06 }}
                            className={`p-4 rounded-2xl text-center transition-all ${isDark
                                ? "bg-[var(--theme-bg-card)] border border-white/[0.06] hover:border-white/10"
                                : "bg-white border border-black/[0.06] shadow-sm hover:shadow-md"
                                }`}
                        >
                            <div className="text-3xl mb-3">{t.emoji}</div>
                            <h4 className="text-sm font-bold text-[var(--theme-text-primary)] mb-1 leading-tight">
                                {t.name}
                            </h4>
                            <p className="text-[10px] text-[var(--theme-text-muted)]">{t.role}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`relative rounded-3xl overflow-hidden p-10 md:p-14 text-center ${isDark
                        ? "bg-gradient-to-br from-[#FFBC0B]/10 via-[#A855F7]/5 to-transparent border border-white/[0.06]"
                        : "bg-gradient-to-br from-[#FFBC0B]/10 via-[#A855F7]/10 to-[#FFBC0B]/5 border border-black/[0.06]"
                        }`}
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--theme-text-primary)] mb-3">
                        Eğitim Yolculuğunuza Başlayın
                    </h2>
                    <p className="text-[var(--theme-text-muted)] mb-6 max-w-lg mx-auto">
                        Alanında uzman eğitmenlerden öğrenmeye bugün başlayın.
                    </p>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                        <Link
                            href="/egitimler"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFBC0B] text-black font-semibold text-sm hover:bg-[#e5a800] transition-colors"
                        >
                            Eğitimleri Keşfet
                            <ArrowRight size={16} />
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
