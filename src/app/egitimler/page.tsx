"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Package, BookOpen, Clock, Users, Star, ArrowRight, Sparkles, GraduationCap,
    ShoppingCart, Zap, Shield, Video, Award, MessageCircle, Mic, CheckCircle
} from "lucide-react";
import FloatingHeader from "@/components/layout/FloatingHeader";
import Footer from "@/components/layout/Footer";
import { courses, categoryColors } from "@/data/courses";
import { useTheme } from "@/context/ThemeContext";

// Kategori tanımları — Alfabetik sıralı
const categories = [
    {
        name: "Felsefe", slug: "felsefe", icon: "💡", color: "#10B981",
        description: "Düşüncenin temellerini sorgulayın, felsefenin derinliklerine dalın.",
        instructor: "Ömer Aygün",
    },
    {
        name: "Mitoloji", slug: "mitoloji", icon: "🏛️", color: "#FFBC0B",
        description: "İnsanlığın en eski hikayelerinin izinde, mitolojinin gizemli dünyasını keşfedin.",
        instructor: "Nevzat Kaya",
    },
    {
        name: "Psikoloji", slug: "psikoloji", icon: "🧠", color: "#A855F7",
        description: "İnsan zihninin karmaşık dünyasını keşfedin, davranışın arkasındaki bilimi anlayın.",
        instructor: "Alper Hasanoğlu",
    },
    {
        name: "Sanat", slug: "temel-sanat", icon: "🎨", color: "#F43F5E",
        description: "Sanatın temel prensiplerini öğrenin, yaratıcı potansiyelinizi keşfedin.",
        instructor: "İlker Canikligil",
    },
    {
        name: "Siyaset Bilimi", slug: "siyaset-bilimi", icon: "⚖️", color: "#64748B",
        description: "İdeolojilerin ve siyasi sistemlerin nasıl şekillendiğini keşfedin.",
        instructor: "Ömer Gemalmaz",
    },
    {
        name: "Sosyoloji", slug: "sosyoloji", icon: "🌍", color: "#EA580C",
        description: "Toplumsal yapıları ve insan ilişkilerini sosyolojik bir perspektifle inceleyin.",
        instructor: "Besim Dellaloğlu",
    },
];

function getCoursesByCategory(categorySlug: string) {
    return courses.filter(c => c.categorySlug === categorySlug);
}

// Tüm Eğitimler paketleri
const tumEgitimler1Donem = courses.find(c => c.id === "tum-egitimler-paketi");
const tumEgitimlerButunDersler = courses.find(c => c.id === "tum-egitimler-butun-dersler");

