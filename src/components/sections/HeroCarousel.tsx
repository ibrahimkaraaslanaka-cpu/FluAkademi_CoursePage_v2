"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Clock, Video } from "lucide-react";

interface HeroItem {
    id: number;
    title: string;
    instructor: string;
    category: string;
    type: "akademi" | "dijital" | "etkinlik" | "danismanlik";
    image: string;
    description: string;
}

const heroItems: HeroItem[] = [
    {
        id: 1,
        title: "Felsefe ve Düşünce Tarihi",
        instructor: "Prof. Dr. Ahmet Yıldız",
        category: "Flu Akademi",
        type: "akademi",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200",
        description: "Antik çağdan modern düşünceye felsefi bir yolculuk",
    },
    {
        id: 2,
        title: "Web Geliştirme Bootcamp",
        instructor: "Mehmet Demir",
        category: "Dijital Akademi",
        type: "dijital",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200",
        description: "Sıfırdan profesyonel web developer olun",
    },
    {
        id: 3,
        title: "Yapay Zeka Workshop",
        instructor: "Dr. Zeynep Kaya",
        category: "Etkinlik",
        type: "etkinlik",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200",
        description: "28 Aralık - Online etkinlik",
    },
    {
        id: 4,
        title: "Kariyer Danışmanlığı",
        instructor: "Ali Korkmaz",
        category: "1'e 1 Danışmanlık",
        type: "danismanlik",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200",
        description: "Hedefinize özel kişisel mentorluk",
    },
];

const typeColors = {
    akademi: "bg-[#FFBC0B]",
    dijital: "bg-[#1a1a1a]",
    etkinlik: "bg-[#2a2a2a]",
    danismanlik: "bg-[#1f1f1f]",
};

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % heroItems.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const next = () => setCurrent((prev) => (prev + 1) % heroItems.length);
    const prev = () => setCurrent((prev) => (prev - 1 + heroItems.length) % heroItems.length);

    const item = heroItems[current];

    return (
        <section className="relative h-[600px] md:h-[700px] overflow-hidden">
            {/* Background Image */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-2xl"
                    >
                        {/* Category Badge */}
                        <span
                            className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 ${item.type === "akademi"
                                    ? "bg-[#FFBC0B] text-black"
                                    : "bg-white/20 text-white"
                                }`}
                        >
                            {item.category}
                        </span>

                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                            {item.title}
                        </h1>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-gray-300 mb-6">
                            {item.description}
                        </p>

                        {/* Instructor */}
                        <p className="text-white/80 mb-8">
                            <span className="text-[#FFBC0B]">Eğitmen:</span> {item.instructor}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <button className="flex items-center gap-2 px-6 py-3 bg-[#FFBC0B] text-black font-semibold rounded-lg hover:bg-[#E5A800] transition-all hover:scale-105">
                                <Play size={20} fill="black" />
                                Hemen Başla
                            </button>
                            <button className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-lg border border-white/20 hover:bg-white/20 transition-all">
                                Detayları Gör
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all"
            >
                <ChevronLeft className="text-white" size={24} />
            </button>
            <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all"
            >
                <ChevronRight className="text-white" size={24} />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {heroItems.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === current
                                ? "bg-[#FFBC0B] w-8"
                                : "bg-white/40 hover:bg-white/60"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
