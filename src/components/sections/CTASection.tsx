"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

export default function CTASection() {
    return (
        <section className="relative py-32 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFBC0B] via-[#FF8C00] to-[#FF6B6B]">
                {/* Floating Shapes */}
                <motion.div
                    animate={{
                        y: [0, -30, 0],
                        rotate: [0, 10, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 left-[10%] w-32 h-32 rounded-full bg-white/10 blur-2xl"
                />
                <motion.div
                    animate={{
                        y: [0, 20, 0],
                        rotate: [0, -15, 0],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-20 right-[20%] w-48 h-48 rounded-full bg-black/10 blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/5 blur-3xl"
                />

                {/* Grid Pattern Overlay */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 text-black font-medium text-sm mb-8"
                    >
                        <Zap size={16} />
                        Şimdi Katıl, %20 İndirim Kazan
                    </motion.div>

                    {/* Headline */}
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-tight">
                        Öğrenmeye
                        <br />
                        <span className="relative">
                            Başlamanın Tam Zamanı
                            <motion.svg
                                className="absolute -bottom-2 left-0 w-full"
                                viewBox="0 0 400 20"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                            >
                                <motion.path
                                    d="M 0 15 Q 100 0 200 15 Q 300 30 400 15"
                                    fill="none"
                                    stroke="black"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                            </motion.svg>
                        </span>
                    </h2>

                    {/* Description */}
                    <p className="text-xl md:text-2xl text-black/70 mb-12 max-w-2xl mx-auto">
                        Türkiye'nin en kapsamlı online eğitim platformuna katıl.
                        Binlerce öğrenciyle birlikte gelişmeye başla.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                            whileTap={{ scale: 0.98 }}
                            className="group flex items-center justify-center gap-3 px-10 py-5 bg-black text-white font-bold text-lg rounded-2xl transition-all"
                        >
                            <Sparkles size={20} className="group-hover:animate-spin" />
                            Ücretsiz Başla
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05, background: "rgba(0,0,0,0.1)" }}
                            whileTap={{ scale: 0.98 }}
                            className="px-10 py-5 text-black font-semibold text-lg rounded-2xl border-2 border-black/30 hover:border-black transition-all"
                        >
                            Planları İncele
                        </motion.button>
                    </div>

                    {/* Trust Badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center justify-center gap-8 mt-12 text-black/60 text-sm"
                    >
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {["👩‍💻", "🧔", "👩‍🎨", "🎓"].map((emoji, i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-lg shadow-md"
                                    >
                                        {emoji}
                                    </div>
                                ))}
                            </div>
                            <span>2,400+ öğrenci</span>
                        </div>
                        <div className="hidden sm:block w-px h-6 bg-black/20" />
                        <div className="hidden sm:flex items-center gap-2">
                            <span className="text-2xl">⭐</span>
                            <span>4.9 ortalama puan</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
