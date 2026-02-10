"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    Film,
    GraduationCap,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    Twitter,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    Instagram,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    Linkedin,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    Youtube,
    Play,
    MessageCircle,
    Calendar,
    ChevronDown,
    Clock,
    Globe,
    Feather,
    Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import FloatingHeader from "@/components/layout/FloatingHeader";
import Footer from "@/components/layout/Footer";
import { useTheme } from "@/context/ThemeContext";
import { getInstructorBySlug, instructors } from "@/data/instructors";
import { getCoursesByInstructorName } from "@/data/courses";

/* ─── helpers ─── */
const workTypeIcon = (type: string) => {
    switch (type) {
        case "film": return <Film size={14} />;
        case "exhibition": return <ImageIcon size={14} />;
        case "translation": return <Globe size={14} />;
        case "poetry": return <Feather size={14} />;
        default: return <BookOpen size={14} />;
    }
};
const workTypeLabel = (type: string) => {
    switch (type) {
        case "book": return "Kitap";
        case "translation": return "Çeviri";
        case "poetry": return "Şiir";
        case "film": return "Film";
        case "exhibition": return "Sergi";
        case "publication": return "Yayın";
        default: return "";
    }
};
const workTypeOrder = ["book", "translation", "poetry", "film", "exhibition", "publication"];

