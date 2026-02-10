"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowLeft,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  GraduationCap,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import FloatingHeader from "@/components/layout/FloatingHeader";
import Footer from "@/components/layout/Footer";
import { instructors } from "@/data/instructors";

/*
 * TEST 1 — "Layered Depth"
 * Tam ekran atmosferik arka plan (blur + karartma),
 * üzerine eğitmen portresi keskin ve büyük (floating card).
 * Mouse parallax ile derinlik hissi.
 */

// Field-specific atmospheric background images
const fieldBackgrounds: Record<string, string> = {
  Felsefe:
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920&q=80",
  Psikoloji:
    "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1920&q=80",
  Sosyoloji:
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80",
  "Edebiyat & Mitoloji":
    "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80",
  "Güzel Sanatlar":
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1920&q=80",
  "Siyaset Bilimi":
    "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1920&q=80",
};

export default function Test1Page() {
  const instructor = instructors.find((i) => i.slug === "omer-aygun")!;
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY, view } = e;
      if (!view) return;
      mouseX.set((clientX - view.innerWidth / 2) / 30);
      mouseY.set((clientY - view.innerHeight / 2) / 30);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isTouchDevice, mouseX, mouseY]);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  // Portrait parallax (moves opposite for depth)
  const portraitX = useTransform(springX, (v) => v * -1.5);
  const portraitY = useTransform(springY, (v) => v * -1.5);

  const bgImage =
    fieldBackgrounds[instructor.field] || fieldBackgrounds["Felsefe"];

  const socialItems = [
    { key: "twitter", icon: <Twitter size={16} />, url: instructor.social.twitter },
    { key: "instagram", icon: <Instagram size={16} />, url: instructor.social.instagram },
    { key: "linkedin", icon: <Linkedin size={16} />, url: instructor.social.linkedin },
    { key: "youtube", icon: <Youtube size={16} />, url: instructor.social.youtube },
    { key: "academic", icon: <GraduationCap size={16} />, url: instructor.social.academicProfile },
  ].filter((s) => s.url);

  return (
    <main className="min-h-screen bg-[var(--theme-bg-primary)]">
      <FloatingHeader />

      <section
        ref={sectionRef}
        className="relative h-[85vh] sm:h-[90vh] lg:h-screen w-full overflow-hidden"
      >
        {/* Atmospheric background — blurred + darkened */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ scale: bgScale, x: springX, y: springY }}
        >
          <img
            src={bgImage}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: "blur(3px) brightness(0.25)" }}
            draggable={false}
          />
        </motion.div>

        {/* Color glow from field */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            background: `radial-gradient(ellipse at 30% 70%, ${instructor.fieldColor}60 0%, transparent 60%)`,
          }}
        />

        {/* Content layer */}
        <motion.div
          className="relative z-10 h-full flex items-center"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <div className="max-w-7xl mx-auto w-full px-5 sm:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              {/* Left: Text */}
              <div className="lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
                {/* Back link */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Link
                    href="/egitmenler"
                    className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors mb-5"
                  >
                    <ArrowLeft size={14} />
                    Eğitmenler
                  </Link>
                </motion.div>

                {/* Field badge */}
                <motion.div
                  className="mb-4"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <span
                    className="px-4 py-2 rounded-full text-xs font-bold text-white backdrop-blur-md"
                    style={{ background: `${instructor.fieldColor}CC` }}
                  >
                    {instructor.field}
                  </span>
                </motion.div>

                {/* Name */}
                <motion.h1
                  className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-3 leading-[0.95] tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                >
                  {instructor.firstName}
                  <br />
                  <span className="text-white/85">{instructor.lastName}</span>
                </motion.h1>

                {/* Title */}
                <motion.p
                  className="text-lg text-white/50 mb-6 font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  {instructor.title}
                </motion.p>

                {/* Social */}
                <motion.div
                  className="flex gap-2 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  {socialItems.map((s) => (
                    <a
                      key={s.key}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.15] transition-all backdrop-blur-sm"
                    >
                      {s.icon}
                    </a>
                  ))}
                </motion.div>
              </div>

              {/* Right: Floating Portrait Card */}
              <motion.div
                className="lg:w-1/2 flex justify-center order-1 lg:order-2"
                style={{ x: portraitX, y: portraitY }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div
                      className="relative rounded-3xl overflow-hidden shadow-2xl"
                      style={{
                        width: "clamp(240px, 40vw, 380px)",
                        aspectRatio: "3/4",
                        border: `3px solid ${instructor.fieldColor}50`,
                        boxShadow: `0 25px 80px ${instructor.fieldColor}20, 0 10px 40px rgba(0,0,0,0.5)`,
                      }}
                    >
                      <img
                        src={instructor.image}
                        alt={`${instructor.firstName} ${instructor.lastName}`}
                        className="w-full h-full object-cover"
                        loading="eager"
                        draggable={false}
                      />
                      {/* Subtle gradient at bottom of portrait */}
                      <div
                        className="absolute inset-x-0 bottom-0 h-24"
                        style={{
                          background: `linear-gradient(to top, ${instructor.fieldColor}30, transparent)`,
                        }}
                      />
                    </div>
                    {/* Glow behind card */}
                    <div
                      className="absolute -inset-8 -z-10 rounded-full opacity-20 blur-3xl"
                      style={{
                        background: `radial-gradient(circle, ${instructor.fieldColor} 0%, transparent 70%)`,
                      }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-[10px] text-white/30 tracking-widest uppercase">
            Keşfet
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown size={18} className="text-white/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* Placeholder content */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-[var(--theme-text-primary)] mb-4">
          Test 1 — Layered Depth
        </h2>
        <p className="text-[var(--theme-text-secondary)]">
          Atmosferik arka plan (blur + karartma) üzerine eğitmen portresi floating card olarak yerleştirilmiş.
          Mouse parallax ile derinlik hissi verilmiş. Portre arka plandan ayrışır.
        </p>
      </div>

      <Footer />
    </main>
  );
}
