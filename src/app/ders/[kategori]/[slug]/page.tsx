"use client";

import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import FloatingHeader from "@/components/layout/FloatingHeader";
import Footer from "@/components/layout/Footer";
import { ShoppingCart, Play, Clock, Users, Star, ChevronDown, ArrowRight, Tag, Sparkles, BadgePercent } from "lucide-react";
import Link from "next/link";

// Demo course data
const courseData = {
    id: "tanrilarin-evrimi",
    category: "Mitoloji",
    title: "Tanrıların Evrimi",
    lessonNumber: 2,
    currentLesson: 2,
    seriesLessons: [
        { number: 1, title: "Mitolojiye Giriş", slug: "mitolojiye-giris" },
        { number: 2, title: "Tanrıların Evrimi", slug: "tanrilarin-evrimi" },
    ],
    tagline: "İnsanlığın en eski hikayesinin izinde",
    description: "Tanrıların evrimini takip etmek, aslında insanlığın kendi evrimini takip etmektir.",
    price: 1575,
    originalPrice: 1750,
    discount: 10,
    duration: "12+ Saat",
    students: 2847,
    rating: 4.9,
    instructor: {
        name: "Nevzat Kaya",
        title: "Mitoloji & Kültür Tarihçisi",
        quote: "Tanrıları anlamak, insanı anlamaktır.",
    },
    chapters: [
        { id: 1, title: "Kutsalın Metamorfozları", duration: "1s 45dk", description: "Tanrı kavramının kökenlerini, ilkel toplumlardaki kutsal anlayışını ve bunun nasıl evrildiğini inceliyoruz." },
        { id: 2, title: "Titanlar ve Olimpikler", duration: "1s 30dk", description: "Yunan mitolojisindeki iki büyük tanrı kuşağı arasındaki çatışmayı ve bunun kültürel anlamlarını keşfediyoruz." },
        { id: 3, title: "Demeter - Afrodit - Artemis", duration: "1s 20dk", description: "Dişil kutsalın Yunan mitolojisindeki temsilcilerini ve toplumsal cinsiyet rollerini inceliyoruz." },
        { id: 4, title: "Olimpik İdeoloji", duration: "1s 35dk", description: "Olimpos panteonunun nasıl bir siyasi ve toplumsal düzen yansıttığını analiz ediyoruz." },
        { id: 5, title: "Olimpizmin Bilinçdışı", duration: "1s 25dk", description: "Olimpik düzenin bastırdığı arkaik unsurları ve bunların psikolojik boyutlarını ele alıyoruz." },
        { id: 6, title: "Eksen Çağı ve Apollonizmin Doğuşu", duration: "1s 40dk", description: "M.Ö. 800-200 arasındaki düşünce devrimini ve Apollo kültünün yükselişini inceliyoruz." },
        { id: 7, title: "Dionysos'un Bastırılışı", duration: "1s 15dk", description: "Ekstaz ve kaos tanrısı Dionysos'un Apollonik düzen tarafından nasıl marjinalleştirildiğini keşfediyoruz." },
        { id: 8, title: "Tanrının Ölümü ve Tragedyanın Doğuşu", duration: "1s 50dk", description: "Mitolojik düşüncenin çöküşünü ve bunun sanata, özellikle tragedyaya nasıl yansıdığını inceliyoruz." },
    ],
    insights: [
        "Neden tüm mitolojilerde 'eski' ve 'yeni' tanrılar var?",
        "Olimpos'un gerçek anlamı ne?",
        "Dionysos neden bastırıldı?",
    ],
    testimonials: [
        { id: 1, name: "Ahmet Yılmaz", text: "Mitolojiye bakış açım tamamen değişti. Artık filmleri, kitapları farklı okuyorum.", rating: 5, date: "2 hafta önce" },
        { id: 2, name: "Elif Kara", text: "Nevzat Hoca'nın anlatım tarzı muhteşem. Sanki bir belgesel izliyormuşsunuz gibi.", rating: 5, date: "3 hafta önce" },
        { id: 3, name: "Mehmet Demir", text: "Premium fiyata değer. Her bölüm ayrı bir keşif.", rating: 5, date: "1 ay önce" },
        { id: 4, name: "Zeynep Öztürk", text: "Bu dersi aldıktan sonra diğer dersleri de almaya karar verdim. İçerik kalitesi gerçekten üst düzey.", rating: 5, date: "1 ay önce" },
        { id: 5, name: "Can Aydın", text: "Akademik düzeyde bir içerik ama herkesin anlayabileceği bir dille anlatılmış. Harika!", rating: 5, date: "2 ay önce" },
        { id: 6, name: "Selin Yıldız", text: "Dionysos bölümü favorim oldu. Bastırılmış kültürel kodları çözmek çok ilginçti.", rating: 4, date: "2 ay önce" },
        { id: 7, name: "Burak Aksoy", text: "İş hayatında bile bu dersten öğrendiklerimi kullanıyorum. Perspektif kazandırıyor.", rating: 5, date: "3 ay önce" },
        { id: 8, name: "Ayşe Çelik", text: "Titanlar ve Olimpikler bölümünü 3 kez izledim. Her seferinde yeni bir şey keşfettim.", rating: 5, date: "3 ay önce" },
        { id: 9, name: "Emre Koç", text: "Felsefe ve mitoloji arasındaki bağlantıları çok güzel kurmuş. Tavsiye ederim.", rating: 5, date: "4 ay önce" },
        { id: 10, name: "Deniz Şahin", text: "Olimpik İdeoloji bölümü dünya görüşümü değiştirdi diyebilirim.", rating: 5, date: "4 ay önce" },
        { id: 11, name: "Gizem Arslan", text: "Çok akıcı bir anlatımı var. Saatlerin nasıl geçtiğini anlamıyorsunuz.", rating: 5, date: "5 ay önce" },
        { id: 12, name: "Oğuz Yılmaz", text: "Eksen Çağı bölümü için bile bu ders alınır. Muhteşem içerik.", rating: 5, date: "5 ay önce" },
    ],
    relatedCourses: [
        {
            id: "mitolojiye-giris",
            category: "Mitoloji",
            title: "Mitolojiye Giriş",
            description: "Kendini evrende konumlandırmak, 'neyim?', 'neden varım?' gibi sorulara cevap aramak...",
            slug: "mitoloji/mitolojiye-giris",
            price: 1250,
        },
        {
            id: "psikolojiye-giris",
            category: "Psikoloji",
            title: "Psikolojiye Giriş",
            description: "İnsan davranışının ve zihinsel süreçlerinin evrimsel ve sinirsel temelleri...",
            slug: "psikoloji/psikolojiye-giris",
            price: 1450,
        },
        {
            id: "kapitalizm-tarihi",
            category: "Siyaset Bilimi",
            title: "Kapitalizmin Tarihi",
            description: "Siyaset biliminin temel kavramlarını herkesin rahatça içselleştirebileceği şekilde...",
            slug: "siyaset-bilimi/kapitalizm-tarihi",
            price: 1350,
        },
    ],
};