export default function EgitimlerPage() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    // Toplam istatistikler
    const totalCourses = courses.filter(c => !c.bundledCourses).length;
    const totalPackages = courses.filter(c => c.bundledCourses).length;
    const totalHours = "150+";

    // Tüm kategoriler (artık Sosyoloji dahil)
    const activeCategories = categories;

    return (
        <main className="min-h-screen bg-[var(--theme-bg-primary)] transition-colors duration-300">
            <FloatingHeader />

            {/* Hero Section */}
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
                            <GraduationCap size={14} className={isDark ? "text-[#FFBC0B]" : "text-[#05111E]"} />
                            <span className={`text-xs font-medium ${isDark ? 'text-[#FFBC0B]' : 'text-[#05111E]'}`}>Flu Akademi Eğitimleri</span>
                        </motion.div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--theme-text-primary)] mb-4 leading-tight">
                            Bilgiye Yolculuğun <br />
                            <span className={`bg-clip-text text-transparent ${isDark ? 'bg-gradient-to-r from-[#FFBC0B] to-[#F74A4A]' : 'bg-gradient-to-r from-[#8E2A4A] to-[#F74A4A]'}`}>Başladığı Yer</span>
                        </h1>
                        <p className="text-[var(--theme-text-secondary)] text-base sm:text-lg max-w-2xl mx-auto mb-8">
                            Türkiye&apos;nin en iyi eğitmenlerinden mitoloji, felsefe, psikoloji, siyaset bilimi, sosyoloji ve sanat alanlarında derinlemesine eğitimler.
                        </p>

                        {/* Stats */}
                        <div className="flex items-center justify-center gap-8 sm:gap-12">
                            {[
                                { value: `${totalCourses + totalPackages}`, label: "Eğitim" },
                                { value: totalHours, label: "Saat İçerik" },
                                { value: "6", label: "Eğitmen" },
                                { value: "6", label: "Kategori" },
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

            {/* Quick Category Navigation Bar — Alfabetik */}
            <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-4">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-2xl overflow-x-auto scrollbar-hide ${isDark
                        ? 'bg-white/[0.04] border border-white/[0.06]'
                        : 'bg-[#0a0a12]/90 border border-[#0a0a12]/10 shadow-lg'
                        }`}
                >
                    <a
                        href="#paketler"
                        className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${isDark
                            ? 'bg-gradient-to-r from-[#FFBC0B]/10 to-[#F74A4A]/10 text-[#FFBC0B] border-[#FFBC0B]/15 hover:border-[#FFBC0B]/30'
                            : 'bg-[#FFBC0B]/15 text-[#FFBC0B] border-[#FFBC0B]/20 hover:border-[#FFBC0B]/40'
                            }`}
                    >
                        <Package size={12} /> Paketler
                    </a>
                    {activeCategories.map(cat => (
                        <a
                            key={cat.slug}
                            href={`#${cat.slug}`}
                            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${isDark
                                ? 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:bg-white/[0.06]'
                                : 'text-white/70 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            <span className="text-sm">{cat.icon}</span> {cat.name}
                        </a>
                    ))}
                </motion.div>
            </section>

            {/* Featured Packages Section */}
            <section id="paketler" className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-12">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-6"
                >
                    <h2 className="text-lg font-bold text-[var(--theme-text-primary)] flex items-center gap-2">
                        <Sparkles size={16} className="text-[#FFBC0B]" /> Öne Çıkan Paketler
                    </h2>
                    <p className="text-xs text-[var(--theme-text-muted)] mt-1">En avantajlı fiyatlarla tüm derslere erişin</p>
                </motion.div>

                <div className="space-y-5">
                    {/* Tüm Eğitimler - Bütün Dersler (EN KAPSAMLI) */}
                    {tumEgitimlerButunDersler && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div
                                className="group relative rounded-2xl overflow-hidden"
                                style={{
                                    background: isDark
                                        ? "linear-gradient(135deg, rgba(168, 85, 247, 0.10), rgba(255, 188, 11, 0.08), rgba(247, 74, 74, 0.08))"
                                        : "rgba(255, 255, 255, 0.95)",
                                    border: isDark
                                        ? "1px solid rgba(168, 85, 247, 0.15)"
                                        : "1px solid rgba(5, 17, 30, 0.10)",
                                    boxShadow: isDark ? "none" : "0 4px 24px rgba(0,0,0,0.06)",
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-[#FFBC0B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative flex flex-col lg:flex-row items-stretch">
                                    {/* Cover Image */}
                                    <div className="relative lg:w-[45%] aspect-[16/9] lg:aspect-auto">
                                        <img
                                            src={tumEgitimlerButunDersler.coverImage}
                                            alt={tumEgitimlerButunDersler.title}
                                            className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500"
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-transparent hidden lg:block ${isDark ? 'to-[var(--theme-bg-primary)]' : 'to-white'}`} />
                                        <div className={`absolute inset-0 bg-gradient-to-t to-transparent lg:hidden ${isDark ? 'from-[var(--theme-bg-primary)]' : 'from-white'}`} />
                                        {/* Badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 text-[10px] font-bold bg-gradient-to-r from-purple-500 to-[#FFBC0B] text-white rounded-full uppercase tracking-wide">
                                                En Kapsamlı
                                            </span>
                                        </div>
                                        {/* Discount */}
                                        <div className="absolute top-4 right-4">
                                            <span className="px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded">
                                                %{tumEgitimlerButunDersler.discount}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 flex flex-col justify-center p-6 lg:p-8 relative">
                                        <h3 className="text-xl sm:text-2xl font-bold text-[var(--theme-text-primary)] mb-2">
                                            {tumEgitimlerButunDersler.title}
                                        </h3>
                                        <p className="text-sm text-[var(--theme-text-secondary)] mb-4 max-w-lg">
                                            {tumEgitimlerButunDersler.description}
                                        </p>

                                        <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--theme-text-muted)] mb-5">
                                            <span className="flex items-center gap-1"><BookOpen size={12} /> {tumEgitimlerButunDersler.bundledCourses?.length || 9} Ders</span>
                                            <span className="flex items-center gap-1"><Clock size={12} /> {tumEgitimlerButunDersler.duration}</span>
                                            <span className="flex items-center gap-1"><Users size={12} /> {tumEgitimlerButunDersler.students?.toLocaleString("tr-TR")} Öğrenci</span>
                                            <span className="flex items-center gap-1"><Star size={12} className="text-[#FFBC0B]" /> {tumEgitimlerButunDersler.rating}</span>
                                        </div>

                                        {/* Bundled courses compact list */}
                                        {tumEgitimlerButunDersler.bundledCourses && (
                                            <div className="flex flex-wrap gap-1.5 mb-5">
                                                {tumEgitimlerButunDersler.bundledCourses.slice(0, 6).map((bc, i) => (
                                                    <span key={i} className="px-2 py-0.5 text-[10px] rounded-full bg-[var(--theme-button-secondary-bg)] text-[var(--theme-text-secondary)] border border-[var(--theme-border)]">
                                                        {bc.title}
                                                    </span>
                                                ))}
                                                {tumEgitimlerButunDersler.bundledCourses.length > 6 && (
                                                    <span className="px-2 py-0.5 text-[10px] rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/15">
                                                        +{tumEgitimlerButunDersler.bundledCourses.length - 6} ders daha
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Price & Buttons */}
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                            <div>
                                                <span className="text-2xl font-bold text-[var(--theme-text-primary)]">₺{tumEgitimlerButunDersler.price.toLocaleString("tr-TR")}</span>
                                                <span className="ml-2 text-sm text-[var(--theme-text-muted)] line-through">₺{tumEgitimlerButunDersler.originalPrice.toLocaleString("tr-TR")}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/ders/${tumEgitimlerButunDersler.categorySlug}/${tumEgitimlerButunDersler.slug}`}
                                                    className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-500 to-[#FFBC0B] text-white text-xs font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                                                >
                                                    <Zap size={13} /> Hemen Al
                                                </Link>
                                                <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] rounded-lg border border-[var(--theme-border)] hover:border-[var(--theme-border)] transition-all">
                                                    <ShoppingCart size={13} /> Sepete Ekle
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Tüm Eğitimler - 1. Dönem — Bütün Dersler ile aynı layout */}
                    {tumEgitimler1Donem && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div
                                className="group relative rounded-2xl overflow-hidden"
                                style={{
                                    background: isDark
                                        ? "linear-gradient(135deg, rgba(255, 188, 11, 0.10), rgba(247, 74, 74, 0.08))"
                                        : "rgba(255, 255, 255, 0.95)",
                                    border: isDark
                                        ? "1px solid rgba(255, 188, 11, 0.15)"
                                        : "1px solid rgba(5, 17, 30, 0.10)",
                                    boxShadow: isDark ? "none" : "0 4px 24px rgba(0,0,0,0.06)",
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[#FFBC0B]/5 to-[#F74A4A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative flex flex-col lg:flex-row items-stretch">
                                    {/* Cover Image */}
                                    <div className="relative lg:w-[45%] aspect-[16/9] lg:aspect-auto">
                                        <img
                                            src={tumEgitimler1Donem.coverImage}
                                            alt={tumEgitimler1Donem.title}
                                            className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500"
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-transparent hidden lg:block ${isDark ? 'to-[var(--theme-bg-primary)]' : 'to-white'}`} />
                                        <div className={`absolute inset-0 bg-gradient-to-t to-transparent lg:hidden ${isDark ? 'from-[var(--theme-bg-primary)]' : 'from-white'}`} />
                                        {/* Badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 text-[10px] font-bold bg-gradient-to-r from-[#FFBC0B] to-[#F74A4A] text-white rounded-full uppercase tracking-wide">
                                                1. Dönem
                                            </span>
                                        </div>
                                        {/* Discount */}
                                        <div className="absolute top-4 right-4">
                                            <span className="px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded">
                                                %{tumEgitimler1Donem.discount}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 flex flex-col justify-center p-6 lg:p-8 relative">
                                        <h3 className="text-xl sm:text-2xl font-bold text-[var(--theme-text-primary)] mb-2">
                                            {tumEgitimler1Donem.title}
                                        </h3>
                                        <p className="text-sm text-[var(--theme-text-secondary)] mb-4 max-w-lg">
                                            {tumEgitimler1Donem.description}
                                        </p>

                                        <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--theme-text-muted)] mb-5">
                                            <span className="flex items-center gap-1"><BookOpen size={12} /> {tumEgitimler1Donem.bundledCourses?.length || 6} Ders</span>
                                            <span className="flex items-center gap-1"><Clock size={12} /> {tumEgitimler1Donem.duration}</span>
                                            <span className="flex items-center gap-1"><Users size={12} /> {tumEgitimler1Donem.students?.toLocaleString("tr-TR")} Öğrenci</span>
                                            <span className="flex items-center gap-1"><Star size={12} className="text-[#FFBC0B]" /> {tumEgitimler1Donem.rating}</span>
                                        </div>

                                        {/* Bundled courses compact list */}
                                        {tumEgitimler1Donem.bundledCourses && (
                                            <div className="flex flex-wrap gap-1.5 mb-5">
                                                {tumEgitimler1Donem.bundledCourses.slice(0, 6).map((bc, i) => (
                                                    <span key={i} className="px-2 py-0.5 text-[10px] rounded-full bg-[var(--theme-button-secondary-bg)] text-[var(--theme-text-secondary)] border border-[var(--theme-border)]">
                                                        {bc.title}
                                                    </span>
                                                ))}
                                                {tumEgitimler1Donem.bundledCourses.length > 6 && (
                                                    <span className="px-2 py-0.5 text-[10px] rounded-full bg-[#FFBC0B]/10 text-[#FFBC0B] border border-[#FFBC0B]/15">
                                                        +{tumEgitimler1Donem.bundledCourses.length - 6} ders daha
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Price & Buttons */}
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                            <div>
                                                <span className="text-2xl font-bold text-[var(--theme-text-primary)]">₺{tumEgitimler1Donem.price.toLocaleString("tr-TR")}</span>
                                                <span className="ml-2 text-sm text-[var(--theme-text-muted)] line-through">₺{tumEgitimler1Donem.originalPrice.toLocaleString("tr-TR")}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/ders/${tumEgitimler1Donem.categorySlug}/${tumEgitimler1Donem.slug}`}
                                                    className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#FFBC0B] to-[#FFA500] text-black text-xs font-semibold rounded-lg hover:shadow-lg hover:shadow-[#FFBC0B]/20 transition-all"
                                                >
                                                    <Zap size={13} /> Hemen Al
                                                </Link>
                                                <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] rounded-lg border border-[var(--theme-border)] hover:border-[var(--theme-border)] transition-all">
                                                    <ShoppingCart size={13} /> Sepete Ekle
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Kategoriler ve Dersler — Alfabetik sıralı */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    {activeCategories.map((cat) => {
                        const catCourses = getCoursesByCategory(cat.slug);
                        const sortedCourses = [
                            ...catCourses.filter(c => c.bundledCourses),
                            ...catCourses.filter(c => !c.bundledCourses),
                        ];
                        if (sortedCourses.length === 0) return null;

                        return (
                            <motion.div key={cat.slug} id={cat.slug} variants={itemVariants} className="scroll-mt-32">
                                {/* Kategori Başlığı */}
                                <div className="flex items-center gap-3 mb-5">
                                    <span className="text-2xl">{cat.icon}</span>
                                    <div>
                                        <h2 className="text-xl font-bold text-[var(--theme-text-primary)]">{cat.name}</h2>
                                        <p className="text-xs text-[var(--theme-text-muted)]">{cat.description}</p>
                                    </div>
                                    <div className="ml-auto hidden sm:flex items-center gap-2 text-xs text-[var(--theme-text-muted)]">
                                        <span className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: `${cat.color}20`, color: cat.color }}>
                                            {cat.instructor.split(' ').map(n => n[0]).join('')}
                                        </span>
                                        {cat.instructor}
                                    </div>
                                </div>

                                {/* Ders Kartları — Standardize edilmiş buton hizalaması */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {sortedCourses.map((course, idx) => {
                                        const isBundle = !!course.bundledCourses;

                                        return (
                                            <motion.div
                                                key={course.id}
                                                initial={{ opacity: 0, y: 15 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.05 }}
                                            >
                                                <div
                                                    className="group relative rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:translate-y-[-2px]"
                                                    style={{
                                                        background: isBundle
                                                            ? isDark ? `linear-gradient(135deg, ${cat.color}08, ${cat.color}03)` : "rgba(255, 255, 255, 0.95)"
                                                            : isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0.92)",
                                                        border: isBundle
                                                            ? isDark ? `1px solid ${cat.color}20` : "1px solid rgba(5, 17, 30, 0.08)"
                                                            : isDark ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(5, 17, 30, 0.08)",
                                                        boxShadow: isDark ? "none" : "0 2px 12px rgba(0,0,0,0.04)",
                                                    }}
                                                >
                                                    {/* Cover Image */}
                                                    <Link href={`/ders/${course.categorySlug}/${course.slug}`}>
                                                        <div className="relative aspect-[16/9] overflow-hidden bg-[var(--theme-bg-secondary)]">
                                                            <img
                                                                src={course.coverImage}
                                                                alt={course.title}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                                                            />
                                                            <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-60 ${isDark ? 'from-[var(--theme-bg-primary)]' : 'from-white'}`} />

                                                            {/* Category Badge */}
                                                            <div className="absolute top-3 left-3">
                                                                <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-md ${categoryColors[course.category] || "bg-gray-700 text-white"}`}>
                                                                    {course.category}
                                                                </span>
                                                            </div>

                                                            {/* Paket Badge */}
                                                            {isBundle && (
                                                                <div className="absolute top-3 right-3">
                                                                    <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-md bg-white/10 backdrop-blur text-white">
                                                                        <Package size={10} /> Paket
                                                                    </span>
                                                                </div>
                                                            )}

                                                            {/* Discount Badge */}
                                                            {course.discount > 0 && (
                                                                <div className="absolute bottom-3 right-3">
                                                                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded">
                                                                        %{course.discount}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </Link>

                                                    {/* Content — flex-grow ile butonları alta hizala */}
                                                    <div className="p-4 flex flex-col flex-grow">
                                                        <Link href={`/ders/${course.categorySlug}/${course.slug}`}>
                                                            <h3 className="text-sm font-semibold text-[var(--theme-text-primary)] mb-1.5 group-hover:text-[#FFBC0B] transition-colors line-clamp-1">
                                                                {course.title}
                                                            </h3>
                                                            <p className="text-xs text-[var(--theme-text-muted)] mb-3 line-clamp-2 leading-relaxed">
                                                                {course.tagline}
                                                            </p>
                                                        </Link>

                                                        {/* Bundled courses list */}
                                                        {isBundle && course.bundledCourses && (
                                                            <div className="mb-3 space-y-1">
                                                                {course.bundledCourses.map((bc, i) => (
                                                                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-[var(--theme-text-secondary)]">
                                                                        <div className="w-1 h-1 rounded-full" style={{ background: cat.color }} />
                                                                        {bc.title}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}

                                                        {/* Spacer — pushes everything below to bottom */}
                                                        <div className="flex-grow" />

                                                        {/* Stats Row — hizalama için spacer'ın altında */}
                                                        <div className="flex items-center gap-3 text-[11px] text-[var(--theme-text-muted)] mb-3">
                                                            <span className="flex items-center gap-1"><Clock size={10} /> {course.duration}</span>
                                                            <span className="flex items-center gap-1"><BookOpen size={10} /> {course.chapters.length} Bölüm</span>
                                                            <span className="flex items-center gap-1">
                                                                <Star size={10} className="text-[#FFBC0B]" /> {course.rating}
                                                            </span>
                                                        </div>

                                                        {/* Price & Instructor */}
                                                        <div className="flex items-center justify-between pt-3 border-t border-[var(--theme-border)] mb-3">
                                                            <div className="flex items-center gap-1.5">
                                                                <div
                                                                    className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold"
                                                                    style={{ background: `${cat.color}20`, color: cat.color }}
                                                                >
                                                                    {course.instructor.name.split(' ').map(n => n[0]).join('')}
                                                                </div>
                                                                <span className="text-[11px] text-[var(--theme-text-muted)]">{course.instructor.name}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1.5">
                                                                {course.originalPrice > course.price && (
                                                                    <span className="text-[11px] text-[var(--theme-text-muted)] line-through">₺{course.originalPrice.toLocaleString("tr-TR")}</span>
                                                                )}
                                                                <span className="text-sm font-bold text-[var(--theme-text-primary)]">₺{course.price.toLocaleString("tr-TR")}</span>
                                                            </div>
                                                        </div>

                                                        {/* Action Buttons — Standardized */}
                                                        <div className="flex items-center gap-2">
                                                            <Link
                                                                href={`/ders/${course.categorySlug}/${course.slug}`}
                                                                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-[#FFBC0B] to-[#FFA500] text-black text-[11px] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#FFBC0B]/20 transition-all"
                                                            >
                                                                <Zap size={11} /> Hemen Al
                                                            </Link>
                                                            <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] font-medium text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] rounded-lg border border-[var(--theme-border)] hover:border-[var(--theme-border)] transition-all">
                                                                <ShoppingCart size={11} /> Sepete Ekle
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </section>

            {/* Platform Özellikleri Section */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-xl font-bold text-[var(--theme-text-primary)] mb-2 flex items-center justify-center gap-2">
                        <Sparkles size={18} className="text-[#FFBC0B]" /> Platform Özellikleri
                    </h2>
                    <p className="text-xs text-[var(--theme-text-muted)] mb-6 text-center">Flu Akademi&apos;yi farklı kılan özellikler</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            {
                                icon: <Award size={20} />,
                                title: "Uzman Eğitmenler",
                                description: "Alanında uzman akademisyen ve profesyonellerden eğitim alın.",
                                image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop&q=80",
                            },
                            {
                                icon: <Video size={20} />,
                                title: "HD Video İçerikler",
                                description: "Profesyonel stüdyo ortamında çekilmiş yüksek kaliteli video dersler.",
                                image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop&q=80",
                            },
                            {
                                icon: <CheckCircle size={20} />,
                                title: "Kendinizi Test Edin",
                                description: "Her bölüm sonunda çoktan seçmeli sorularla bilginizi pekiştirin.",
                                image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop&q=80",
                            },
                            {
                                icon: <Mic size={20} />,
                                title: "Canlı Dersler",
                                description: "Eğitmenlerle online buluşmalarda öğrendiklerinizi tartışın.",
                                image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=600&h=400&fit=crop&q=80",
                            },
                            {
                                icon: <Shield size={20} />,
                                title: "Ömür Boyu Erişim",
                                description: "Bir kez satın alın, sınırsız süre boyunca erişin ve tekrar izleyin.",
                                image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&q=80",
                            },
                            {
                                icon: <MessageCircle size={20} />,
                                title: "Topluluk Desteği",
                                description: "Diğer öğrencilerle ve eğitmenlerle etkileşime geçin.",
                                image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&q=80",
                            },
                        ].map((feature, i) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="group relative rounded-xl overflow-hidden cursor-pointer h-48 sm:h-52"
                                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}
                            >
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${feature.image})` }}
                                />
                                {/* Dark Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 transition-opacity duration-300 group-hover:from-black/70 group-hover:via-black/40 group-hover:to-black/20" />
                                {/* Content */}
                                <div className="relative z-10 h-full flex flex-col justify-end p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center text-white">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-base font-bold text-white drop-shadow-lg">{feature.title}</h3>
                                    </div>
                                    <p className="text-sm text-white/85 leading-relaxed drop-shadow-md">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Sistem Nasıl Çalışıyor? */}
                    <div className="mt-10">
                        <h3 className="text-lg font-bold text-[var(--theme-text-primary)] text-center mb-6">Sistem Nasıl Çalışıyor?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                {
                                    step: "01", title: "Önce Konuyu Öğren!",
                                    color: "#F59E0B",
                                    bgLight: "linear-gradient(135deg, #FFF8E1, #FFF3CD)",
                                    borderLight: "1px solid rgba(245, 158, 11, 0.25)",
                                    desc: "Eğitim videoları ile temel kavramlar ve disiplinler hakkında bilgi edinin, entelektüel gelişiminizi başlatın.",
                                },
                                {
                                    step: "02", title: "Kendini Test Et!",
                                    color: "#8B5CF6",
                                    bgLight: "linear-gradient(135deg, #F3E8FF, #EDE0FF)",
                                    borderLight: "1px solid rgba(139, 92, 246, 0.25)",
                                    desc: "Bölüm sonu çoktan seçmeli sorularla bilgilerinizi pekiştirin, şık açıklamalarıyla eksiklerinizi giderin.",
                                },
                                {
                                    step: "03", title: "Canlı Derse Katıl!",
                                    color: "#059669",
                                    bgLight: "linear-gradient(135deg, #D1FAE5, #C6F6D5)",
                                    borderLight: "1px solid rgba(5, 150, 105, 0.25)",
                                    desc: "Eğitmenlerin de katılacağı online buluşmalarda öğrendiklerinizi tartışın, derinlemesine analiz edin.",
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.step}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="relative rounded-xl p-6 text-center"
                                    style={{
                                        background: isDark
                                            ? `linear-gradient(135deg, ${item.color}08, ${item.color}03)`
                                            : item.bgLight,
                                        border: isDark
                                            ? `1px solid ${item.color}15`
                                            : item.borderLight,
                                        boxShadow: isDark ? "none" : "0 4px 20px rgba(0,0,0,0.04)",
                                    }}
                                >
                                    <div className="text-4xl font-black mb-3" style={{ color: `${item.color}40` }}>
                                        {item.step}
                                    </div>
                                    <h4 className="text-sm font-bold mb-2" style={{ color: item.color }}>{item.title}</h4>
                                    <p className="text-xs text-[var(--theme-text-muted)] leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Eğitmenler Section */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-xl font-bold text-[var(--theme-text-primary)] mb-2 flex items-center justify-center gap-2">
                        <GraduationCap size={18} className="text-[#A855F7]" /> Eğitmenlerimiz
                    </h2>
                    <p className="text-xs text-[var(--theme-text-muted)] mb-6 text-center">Alanında uzman akademisyen ve profesyoneller</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { name: "Nevzat Kaya", title: "Mitoloji Uzmanı", field: "Mitoloji", color: "#FFBC0B", courses: 2 },
                            { name: "Ömer Aygün", title: "Felsefe Profesörü", field: "Felsefe", color: "#10B981", courses: 2 },
                            { name: "Alper Hasanoğlu", title: "Psikolog & Yazar", field: "Psikoloji", color: "#A855F7", courses: 1 },
                            { name: "Ömer Gemalmaz", title: "Siyaset Bilimci", field: "Siyaset Bilimi", color: "#64748B", courses: 2 },
                            { name: "İlker Canikligil", title: "Sanat Eğitmeni", field: "Sanat", color: "#F43F5E", courses: 1 },
                            { name: "Besim Dellaloğlu", title: "Sosyolog & Yazar", field: "Sosyoloji", color: "#EA580C", courses: 1 },
                        ].map((instructor, i) => (
                            <motion.div
                                key={instructor.name}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="group relative rounded-xl p-5 transition-all duration-300 hover:translate-y-[-2px]"
                                style={{
                                    background: isDark
                                        ? `linear-gradient(135deg, ${instructor.color}06, transparent)`
                                        : `linear-gradient(135deg, #fdf6e3, #faf0d7)`,
                                    border: isDark
                                        ? `1px solid ${instructor.color}10`
                                        : "1px solid rgba(5, 17, 30, 0.06)",
                                    boxShadow: isDark ? "none" : "0 2px 16px rgba(0,0,0,0.03)",
                                }}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                                        style={{ background: `${instructor.color}15`, color: instructor.color }}
                                    >
                                        {instructor.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-[var(--theme-text-primary)]">{instructor.name}</h3>
                                        <p className="text-[11px] text-[var(--theme-text-muted)]">{instructor.title}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] text-[var(--theme-text-muted)]">{instructor.field}</span>
                                    <span className="text-[11px] text-[var(--theme-text-secondary)]">{instructor.courses} Ders</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* CTA Section */}
            <section className="py-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--theme-text-primary)] mb-3">
                            Öğrenmeye Başla
                        </h2>
                        <p className="text-sm text-[var(--theme-text-secondary)] mb-6 max-w-xl mx-auto">
                            Tüm eğitimlere tek bir paketle erişin veya derinleşmek istediğiniz alanda tek bir ders seçin.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Link
                                href={tumEgitimlerButunDersler ? `/ders/${tumEgitimlerButunDersler.categorySlug}/${tumEgitimlerButunDersler.slug}` : "#"}
                                className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-[#FFBC0B] text-white font-semibold text-sm rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                            >
                                <Sparkles size={16} className="group-hover:animate-pulse" />
                                Bütün Dersler Paketi
                                <ArrowRight size={14} />
                            </Link>
                            <Link
                                href={tumEgitimler1Donem ? `/ders/${tumEgitimler1Donem.categorySlug}/${tumEgitimler1Donem.slug}` : "#"}
                                className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FFBC0B] to-[#FFA500] text-black font-semibold text-sm rounded-xl hover:shadow-lg hover:shadow-[#FFBC0B]/20 transition-all"
                            >
                                1. Dönem Paketi <ArrowRight size={14} />
                            </Link>
                            <Link
                                href="/iletisim"
                                className="px-6 py-3 text-sm font-medium text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-colors rounded-xl border border-[var(--theme-border)] hover:border-[var(--theme-border)]"
                            >
                                Bize Ulaşın
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
