"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageCircle,
    Phone,
    Mail,
    MapPin,
    Send,
    ChevronDown,
    Headphones,
    Briefcase,
    HelpCircle,
    ExternalLink,
} from "lucide-react";
import FloatingHeader from "@/components/layout/FloatingHeader";
import Footer from "@/components/layout/Footer";
import { useTheme } from "@/context/ThemeContext";

// ——— Data ———

const contactMethods = [
    {
        icon: Headphones,
        title: "Canlı Destek",
        description: "Websitemizdeki canlı destek hizmetinden yararlanarak anında profesyonel yardım alabilirsiniz.",
        action: "Destek Başlat",
        href: "#",
        color: "#00D9FF",
    },
    {
        icon: Phone,
        title: "WhatsApp Hattı",
        description: "Sorularınız için bize dilediğiniz zaman WhatsApp üzerinden mesaj gönderebilirsiniz.",
        action: "İletişime Geç",
        href: "https://wa.me/+905447899414",
        color: "#25D366",
    },
    {
        icon: Mail,
        title: "Destek Talebi",
        description: "Detaylı destek taleplerinizi e-posta ile bize iletebilirsiniz.",
        action: "E-posta Gönder",
        href: "mailto:destek@fluakademi.com",
        color: "#FFBC0B",
    },
    {
        icon: Briefcase,
        title: "Kurumsal İletişim",
        description: "İş birlikleri ve kurumsal talepler için bize ulaşın.",
        action: "İletişime Geç",
        href: "mailto:kurumsal@fluakademi.com",
        color: "#A855F7",
    },
];

interface FAQItem {
    question: string;
    answer: string;
}

const faqCategories: { title: string; items: FAQItem[] }[] = [
    {
        title: "Eğitimler Hakkında",
        items: [
            {
                question: "Eğitimler nasıl işliyor?",
                answer: "Alanında uzman eğitmenler tarafından hazırlanan eğitimlerimizin ana içeriğini video içerikler oluşturuyor. Ayrıca özel ders dökümanları ve ödevler, video altında konuyla ilgili sorularınızı sorup eğitmenlerimizden yanıt alabileceğiniz bir alan ve online eğitmen buluşmaları eğitimlerimizin parçası olarak sizlere sunuluyor.",
            },
            {
                question: "Öğrenci indirimi var mı?",
                answer: "Evet! .edu uzantılı mailinizden satis@fluakademi.com adresine isim, soyisim ve erişmek istediğiniz ders bilgilerini içeren bir mail göndermeniz yeterli. Ardından derslere size özel tanımlanacak olan kupon ile %10 ek indirimli erişebilirsiniz.",
            },
            {
                question: "Eğitimlere katılmak için ön bilgiye ihtiyaç var mı?",
                answer: "Hayır! Her yaştan ve her seviyeden herkes, entelektüel bilgi edinmek ve kendini geliştirmek için bu eğitimlere katılabilir.",
            },
            {
                question: "Derslere ne kadar süre erişebilirim?",
                answer: "Derslere başladıktan sonra 6 ay boyunca dersin tamamına erişim sağlayabilirsiniz. Bu süre içerisinde eğitmenlere soru sorabilir, dersleri dilediğiniz kadar izleyebilir ve ödevleri tamamlayabilirsiniz.",
            },
            {
                question: "Ücretsiz deneme yapabilir miyim?",
                answer: "Eğitime başlamadan önce içerik hakkında fikir sahibi olabilmeniz için her eğitimden bir bölümü ücretsiz olarak yayınlıyoruz. Bu başlıklara eğitim sayfalarından ulaşabilirsiniz.",
            },
        ],
    },
    {
        title: "Teknik Konular",
        items: [
            {
                question: "Nasıl üye olabilirim?",
                answer: "fluakademi.com sitesinin sağ üst köşesinde bulunan \"Giriş Yap\" bölümünden kayıt ol sekmesini tıklayarak üyelik işlemlerinizi tamamlayabilirsiniz.",
            },
            {
                question: "Doğrulama maili gelmedi, ne yapmalıyım?",
                answer: "Mail kutunuzun gereksiz posta (spam) kısmını kontrol etmelisiniz. Eğer orada da yoksa sitedeki canlı destek veya telefon hattı üzerinden bize ulaşabilirsiniz.",
            },
            {
                question: "Hangi cihazlardan erişebilirim?",
                answer: "Eğitim videolarımıza internet bağlantısı bulunan tüm bilgisayarlardan ve akıllı telefon, tablet gibi mobil cihazlarınız üzerinden kolayca erişim sağlayabilirsiniz.",
            },
            {
                question: "Online eğitmen buluşmaları ne zaman?",
                answer: "Aldığınız dersin eğitmeni ile gerçekleştireceğiniz online buluşma, eğitimin akademik takvimine göre belirlenecektir. Davetiye buluşmadan iki hafta önce mailinize gönderilecektir.",
            },
        ],
    },
];