/* ─── subtle noise SVG (inline data-uri, no external dependency) ─── */
const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`;

/* ─── Subtle floating particles (canvas-based, very lightweight) ─── */
function HeroParticles({ color = "#ffffff" }: { color?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
        };
        resize();
        window.addEventListener("resize", resize);

        const count = 40;
        const particles = Array.from({ length: count }, () => ({
            x: Math.random() * canvas.width / dpr,
            y: Math.random() * canvas.height / dpr,
            r: Math.random() * 1.8 + 0.8,
            vx: (Math.random() - 0.5) * 0.18,
            vy: (Math.random() - 0.5) * 0.14 - 0.08,
            opacity: Math.random() * 0.25 + 0.08,
        }));

        const draw = () => {
            const w = canvas.width / dpr;
            const h = canvas.height / dpr;
            ctx.clearRect(0, 0, w, h);

            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;

                // wrap
                if (p.x < -5) p.x = w + 5;
                if (p.x > w + 5) p.x = -5;
                if (p.y < -5) p.y = h + 5;
                if (p.y > h + 5) p.y = -5;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.globalAlpha = p.opacity;
                ctx.fill();
            }
            ctx.globalAlpha = 1;
            animId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, [color]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
            style={{ opacity: 0.9 }}
        />
    );
}

export default function InstructorDetailPage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const params = useParams();
    const slug = params.slug as string;
    const instructor = getInstructorBySlug(slug);

    const heroRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [showScrollHint, setShowScrollHint] = useState(true);

    /* parallax */
    const { scrollY } = useScroll();
    const heroScale = useTransform(scrollY, [0, 900], [1.08, 1.0]);
    const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
    const textY = useTransform(scrollY, [0, 600], [0, 120]);
    const overlayOpacity = useTransform(scrollY, [0, 500], [0.5, 0.2]);

    useEffect(() => {
        const handler = () => {
            if (window.scrollY > 30) setShowScrollHint(false);
        };
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    const scrollToContent = () => {
        contentRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    /* ─── 404 ─── */
    if (!instructor) {
        return (
            <main className="min-h-screen bg-[var(--theme-bg-primary)]">
                <FloatingHeader />
                <div className="flex flex-col items-center justify-center py-40">
                    <h1 className="text-2xl font-bold text-[var(--theme-text-primary)] mb-4">
                        Eğitmen Bulunamadı
                    </h1>
                    <Link
                        href="/egitmenler"
                        className="text-[#FFBC0B] hover:underline"
                    >
                        ← Eğitmenler Sayfasına Dön
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }

    /* ─── data prep ─── */
    const fullName = `${instructor.firstName} ${instructor.lastName}`;
    const instructorCourses = getCoursesByInstructorName(fullName);

    const socialItems = [
        { key: "twitter", icon: <Twitter size={15} />, url: instructor.social.twitter, label: "Twitter" },
        { key: "instagram", icon: <Instagram size={15} />, url: instructor.social.instagram, label: "Instagram" },
        { key: "linkedin", icon: <Linkedin size={15} />, url: instructor.social.linkedin, label: "LinkedIn" },
        { key: "youtube", icon: <Youtube size={15} />, url: instructor.social.youtube, label: "YouTube" },
        { key: "academic", icon: <GraduationCap size={15} />, url: instructor.social.academicProfile, label: "Akademik" },
    ].filter((s) => s.url);

    const others = instructors.filter((i) => i.slug !== slug);

    /* group works by type */
    const worksByType = instructor.works.reduce<Record<string, typeof instructor.works>>((acc, w) => {
        if (!acc[w.type]) acc[w.type] = [];
        acc[w.type].push(w);
        return acc;
    }, {});
    const sortedWorkTypes = workTypeOrder.filter((t) => worksByType[t]);

    /* stat items for the horizontal bar */
    const statItems = [
        ...(instructor.universities.length > 0
            ? [{ value: instructor.universities.length, label: "Üniversite", icon: <GraduationCap size={16} /> }]
            : []),
        ...(instructor.works.length > 0
            ? [{ value: instructor.works.length, label: "Eser", icon: <BookOpen size={16} /> }]
            : []),
        ...(instructorCourses.length > 0
            ? [{ value: instructorCourses.length, label: "Eğitim", icon: <Play size={16} /> }]
            : []),
    ];

    return (
        <main className="min-h-screen bg-[var(--theme-bg-primary)] transition-colors duration-300">
            <FloatingHeader />

            {/* ════════════════════════════════════════════════════════════
                CINEMATIC HERO — full viewport, layered gradients, grain
               ════════════════════════════════════════════════════════════ */}
            <section
                ref={heroRef}
                className="relative h-[88vh] sm:h-[92vh] lg:h-screen w-full overflow-hidden cursor-pointer"
                onClick={scrollToContent}
            >
                {/* BG image — ken-burns parallax */}
                <motion.div
                    className="absolute inset-0 will-change-transform"
                    style={{ scale: heroScale }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={instructor.image}
                        alt={fullName}
                        className="w-full h-full object-cover object-top"
                        draggable={false}
                    />
                </motion.div>

                {/* Cinematic gradients — lighter to preserve image visibility */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
                    style={{ opacity: overlayOpacity }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent opacity-40" />

                {/* Field-color cinematic glow at bottom */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-[200px] sm:h-[280px] opacity-20 blur-[2px]"
                    style={{
                        background: `linear-gradient(to top, ${instructor.fieldColor}40, transparent)`,
                    }}
                />

                {/* Grain overlay */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.035]"
                    style={{
                        backgroundImage: noiseSvg,
                        backgroundRepeat: "repeat",
                        backgroundSize: "128px 128px",
                    }}
                />

                {/* Subtle floating particles */}
                <HeroParticles color={instructor.fieldColor} />

                {/* Hero content */}
                <motion.div
                    className="absolute inset-0 flex items-end"
                    style={{ opacity: heroOpacity, y: textY }}
                >
                    <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-10 pb-20 sm:pb-28 lg:pb-36">
                        {/* Back */}
                        <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                        >
                            <Link
                                href="/egitmenler"
                                className="inline-flex items-center gap-1.5 text-[13px] text-white/35 hover:text-white/70 transition-colors mb-6 sm:mb-8 tracking-wide"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ArrowLeft size={13} />
                                Eğitmenler
                            </Link>
                        </motion.div>

                        {/* Field badge */}
                        <motion.div
                            className="mb-4 sm:mb-5"
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.25 }}
                        >
                            <span
                                className="px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-[11px] font-black tracking-[0.08em] uppercase text-white backdrop-blur-xl"
                                style={{ background: `${instructor.fieldColor}CC` }}
                            >
                                {instructor.field}
                            </span>
                        </motion.div>

                        {/* Name — display font, staggered lines */}
                        <h1 className="mb-3 sm:mb-4 leading-[0.88] tracking-[-0.03em]">
                            <motion.span
                                className="block text-5xl sm:text-7xl lg:text-[7rem] font-black text-white"
                                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                                initial={{ opacity: 0, x: -40, skewX: 2 }}
                                animate={{ opacity: 1, x: 0, skewX: 0 }}
                                transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {instructor.firstName}
                            </motion.span>
                            <motion.span
                                className="block text-5xl sm:text-7xl lg:text-[7rem] font-black text-white/85"
                                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                                initial={{ opacity: 0, x: -40, skewX: 2 }}
                                animate={{ opacity: 1, x: 0, skewX: 0 }}
                                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {instructor.lastName}
                            </motion.span>
                        </h1>

                        {/* Accent bar */}
                        <motion.div
                            className="h-[3px] rounded-full mb-5 sm:mb-6"
                            style={{ background: instructor.fieldColor, width: 0 }}
                            animate={{ width: "clamp(80px, 12vw, 160px)" }}
                            transition={{ duration: 1.0, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        />

                        {/* Title */}
                        <motion.p
                            className="text-base sm:text-lg lg:text-xl text-white/45 mb-6 sm:mb-8 max-w-xl font-light tracking-wide"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.75 }}
                        >
                            {instructor.title}
                        </motion.p>

                        {/* Social links — minimal, editorial */}
                        {socialItems.length > 0 && (
                            <motion.div
                                className="flex items-center gap-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.95 }}
                            >
                                {socialItems.map((s, i) => (
                                    <motion.a
                                        key={s.key}
                                        href={s.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.06] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.14] hover:border-white/[0.12] transition-all duration-300 backdrop-blur-lg"
                                        onClick={(e) => e.stopPropagation()}
                                        initial={{ opacity: 0, scale: 0.7 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: 1.0 + i * 0.06 }}
                                        title={s.label}
                                    >
                                        {s.icon}
                                    </motion.a>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                {/* Scroll hint */}
                <AnimatePresence>
                    {showScrollHint && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 1.8 }}
                            className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
                            onClick={scrollToContent}
                        >
                            <span className="text-[9px] sm:text-[10px] text-white/30 tracking-[0.25em] uppercase font-medium">
                                Keşfet
                            </span>
                            <motion.div
                                animate={{ y: [0, 7, 0] }}
                                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                            >
                                <ChevronDown size={16} className="text-white/30" />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* ════════════════════════════════════════════════════════════
                STATS BAR — horizontal, anchoring transition from hero
               ════════════════════════════════════════════════════════════ */}
            {statItems.length > 0 && (
                <motion.div
                    ref={contentRef}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`relative z-10 border-b ${isDark ? "border-white/[0.06] bg-[var(--theme-bg-primary)]" : "border-black/[0.06] bg-[var(--theme-bg-primary)]"
                        }`}
                >
                    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
                        <div className="flex items-stretch divide-x divide-inherit overflow-x-auto">
                            {statItems.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 + i * 0.08 }}
                                    className="flex items-center gap-3 px-6 sm:px-8 py-5 sm:py-6 shrink-0"
                                >
                                    <div
                                        className="flex items-center justify-center"
                                        style={{ color: instructor.fieldColor }}
                                    >
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <div className="text-xl sm:text-2xl font-bold text-[var(--theme-text-primary)] leading-none">
                                            {stat.value}
                                        </div>
                                        <div className="text-[11px] sm:text-xs text-[var(--theme-text-muted)] mt-0.5 tracking-wide">
                                            {stat.label}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {/* Field indicator */}
                            <div className="flex items-center gap-2.5 px-6 sm:px-8 py-5 sm:py-6 shrink-0 ml-auto">
                                <div
                                    className="w-2.5 h-2.5 rounded-full"
                                    style={{ background: instructor.fieldColor }}
                                />
                                <span className="text-xs sm:text-sm font-semibold text-[var(--theme-text-secondary)]">
                                    {instructor.field}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* ════════════════════════════════════════════════════════════
                MAIN CONTENT — 2 column editorial layout
               ════════════════════════════════════════════════════════════ */}
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-12 sm:py-16 lg:py-20">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

                    {/* ── LEFT COLUMN (editorial content) ── */}
                    <div className="lg:w-[65%] xl:w-[68%] space-y-12 sm:space-y-16">

                        {/* ═══ HAKKINDA — editorial bio with decorative quote ═══ */}
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Section label */}
                            <div className="flex items-center gap-3 mb-6 sm:mb-8">
                                <div
                                    className="w-8 h-[2px] rounded-full"
                                    style={{ background: instructor.fieldColor }}
                                />
                                <span className="text-[10px] sm:text-[11px] font-black tracking-[0.2em] uppercase text-[var(--theme-text-muted)]">
                                    Hakkında
                                </span>
                            </div>

                            {/* Decorative quote mark */}
                            <div className="relative">
                                <div
                                    className="absolute -top-4 -left-2 sm:-left-4 text-[120px] sm:text-[160px] leading-none font-black opacity-[0.04] select-none pointer-events-none"
                                    style={{ fontFamily: "Georgia, serif", color: instructor.fieldColor }}
                                >
                                    &ldquo;
                                </div>

                                {/* Bio text — first sentence larger */}
                                <div className="relative">
                                    {(() => {
                                        const bio = instructor.longBio;
                                        const firstPeriod = bio.indexOf(".");
                                        if (firstPeriod === -1) {
                                            return (
                                                <p className="text-[15px] sm:text-base text-[var(--theme-text-secondary)] leading-[1.85]">
                                                    {bio}
                                                </p>
                                            );
                                        }
                                        const lede = bio.slice(0, firstPeriod + 1);
                                        const rest = bio.slice(firstPeriod + 1).trim();
                                        return (
                                            <>
                                                <p className="text-lg sm:text-xl lg:text-[1.35rem] text-[var(--theme-text-primary)] leading-[1.7] font-medium mb-4 sm:mb-5">
                                                    {lede}
                                                </p>
                                                {rest && (
                                                    <p className="text-[15px] sm:text-base text-[var(--theme-text-secondary)] leading-[1.85]">
                                                        {rest}
                                                    </p>
                                                )}
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>
                        </motion.section>

                        {/* ═══ AKADEMİK GEÇMİŞ — vertical timeline ═══ */}
                        {instructor.universities.length > 0 && (
                            <motion.section
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                                    <div
                                        className="w-8 h-[2px] rounded-full"
                                        style={{ background: instructor.fieldColor }}
                                    />
                                    <span className="text-[10px] sm:text-[11px] font-black tracking-[0.2em] uppercase text-[var(--theme-text-muted)]">
                                        Akademik Geçmiş
                                    </span>
                                </div>

                                <div className="relative pl-6 sm:pl-8">
                                    {/* Timeline line */}
                                    <div
                                        className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-[1.5px] rounded-full opacity-20"
                                        style={{ background: instructor.fieldColor }}
                                    />

                                    <div className="space-y-0">
                                        {instructor.universities.map((uni, i) => (
                                            <motion.div
                                                key={uni}
                                                initial={{ opacity: 0, x: -12 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.06, duration: 0.4 }}
                                                className="relative flex items-center gap-4 py-3 sm:py-3.5 group"
                                            >
                                                {/* Timeline dot */}
                                                <div
                                                    className="absolute -left-6 sm:-left-8 w-[15px] sm:w-[19px] h-[15px] sm:h-[19px] rounded-full border-[2px] flex items-center justify-center transition-colors duration-300"
                                                    style={{
                                                        borderColor: `${instructor.fieldColor}50`,
                                                        background: isDark ? "var(--theme-bg-primary)" : "var(--theme-bg-primary)",
                                                    }}
                                                >
                                                    <div
                                                        className="w-[5px] h-[5px] sm:w-[6px] sm:h-[6px] rounded-full transition-transform duration-300 group-hover:scale-150"
                                                        style={{ background: instructor.fieldColor }}
                                                    />
                                                </div>

                                                <GraduationCap
                                                    size={14}
                                                    className="shrink-0 opacity-40"
                                                    style={{ color: instructor.fieldColor }}
                                                />
                                                <span className="text-sm sm:text-[15px] text-[var(--theme-text-secondary)] group-hover:text-[var(--theme-text-primary)] transition-colors duration-300">
                                                    {uni}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.section>
                        )}

                        {/* ═══ ESERLER — grouped bibliography ═══ */}
                        {instructor.works.length > 0 && (
                            <motion.section
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                                    <div
                                        className="w-8 h-[2px] rounded-full"
                                        style={{ background: instructor.fieldColor }}
                                    />
                                    <span className="text-[10px] sm:text-[11px] font-black tracking-[0.2em] uppercase text-[var(--theme-text-muted)]">
                                        Eserler & Çalışmalar
                                    </span>
                                    <span className={`ml-auto text-[10px] font-bold px-2.5 py-1 rounded-full ${isDark ? "bg-white/[0.05] text-white/40" : "bg-black/[0.05] text-black/40"}`}>
                                        {instructor.works.length}
                                    </span>
                                </div>

                                <div className="space-y-8">
                                    {sortedWorkTypes.map((type) => (
                                        <div key={type}>
                                            {/* Type header */}
                                            <div className="flex items-center gap-2 mb-3">
                                                <div
                                                    className="w-6 h-6 rounded-lg flex items-center justify-center"
                                                    style={{
                                                        background: `${instructor.fieldColor}12`,
                                                        color: instructor.fieldColor,
                                                    }}
                                                >
                                                    {workTypeIcon(type)}
                                                </div>
                                                <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-[var(--theme-text-muted)]">
                                                    {workTypeLabel(type)}
                                                </span>
                                                <div className={`flex-1 h-px ${isDark ? "bg-white/[0.04]" : "bg-black/[0.06]"}`} />
                                            </div>

                                            {/* Works list */}
                                            <div className="space-y-1">
                                                {worksByType[type].map((work, wi) => (
                                                    <motion.div
                                                        key={work.title}
                                                        initial={{ opacity: 0, x: -8 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: wi * 0.04 }}
                                                        className={`flex items-baseline gap-3 py-2.5 px-3 rounded-lg transition-colors duration-200 group ${isDark
                                                            ? "hover:bg-white/[0.03]"
                                                            : "hover:bg-black/[0.02]"
                                                            }`}
                                                    >
                                                        <div
                                                            className="w-1 h-1 rounded-full shrink-0 mt-2 opacity-30 group-hover:opacity-70 transition-opacity"
                                                            style={{ background: instructor.fieldColor }}
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <span className="text-sm font-semibold text-[var(--theme-text-primary)]">
                                                                {work.title}
                                                            </span>
                                                            {work.publisher && (
                                                                <span className="text-xs text-[var(--theme-text-muted)] ml-2">
                                                                    — {work.publisher}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        )}

                        {/* ═══ DANIŞMANLIK CTA — premium invitation ═══ */}
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div
                                className="relative rounded-2xl overflow-hidden"
                                style={{
                                    background: isDark
                                        ? `linear-gradient(135deg, ${instructor.fieldColor}08, ${instructor.fieldColor}03, transparent)`
                                        : `linear-gradient(135deg, ${instructor.fieldColor}12, ${instructor.fieldColor}05, transparent)`,
                                }}
                            >
                                {/* Grain */}
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-[0.03]"
                                    style={{
                                        backgroundImage: noiseSvg,
                                        backgroundRepeat: "repeat",
                                        backgroundSize: "128px 128px",
                                    }}
                                />

                                <div className={`relative border rounded-2xl p-6 sm:p-8 ${isDark ? "border-white/[0.06]" : "border-black/[0.06]"}`}>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                                        {/* Left — photo circle + info */}
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-cover bg-center shrink-0 border-2"
                                                style={{
                                                    backgroundImage: `url(${instructor.image})`,
                                                    borderColor: `${instructor.fieldColor}40`,
                                                }}
                                            />
                                            <div>
                                                <div className="text-base sm:text-lg font-bold text-[var(--theme-text-primary)]">
                                                    Birebir Danışmanlık
                                                </div>
                                                <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] mt-0.5">
                                                    {instructor.firstName} {instructor.lastName} ile kişisel görüşme
                                                </p>
                                            </div>
                                        </div>

                                        {/* Right — CTA */}
                                        <div className="sm:ml-auto flex items-center gap-3">
                                            <div className="flex items-center gap-3 text-xs text-[var(--theme-text-muted)]">
                                                <span className="flex items-center gap-1">
                                                    <MessageCircle size={11} />
                                                    Birebir
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={11} />
                                                    Haftalık
                                                </span>
                                            </div>
                                            <Link
                                                href="/danismanlik"
                                                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm font-bold transition-all hover:gap-3 hover:shadow-lg shrink-0"
                                                style={{
                                                    background: instructor.fieldColor,
                                                    color: ["#FFBC0B", "#00D9FF"].includes(instructor.fieldColor) ? "#000" : "#fff",
                                                }}
                                            >
                                                Randevu Al
                                                <ArrowRight size={14} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.section>
                    </div>

                    {/* ── RIGHT COLUMN — sticky sidebar ── */}
                    <div className="lg:w-[35%] xl:w-[32%]">
                        <div className="lg:sticky lg:top-24 space-y-5">

                            {/* Sidebar header */}
                            {instructorCourses.length > 0 && (
                                <div className="flex items-center gap-3 px-1">
                                    <div
                                        className="w-5 h-[2px] rounded-full"
                                        style={{ background: instructor.fieldColor }}
                                    />
                                    <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[var(--theme-text-muted)]">
                                        Eğitimleri
                                    </span>
                                    <span
                                        className="text-[10px] font-bold px-2 py-0.5 rounded-full ml-auto"
                                        style={{
                                            background: `${instructor.fieldColor}15`,
                                            color: instructor.fieldColor,
                                        }}
                                    >
                                        {instructorCourses.length}
                                    </span>
                                </div>
                            )}

                            {/* Course cards */}
                            {instructorCourses.map((course, idx) => (
                                <motion.div
                                    key={course.id}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                                    className={`group rounded-2xl overflow-hidden transition-all duration-500 ${isDark
                                        ? "bg-[var(--theme-bg-card)] border border-white/[0.06] hover:border-white/[0.12]"
                                        : "bg-white border border-black/[0.06] shadow-sm hover:shadow-xl"
                                        }`}
                                    style={{
                                        boxShadow: isDark ? "none" : undefined,
                                    }}
                                >
                                    {/* Thumbnail */}
                                    <Link
                                        href={`/ders/${course.categorySlug}/${course.slug}`}
                                        className="block relative aspect-[16/9] overflow-hidden"
                                    >
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                                            style={{
                                                backgroundImage: `url(${course.coverImage || instructor.image})`,
                                            }}
                                        />
                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />

                                        {/* Play */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div
                                                className="w-11 h-11 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110"
                                                style={{ background: instructor.fieldColor }}
                                            >
                                                <Play
                                                    size={15}
                                                    fill={["#FFBC0B", "#00D9FF"].includes(instructor.fieldColor) ? "#000" : "#fff"}
                                                    className="ml-0.5"
                                                    color={["#FFBC0B", "#00D9FF"].includes(instructor.fieldColor) ? "#000" : "#fff"}
                                                />
                                            </div>
                                        </div>

                                        {/* Badges */}
                                        <div className="absolute top-2.5 left-2.5">
                                            <span
                                                className="px-2.5 py-1 rounded-full text-[10px] font-bold text-white backdrop-blur-md"
                                                style={{ background: `${instructor.fieldColor}CC` }}
                                            >
                                                {course.category}
                                            </span>
                                        </div>
                                        <div className="absolute top-2.5 right-2.5">
                                            <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold text-white/80 bg-black/30 backdrop-blur-md flex items-center gap-1">
                                                <Clock size={9} />
                                                {course.duration}
                                            </span>
                                        </div>
                                    </Link>

                                    {/* Info */}
                                    <div className="p-4 sm:p-5">
                                        <Link href={`/ders/${course.categorySlug}/${course.slug}`}>
                                            <h3 className="text-[15px] sm:text-base font-bold text-[var(--theme-text-primary)] mb-1.5 leading-snug transition-colors duration-200 hover:text-[var(--theme-accent)]">
                                                {course.title}
                                            </h3>
                                        </Link>
                                        <p className="text-xs text-[var(--theme-text-muted)] leading-relaxed mb-4 line-clamp-2">
                                            {course.tagline || course.description}
                                        </p>

                                        {/* Price row */}
                                        <div className="flex items-center justify-between mb-3.5">
                                            <div className="flex items-baseline gap-1.5">
                                                <span className="text-lg font-bold text-[var(--theme-text-primary)]">
                                                    ₺{course.price.toLocaleString("tr-TR")}
                                                </span>
                                                {course.discount > 0 && (
                                                    <span className="text-xs text-[var(--theme-text-muted)] line-through">
                                                        ₺{course.originalPrice.toLocaleString("tr-TR")}
                                                    </span>
                                                )}
                                            </div>
                                            {course.discount > 0 && (
                                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-500">
                                                    %{course.discount}
                                                </span>
                                            )}
                                        </div>

                                        {/* CTA */}
                                        <Link
                                            href={`/ders/${course.categorySlug}/${course.slug}`}
                                            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-300 hover:gap-3"
                                            style={{
                                                background: instructor.fieldColor,
                                                color: ["#FFBC0B", "#00D9FF"].includes(instructor.fieldColor) ? "#000" : "#fff",
                                            }}
                                        >
                                            <Play
                                                size={13}
                                                fill={["#FFBC0B", "#00D9FF"].includes(instructor.fieldColor) ? "#000" : "#fff"}
                                                color={["#FFBC0B", "#00D9FF"].includes(instructor.fieldColor) ? "#000" : "#fff"}
                                            />
                                            Eğitime Git
                                            <ArrowRight size={13} />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ════════════════════════════════════════════════════════════
                OTHER INSTRUCTORS — editorial grid with varied sizing
               ════════════════════════════════════════════════════════════ */}
            <section className={`border-t ${isDark ? "border-white/[0.04]" : "border-black/[0.04]"}`}>
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3 mb-8 sm:mb-10">
                            <div className="w-8 h-[2px] rounded-full bg-[var(--theme-text-muted)] opacity-40" />
                            <span className="text-[10px] sm:text-[11px] font-black tracking-[0.2em] uppercase text-[var(--theme-text-muted)]">
                                Diğer Eğitmenler
                            </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                            {others.map((other, i) => (
                                <motion.div
                                    key={other.slug}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.06, duration: 0.5 }}
                                >
                                    <Link
                                        href={`/egitmenler/${other.slug}`}
                                        className={`group block rounded-2xl overflow-hidden transition-all duration-500 ${isDark
                                            ? "bg-[var(--theme-bg-card)] border border-white/[0.04] hover:border-white/[0.1]"
                                            : "bg-white border border-black/[0.04] hover:shadow-xl"
                                            }`}
                                    >
                                        <div className="relative aspect-[3/4] overflow-hidden">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                                                style={{ backgroundImage: `url(${other.image})` }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                            {/* Subtle fieldColor accent on hover */}
                                            <div
                                                className="absolute bottom-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                                                style={{ background: other.fieldColor }}
                                            />

                                            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                                                <div className="text-sm sm:text-[15px] font-bold text-white leading-tight mb-0.5">
                                                    {other.firstName} {other.lastName}
                                                </div>
                                                <div className="text-[10px] sm:text-[11px] text-white/50 flex items-center gap-1.5">
                                                    <div
                                                        className="w-1.5 h-1.5 rounded-full"
                                                        style={{ background: other.fieldColor }}
                                                    />
                                                    {other.field}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
