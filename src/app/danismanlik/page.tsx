"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Star,
    Clock,
    Users,
    ArrowRight,
    Sparkles,
    Filter,
    MessageSquare,
    Award,
    Building2,
    User,
} from "lucide-react";
import Link from "next/link";
import FloatingHeader from "@/components/layout/FloatingHeader";
import Footer from "@/components/layout/Footer";
import { useTheme } from "@/context/ThemeContext";

// ——— Types & Data ———

type ConsultantCategory = "tümü" | "felsefe" | "psikoloji" | "mitoloji" | "siyaset" | "sosyoloji" | "sanat" | "kariyer" | "is-dunyasi";

interface Consultant {
    id: string;
    name: string;
    title: string;
    category: ConsultantCategory;
    categoryLabel: string;
    bio: string;
    rating: number;
    reviews: number;
    sessions: number;
    pricePerHour: number;
    image: string;
    color: string;
    badges: string[];
    type: "bireysel" | "kurumsal" | "her-ikisi";
}

const categories: { id: ConsultantCategory; label: string; color: string }[] = [
    { id: "tümü", label: "Tümü", color: "#FFBC0B" },
    { id: "felsefe", label: "Felsefe", color: "#10B981" },
    { id: "psikoloji", label: "Psikoloji", color: "#A855F7" },
    { id: "mitoloji", label: "Mitoloji", color: "#FFBC0B" },
    { id: "siyaset", label: "Siyaset Bilimi", color: "#64748B" },
    { id: "sosyoloji", label: "Sosyoloji", color: "#EA580C" },
    { id: "sanat", label: "Sanat", color: "#F43F5E" },
    { id: "kariyer", label: "Kariyer", color: "#00D9FF" },
    { id: "is-dunyasi", label: "İş Dünyası", color: "#6366F1" },
];