const categoryColors: Record<string, string> = {
    "Mitoloji": "bg-[#FFBC0B] text-black font-semibold",
    "Psikoloji": "bg-purple-600 text-white font-semibold",
    "Siyaset Bilimi": "bg-slate-700 text-white font-semibold",
};

export default function CoursePage() {
    const params = useParams();
    const [showAllTestimonials, setShowAllTestimonials] = useState(false);
    const [expandedChapter, setExpandedChapter] = useState<number | null>(null);

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
                                    poster="/images/courses/tanrilarin-evrimi-cover.jpg"
                                >
                                    <source src="/videos/tanrilarin-evrimi-tanitim.mp4" type="video/mp4" />
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
                                                    href={`/ders/mitoloji/${lesson.slug}`}
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
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                    <p className="text-[var(--theme-text-secondary)] text-sm">{courseData.tagline}</p>
                                    <span className="text-[var(--theme-text-muted)]">•</span>
                                    <span className="flex items-center gap-1.5 text-sm text-[var(--theme-text-muted)]">
                                        <Clock className="w-3.5 h-3.5 text-[var(--theme-accent)]" /> {courseData.duration}
                                    </span>
                                    <span className="flex items-center gap-1.5 text-sm text-[var(--theme-text-muted)]">
                                        <Users className="w-3.5 h-3.5 text-[var(--theme-accent)]" /> {courseData.students.toLocaleString()}
                                    </span>
                                    <span className="flex items-center gap-1.5 text-sm text-[var(--theme-text-muted)]">
                                        <Star className="w-3.5 h-3.5 text-[var(--flu-yellow)] fill-[var(--flu-yellow)]" /> {courseData.rating}
                                    </span>
                                </div>
                            </div>

                            {/* Keşif Bölümü */}
                            <div className="bg-[var(--theme-bg-card)] rounded-2xl p-5 border border-[var(--theme-border)]">
                                <h2 className="text-lg font-bold mb-4">
                                    Bu Derste <span className="text-[#F74A4A]">Ne Keşfedeceksiniz?</span>
                                </h2>
                                <div className="grid sm:grid-cols-3 gap-3">
                                    {courseData.insights.map((insight, i) => (
                                        <div
                                            key={i}
                                            className="p-3 bg-[var(--theme-bg-card)] rounded-xl border border-[var(--theme-border)] text-sm text-[var(--theme-text-secondary)]"
                                        >
                                            <span className="text-[var(--theme-accent)] font-bold mr-1">?</span>
                                            {insight}
                                        </div>
                                    ))}
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
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="p-4 ml-9 mt-1 bg-[var(--theme-bg-card)] rounded-xl border-l-2 border-[var(--theme-accent)]/30">
                                                            <p className="text-sm text-[var(--theme-text-secondary)]">{chapter.description}</p>
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

                        {/* SAĞ SÜTUN - Sticky Satın Alma Kartı */}
                        <div className="lg:w-1/3">
                            <div className="lg:sticky lg:top-24 space-y-4">
                                <div className="bg-[var(--theme-bg-card)] backdrop-blur-sm rounded-2xl overflow-hidden border border-[var(--theme-border)]">
                                    {/* 16:9 Ürün Görseli */}
                                    <div className="aspect-video relative overflow-hidden">
                                        <img
                                            src="/images/courses/tanrilarin-evrimi-cover.jpg"
                                            alt="Tanrıların Evrimi"
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


                                        <button className="w-full py-3.5 bg-[var(--theme-accent)] text-[var(--theme-accent-text)] font-bold rounded-xl hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98] mb-2 flex items-center justify-center gap-2">
                                            <Tag className="w-5 h-5" />
                                            Hemen Al
                                        </button>
                                        <button className="w-full py-3 bg-[var(--theme-button-secondary-bg)] text-[var(--theme-text-primary)] font-medium rounded-xl hover:bg-[var(--theme-button-secondary-hover)] transition-colors flex items-center justify-center gap-2">
                                            <ShoppingCart className="w-4 h-4" /> Sepete Ekle
                                        </button>

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
                                                <Star className="w-4 h-4 text-[var(--flu-yellow)] fill-[var(--flu-yellow)]" />
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

            {/* İLGİLİ KURSLAR - Full width, sticky dışında */}
            <section className="py-12 px-4 bg-[var(--theme-bg-secondary)] dark:bg-[var(--theme-bg-secondary)] light-mode-red-section">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">
                        Bu Dersi Satın Alanlar, <span className="text-[#F74A4A]">Bunlara da Göz Attı</span>
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courseData.relatedCourses.map((course) => (
                            <Link
                                key={course.id}
                                href={`/ders/${course.slug}`}
                                className="group bg-[var(--theme-bg-card)] rounded-2xl overflow-hidden border border-[var(--theme-border)] hover:border-[var(--theme-accent)]/30 transition-all"
                            >
                                {/* Course Image */}
                                <div className="aspect-video bg-[var(--theme-bg-card-solid)] relative">
                                    <div className="absolute inset-0 flex items-center justify-center opacity-50 group-hover:opacity-70 transition-opacity">
                                        <Play className="w-12 h-12 text-[var(--theme-text-primary)]" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <span className={`inline-block px-2.5 py-1 text-sm font-medium rounded-lg mb-3 ${categoryColors[course.category] || "bg-[var(--theme-button-secondary-bg)] text-[var(--theme-text-secondary)]"}`}>
                                        {course.category}
                                    </span>
                                    <h3 className="text-lg font-semibold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors mb-2">
                                        {course.title}
                                    </h3>
                                    <p className="text-sm text-[var(--theme-text-secondary)] line-clamp-2 mb-4">{course.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-bold text-[var(--theme-text-primary)]">₺{course.price.toLocaleString()}</span>
                                        <span className="text-sm text-[var(--theme-accent)] flex items-center gap-1 group-hover:gap-2 transition-all font-medium">
                                            İncele <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
