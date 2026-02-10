"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Play, Sparkles, ArrowRight, Volume2, VolumeX } from "lucide-react";
import LightRays from "@/components/effects/LightRays";

const heroSlides = [
    {
        id: 1,
        title: "Düşüncenin",
        highlight: "Gücünü Keşfet",
        subtitle: "Felsefe, Tarih, Sanat ve Mitoloji",
        category: "FLU AKADEMİ",
        video: "https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-23-large.mp4",
        color: "#FFBC0B",
    },
    {
        id: 2,
        title: "Geleceğin",
        highlight: "Becerilerini Öğren",
        subtitle: "Yapay Zeka, Web Geliştirme, UI/UX Design",
        category: "DİJİTAL AKADEMİ",
        video: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-futuristic-devices-99786-large.mp4",
        color: "#00D9FF",
    },
    {
        id: 3,
        title: "Topluluğa",
        highlight: "Katıl",
        subtitle: "Workshop'lar, Webinarlar, Networking",
        category: "ETKİNLİKLER",
        video: "https://assets.mixkit.co/videos/preview/mixkit-curvy-road-on-a-tree-covered-hill-41537-large.mp4",
        color: "#FF6B6B",
    },
];

export default function ImmersiveHero() {
    const [current, setCurrent] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % heroSlides.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            mouseX.set((clientX - innerWidth / 2) / 50);
            mouseY.set((clientY - innerHeight / 2) / 50);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const slide = heroSlides[current];

    return (
        <section className="relative h-screen overflow-hidden bg-black">
            {/* Video Background */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <video
                        ref={videoRef}
                        autoPlay
                        loop
                        muted={isMuted}
                        playsInline
                        className="w-full h-full object-cover"
                        src={slide.video}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
                    <div
                        className="absolute inset-0 opacity-30"
                        style={{
                            background: `radial-gradient(circle at 30% 50%, ${slide.color}20 0%, transparent 50%)`,
                        }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Floating Orbs */}
            <motion.div
                style={{ x: springX, y: springY }}
                className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
                animate={{
                    background: [
                        `radial-gradient(circle, ${slide.color} 0%, transparent 70%)`,
                    ],
                }}
                transition={{ duration: 1 }}
            />
            <motion.div
                style={{ x: springY, y: springX }}
                className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 blur-2xl pointer-events-none"
                animate={{
                    background: [
                        `radial-gradient(circle, #5E55FF 0%, transparent 70%)`,
                    ],
                }}
            />

            {/* Light Rays — WebGL overlay */}
            <div className="absolute inset-0 z-[5]" style={{ width: "100%", height: "100%" }}>
                <LightRays
                    raysOrigin="top-center"
                    raysColor={slide.color}
                    raysSpeed={1}
                    lightSpread={1.2}
                    rayLength={3}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0}
                    distortion={0}
                    pulsating={false}
                    fadeDistance={1}
                    saturation={1}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={slide.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="max-w-4xl"
                        >
                            {/* Category Badge */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                                style={{ background: `${slide.color}20`, border: `1px solid ${slide.color}40` }}
                            >
                                <Sparkles size={14} style={{ color: slide.color }} />
                                <span className="text-sm font-medium" style={{ color: slide.color }}>
                                    {slide.category}
                                </span>
                            </motion.div>

                            {/* Title */}
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight">
                                {slide.title}
                                <br />
                                <motion.span
                                    className="inline-block"
                                    style={{ color: slide.color }}
                                    animate={{
                                        textShadow: [
                                            `0 0 20px ${slide.color}40`,
                                            `0 0 40px ${slide.color}60`,
                                            `0 0 20px ${slide.color}40`,
                                        ],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    {slide.highlight}
                                </motion.span>
                            </h1>

                            {/* Subtitle */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl"
                            >
                                {slide.subtitle}
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="flex flex-wrap gap-4"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${slide.color}50` }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-black transition-all"
                                    style={{ background: slide.color }}
                                >
                                    <Play size={20} fill="black" />
                                    Keşfetmeye Başla
                                    <ArrowRight
                                        size={18}
                                        className="group-hover:translate-x-1 transition-transform"
                                    />
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.15)" }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center gap-3 px-8 py-4 rounded-full font-medium text-white bg-white/10 backdrop-blur-sm border border-white/20"
                                >
                                    Ücretsiz Dene
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-8 left-0 right-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    {/* Progress Indicators */}
                    <div className="flex gap-3">
                        {heroSlides.map((s, i) => (
                            <button
                                key={s.id}
                                onClick={() => setCurrent(i)}
                                className="relative h-1 rounded-full overflow-hidden transition-all"
                                style={{ width: i === current ? "80px" : "32px" }}
                            >
                                <div
                                    className="absolute inset-0"
                                    style={{ background: i === current ? slide.color : "rgba(255,255,255,0.3)" }}
                                />
                                {i === current && (
                                    <motion.div
                                        className="absolute inset-0 origin-left"
                                        style={{ background: "rgba(255,255,255,0.5)" }}
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 8, ease: "linear" }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Audio Toggle */}
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                    >
                        {isMuted ? (
                            <VolumeX size={20} className="text-white" />
                        ) : (
                            <Volume2 size={20} className="text-white" />
                        )}
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
                    <motion.div
                        className="w-1.5 h-3 rounded-full bg-white/60"
                        animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </section>
    );
}