const consultants: Consultant[] = [
    {
        id: "nevzat-kaya",
        name: "Nevzat Kaya",
        title: "Mitoloji & Kültür Tarihçisi",
        category: "mitoloji",
        categoryLabel: "Mitoloji",
        bio: "Kadim mitler üzerinden kültür okuryazarlığı ve eleştirel düşünme danışmanlığı. Bireysel veya kurumsal kapsamda mitolojik arketipler ve hikaye anlatıcılığı.",
        rating: 4.9,
        reviews: 142,
        sessions: 580,
        pricePerHour: 3500,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&q=80&crop=faces",
        color: "#FFBC0B",
        badges: ["Flu Akademi", "Premium"],
        type: "her-ikisi",
    },
    {
        id: "omer-aygun",
        name: "Prof. Dr. Ömer Aygün",
        title: "Felsefe Profesörü",
        category: "felsefe",
        categoryLabel: "Felsefe",
        bio: "Antik felsefeden modern düşünceye, felsefi sorgulama ve etik temelli karar alma süreçleri üzerine akademik danışmanlık.",
        rating: 5.0,
        reviews: 98,
        sessions: 310,
        pricePerHour: 4000,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&q=80&crop=faces",
        color: "#10B981",
        badges: ["Flu Akademi", "Profesör"],
        type: "her-ikisi",
    },
    {
        id: "alper-hasanoglu",
        name: "Alper Hasanoğlu",
        title: "Psikoloji Uzmanı",
        category: "psikoloji",
        categoryLabel: "Psikoloji",
        bio: "İnsan davranışları, bilişsel süreçler ve sosyal psikoloji üzerine bireysel danışmanlık. Kişisel farkındalık ve iletişim becerileri.",
        rating: 4.9,
        reviews: 167,
        sessions: 720,
        pricePerHour: 3000,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop&q=80&crop=faces",
        color: "#A855F7",
        badges: ["Flu Akademi", "Popüler"],
        type: "bireysel",
    },
    {
        id: "omer-gemalmaz",
        name: "Ömer Gemalmaz",
        title: "Siyaset Bilimci",
        category: "siyaset",
        categoryLabel: "Siyaset Bilimi",
        bio: "İdeolojiler, siyasal düşünce tarihi ve güncel politik analiz üzerine danışmanlık. Kurumsal strateji ve kriz yönetimi.",
        rating: 4.8,
        reviews: 89,
        sessions: 240,
        pricePerHour: 3500,
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=300&fit=crop&q=80&crop=faces",
        color: "#64748B",
        badges: ["Flu Akademi"],
        type: "her-ikisi",
    },
    {
        id: "besim-dellaloglu",
        name: "Prof. Dr. Besim Dellaloğlu",
        title: "Sosyoloji Profesörü",
        category: "sosyoloji",
        categoryLabel: "Sosyoloji",
        bio: "Toplumsal yapılar, kültürel dönüşüm ve modernite analizi üzerine akademik ve kurumsal danışmanlık.",
        rating: 5.0,
        reviews: 76,
        sessions: 195,
        pricePerHour: 4500,
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop&q=80&crop=faces",
        color: "#EA580C",
        badges: ["Flu Akademi", "Profesör"],
        type: "her-ikisi",
    },
    {
        id: "ilker-canikligil",
        name: "İlker Canikligil",
        title: "Sanat Eğitmeni & Küratör",
        category: "sanat",
        categoryLabel: "Sanat",
        bio: "Temel sanat eğitimi, sanat tarihi ve estetik algı geliştirme üzerine bireysel danışmanlık. Koleksiyon ve kürasyon rehberliği.",
        rating: 4.9,
        reviews: 63,
        sessions: 180,
        pricePerHour: 2800,
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=300&fit=crop&q=80&crop=faces",
        color: "#F43F5E",
        badges: ["Flu Akademi"],
        type: "bireysel",
    },
    {
        id: "elif-sahin",
        name: "Dr. Elif Şahin",
        title: "Klinik Psikolog",
        category: "psikoloji",
        categoryLabel: "Psikoloji",
        bio: "Stres yönetimi, performans psikolojisi ve duygusal zekâ geliştirme. Üst düzey yöneticiler ve profesyoneller için bireysel seanslar.",
        rating: 4.9,
        reviews: 234,
        sessions: 1200,
        pricePerHour: 3500,
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&q=80&crop=faces",
        color: "#A855F7",
        badges: ["Doktor", "Popüler"],
        type: "bireysel",
    },
    {
        id: "mehmet-aktas",
        name: "Mehmet Aktaş",
        title: "Liderlik & Strateji Danışmanı",
        category: "is-dunyasi",
        categoryLabel: "İş Dünyası",
        bio: "Fortune 500 şirketlerinde 20 yıl deneyim. Kurumsal strateji, dijital dönüşüm ve liderlik gelişimi programları.",
        rating: 4.8,
        reviews: 156,
        sessions: 890,
        pricePerHour: 5000,
        image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=300&fit=crop&q=80&crop=faces",
        color: "#6366F1",
        badges: ["Kurumsal", "Premium"],
        type: "kurumsal",
    },
    {
        id: "zeynep-korkmaz",
        name: "Prof. Dr. Zeynep Korkmaz",
        title: "Etik & Felsefe Danışmanı",
        category: "felsefe",
        categoryLabel: "Felsefe",
        bio: "İş etiği, kurumsal sorumluluk ve felsefi düşünce altyapısı oluşturma. Üniversiteler ve şirketler için etik danışmanlığı.",
        rating: 5.0,
        reviews: 52,
        sessions: 160,
        pricePerHour: 4000,
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=300&fit=crop&q=80&crop=faces",
        color: "#10B981",
        badges: ["Profesör"],
        type: "her-ikisi",
    },
    {
        id: "ahmet-yildirim",
        name: "Ahmet Yıldırım",
        title: "Kariyer Koçu & Mentor",
        category: "kariyer",
        categoryLabel: "Kariyer",
        bio: "Kariyer geçişleri, kişisel marka oluşturma ve profesyonel gelişim. 15+ yıl HR ve yetenek yönetimi deneyimi.",
        rating: 4.7,
        reviews: 198,
        sessions: 950,
        pricePerHour: 2500,
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=300&fit=crop&q=80&crop=faces",
        color: "#00D9FF",
        badges: ["Popüler"],
        type: "bireysel",
    },
    {
        id: "selin-demir",
        name: "Dr. Selin Demir",
        title: "Sosyal Psikoloji Uzmanı",
        category: "psikoloji",
        categoryLabel: "Psikoloji",
        bio: "Grup dinamikleri, takım uyumu ve örgütsel davranış üzerine kurumsal danışmanlık. Çatışma yönetimi ve iletişim eğitimleri.",
        rating: 4.8,
        reviews: 112,
        sessions: 540,
        pricePerHour: 3200,
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=400&h=300&fit=crop&q=80&crop=faces",
        color: "#A855F7",
        badges: ["Doktor"],
        type: "kurumsal",
    },
    {
        id: "can-ozturk",
        name: "Can Öztürk",
        title: "Politik Analiz & Risk Danışmanı",
        category: "siyaset",
        categoryLabel: "Siyaset Bilimi",
        bio: "Jeopolitik risk analizi, kamu politikası ve siyasal iletişim stratejileri. Kurumlar ve STK'lar için danışmanlık.",
        rating: 4.9,
        reviews: 74,
        sessions: 280,
        pricePerHour: 4000,
        image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=300&fit=crop&q=80&crop=faces",
        color: "#64748B",
        badges: ["Premium"],
        type: "kurumsal",
    },
    {
        id: "deniz-arslan",
        name: "Deniz Arslan",
        title: "Hikaye Anlatıcılığı & İçerik Stratejisti",
        category: "mitoloji",
        categoryLabel: "Mitoloji",
        bio: "Mitolojik arketipler üzerinden marka hikayesi oluşturma, içerik stratejisi ve narratif tasarım danışmanlığı.",
        rating: 4.7,
        reviews: 88,
        sessions: 320,
        pricePerHour: 2800,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop&q=80&crop=faces",
        color: "#FFBC0B",
        badges: [],
        type: "her-ikisi",
    },
    {
        id: "ayse-kara",
        name: "Ayşe Kara",
        title: "Sanat Terapisti",
        category: "sanat",
        categoryLabel: "Sanat",
        bio: "Sanat yoluyla kendini ifade, yaratıcılık koçluğu ve estetik duyarlılık geliştirme. Bireysel ve kurumsal atölye programları.",
        rating: 4.9,
        reviews: 95,
        sessions: 410,
        pricePerHour: 2500,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop&q=80&crop=faces",
        color: "#F43F5E",
        badges: ["Popüler"],
        type: "bireysel",
    },
    {
        id: "burak-celik",
        name: "Burak Çelik",
        title: "Girişimcilik & İnovasyon Danışmanı",
        category: "is-dunyasi",
        categoryLabel: "İş Dünyası",
        bio: "Startup mentorluğu, iş modeli tasarımı ve inovasyon yönetimi. 3 başarılı exit deneyimi olan seri girişimci.",
        rating: 4.8,
        reviews: 143,
        sessions: 670,
        pricePerHour: 4500,
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=300&fit=crop&q=80&crop=faces",
        color: "#6366F1",
        badges: ["Premium"],
        type: "her-ikisi",
    },
    {
        id: "gul-yilmaz",
        name: "Dr. Gül Yılmaz",
        title: "Kültürel Sosyoloji Uzmanı",
        category: "sosyoloji",
        categoryLabel: "Sosyoloji",
        bio: "Kültürlerarası iletişim, toplumsal cinsiyet ve medya sosyolojisi. Akademik araştırma rehberliği ve tez danışmanlığı.",
        rating: 4.8,
        reviews: 67,
        sessions: 230,
        pricePerHour: 3000,
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&q=80&crop=faces",
        color: "#EA580C",
        badges: ["Doktor"],
        type: "bireysel",
    },
    {
        id: "emre-bayraktar",
        name: "Emre Bayraktar",
        title: "Dijital Dönüşüm Lideri",
        category: "is-dunyasi",
        categoryLabel: "İş Dünyası",
        bio: "Kurumsal dijital dönüşüm, yapay zekâ stratejisi ve teknoloji yönetimi. Büyük ölçekli şirketlerde CTO danışmanlığı.",
        rating: 4.9,
        reviews: 178,
        sessions: 820,
        pricePerHour: 5500,
        image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=300&fit=crop&q=80&crop=faces",
        color: "#6366F1",
        badges: ["Kurumsal", "Premium"],
        type: "kurumsal",
    },
    {
        id: "pinar-aksoy",
        name: "Pınar Aksoy",
        title: "Akademik Kariyer Danışmanı",
        category: "kariyer",
        categoryLabel: "Kariyer",
        bio: "Yurt dışı burs başvuruları, akademik CV hazırlama ve yüksek lisans / doktora süreç rehberliği.",
        rating: 4.9,
        reviews: 210,
        sessions: 1050,
        pricePerHour: 2000,
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=300&fit=crop&q=80&crop=faces",
        color: "#00D9FF",
        badges: ["Popüler"],
        type: "bireysel",
    },
    {
        id: "serkan-dogan",
        name: "Serkan Doğan",
        title: "Felsefe & Eleştirel Düşünce Koçu",
        category: "felsefe",
        categoryLabel: "Felsefe",
        bio: "Tartışma ve argümantasyon teknikleri, eleştirel düşünme ve Sokratik sorgulama yöntemiyle bireysel koçluk.",
        rating: 4.7,
        reviews: 84,
        sessions: 350,
        pricePerHour: 2500,
        image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=300&fit=crop&q=80&crop=faces",
        color: "#10B981",
        badges: [],
        type: "bireysel",
    },
    {
        id: "leyla-turk",
        name: "Leyla Türk",
        title: "Kurumsal İletişim Stratejisti",
        category: "is-dunyasi",
        categoryLabel: "İş Dünyası",
        bio: "Kriz iletişimi, kurumsal itibar yönetimi ve medya ilişkileri. Üst düzey yöneticiler için iletişim koçluğu.",
        rating: 4.8,
        reviews: 126,
        sessions: 580,
        pricePerHour: 4000,
        image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&h=300&fit=crop&q=80&crop=faces",
        color: "#6366F1",
        badges: ["Kurumsal"],
        type: "kurumsal",
    },
];

