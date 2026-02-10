"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    MapPin,
    Users,
    Clock,
    ArrowRight,
    Sparkles,
    Video,
    Building2,
    ChevronRight,
    ExternalLink,
} from "lucide-react";
import FloatingHeader from "@/components/layout/FloatingHeader";
import Footer from "@/components/layout/Footer";
import { useTheme } from "@/context/ThemeContext";

// ——— Data ———

interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    type: "online" | "yuz-yuze";
    location: string;
    speaker: string;
    speakerTitle: string;
    image: string;
    attendees: number;
    category: string;
    color: string;
    isFeatured?: boolean;
}

const upcomingEvents: Event[] = [
    {
        id: "hannibal",
        title: "Hannibal: Roma'nın Kabusu",
        description: "Kartaca'nın efsanevi komutanı Hannibal Barca'nın Roma İmparatorluğu'na karşı verdiği destansı mücadeleyi keşfedin.",
        date: "22 Şubat 2026",
        time: "20:00",
        type: "online",
        location: "Zoom",
        speaker: "Nevzat Kaya",
        speakerTitle: "Tarihçi & Yazar",
        image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=600&h=400&fit=crop&q=80",
        attendees: 245,
        category: "Tarih",
        color: "#FFBC0B",
        isFeatured: true,
    },
    {
        id: "premiere-pro",
        title: "Premiere Pro ile Video Düzenleme",
        description: "Profesyonel video düzenleme tekniklerini öğrenin. Temel kesme, renk düzeltme ve efekt kullanımı.",
        date: "1 Mart 2026",
        time: "19:00",
        type: "online",
        location: "Zoom",
        speaker: "Arda Yılmaz",
        speakerTitle: "Video Prodüktör",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop&q=80",
        attendees: 180,
        category: "Dijital",
        color: "#00D9FF",
    },
    {
        id: "sinema-101",
        title: "Sinema Tarihi: Sessiz Filmlerden Blockbuster'a",
        description: "Sinemanın doğuşundan günümüze uzanan yolculuğu keşfedin. Lumière kardeşlerden Nolan'a.",
        date: "8 Mart 2026",
        time: "20:30",
        type: "online",
        location: "Zoom",
        speaker: "Selin Öztürk",
        speakerTitle: "Film Eleştirmeni",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=400&fit=crop&q=80",
        attendees: 310,
        category: "Sanat",
        color: "#F43F5E",
    },
    {
        id: "felsefe-sofrasi",
        title: "Felsefe Sofrası: Stoacılık ve Modern Hayat",
        description: "Antik Stoa felsefesinin günümüz yaşamına nasıl uygulanabileceğini tartışıyoruz.",
        date: "15 Mart 2026",
        time: "19:30",
        type: "yuz-yuze",
        location: "İstanbul, Kadıköy",
        speaker: "Prof. Dr. Emre Demir",
        speakerTitle: "Felsefe Profesörü",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop&q=80",
        attendees: 40,
        category: "Felsefe",
        color: "#A855F7",
    },
];

interface PastEvent {
    id: string;
    title: string;
    date: string;
    image: string;
    attendees: number;
    category: string;
}

const pastEvents: PastEvent[] = [
    {
        id: "nesin-kampi",
        title: "Nesin Matematik Köyü Kampı",
        date: "Ocak 2026",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop&q=80",
        attendees: 65,
        category: "Eğitim",
    },
    {
        id: "boyle-buyurdu",
        title: "Böyle Buyurdu Kültür",
        date: "Aralık 2025",
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop&q=80",
        attendees: 320,
        category: "Kültür",
    },
    {
        id: "dijital-pazarlama",
        title: "Dijital Pazarlama Bootcamp",
        date: "Kasım 2025",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&q=80",
        attendees: 150,
        category: "Dijital",
    },
    {
        id: "mitoloji-gecesi",
        title: "Mitoloji Gecesi: Yunan Tanrıları",
        date: "Ekim 2025",
        image: "https://images.unsplash.com/photo-1608346128025-1896b97a6fa7?w=400&h=300&fit=crop&q=80",
        attendees: 200,
        category: "Mitoloji",
    },
    {
        id: "yapay-zeka",
        title: "Yapay Zeka ve Gelecek",
        date: "Eylül 2025",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&q=80",
        attendees: 380,
        category: "Teknoloji",
    },
    {
        id: "istanbul-kultur-turu",
        title: "İstanbul Kültür Turu",
        date: "Ağustos 2025",
        image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&h=300&fit=crop&q=80",
        attendees: 35,
        category: "Gezi",
    },
];

type TabId = "yaklaşan" | "yuz-yuze" | "online" | "gecmis";

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: "yaklaşan", label: "Tüm Etkinlikler", icon: <Calendar size={16} /> },
    { id: "yuz-yuze", label: "Yüz Yüze", icon: <Building2 size={16} /> },
    { id: "online", label: "Online", icon: <Video size={16} /> },
    { id: "gecmis", label: "Geçmiş", icon: <Clock size={16} /> },
];

// ——— Component ———

