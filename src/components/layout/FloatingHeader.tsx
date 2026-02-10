"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Sun, Moon, ChevronDown, ChevronRight, Package } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

// Akademi dropdown kategorileri
const akademiCategories = [
    {
        name: "Mitoloji",
        icon: "🏛️",
        color: "#FFBC0B",
        courses: [
            { title: "Mitoloji Paketi", href: "/ders/mitoloji/mitoloji-paketi", badge: "Paket" },
            { title: "Mitolojiye Giriş", href: "/ders/mitoloji/mitolojiye-giris" },
            { title: "Tanrıların Evrimi", href: "/ders/mitoloji/tanrilarin-evrimi" },
        ],
    },
    {
        name: "Felsefe",
        icon: "💡",
        color: "#10B981",
        courses: [
            { title: "Felsefe Paketi", href: "/ders/felsefe/felsefe-paketi", badge: "Paket" },
            { title: "Felsefeye Giriş", href: "/ders/felsefe/felsefeye-giris" },
            { title: "Antik Felsefenin Başlangıcı", href: "/ders/felsefe/antik-felsefenin-baslangici" },
        ],
    },
    {
        name: "Psikoloji",
        icon: "🧠",
        color: "#A855F7",
        courses: [
            { title: "Psikolojiye Giriş", href: "/ders/psikoloji/psikolojiye-giris" },
        ],
    },
    {
        name: "Siyaset Bilimi",
        icon: "⚖️",
        color: "#64748B",
        courses: [
            { title: "Siyaset Bilimi Paketi", href: "/ders/siyaset-bilimi/siyaset-bilimi-paketi", badge: "Paket" },
            { title: "İdeolojiler", href: "/ders/siyaset-bilimi/ideoloji" },
            { title: "Kapitalizmin Tarihi", href: "/ders/siyaset-bilimi/kapitalizm-tarihi" },
        ],
    },
    {
        name: "Sosyoloji",
        icon: "🌍",
        color: "#EA580C",
        courses: [
            { title: "Sosyolojiye Giriş", href: "/ders/sosyoloji/sosyolojiye-giris" },
        ],
    },
    {
        name: "Sanat",
        icon: "🎨",
        color: "#F43F5E",
        courses: [
            { title: "Temel Sanat Eğitimi", href: "/ders/temel-sanat/temel-sanat-egitimi" },
        ],
    },
];

// Eğitmenler dropdown
const egitmenler = [
    { name: "Nevzat Kaya", field: "Mitoloji", color: "#FFBC0B", href: "/egitmenler/nevzat-kaya" },
    { name: "Ömer Aygün", field: "Felsefe", color: "#10B981", href: "/egitmenler/omer-aygun" },
    { name: "Alper Hasanoğlu", field: "Psikoloji", color: "#A855F7", href: "/egitmenler/alper-hasanoglu" },
    { name: "Ömer Gemalmaz", field: "Siyaset Bilimi", color: "#64748B", href: "/egitmenler/omer-gemalmaz" },
    { name: "Besim Dellaloğlu", field: "Sosyoloji", color: "#EA580C", href: "/egitmenler/besim-dellaloglu" },
    { name: "İlker Canikligil", field: "Temel Sanat", color: "#F43F5E", href: "/egitmenler/ilker-canikligil" },
];

const navItems = [
    { name: "Etkinlikler", href: "/etkinlikler" },
    { name: "Danışmanlık", href: "/danismanlik" },
    { name: "Destek", href: "/iletisim" },
];

