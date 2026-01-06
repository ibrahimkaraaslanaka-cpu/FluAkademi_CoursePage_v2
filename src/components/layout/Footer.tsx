"use client";

import Link from "next/link";
import { Instagram, Twitter, Youtube, Linkedin, Mail } from "lucide-react";

const footerLinks = {
    platform: [
        { name: "Flu Akademi", href: "/akademi" },
        { name: "Dijital Akademi", href: "/dijital" },
        { name: "Etkinlikler", href: "/etkinlikler" },
        { name: "Danışmanlık", href: "/danismanlik" },
    ],
    company: [
        { name: "Hakkımızda", href: "/hakkimizda" },
        { name: "Eğitmenler", href: "/egitmenler" },
        { name: "Blog", href: "/blog" },
        { name: "İletişim", href: "/iletisim" },
    ],
    legal: [
        { name: "Kullanım Koşulları", href: "/kosullar" },
        { name: "Gizlilik Politikası", href: "/gizlilik" },
        { name: "KVKK", href: "/kvkk" },
    ],
};

const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/fluakademi" },
    { icon: Twitter, href: "https://twitter.com/fluakademi" },
    { icon: Youtube, href: "https://youtube.com/@fluakademi" },
    { icon: Linkedin, href: "https://linkedin.com/company/fluakademi" },
];

export default function Footer() {
    return (
        <footer className="bg-[#0a0a0a] border-t border-[#262626]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-[#FFBC0B] rounded-lg flex items-center justify-center">
                                <span className="text-black font-bold text-xl">F</span>
                            </div>
                            <span className="font-bold text-white text-xl">Flu Akademi</span>
                        </Link>
                        <p className="text-gray-400 mb-6 max-w-sm">
                            Türkiye'nin premium online eğitim platformu. Bilgi ve becerilerinizi
                            geliştirin, kariyerinizi dönüştürün.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-4">
                            {socialLinks.map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-gray-400 hover:bg-[#FFBC0B] hover:text-black transition-all"
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Platform</h4>
                        <ul className="space-y-3">
                            {footerLinks.platform.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-[#FFBC0B] transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Şirket</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-[#FFBC0B] transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Yasal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-[#FFBC0B] transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-[#262626] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © 2024 Flu Akademi. Tüm hakları saklıdır.
                    </p>
                    <a
                        href="mailto:info@fluakademi.com"
                        className="flex items-center gap-2 text-gray-400 hover:text-[#FFBC0B] transition-colors"
                    >
                        <Mail size={16} />
                        info@fluakademi.com
                    </a>
                </div>
            </div>
        </footer>
    );
}