export default function EtkinliklerPage() {
    const [activeTab, setActiveTab] = useState<TabId>("yaklaşan");
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const filteredEvents =
        activeTab === "yaklaşan"
            ? upcomingEvents
            : activeTab === "yuz-yuze"
                ? upcomingEvents.filter((e) => e.type === "yuz-yuze")
                : activeTab === "online"
                    ? upcomingEvents.filter((e) => e.type === "online")
                    : [];

    const featured = upcomingEvents.find((e) => e.isFeatured);

    return (
        <main className="min-h-screen bg-[var(--theme-bg-primary)]">
            <FloatingHeader />

            {/* Hero */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                {/* Decorative blurs */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-[10%] w-72 h-72 bg-[#FF6B6B]/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-[15%] w-96 h-96 bg-[#FFBC0B]/8 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${isDark
                                ? 'bg-[#FF6B6B]/10 text-[#FF6B6B] border border-[#FF6B6B]/20'
                                : 'bg-[#FF6B6B]/10 text-[#c0392b] border border-[#FF6B6B]/20'
                                }`}
                        >
                            <Sparkles size={14} />
                            Flu Akademi Etkinlikleri
                        </motion.div>

                        <h1 className="text-4xl md:text-6xl font-bold text-[var(--theme-text-primary)] mb-4 leading-tight">
                            Öğrenmeyi{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFBC0B]">
                                Birlikte
                            </span>{" "}
                            Deneyimleyin
                        </h1>
                        <p className="text-lg text-[var(--theme-text-muted)] max-w-2xl mx-auto mb-8">
                            Online webinarlar, yüz yüze buluşmalar ve workshoplar ile topluluğun bir parçası olun.
                        </p>

                        {/* Stats Row */}
                        <div className="flex justify-center gap-8 sm:gap-12">
                            {[
                                { value: "50+", label: "Tamamlanan Etkinlik" },
                                { value: "4K+", label: "Toplam Katılımcı" },
                                { value: "15+", label: "Uzman Konuşmacı" },
                            ].map((s, i) => (
                                <motion.div
                                    key={s.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-2xl sm:text-3xl font-bold text-[var(--theme-text-primary)]">
                                        {s.value}
                                    </div>
                                    <div className="text-xs text-[var(--theme-text-muted)] mt-0.5">{s.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Tab Navigation */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-10">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className={`inline-flex items-center gap-1 p-1.5 rounded-2xl ${isDark
                        ? 'bg-white/[0.04] border border-white/[0.06]'
                        : 'bg-black/[0.04] border border-black/[0.06]'
                        }`}
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id
                                ? isDark
                                    ? 'bg-white/10 text-white shadow-sm'
                                    : 'bg-white text-[#05111E] shadow-sm'
                                : isDark
                                    ? 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                                    : 'text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] hover:bg-black/[0.04]'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </motion.div>
            </section>

            {/* Featured Event Banner (only on "Tüm Etkinlikler" tab) */}
            <AnimatePresence mode="wait">
                {activeTab === "yaklaşan" && featured && (
                    <motion.section
                        key="featured"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="max-w-6xl mx-auto px-4 sm:px-6 mb-12"
                    >
                        <div className={`relative rounded-3xl overflow-hidden group cursor-pointer ${isDark
                            ? 'border border-white/[0.06]'
                            : 'border border-black/[0.06] shadow-xl'
                            }`}>
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: `url(${featured.image})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />

                            <div className="relative flex flex-col md:flex-row items-center p-8 md:p-12 gap-8 min-h-[320px]">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FFBC0B] text-black">
                                            ÖNE ÇIKAN
                                        </span>
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white border border-white/10">
                                            {featured.category}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                                        {featured.title}
                                    </h2>
                                    <p className="text-white/70 mb-6 max-w-lg">{featured.description}</p>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 mb-6">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar size={14} /> {featured.date}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock size={14} /> {featured.time}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <MapPin size={14} /> {featured.location}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Users size={14} /> {featured.attendees}+ katılımcı
                                        </span>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFBC0B] text-black font-semibold text-sm hover:bg-[#e5a800] transition-colors"
                                    >
                                        Kayıt Ol
                                        <ArrowRight size={16} />
                                    </motion.button>
                                </div>

                                {/* Speaker info */}
                                <div className="text-center md:text-right">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFBC0B]/30 to-[#FF6B6B]/30 flex items-center justify-center text-4xl mx-auto md:ml-auto md:mr-0 mb-3">
                                        🎤
                                    </div>
                                    <div className="text-white font-semibold">{featured.speaker}</div>
                                    <div className="text-white/50 text-sm">{featured.speakerTitle}</div>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Event Cards */}
            <AnimatePresence mode="wait">
                {activeTab !== "gecmis" ? (
                    <motion.section
                        key="upcoming"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="max-w-6xl mx-auto px-4 sm:px-6 pb-16"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredEvents
                                .filter((e) => !e.isFeatured || activeTab !== "yaklaşan")
                                .map((event, i) => (
                                    <motion.div
                                        key={event.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.08 }}
                                        className={`group rounded-2xl overflow-hidden cursor-pointer transition-shadow ${isDark
                                            ? 'bg-[var(--theme-bg-card)] border border-white/[0.06] hover:border-white/10'
                                            : 'bg-white border border-black/[0.06] shadow-md hover:shadow-lg'
                                            }`}
                                    >
                                        {/* Image */}
                                        <div className="relative h-44 overflow-hidden">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                                style={{ backgroundImage: `url(${event.image})` }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                            {/* Type Badge */}
                                            <div className="absolute top-3 right-3">
                                                <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-sm ${event.type === "online"
                                                    ? 'bg-[#00D9FF]/20 text-[#00D9FF] border border-[#00D9FF]/20'
                                                    : 'bg-[#A855F7]/20 text-[#A855F7] border border-[#A855F7]/20'
                                                    }`}>
                                                    {event.type === "online" ? <Video size={10} /> : <Building2 size={10} />}
                                                    {event.type === "online" ? "Online" : "Yüz Yüze"}
                                                </span>
                                            </div>
                                            {/* Category */}
                                            <div className="absolute bottom-3 left-3">
                                                <span
                                                    className="px-2.5 py-1 rounded-full text-[11px] font-semibold text-white"
                                                    style={{ background: `${event.color}CC` }}
                                                >
                                                    {event.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5">
                                            <h3 className="text-lg font-bold text-[var(--theme-text-primary)] mb-2 line-clamp-1 group-hover:text-[#FFBC0B] transition-colors">
                                                {event.title}
                                            </h3>
                                            <p className="text-sm text-[var(--theme-text-muted)] mb-4 line-clamp-2">
                                                {event.description}
                                            </p>

                                            <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--theme-text-muted)] mb-4">
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={12} /> {event.date}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock size={12} /> {event.time}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Users size={12} /> {event.attendees}
                                                </span>
                                            </div>

                                            {/* Speaker */}
                                            <div className={`flex items-center justify-between pt-4 border-t ${isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'}`}>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFBC0B]/20 to-[#FF6B6B]/20 flex items-center justify-center text-sm">
                                                        👤
                                                    </div>
                                                    <div>
                                                        <div className="text-xs font-semibold text-[var(--theme-text-primary)]">
                                                            {event.speaker}
                                                        </div>
                                                        <div className="text-[10px] text-[var(--theme-text-muted)]">
                                                            {event.speakerTitle}
                                                        </div>
                                                    </div>
                                                </div>
                                                <ChevronRight size={16} className="text-[var(--theme-text-muted)] group-hover:text-[#FFBC0B] transition-colors" />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                        </div>

                        {filteredEvents.filter((e) => !e.isFeatured || activeTab !== "yaklaşan").length === 0 && (
                            <div className="text-center py-16">
                                <div className="text-4xl mb-4">🔍</div>
                                <p className="text-[var(--theme-text-muted)]">Bu kategoride henüz etkinlik yok.</p>
                            </div>
                        )}
                    </motion.section>
                ) : (
                    /* Past Events Grid */
                    <motion.section
                        key="past"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="max-w-6xl mx-auto px-4 sm:px-6 pb-16"
                    >
                        <h2 className="text-2xl font-bold text-[var(--theme-text-primary)] mb-6">
                            Geçmiş Etkinlikler
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {pastEvents.map((event, i) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.06 }}
                                    className="group relative rounded-2xl overflow-hidden cursor-pointer h-52"
                                    style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.12)" }}
                                >
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                        style={{ backgroundImage: `url(${event.image})` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 group-hover:from-black/70 transition-all duration-300" />
                                    <div className="relative h-full flex flex-col justify-end p-5">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/15 text-white backdrop-blur-sm">
                                                {event.category}
                                            </span>
                                            <span className="text-[10px] text-white/50">{event.date}</span>
                                        </div>
                                        <h3 className="text-base font-bold text-white mb-1">{event.title}</h3>
                                        <div className="flex items-center gap-1 text-[11px] text-white/60">
                                            <Users size={11} /> {event.attendees} katılımcı
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* CTA */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`relative rounded-3xl overflow-hidden p-10 md:p-14 text-center ${isDark
                        ? 'bg-gradient-to-br from-[#FF6B6B]/10 via-[#FFBC0B]/5 to-transparent border border-white/[0.06]'
                        : 'bg-gradient-to-br from-[#FF6B6B]/10 via-[#FFBC0B]/10 to-[#FF6B6B]/5 border border-black/[0.06]'
                        }`}
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--theme-text-primary)] mb-3">
                        Bir Etkinlik Önermek İster misiniz?
                    </h2>
                    <p className="text-[var(--theme-text-muted)] mb-6 max-w-lg mx-auto">
                        Topluluğumuz için bir etkinlik fikriniz varsa bizimle paylaşın.
                        En iyi fikirler programa eklenir!
                    </p>
                    <motion.a
                        href="mailto:etkinlik@fluakademi.com"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFBC0B] text-black font-semibold text-sm hover:bg-[#e5a800] transition-colors"
                    >
                        <ExternalLink size={16} />
                        İletişime Geç
                    </motion.a>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
