"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, User, BookOpen, Sparkles } from "lucide-react";
import Link from "next/link";

const navItems = [
    { name: "Akademi", href: "#akademi", color: "#FFBC0B" },
    { name: "Dijital", href: "#dijital", color: "#00D9FF" },
    { name: "Etkinlikler", href: "#etkinlik", color: "#FF6B6B" },
    { name: "Danışmanlık", href: "#danismanlik", color: "#A855F7" },
];

export default function FloatingHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredNav, setHoveredNav] = useState<string | null>(null);

    const { scrollY } = useScroll();
    const headerOpacity = useTransform(scrollY, [0, 100], [0, 1]);
    const headerBlur = useTransform(scrollY, [0, 100], [0, 12]);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.header
                className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <motion.div
                    className="rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-300"
                    style={{
                        background: isScrolled
                            ? "rgba(10, 10, 10, 0.85)"
                            : "rgba(255, 255, 255, 0.05)",
                        backdropFilter: isScrolled ? "blur(20px)" : "blur(10px)",
                        border: isScrolled
                            ? "1px solid rgba(255, 255, 255, 0.1)"
                            : "1px solid rgba(255, 255, 255, 0.05)",
                        boxShadow: isScrolled
                            ? "0 8px 32px rgba(0, 0, 0, 0.4)"
                            : "none",
                    }}
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <motion.div
                            className="relative w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#FFBC0B] to-[#FF6B6B]" />
                            <span className="relative text-black font-bold text-xl">F</span>
                        </motion.div>
                        <div className="hidden sm:block">
                            <div className="font-bold text-white text-lg leading-tight">
                                Flu
                            </div>
                            <div className="text-[10px] text-gray-400 -mt-1 tracking-widest">
                                AKADEMİ
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                                onHoverStart={() => setHoveredNav(item.name)}
                                onHoverEnd={() => setHoveredNav(null)}
                            >
                                {item.name}
                                {hoveredNav === item.name && (
                                    <motion.div
                                        layoutId="navIndicator"
                                        className="absolute inset-0 rounded-lg -z-10"
                                        style={{ background: `${item.color}20` }}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                                    />
                                )}
                                {hoveredNav === item.name && (
                                    <motion.div
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                                        style={{ background: item.color }}
                                        layoutId="navDot"
                                    />
                                )}
                            </motion.a>
                        ))}
                    </nav>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            Giriş Yap
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255, 188, 11, 0.3)" }}
                            whileTap={{ scale: 0.98 }}
                            className="group flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-black bg-gradient-to-r from-[#FFBC0B] to-[#FFA500] rounded-xl"
                        >
                            <Sparkles size={14} className="group-hover:animate-pulse" />
                            Başla
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="md:hidden p-2 text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.button>
                </motion.div>

                {/* Mobile Menu */}
                <motion.div
                    initial={false}
                    animate={{
                        height: isMenuOpen ? "auto" : 0,
                        opacity: isMenuOpen ? 1 : 0,
                    }}
                    className="md:hidden mt-2 rounded-2xl overflow-hidden"
                    style={{
                        background: "rgba(10, 10, 10, 0.95)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                >
                    <nav className="p-4 space-y-2">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white transition-colors"
                                style={{ background: `${item.color}10` }}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ background: item.color }}
                                />
                                {item.name}
                            </a>
                        ))}
                        <hr className="border-white/10 my-3" />
                        <button className="w-full px-4 py-3 text-center text-black font-semibold bg-gradient-to-r from-[#FFBC0B] to-[#FFA500] rounded-xl">
                            Hemen Başla
                        </button>
                    </nav>
                </motion.div>
            </motion.header>
        </>
    );
}
