"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const testimonials = [
    {
        name: "Zeynep K.",
        role: "Yazılım Mühendisi",
        text: "Dijital Akademi sayesinde kariyer değiştirmeyi başardım. Harika içerikler!",
        avatar: "👩‍💻",
    },
    {
        name: "Ahmet B.",
        role: "Girişimci",
        text: "Felsefe eğitimleri bakış açımı tamamen değiştirdi. Teşekkürler Flu!",
        avatar: "🧔",
    },
    {
        name: "Elif T.",
        role: "Tasarımcı",
        text: "UI/UX bootcamp'i mükemmeldi. Şimdi hayallerimdeki şirkette çalışıyorum.",
        avatar: "👩‍🎨",
    },
    {
        name: "Mert Y.",
        role: "Öğrenci",
        text: "Mentorluk programı bana inanılmaz bir ivme kazandırdı.",
        avatar: "🎓",
    },
    {
        name: "Selin A.",
        role: "Pazarlama Uzmanı",
        text: "Etkinlikler networking için harika. Bir sürü değerli bağlantı kurdum.",
        avatar: "💼",
    },
    {
        name: "Can D.",
        role: "Data Scientist",
        text: "AI eğitimleri sektördeki en güncel içerikleri sunuyor.",
        avatar: "🔬",
    },
];

export default function TestimonialMarquee() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <section className="py-20 bg-[var(--theme-bg-primary)] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <span className="text-[#FFBC0B] text-sm font-medium tracking-wider">
                        TOPLULUK
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--theme-text-primary)] mt-2">
                        Öğrencilerimizden
                    </h2>
                </motion.div>
            </div>

            {/* Marquee Container */}
            <div className="relative">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--theme-bg-primary)] to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--theme-bg-primary)] to-transparent z-10" />

                {/* First Row - Left to Right */}
                <motion.div
                    className="flex gap-6 mb-6"
                    animate={{ x: [0, -1920] }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                    {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                        <div
                            key={i}
                            className={`flex-shrink-0 w-80 p-6 rounded-2xl backdrop-blur-sm ${isDark
                                ? 'bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10'
                                : 'bg-white/80 border border-black/[0.06] shadow-md'
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFBC0B]/20 to-[#FF6B6B]/20 flex items-center justify-center text-2xl">
                                    {t.avatar}
                                </div>
                                <div>
                                    <div className="font-semibold text-[var(--theme-text-primary)]">{t.name}</div>
                                    <div className="text-sm text-[var(--theme-text-muted)]">{t.role}</div>
                                </div>
                            </div>
                            <p className="text-[var(--theme-text-secondary)] text-sm leading-relaxed">"{t.text}"</p>
                        </div>
                    ))}
                </motion.div>

                {/* Second Row - Right to Left */}
                <motion.div
                    className="flex gap-6"
                    animate={{ x: [-1920, 0] }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                    {[...testimonials.reverse(), ...testimonials, ...testimonials].map((t, i) => (
                        <div
                            key={i}
                            className={`flex-shrink-0 w-80 p-6 rounded-2xl backdrop-blur-sm ${isDark
                                ? 'bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10'
                                : 'bg-white/80 border border-black/[0.06] shadow-md'
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00D9FF]/20 to-[#A855F7]/20 flex items-center justify-center text-2xl">
                                    {t.avatar}
                                </div>
                                <div>
                                    <div className="font-semibold text-[var(--theme-text-primary)]">{t.name}</div>
                                    <div className="text-sm text-[var(--theme-text-muted)]">{t.role}</div>
                                </div>
                            </div>
                            <p className="text-[var(--theme-text-secondary)] text-sm leading-relaxed">"{t.text}"</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