type TypeFilter = "tümü" | "bireysel" | "kurumsal";

// ——— Component ———

export default function DanismanlikPage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [activeCategory, setActiveCategory] = useState<ConsultantCategory>("tümü");
    const [activeType, setActiveType] = useState<TypeFilter>("tümü");

    const filtered = consultants.filter((c) => {
        const catMatch = activeCategory === "tümü" || c.category === activeCategory;
        const typeMatch =
            activeType === "tümü" ||
            c.type === activeType ||
            c.type === "her-ikisi";
        return catMatch && typeMatch;
    });

    return (
        <main className="min-h-screen bg-[var(--theme-bg-primary)]">
            <FloatingHeader />

            {/* Hero */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-[10%] w-72 h-72 bg-[#A855F7]/8 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-[15%] w-96 h-96 bg-[#FFBC0B]/6 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
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
                            <Sparkles size={14} />
                            Premium Danışmanlık
                        </motion.div>

                        <h1 className="text-4xl md:text-6xl font-bold text-[var(--theme-text-primary)] mb-4 leading-tight">
                            Uzmanlardan{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#FFBC0B]">
                                Birebir
                            </span>{" "}
                            Rehberlik
                        </h1>
                        <p className="text-lg text-[var(--theme-text-muted)] max-w-2xl mx-auto mb-8">
                            Alanında uzman akademisyen ve profesyonellerden bireysel veya kurumsal danışmanlık hizmeti alın.
                        </p>

                        <div className="flex justify-center gap-8 sm:gap-12">
                            {[
                                { value: "20+", label: "Uzman Danışman" },
                                { value: "10K+", label: "Tamamlanan Seans" },
                                { value: "4.9", label: "Ortalama Puan" },
                            ].map((s, i) => (
                                <motion.div
                                    key={s.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-2xl sm:text-3xl font-bold text-[var(--theme-text-primary)]">{s.value}</div>
                                    <div className="text-xs text-[var(--theme-text-muted)] mt-0.5">{s.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Filters */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-8">
                {/* Type Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-5"
                >
                    <div className="flex items-center gap-2 text-sm text-[var(--theme-text-muted)]">
                        <Filter size={14} />
                        <span className="font-medium">Hizmet Türü:</span>
                    </div>
                    <div className={`inline-flex items-center gap-1 p-1.5 rounded-2xl ${isDark
                        ? "bg-white/[0.04] border border-white/[0.06]"
                        : "bg-black/[0.04] border border-black/[0.06]"
                        }`}>
                        {([
                            { id: "tümü" as TypeFilter, label: "Tümü", icon: <Users size={14} /> },
                            { id: "bireysel" as TypeFilter, label: "Bireysel", icon: <User size={14} /> },
                            { id: "kurumsal" as TypeFilter, label: "Kurumsal", icon: <Building2 size={14} /> },
                        ]).map((t) => (
                            <button
                                key={t.id}
                                onClick={() => setActiveType(t.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeType === t.id
                                    ? isDark
                                        ? "bg-white/10 text-white shadow-sm"
                                        : "bg-white text-[#05111E] shadow-sm"
                                    : isDark
                                        ? "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                                        : "text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] hover:bg-black/[0.04]"
                                    }`}
                            >
                                {t.icon}
                                {t.label}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Category pills */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap gap-2"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === cat.id
                                ? "text-black shadow-sm"
                                : isDark
                                    ? "bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]"
                                    : "bg-white text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] border border-black/[0.06]"
                                }`}
                            style={activeCategory === cat.id ? { background: cat.color } : {}}
                        >
                            {cat.label}
                        </button>
                    ))}
                </motion.div>
            </section>

            {/* Consultant Cards */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${activeCategory}-${activeType}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {filtered.length > 0 ? (
                            <div className="space-y-5">
                                {filtered.map((c, i) => (
                                    <motion.div
                                        key={c.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.04 }}
                                        className={`group relative rounded-2xl overflow-hidden transition-all flex flex-col md:flex-row ${isDark
                                            ? "bg-[var(--theme-bg-card)] border border-white/[0.06] hover:border-white/10"
                                            : "bg-white border border-black/[0.06] shadow-md hover:shadow-xl"
                                            }`}
                                    >
                                        {/* Large Photo — 4:3, left-aligned */}
                                        <div className="relative w-full md:w-72 lg:w-80 shrink-0">
                                            <div className="aspect-[4/3] md:aspect-auto md:h-full relative overflow-hidden">
                                                <div
                                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                                    style={{ backgroundImage: `url(${c.image})` }}
                                                />
                                                {/* Gradient overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/30 via-transparent to-transparent" />
                                            </div>
                                            {/* Category badge on photo */}
                                            <div className="absolute top-3 left-3">
                                                <span
                                                    className="px-3 py-1 rounded-full text-[11px] font-bold text-white backdrop-blur-sm"
                                                    style={{ background: `${c.color}CC` }}
                                                >
                                                    {c.categoryLabel}
                                                </span>
                                            </div>
                                            {/* Type badge */}
                                            <div className="absolute top-3 right-3 md:right-auto md:left-3 md:top-10">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold backdrop-blur-sm ${c.type === "kurumsal"
                                                        ? "bg-[#6366F1]/80 text-white"
                                                        : c.type === "bireysel"
                                                            ? "bg-white/20 text-white border border-white/20"
                                                            : "bg-[#FFBC0B]/80 text-black"
                                                    }`}>
                                                    {c.type === "kurumsal" ? "Kurumsal" : c.type === "bireysel" ? "Bireysel" : "Bireysel & Kurumsal"}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Card Content */}
                                        <div className="flex-1 p-6 flex flex-col justify-between">
                                            {/* Top: Name, title, badges */}
                                            <div>
                                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                    <h3 className="text-lg font-bold text-[var(--theme-text-primary)]">
                                                        {c.name}
                                                    </h3>
                                                    {c.badges.map((b) => (
                                                        <span
                                                            key={b}
                                                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${b === "Flu Akademi"
                                                                ? "bg-[#FFBC0B]/15 text-[#FFBC0B]"
                                                                : b === "Premium"
                                                                    ? "bg-[#A855F7]/15 text-[#A855F7]"
                                                                    : b === "Profesör"
                                                                        ? "bg-[#10B981]/15 text-[#10B981]"
                                                                        : b === "Doktor"
                                                                            ? "bg-[#00D9FF]/15 text-[#00D9FF]"
                                                                            : b === "Kurumsal"
                                                                                ? "bg-[#6366F1]/15 text-[#6366F1]"
                                                                                : b === "Popüler"
                                                                                    ? "bg-[#F43F5E]/15 text-[#F43F5E]"
                                                                                    : isDark
                                                                                        ? "bg-white/10 text-gray-300"
                                                                                        : "bg-gray-100 text-gray-600"
                                                                }`}
                                                        >
                                                            {b}
                                                        </span>
                                                    ))}
                                                </div>
                                                <p className="text-sm text-[var(--theme-text-muted)] mb-3">{c.title}</p>
                                                <p className="text-sm text-[var(--theme-text-muted)] leading-relaxed line-clamp-2 mb-4">
                                                    {c.bio}
                                                </p>
                                            </div>

                                            {/* Stats row */}
                                            <div className={`flex flex-wrap items-center gap-4 text-xs mb-4 pb-4 border-b ${isDark ? "border-white/[0.06]" : "border-black/[0.06]"}`}>
                                                <span className="flex items-center gap-1 text-[#FFBC0B] font-semibold">
                                                    <Star size={12} fill="currentColor" />
                                                    {c.rating}
                                                </span>
                                                <span className="text-[var(--theme-text-muted)]">
                                                    <MessageSquare size={11} className="inline mr-1" />
                                                    {c.reviews} değerlendirme
                                                </span>
                                                <span className="text-[var(--theme-text-muted)]">
                                                    <Clock size={11} className="inline mr-1" />
                                                    {c.sessions.toLocaleString("tr-TR")} seans
                                                </span>
                                                {c.type === "her-ikisi" && (
                                                    <span className="text-[var(--theme-text-muted)]">
                                                        <Award size={11} className="inline mr-1" />
                                                        Bireysel & Kurumsal
                                                    </span>
                                                )}
                                            </div>

                                            {/* Bottom: Price + CTA */}
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <span className="text-2xl font-bold text-[var(--theme-text-primary)]">
                                                        ₺{c.pricePerHour.toLocaleString("tr-TR")}
                                                    </span>
                                                    <span className="text-sm text-[var(--theme-text-muted)] ml-1">/ saat</span>
                                                </div>
                                                <Link
                                                    href="/iletisim"
                                                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:gap-3"
                                                    style={{
                                                        background: c.color,
                                                        color: c.color === "#FFBC0B" || c.color === "#00D9FF" ? "#000" : "#fff",
                                                    }}
                                                >
                                                    Randevu Al
                                                    <ArrowRight size={14} />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <div className="text-4xl mb-4">🔍</div>
                                <p className="text-[var(--theme-text-muted)]">Bu filtrelere uygun danışman bulunamadı.</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </section>

            {/* How it works */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--theme-text-primary)]">
                        Nasıl Çalışıyor?
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {[
                        { icon: "🔍", title: "Danışman Seçin", desc: "Alanınıza uygun uzmanı inceleyin" },
                        { icon: "📅", title: "Randevu Alın", desc: "Size uygun gün ve saat belirleyin" },
                        { icon: "💬", title: "Seans Başlasın", desc: "Online veya yüz yüze görüşün" },
                        { icon: "🎯", title: "Hedefinize Ulaşın", desc: "Kişisel yol haritanızı takip edin" },
                    ].map((step, i) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className={`relative p-5 rounded-2xl text-center ${isDark
                                ? "bg-white/[0.03] border border-white/[0.06]"
                                : "bg-[var(--theme-bg-secondary)] border border-black/[0.06]"
                                }`}
                        >
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#FFBC0B] flex items-center justify-center text-xs font-bold text-black">
                                {i + 1}
                            </div>
                            <div className="text-3xl mt-2 mb-3">{step.icon}</div>
                            <h4 className="text-sm font-bold text-[var(--theme-text-primary)] mb-1">{step.title}</h4>
                            <p className="text-xs text-[var(--theme-text-muted)]">{step.desc}</p>
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
                        ? "bg-gradient-to-br from-[#A855F7]/10 via-[#FFBC0B]/5 to-transparent border border-white/[0.06]"
                        : "bg-gradient-to-br from-[#A855F7]/10 via-[#FFBC0B]/10 to-[#A855F7]/5 border border-black/[0.06]"
                        }`}
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--theme-text-primary)] mb-3">
                        Kurumsal Danışmanlık mı Arıyorsunuz?
                    </h2>
                    <p className="text-[var(--theme-text-muted)] mb-6 max-w-lg mx-auto">
                        Şirketinize özel tasarlanmış eğitim ve danışmanlık programları için
                        bizimle iletişime geçin.
                    </p>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                        <Link
                            href="/iletisim"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFBC0B] text-black font-semibold text-sm hover:bg-[#e5a800] transition-colors"
                        >
                            Teklif Alın
                            <ArrowRight size={16} />
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
