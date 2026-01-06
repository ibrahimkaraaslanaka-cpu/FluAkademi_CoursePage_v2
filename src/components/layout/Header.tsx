"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, User, BookOpen } from "lucide-react";
import Link from "next/link";

const navItems = [
    { name: "Flu Akademi", href: "#flu-akademi" },
    { name: "Dijital Akademi", href: "#dijital-akademi" },
    { name: "Etkinlikler", href: "#etkinlikler" },
    { name: "Danışmanlık", href: "#danismanlik" },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Flu Akademi");

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">F</span>
                        </div>
                        <span className="font-bold text-black text-lg hidden sm:block">
                            Flu Akademi
                        </span>
                    </Link>

                    {/* Desktop Navigation - Tab Style */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => setActiveTab(item.name)}
                                className={`px-4 py-5 text-sm font-medium transition-all ${activeTab === item.name
                                        ? "text-[#FFBC0B] border-b-2 border-[#FFBC0B]"
                                        : "text-gray-600 hover:text-black border-b-2 border-transparent"
                                    }`}
                            >
                                {item.name}
                            </button>
                        ))}
                    </nav>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            href="/derslerim"
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-black bg-[#FFBC0B] rounded-lg hover:bg-[#E5A800] transition-colors"
                        >
                            <BookOpen size={16} />
                            Derslerim
                        </Link>
                        <Link
                            href="/giris"
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#FF6B6B] rounded-lg hover:bg-[#ee5a5a] transition-colors"
                        >
                            <User size={16} />
                            Giriş Yap
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-600"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="md:hidden bg-white border-t"
                >
                    <nav className="px-4 py-4 space-y-2">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                        <hr className="my-3" />
                        <Link
                            href="/giris"
                            className="block px-4 py-3 text-center text-white bg-[#FF6B6B] rounded-lg"
                        >
                            Giriş Yap
                        </Link>
                    </nav>
                </motion.div>
            )}
        </header>
    );
}