// ——— Component ———

export default function IletisimPage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [openFAQ, setOpenFAQ] = useState<string | null>(null);

    return (
        <main className="min-h-screen bg-[var(--theme-bg-primary)]">
            <FloatingHeader />

            {/* Hero */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-[10%] w-72 h-72 bg-[#FFBC0B]/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-[15%] w-96 h-96 bg-[#00D9FF]/8 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${isDark
                                ? "bg-[#FFBC0B]/10 text-[#FFBC0B] border border-[#FFBC0B]/20"
                                : "bg-[#FFBC0B]/10 text-[#b8860b] border border-[#FFBC0B]/30"
                                }`}
                        >
                            <MessageCircle size={14} />
                            İletişim & Destek
                        </motion.div>

                        <h1 className="text-4xl md:text-6xl font-bold text-[var(--theme-text-primary)] mb-4 leading-tight">
                            Size Nasıl{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFBC0B] to-[#00D9FF]">
                                Yardımcı
                            </span>{" "}
                            Olabiliriz?
                        </h1>
                        <p className="text-lg text-[var(--theme-text-muted)] max-w-2xl mx-auto">
                            Her türlü soru ve talebiniz için buradayız. Size en uygun iletişim kanalını seçin.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {contactMethods.map((method, i) => (
                        <motion.a
                            key={method.title}
                            href={method.href}
                            target={method.href.startsWith("http") ? "_blank" : undefined}
                            rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.08 }}
                            whileHover={{ y: -4 }}
                            className={`group block p-6 rounded-2xl transition-all ${isDark
                                ? "bg-[var(--theme-bg-card)] border border-white/[0.06] hover:border-white/10"
                                : "bg-white border border-black/[0.06] shadow-md hover:shadow-lg"
                                }`}
                        >
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                                style={{ background: `${method.color}15` }}
                            >
                                <method.icon size={22} style={{ color: method.color }} />
                            </div>
                            <h3 className="text-lg font-bold text-[var(--theme-text-primary)] mb-2">
                                {method.title}
                            </h3>
                            <p className="text-sm text-[var(--theme-text-muted)] mb-4 leading-relaxed">
                                {method.description}
                            </p>
                            <span
                                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
                                style={{ color: method.color }}
                            >
                                {method.action}
                                <ExternalLink size={14} />
                            </span>
                        </motion.a>
                    ))}
                </div>
            </section>

            {/* Contact Info Bar */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 ${isDark
                        ? "bg-white/[0.03] border border-white/[0.06]"
                        : "bg-[var(--theme-bg-secondary)] border border-black/[0.06]"
                        }`}
                >
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[#FFBC0B]/10 flex items-center justify-center shrink-0">
                            <Phone size={18} className="text-[#FFBC0B]" />
                        </div>
                        <div>
                            <div className="text-xs text-[var(--theme-text-muted)] mb-1">Telefon / WhatsApp</div>
                            <a
                                href="https://wa.me/+905447899414"
                                className="text-sm font-semibold text-[var(--theme-text-primary)] hover:text-[#FFBC0B] transition-colors"
                            >
                                +(90) 544 789 94 14
                            </a>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[#00D9FF]/10 flex items-center justify-center shrink-0">
                            <Mail size={18} className="text-[#00D9FF]" />
                        </div>
                        <div>
                            <div className="text-xs text-[var(--theme-text-muted)] mb-1">E-posta</div>
                            <a
                                href="mailto:destek@fluakademi.com"
                                className="text-sm font-semibold text-[var(--theme-text-primary)] hover:text-[#FFBC0B] transition-colors"
                            >
                                destek@fluakademi.com
                            </a>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[#A855F7]/10 flex items-center justify-center shrink-0">
                            <MapPin size={18} className="text-[#A855F7]" />
                        </div>
                        <div>
                            <div className="text-xs text-[var(--theme-text-muted)] mb-1">Adres</div>
                            <p className="text-sm font-semibold text-[var(--theme-text-primary)]">
                                Yenişehir Mah. Ulubatlı Sk. Teknopark No: 3 Yahşihan/Kırıkkale
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* FAQ */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 ${isDark
                        ? "bg-white/[0.04] text-[var(--theme-text-muted)] border border-white/[0.06]"
                        : "bg-black/[0.04] text-[var(--theme-text-muted)] border border-black/[0.06]"
                        }`}>
                        <HelpCircle size={14} />
                        SSS
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--theme-text-primary)]">
                        Sıkça Sorulan Sorular
                    </h2>
                </motion.div>

                <div className="space-y-8">
                    {faqCategories.map((cat) => (
                        <div key={cat.title}>
                            <h3 className="text-lg font-semibold text-[var(--theme-text-primary)] mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-5 rounded-full bg-[#FFBC0B]" />
                                {cat.title}
                            </h3>
                            <div className="space-y-2">
                                {cat.items.map((faq) => {
                                    const key = `${cat.title}-${faq.question}`;
                                    const isOpen = openFAQ === key;
                                    return (
                                        <motion.div
                                            key={key}
                                            className={`rounded-xl overflow-hidden transition-colors ${isDark
                                                ? "bg-[var(--theme-bg-card)] border border-white/[0.06] hover:border-white/10"
                                                : "bg-white border border-black/[0.06] hover:border-black/10"
                                                }`}
                                        >
                                            <button
                                                onClick={() => setOpenFAQ(isOpen ? null : key)}
                                                className="w-full flex items-center justify-between p-4 text-left"
                                            >
                                                <span className="text-sm font-medium text-[var(--theme-text-primary)] pr-4">
                                                    {faq.question}
                                                </span>
                                                <motion.div
                                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="shrink-0"
                                                >
                                                    <ChevronDown size={16} className="text-[var(--theme-text-muted)]" />
                                                </motion.div>
                                            </button>
                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <div className={`px-4 pb-4 text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-[var(--theme-text-muted)]"}`}>
                                                            {faq.answer}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Kariyer CTA */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`relative rounded-3xl overflow-hidden p-10 md:p-14 text-center ${isDark
                        ? "bg-gradient-to-br from-[#A855F7]/10 via-[#FFBC0B]/5 to-transparent border border-white/[0.06]"
                        : "bg-gradient-to-br from-[#A855F7]/10 via-[#FFBC0B]/10 to-[#A855F7]/5 border border-black/[0.06]"
                        }`}
                >
                    <div className="text-4xl mb-4">🚀</div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--theme-text-primary)] mb-3">
                        Ekibimize Katılmak İster misin?
                    </h2>
                    <p className="text-[var(--theme-text-muted)] mb-6 max-w-lg mx-auto">
                        Büyüyen ekibimize katılmak ve eğitim dünyasına katkıda bulunmak istiyorsan, özgeçmişini bize gönder.
                    </p>
                    <motion.a
                        href="mailto:kariyer@fluakademi.com"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFBC0B] text-black font-semibold text-sm hover:bg-[#e5a800] transition-colors"
                    >
                        <Send size={16} />
                        Başvuru Gönder
                    </motion.a>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