export default function FloatingHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAkademiOpen, setIsAkademiOpen] = useState(false);
    const [isEgitmenlerOpen, setIsEgitmenlerOpen] = useState(false);
    const [mobileAkademiOpen, setMobileAkademiOpen] = useState(false);
    const [mobileEgitmenlerOpen, setMobileEgitmenlerOpen] = useState(false);
    const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
    const [hoveredNav, setHoveredNav] = useState<string | null>(null);
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';
    const akademiRef = useRef<HTMLDivElement>(null);
    const egitmenlerRef = useRef<HTMLDivElement>(null);
    const akademiTimeout = useRef<NodeJS.Timeout | null>(null);
    const egitmenlerTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (akademiRef.current && !akademiRef.current.contains(e.target as Node)) setIsAkademiOpen(false);
            if (egitmenlerRef.current && !egitmenlerRef.current.contains(e.target as Node)) setIsEgitmenlerOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleEnter = (setter: (v: boolean) => void, timeout: React.MutableRefObject<NodeJS.Timeout | null>) => {
        if (timeout.current) clearTimeout(timeout.current);
        setter(true);
    };
    const handleLeave = (setter: (v: boolean) => void, timeout: React.MutableRefObject<NodeJS.Timeout | null>) => {
        timeout.current = setTimeout(() => setter(false), 150);
    };

    return (
        <>
            <motion.header
                className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <motion.div
                    className="rounded-2xl px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-300"
                    style={{
                        background: isScrolled ? "rgba(5, 17, 30, 0.95)" : "rgba(5, 17, 30, 0.9)",
                        backdropFilter: isScrolled ? "blur(20px)" : "blur(10px)",
                        border: isScrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(255, 255, 255, 0.05)",
                        boxShadow: isScrolled ? "0 8px 32px rgba(0, 0, 0, 0.4)" : "0 4px 20px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                        <motion.img
                            src="/images/flu-logo.svg"
                            alt="Flu Akademi"
                            className="w-8 h-8 object-contain"
                            whileHover={{ scale: 1.05 }}
                        />
                        <div className="hidden sm:block">
                            <div className="font-bold text-base leading-tight text-white">Flu</div>
                            <div className="text-[9px] -mt-0.5 tracking-widest text-gray-400">AKADEMİ</div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-0">
                        {/* Akademi Dropdown */}
                        <div
                            ref={akademiRef}
                            className="relative"
                            onMouseEnter={() => handleEnter(setIsAkademiOpen, akademiTimeout)}
                            onMouseLeave={() => handleLeave(setIsAkademiOpen, akademiTimeout)}
                        >
                            <Link
                                href="/egitimler"
                                className={`px-3 py-2 text-[13px] font-medium transition-colors flex items-center gap-1 rounded-lg ${isAkademiOpen ? "text-white bg-white/5" : "text-gray-300 hover:text-white"}`}
                            >
                                Akademi
                                <ChevronDown size={12} className={`transition-transform duration-200 ${isAkademiOpen ? "rotate-180" : ""}`} />
                            </Link>

                            <AnimatePresence>
                                {isAkademiOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 6 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute top-full left-0 mt-2 w-[520px] rounded-xl overflow-hidden"
                                        style={{
                                            background: "rgba(8, 20, 35, 0.98)",
                                            backdropFilter: "blur(24px)",
                                            border: "1px solid rgba(255, 255, 255, 0.08)",
                                            boxShadow: "0 16px 48px rgba(0, 0, 0, 0.5)",
                                        }}
                                    >
                                        <div className="p-3.5">
                                            {/* Tüm Eğitimler */}
                                            <Link
                                                href="/ders/tum-egitimler/flu"
                                                className="flex items-center gap-3 p-2.5 rounded-lg mb-2 transition-all hover:brightness-110"
                                                style={{ background: "linear-gradient(135deg, rgba(255, 188, 11, 0.12), rgba(247, 74, 74, 0.12))" }}
                                                onClick={() => setIsAkademiOpen(false)}
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FFBC0B] to-[#F74A4A] flex items-center justify-center shrink-0">
                                                    <Package size={16} className="text-white" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-bold text-white">Tüm Eğitimler Paketi</div>
                                                    <div className="text-[11px] text-gray-400">6 ders • 60+ saat • %30 indirim</div>
                                                </div>
                                                <span className="px-2 py-0.5 text-[9px] font-bold bg-gradient-to-r from-[#FFBC0B] to-[#F74A4A] text-white rounded-full shrink-0">
                                                    EN AVANTAJLI
                                                </span>
                                            </Link>

                                            {/* Kategori grid - 3 sütun */}
                                            <div className="grid grid-cols-3 gap-x-2 gap-y-1">
                                                {akademiCategories.map((cat) => (
                                                    <div key={cat.name}>
                                                        <div className="flex items-center gap-1.5 px-2 py-2">
                                                            <span className="text-base">{cat.icon}</span>
                                                            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{cat.name}</span>
                                                        </div>
                                                        {cat.courses.map((course) => (
                                                            <Link
                                                                key={course.href}
                                                                href={course.href}
                                                                className="flex items-center gap-1.5 px-2 py-[7px] rounded-md text-[13px] text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                                                                onClick={() => setIsAkademiOpen(false)}
                                                            >
                                                                <div className="w-1 h-1 rounded-full shrink-0" style={{ background: cat.color }} />
                                                                <span className="truncate">{course.title}</span>
                                                                {course.badge && (
                                                                    <span className="px-1 py-px text-[8px] font-semibold rounded shrink-0"
                                                                        style={{ background: `${cat.color}20`, color: cat.color }}>
                                                                        {course.badge}
                                                                    </span>
                                                                )}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Etkinlikler, Danışmanlık */}
                        {navItems.slice(0, 2).map((item) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                className="px-3 py-2 text-[13px] font-medium transition-colors text-gray-300 hover:text-white rounded-lg hover:bg-white/5"
                                onHoverStart={() => setHoveredNav(item.name)}
                                onHoverEnd={() => setHoveredNav(null)}
                            >
                                {item.name}
                            </motion.a>
                        ))}

                        {/* Eğitmenler Dropdown */}
                        <div
                            ref={egitmenlerRef}
                            className="relative"
                            onMouseEnter={() => handleEnter(setIsEgitmenlerOpen, egitmenlerTimeout)}
                            onMouseLeave={() => handleLeave(setIsEgitmenlerOpen, egitmenlerTimeout)}
                        >
                            <button
                                className={`px-3 py-2 text-[13px] font-medium transition-colors flex items-center gap-1 rounded-lg ${isEgitmenlerOpen ? "text-white bg-white/5" : "text-gray-300 hover:text-white"}`}
                                onClick={() => setIsEgitmenlerOpen(!isEgitmenlerOpen)}
                            >
                                Eğitmenler
                                <ChevronDown size={12} className={`transition-transform duration-200 ${isEgitmenlerOpen ? "rotate-180" : ""}`} />
                            </button>

                            <AnimatePresence>
                                {isEgitmenlerOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 6 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute top-full right-0 mt-2 w-[280px] rounded-xl overflow-hidden"
                                        style={{
                                            background: "rgba(8, 20, 35, 0.98)",
                                            backdropFilter: "blur(24px)",
                                            border: "1px solid rgba(255, 255, 255, 0.08)",
                                            boxShadow: "0 16px 48px rgba(0, 0, 0, 0.5)",
                                        }}
                                    >
                                        <div className="p-2">
                                            {egitmenler.map((e) => (
                                                <Link
                                                    key={e.name}
                                                    href={e.href}
                                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all group"
                                                    onClick={() => setIsEgitmenlerOpen(false)}
                                                >
                                                    <div
                                                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                                                        style={{ background: `${e.color}30`, color: e.color }}
                                                    >
                                                        {e.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-[13px] font-medium text-gray-200 group-hover:text-white transition-colors">{e.name}</div>
                                                        <div className="text-[11px] text-gray-500">{e.field}</div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Destek */}
                        <motion.a
                            href="/destek"
                            className="px-3 py-2 text-[13px] font-medium transition-colors text-gray-300 hover:text-white rounded-lg hover:bg-white/5"
                            onHoverStart={() => setHoveredNav("Destek")}
                            onHoverEnd={() => setHoveredNav(null)}
                        >
                            Destek
                        </motion.a>
                    </nav>

                    {/* Auth Buttons */}
                    <div className="hidden lg:flex items-center gap-2 shrink-0">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-3 py-1.5 text-[13px] font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            Giriş Yap
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255, 188, 11, 0.3)" }}
                            whileTap={{ scale: 0.98 }}
                            className="group flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-black bg-gradient-to-r from-[#FFBC0B] to-[#FFA500] rounded-xl"
                        >
                            <Sparkles size={13} className="group-hover:animate-pulse" />
                            Başla
                        </motion.button>

                        <button
                            onClick={toggleTheme}
                            className="relative ml-1"
                            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                        >
                            <div className="relative w-12 h-6 rounded-full transition-colors duration-300 bg-[#1a2744]">
                                <motion.div
                                    className="absolute top-0.5 w-5 h-5 rounded-full shadow-lg flex items-center justify-center bg-[#0a1628]"
                                    animate={{ left: isDark ? 'calc(100% - 22px)' : '2px' }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                >
                                    {isDark ? <Moon size={11} className="text-[#FFBC0B]" /> : <Sun size={11} className="text-[#FFBC0B]" />}
                                </motion.div>
                            </div>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="lg:hidden p-2 text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </motion.button>
                </motion.div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="lg:hidden mt-2 rounded-2xl overflow-hidden"
                            style={{
                                background: "rgba(8, 20, 35, 0.98)",
                                backdropFilter: "blur(24px)",
                                border: "1px solid rgba(255, 255, 255, 0.08)",
                            }}
                        >
                            <nav className="p-3 space-y-0.5">
                                {/* Akademi Accordion */}
                                <div>
                                    <button
                                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white transition-colors hover:bg-white/5"
                                        onClick={() => setMobileAkademiOpen(!mobileAkademiOpen)}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#FFBC0B]" />
                                            Akademi
                                        </div>
                                        <ChevronDown size={14} className={`transition-transform duration-200 ${mobileAkademiOpen ? "rotate-180" : ""}`} />
                                    </button>

                                    <AnimatePresence>
                                        {mobileAkademiOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden"
                                            >
                                                <Link
                                                    href="/ders/tum-egitimler/flu"
                                                    className="flex items-center gap-2.5 mx-2 mt-1 p-2.5 rounded-lg transition-all"
                                                    style={{ background: "linear-gradient(135deg, rgba(255, 188, 11, 0.1), rgba(247, 74, 74, 0.1))" }}
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    <Package size={14} className="text-[#FFBC0B]" />
                                                    <span className="text-sm font-semibold text-white">Tüm Eğitimler Paketi</span>
                                                    <span className="ml-auto px-1.5 py-0.5 text-[8px] font-bold bg-gradient-to-r from-[#FFBC0B] to-[#F74A4A] text-white rounded-full">%30</span>
                                                </Link>

                                                <div className="mt-1 px-2 space-y-0">
                                                    {akademiCategories.map((cat) => (
                                                        <div key={cat.name}>
                                                            <button
                                                                className="w-full flex items-center justify-between px-2.5 py-2 rounded-md text-sm text-gray-400 hover:text-white transition-colors"
                                                                onClick={() => setExpandedMobileCategory(expandedMobileCategory === cat.name ? null : cat.name)}
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-sm">{cat.icon}</span>
                                                                    <span className="font-medium text-[13px]">{cat.name}</span>
                                                                </div>
                                                                <ChevronRight size={12} className={`transition-transform duration-200 ${expandedMobileCategory === cat.name ? "rotate-90" : ""}`} />
                                                            </button>
                                                            <AnimatePresence>
                                                                {expandedMobileCategory === cat.name && (
                                                                    <motion.div
                                                                        initial={{ height: 0, opacity: 0 }}
                                                                        animate={{ height: "auto", opacity: 1 }}
                                                                        exit={{ height: 0, opacity: 0 }}
                                                                        transition={{ duration: 0.12 }}
                                                                        className="overflow-hidden pl-7"
                                                                    >
                                                                        {cat.courses.map((course) => (
                                                                            <Link
                                                                                key={course.href}
                                                                                href={course.href}
                                                                                className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[13px] text-gray-500 hover:text-white hover:bg-white/5 transition-all"
                                                                                onClick={() => setIsMenuOpen(false)}
                                                                            >
                                                                                <div className="w-1 h-1 rounded-full shrink-0" style={{ background: cat.color }} />
                                                                                {course.title}
                                                                            </Link>
                                                                        ))}
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Etkinlikler & Danışmanlık */}
                                {navItems.slice(0, 2).map((item, idx) => {
                                    const colors = ["#FF6B6B", "#A855F7"];
                                    return (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: colors[idx] }} />
                                            {item.name}
                                        </a>
                                    );
                                })}

                                {/* Eğitmenler Accordion */}
                                <div>
                                    <button
                                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white transition-colors hover:bg-white/5"
                                        onClick={() => setMobileEgitmenlerOpen(!mobileEgitmenlerOpen)}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#00D9FF]" />
                                            Eğitmenler
                                        </div>
                                        <ChevronDown size={14} className={`transition-transform duration-200 ${mobileEgitmenlerOpen ? "rotate-180" : ""}`} />
                                    </button>

                                    <AnimatePresence>
                                        {mobileEgitmenlerOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden px-2 mt-0.5"
                                            >
                                                {egitmenler.map((e) => (
                                                    <Link
                                                        key={e.name}
                                                        href={e.href}
                                                        className="flex items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-white/5 transition-all"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        <div
                                                            className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                                                            style={{ background: `${e.color}25`, color: e.color }}
                                                        >
                                                            {e.name.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <div>
                                                            <div className="text-[13px] text-gray-300">{e.name}</div>
                                                            <div className="text-[11px] text-gray-500">{e.field}</div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Destek */}
                                <a
                                    href="/destek"
                                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                                    Destek
                                </a>

                                <hr className="my-2 border-white/5" />
                                <button className="w-full px-4 py-2.5 text-center text-sm text-black font-semibold bg-gradient-to-r from-[#FFBC0B] to-[#FFA500] rounded-xl">
                                    Hemen Başla
                                </button>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>
        </>
    );
}
