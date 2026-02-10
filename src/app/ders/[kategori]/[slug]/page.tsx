"use client";

import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import FloatingHeader from "@/components/layout/FloatingHeader";
import Footer from "@/components/layout/Footer";
import { ShoppingCart, Play, Clock, Users, Star, ChevronDown, ArrowRight, Tag, Sparkles, BadgePercent, Gift, Columns, Lightbulb, Zap, Wine, CheckCircle, BookOpen, Brain, Package } from "lucide-react";
import Link from "next/link";
import { getCourseBySlug, categoryColors } from "@/data/courses";

export default function CoursePage() {
    const params = useParams();
    const [showAllTestimonials, setShowAllTestimonials] = useState(false);
    const [expandedChapter, setExpandedChapter] = useState<number | null>(null);

    const courseData = getCourseBySlug(
        params.kategori as string,
        params.slug as string
    );

    if (!courseData) {
        return (
            <main className="min-h-screen bg-[var(--theme-bg-primary)] text-[var(--theme-text-primary)] flex items-center justify-center">
                <FloatingHeader />
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Ders Bulunamadı</h1>
                    <p className="text-[var(--theme-text-secondary)] mb-6">Aradığınız ders mevcut değil.</p>
                    <Link href="/" className="px-6 py-3 bg-[var(--theme-accent)] text-[var(--theme-accent-text)] rounded-xl font-semibold">
                        Ana Sayfaya Dön
                    </Link>
                </div>
            </main>
        );
    }

    const visibleTestimonials = showAllTestimonials
        ? courseData.testimonials
        : courseData.testimonials.slice(0, 6);

    return (
        <main className="min-h-screen bg-[var(--theme-bg-primary)] text-[var(--theme-text-primary)] transition-colors duration-300">
            <FloatingHeader />

            {/* ANA İÇERİK - 2 Sütun Layout */}
            <div className="pt-24 pb-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-6">

                        {/* SOL SÜTUN - Ana İçerik */}
                        <div className="lg:w-2/3 space-y-6">

                            {/* Video Area */}
                            <div className="aspect-video rounded-2xl overflow-hidden relative">
                                <video
                                    className="w-full h-full object-cover"
                                    controls
                                    poster={courseData.coverImage}
                                >
                                    {courseData.videoSrc && <source src={courseData.videoSrc} type="video/mp4" />}
                                    Tarayıcınız video oynatmayı desteklemiyor.
                                </video>
                            </div>

                            {/* Title & Meta */}
                            <div>
                                {/* Series Lesson Navigator */}
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="category-badge flex items-center px-5 py-2.5 bg-[#FFBC0B] text-black text-base font-bold rounded-2xl">
                                        {courseData.category}
                                    </span>

                                    {/* Connected Lesson Pills */}
                                    <div className="flex items-center bg-[var(--theme-bg-card)] rounded-2xl border border-[var(--theme-border)] p-1.5">
                                        {courseData.seriesLessons.map((lesson, index) => (
                                            <div key={lesson.number} className="flex items-center">
                                                <Link
                                                    href={`/ders/${courseData.categorySlug}/${lesson.slug}`}
                                                    className={`group relative px-4 py-2 text-sm font-medium rounded-xl transition-all ${lesson.number === courseData.currentLesson
                                                        ? 'bg-[var(--theme-accent)] text-[var(--theme-accent-text)]'
                                                        : 'text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-bg-tertiary)]'
                                                        }`}
                                                >
                                                    <span className="flex items-center gap-1.5">
                                                        <span className={`w-5 h-5 flex items-center justify-center rounded-lg text-xs font-bold ${lesson.number === courseData.currentLesson
                                                            ? 'bg-black/20 text-[var(--theme-accent-text)]'
                                                            : 'bg-[var(--theme-bg-tertiary)] text-[var(--theme-text-muted)] group-hover:bg-[var(--theme-accent)] group-hover:text-[var(--theme-accent-text)]'
                                                            }`}>
                                                            {lesson.number}
                                                        </span>
                                                        {lesson.title}
                                                    </span>
                                                </Link>
                                                {index < courseData.seriesLessons.length - 1 && (
                                                    <ArrowRight className="w-3.5 h-3.5 mx-1 text-[var(--theme-text-muted)]" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-bold mb-2">{courseData.title}</h1>
                                <p className="text-[var(--theme-text-secondary)] text-sm">{courseData.tagline}</p>

                                {/* Paket İçeriği - sadece bundledCourses varsa */}
                                {courseData.bundledCourses && courseData.bundledCourses.length > 0 && (
                                    <div className="mt-3 flex items-center gap-2 flex-wrap">
                                        {courseData.bundledCourses.map((bc, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                {idx > 0 && <span className="text-[var(--theme-accent)] font-bold text-sm hidden sm:inline">+</span>}
                                                <a
                                                    href={`/ders/${bc.slug}`}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--theme-bg-card)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/5 transition-all text-sm font-medium text-[var(--theme-text-primary)]"
                                                >
                                                    <span className="w-4 h-4 rounded-full bg-[var(--theme-accent)] flex items-center justify-center text-[9px] font-bold text-[var(--theme-accent-text)]">{idx + 1}</span>
                                                    {bc.title}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* MOBİL SATIN ALMA KARTI - sadece mobilde göster, bento grid üstünde */}
                            <div className="lg:hidden bg-[var(--theme-bg-card)] backdrop-blur-sm rounded-2xl overflow-hidden border border-[var(--theme-border)]">
                                <div className="aspect-video relative overflow-hidden">
                                    <img src={courseData.coverImage} alt={courseData.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-5">
                                    <div className="flex justify-between gap-4 mb-4">
                                        <div className="flex flex-col justify-between gap-1">
                                            <span className="category-badge inline-block w-fit px-3 py-1 text-sm font-semibold rounded-lg">{courseData.category}</span>
                                            <p className="text-xl font-bold text-[var(--theme-text-primary)]">{courseData.title}</p>
                                        </div>
                                        <div className="flex flex-col items-end justify-between gap-1">
                                            <span className="text-3xl font-black text-[var(--theme-text-primary)]">₺{courseData.price.toLocaleString()}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-[var(--theme-text-muted)] line-through">₺{courseData.originalPrice.toLocaleString()}</span>
                                                <span className="px-2 py-0.5 bg-[#F74A4A] text-white text-[10px] font-semibold rounded">%{courseData.discount} indirim</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <button className="w-full py-3.5 bg-[var(--theme-accent)] text-[var(--theme-accent-text)] font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2">
                                            <Tag className="w-5 h-5" /> Hemen Al
                                        </button>
                                        <button className="w-full py-3 bg-[var(--theme-button-secondary-bg)] text-[var(--theme-text-primary)] font-medium rounded-xl hover:bg-[var(--theme-button-secondary-hover)] transition-colors flex items-center justify-center gap-2">
                                            <ShoppingCart className="w-4 h-4" /> Sepete Ekle
                                        </button>
                                        <button className="w-full py-3 bg-transparent text-[var(--theme-text-secondary)] font-medium rounded-xl border-2 border-dashed border-[var(--theme-border)] hover:border-[var(--theme-accent)] hover:text-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/5 transition-all flex items-center justify-center gap-2 group">
                                            <Gift className="w-4 h-4 group-hover:scale-110 transition-transform" /> Hediye Et
                                        </button>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-[var(--theme-border)] flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-1.5 text-[var(--theme-text-secondary)]">
                                            <Clock className="w-4 h-4 text-[var(--theme-accent)]" />
                                            <span>{courseData.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[var(--theme-text-secondary)]">
                                            <Play className="w-4 h-4 text-[var(--theme-accent)]" />
                                            <span>{courseData.chapters.length} Video</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[var(--theme-text-secondary)]">
                                            <Users className="w-4 h-4 text-[var(--theme-accent)]" />
                                            <span>{courseData.students.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[var(--theme-text-secondary)]">
                                            <Star className="w-4 h-4 text-[var(--theme-accent)]" />
                                            <span>{courseData.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bu Derste Neler Var? - Simplified Bento Grid */}
                            <div className="bg-[var(--theme-bg-card)] rounded-3xl p-4 sm:p-6 border border-[var(--theme-border)]">
                                {/* Section Header - Dual Color Style */}
                                <div className="mb-5">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-1.5 h-7 bg-gradient-to-b from-[#F74A4A] to-[#FF8C42] rounded-full" />
                                        <h2 className="text-xl sm:text-2xl font-bold text-[var(--theme-text-primary)]">
                                            Bu Derste <span className="text-[#F74A4A]">Neler Var?</span>
                                        </h2>
                                    </div>
                                </div>

                                {/* Simplified Bento Grid - 2x2 + Instructor Note */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                                    {/* ROW 1, COL 1: Video */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        whileHover={{ scale: 1.03 }}
                                        className="relative overflow-hidden rounded-2xl bg-[#22C55E] p-4 cursor-pointer"
                                    >
                                        <div className="flex items-center gap-1 mb-2">
                                            <Play className="w-4 h-4 text-white/80" fill="white" />
                                            <span className="text-white/80 text-xs font-medium">Video</span>
                                        </div>
                                        <span className="text-4xl sm:text-5xl font-black text-white">8</span>
                                        <p className="text-white/60 text-xs mt-1">Bölüm</p>
                                        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white/10 rounded-full" />
                                    </motion.div>

                                    {/* ROW 1, COL 2: Süre */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15 }}
                                        whileHover={{ scale: 1.03 }}
                                        className="relative overflow-hidden rounded-2xl bg-[#8B5CF6] p-4 cursor-pointer"
                                    >
                                        <div className="flex items-center gap-1 mb-2">
                                            <Clock className="w-4 h-4 text-white/80" />
                                            <span className="text-white/80 text-xs font-medium">Süre</span>
                                        </div>
                                        <span className="text-4xl sm:text-5xl font-black text-white">12+</span>
                                        <p className="text-white/60 text-xs mt-1">Saat İçerik</p>
                                        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white/10 rounded-full" />
                                    </motion.div>

                                    {/* ROW 1-2, COL 3-4: Course Thumbnail (2x2) */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.2 }}
                                        whileHover={{ scale: 1.02 }}
                                        className="relative overflow-hidden rounded-2xl cursor-pointer group col-span-2 row-span-1 sm:row-span-2 order-first sm:order-none"
                                    >
                                        <img
                                            src={courseData.coverImage}
                                            alt={courseData.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            style={{ minHeight: '200px' }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                                            <span className={`inline-block text-xs font-bold px-2 py-1 rounded mb-2 ${categoryColors[courseData.category] || 'bg-[#FFBC0B] text-black'}`}>
                                                {courseData.category.toUpperCase()}
                                            </span>
                                            <h3 className="text-white text-lg sm:text-xl font-bold leading-tight">
                                                {courseData.title}
                                            </h3>
                                            <p className="text-white/70 text-xs mt-1">
                                                {courseData.tagline}
                                            </p>
                                        </div>
                                        <motion.div
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <Play className="w-6 h-6 text-[#F74A4A] ml-1" fill="#F74A4A" />
                                        </motion.div>
                                    </motion.div>

                                    {/* ROW 2, COL 1: Öğrenci */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.25 }}
                                        whileHover={{ scale: 1.03 }}
                                        className="relative overflow-hidden rounded-2xl bg-[#F59E0B] p-4 cursor-pointer"
                                    >
                                        <div className="flex items-center gap-1 mb-2">
                                            <Users className="w-4 h-4 text-white/80" />
                                            <span className="text-white/80 text-xs font-medium">Öğrenci</span>
                                        </div>
                                        <span className="text-3xl sm:text-4xl font-black text-white">2.8K</span>
                                        <p className="text-white/60 text-xs mt-1">Katılımcı</p>
                                        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white/10 rounded-full" />
                                    </motion.div>

                                    {/* ROW 2, COL 2: Puan */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        whileHover={{ scale: 1.03 }}
                                        className="relative overflow-hidden rounded-2xl bg-white p-4 cursor-pointer"
                                    >
                                        <div className="flex items-center gap-1 mb-2">
                                            <Star className="w-4 h-4 text-[#F59E0B]" fill="#F59E0B" />
                                            <span className="text-gray-500 text-xs font-medium">Puan</span>
                                        </div>
                                        <span className="text-4xl sm:text-5xl font-black text-gray-900">4.9</span>
                                        <p className="text-gray-500 text-xs mt-1">Mükemmel</p>
                                    </motion.div>

                                    {/* ROW 3: Full Width Instructor Note */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.35 }}
                                        whileHover={{ scale: 1.01 }}
                                        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#1a1a2e] border border-white/10 p-5 sm:p-6 col-span-2 sm:col-span-4"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F74A4A]/5 rounded-full blur-3xl" />

                                        <div className="relative z-10 flex items-start gap-4">
                                            {/* Instructor Avatar */}
                                            <div className="flex-shrink-0 hidden sm:block">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F74A4A] to-[#FF8C42] p-0.5">
                                                    <div className="w-full h-full rounded-full bg-[#1a1a2e] flex items-center justify-center">
                                                        <span className="text-lg">✍️</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Note Content */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className="text-xs font-bold text-[#F74A4A] bg-[#F74A4A]/10 px-3 py-1 rounded-full">
                                                        EĞİTMEN NOTU
                                                    </span>
                                                    <span className="text-white/40 text-xs">{courseData.instructor.name}</span>
                                                </div>
                                                <p className="text-white/90 text-sm sm:text-base leading-relaxed italic">
                                                    "{courseData.instructorNote}"
                                                </p>
                                            </div>
                                        </div>

                                        {/* Decorative Quote Mark */}
                                        <div className="absolute top-3 right-4 text-5xl font-serif text-white/5 select-none">
                                            "
                                        </div>
                                    </motion.div>

                                </div>
                            </div>

                            {/* Yolculuk Haritası */}
                            <div className="bg-[var(--theme-bg-card)] rounded-2xl p-5 border border-[var(--theme-border)]">
                                <h2 className="text-lg font-bold mb-4">
                                    Yolculuk <span className="text-[#F74A4A]">Haritası</span>
                                    <span className="text-xs text-[var(--theme-text-muted)] font-normal ml-2">{courseData.chapters.length} bölüm</span>
                                </h2>
                                <div className="space-y-2">
                                    {courseData.chapters.map((chapter) => (
                                        <div key={chapter.id}>
                                            <button
                                                onClick={() => setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)}
                                                className="w-full flex items-center justify-between p-3 bg-[var(--theme-button-secondary-bg)] rounded-xl hover:bg-[var(--theme-button-secondary-hover)] transition-colors group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${expandedChapter === chapter.id
                                                        ? 'bg-[var(--theme-accent)] text-[var(--theme-accent-text)]'
                                                        : 'bg-[var(--theme-accent)]/20 text-[var(--theme-accent)]'
                                                        }`}>
                                                        {chapter.id}
                                                    </span>
                                                    <span className="text-sm text-[var(--theme-text-primary)] opacity-80 group-hover:opacity-100 text-left">{chapter.title}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-[var(--theme-text-muted)]">{chapter.duration}</span>
                                                    <ChevronDown className={`w-4 h-4 text-[var(--theme-text-muted)] transition-transform ${expandedChapter === chapter.id ? 'rotate-180' : ''
                                                        }`} />
                                                </div>
                                            </button>

                                            <AnimatePresence>
                                                {expandedChapter === chapter.id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="mt-3 ml-9 space-y-3">
                                                            {/* İçerik Açıklaması - Üstte */}
                                                            <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed">{chapter.description}</p>

                                                            {/* Alt Konular */}
                                                            {chapter.subChapters && chapter.subChapters.length > 0 && (
                                                                <div className="space-y-1.5">
                                                                    {chapter.subChapters.map((sub, idx) => (
                                                                        <div key={idx} className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-[var(--theme-bg-tertiary)]/50 border border-[var(--theme-border)]/50">
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="w-5 h-5 rounded-md bg-[var(--theme-accent)]/10 flex items-center justify-center text-[10px] font-semibold text-[var(--theme-accent)]">{idx + 1}</span>
                                                                                <span className="text-xs text-[var(--theme-text-secondary)]">{sub.title}</span>
                                                                            </div>
                                                                            <span className="text-[10px] text-[var(--theme-text-muted)]">{sub.duration}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}

                                                            {/* Alt Satır: Video + Quiz */}
                                                            <div className="grid grid-cols-2 gap-3">
                                                                {/* Video Ders Kapağı */}
                                                                <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-[var(--theme-bg-tertiary)] to-[var(--theme-bg-card)] border border-[var(--theme-border)] group cursor-pointer">
                                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                                        <div className="w-12 h-12 rounded-full bg-[var(--theme-accent)]/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                                                                            <Play className="w-5 h-5 text-[var(--theme-accent-text)] ml-0.5" fill="currentColor" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 rounded text-[10px] text-white font-medium">
                                                                        Video Ders
                                                                    </div>
                                                                </div>

                                                                {/* Kendini Test Et */}
                                                                <div className="p-4 bg-gradient-to-br from-[var(--theme-accent)]/10 to-[var(--theme-accent)]/5 rounded-xl border border-[var(--theme-accent)]/20 flex flex-col justify-between">
                                                                    <div>
                                                                        <div className="flex items-center gap-2 mb-2">
                                                                            <Brain className="w-4 h-4 text-[var(--theme-accent)]" />
                                                                            <span className="text-xs font-semibold text-[var(--theme-accent)] uppercase tracking-wide">Quiz</span>
                                                                        </div>
                                                                        <p className="text-sm text-[var(--theme-text-secondary)] mb-3">Bu bölümde öğrendiklerini test et!</p>
                                                                    </div>
                                                                    <button className="w-full py-2.5 bg-[var(--theme-accent)] text-[var(--theme-accent-text)] text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                                                                        <CheckCircle className="w-4 h-4" />
                                                                        Kendini Test Et
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Eğitmen */}
                            <div className="bg-[var(--theme-bg-card)] rounded-2xl p-5 border border-[var(--theme-border)]">
                                <h2 className="text-lg font-bold mb-4">Eğitmen</h2>
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--theme-accent)] to-amber-600 flex items-center justify-center text-[var(--theme-accent-text)] font-bold text-xl flex-shrink-0">
                                        NK
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{courseData.instructor.name}</h3>
                                        <p className="text-xs text-[var(--theme-text-muted)] mb-2">{courseData.instructor.title}</p>
                                        <p className="text-sm text-[var(--theme-text-secondary)] italic">"{courseData.instructor.quote}"</p>
                                    </div>
                                </div>
                            </div>

                            {/* Yorumlar */}
                            <div className="bg-[var(--theme-bg-card)] rounded-2xl p-5 border border-[var(--theme-border)]">
                                <h2 className="text-lg font-bold mb-4">
                                    Öğrenci <span className="text-[#F74A4A]">Değerlendirmeleri</span>
                                </h2>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {visibleTestimonials.map((t) => (
                                        <motion.div
                                            key={t.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-4 bg-[var(--theme-button-secondary-bg)] rounded-xl"
                                        >
                                            <div className="flex items-center gap-1 mb-3">
                                                {[...Array(t.rating)].map((_, j) => (
                                                    <Star key={j} className="w-4 h-4 text-[var(--theme-accent)] fill-[var(--theme-accent)]" />
                                                ))}
                                            </div>
                                            <p className="text-sm text-[var(--theme-text-secondary)] mb-3 leading-relaxed">"{t.text}"</p>
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-[var(--theme-text-secondary)]">{t.name}</p>
                                                <p className="text-xs text-[var(--theme-text-muted)]">{t.date}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {courseData.testimonials.length > 6 && (
                                    <div className="mt-4 text-center">
                                        <button
                                            onClick={() => setShowAllTestimonials(!showAllTestimonials)}
                                            className="px-6 py-2 bg-[var(--theme-button-secondary-bg)] rounded-lg text-sm text-[var(--theme-text-secondary)] hover:bg-[var(--theme-button-secondary-hover)] transition-colors flex items-center gap-2 mx-auto"
                                        >
                                            {showAllTestimonials ? (
                                                <>Daha Az Göster</>
                                            ) : (
                                                <>
                                                    Daha Fazla Göster ({courseData.testimonials.length - 6} yorum daha)
                                                    <ChevronDown className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* SAĞ SÜTUN - Sticky Satın Alma Kartı (sadece desktop) */}
                        <div className="hidden lg:block lg:w-1/3">
                            <div className="lg:sticky lg:top-24 space-y-4">
                                <div className="bg-[var(--theme-bg-card)] backdrop-blur-sm rounded-2xl overflow-hidden border border-[var(--theme-border)]">
                                    {/* 16:9 Ürün Görseli */}
                                    <div className="aspect-video relative overflow-hidden">
                                        <img
                                            src={courseData.coverImage}
                                            alt={courseData.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* FİYAT - 2 Sütun */}
                                    <div className="p-5">
                                        {/* Başlık ve Fiyat 2 sütun - hizalı */}
                                        <div className="flex justify-between gap-4 mb-4">
                                            {/* Sol: Ders Başlığı */}
                                            <div className="flex flex-col justify-between gap-1">
                                                <span className="category-badge inline-block w-fit px-3 py-1 text-sm font-semibold rounded-lg">{courseData.category}</span>
                                                <p className="text-xl font-bold text-[var(--theme-text-primary)]">
                                                    {courseData.title}
                                                </p>
                                            </div>

                                            {/* Sağ: Fiyat */}
                                            <div className="flex flex-col items-end justify-between gap-1">
                                                <span className="text-3xl font-black text-[var(--theme-text-primary)]">₺{courseData.price.toLocaleString()}</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-[var(--theme-text-muted)] line-through">₺{courseData.originalPrice.toLocaleString()}</span>
                                                    <span className="px-2 py-0.5 bg-[#F74A4A] text-white text-[10px] font-semibold rounded">
                                                        %{courseData.discount} indirim
                                                    </span>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="flex flex-col gap-3">
                                            <button className="w-full py-3.5 bg-[var(--theme-accent)] text-[var(--theme-accent-text)] font-bold rounded-xl hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
                                                <Tag className="w-5 h-5" />
                                                Hemen Al
                                            </button>
                                            <button className="w-full py-3 bg-[var(--theme-button-secondary-bg)] text-[var(--theme-text-primary)] font-medium rounded-xl hover:bg-[var(--theme-button-secondary-hover)] transition-colors flex items-center justify-center gap-2">
                                                <ShoppingCart className="w-4 h-4" /> Sepete Ekle
                                            </button>
                                            <button className="w-full py-3 bg-transparent text-[var(--theme-text-secondary)] font-medium rounded-xl border-2 border-dashed border-[var(--theme-border)] hover:border-[var(--theme-accent)] hover:text-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/5 transition-all flex items-center justify-center gap-2 group">
                                                <Gift className="w-4 h-4 group-hover:scale-110 transition-transform" /> Hediye Et
                                            </button>
                                        </div>

                                        {/* Stats - 4 İnfografik, Tek Satır */}
                                        <div className="mt-4 pt-4 border-t border-[var(--theme-border)] flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-1.5 text-[var(--theme-text-secondary)]">
                                                <Clock className="w-4 h-4 text-[var(--theme-accent)]" />
                                                <span>{courseData.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[var(--theme-text-secondary)]">
                                                <Play className="w-4 h-4 text-[var(--theme-accent)]" />
                                                <span>{courseData.chapters.length} Video</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[var(--theme-text-secondary)]">
                                                <Users className="w-4 h-4 text-[var(--theme-accent)]" />
                                                <span>{courseData.students.toLocaleString()}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[var(--theme-text-secondary)]">
                                                <Star className="w-4 h-4 text-[var(--theme-accent)]" />
                                                <span>{courseData.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* İLGİLİ KURSLAR - Premium Glassmorphism Kartlar */}
            <section className="py-16 px-4 bg-gradient-to-b from-[var(--theme-bg-secondary)] to-[var(--theme-bg-primary)]">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl sm:text-3xl font-bold mb-8 text-center"
                    >
                        Bu Dersi Satın Alanlar, <span className="text-[#F74A4A]">Bunlara da Göz Attı</span>
                    </motion.h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courseData.relatedCourses.map((course, index) => (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    href={`/ders/${course.slug}`}
                                    className="group block relative bg-[var(--theme-bg-card)]/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-[var(--theme-border)] hover:border-[var(--theme-accent)]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--theme-accent)]/10 hover:-translate-y-2"
                                >
                                    {/* Category Ribbon */}
                                    <div className="absolute top-4 left-0 z-10">
                                        <span className={`px-4 py-1.5 text-xs font-bold rounded-r-full shadow-lg ${categoryColors[course.category] || "bg-[var(--theme-button-secondary-bg)] text-[var(--theme-text-secondary)]"}`}>
                                            {course.category}
                                        </span>
                                    </div>

                                    {/* Course Image with Gradient Overlay */}
                                    <div className="aspect-video bg-gradient-to-br from-[var(--theme-bg-tertiary)] to-[var(--theme-bg-card)] relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-[var(--theme-accent)] transition-all duration-300">
                                                <Play className="w-7 h-7 text-white ml-1" fill="currentColor" />
                                            </div>
                                        </div>
                                        {/* Fake Progress Bar */}
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
                                            <div className="h-full bg-[var(--theme-accent)] w-0 group-hover:w-1/4 transition-all duration-500" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <h3 className="text-lg font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors mb-2">
                                            {course.title}
                                        </h3>
                                        <p className="text-sm text-[var(--theme-text-secondary)] line-clamp-2 mb-4">{course.description}</p>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-3 border-t border-[var(--theme-border)]">
                                            <div className="flex flex-col">
                                                <span className="text-xs text-[var(--theme-text-muted)]">Başlangıç Fiyatı</span>
                                                <span className="text-xl font-black text-[var(--theme-text-primary)]">₺{course.price.toLocaleString()}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-[var(--theme-accent)] font-semibold group-hover:gap-3 transition-all">
                                                Keşfet <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover glow effect */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-t from-[var(--theme-accent)]/5 to-transparent" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
