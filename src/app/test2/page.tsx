"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
 * TEST 2 — "Cinematic Banner"
 * Arka plan alanla ilgili sinematik görsel (kitaplık, amfi, atölye).
 * Eğitmen portresi sol alt köşede büyük yuvarlak/rounded frame içinde.
 * Metin sağ tarafta.
 */

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

export default function Test2Page() {
  const instructor = instructors.find((i) => i.slug === "omer-aygun")!;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

  const bgImage =
    fieldBackgrounds[instructor.field] || fieldBackgrounds["Felsefe"];

  const socialItems = [
    { key: "twitter", icon: <Twitter size={16} />, url: instructor.social.twitter },
    { key: "instagram", icon: <Instagram size={16} />, url: instructor.social.instagram },
    { key: "linkedin", icon: <Linkedin size={16} />, url: instructor.social.linkedin },
    { key: "youtube", icon: <Youtube size={16} />, url: instructor.social.youtube },
    { key: "academic", icon: <GraduationCap size={16} />, url: instructor.social.academicProfile },
  ].filter((s) => s.url);

  const badgeItems = [
    ...(instructor.universities.length > 0
      ? [{ text: `${instructor.universities.length} Üniversite` }]
      : []),
    ...(instructor.works.length > 0
      ? [{ text: `${instructor.works.length} Eser` }]
      : []),
  ];

  return (
    <main className="min-h-screen bg-[var(--theme-bg-primary)]">
      <FloatingHeader />

      <section
        ref={sectionRef}
        className="relative h-[85vh] sm:h-[90vh] lg:h-screen w-full overflow-hidden"
      >
        {/* Cinematic background */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ scale: bgScale }}
        >
          <img
            src={bgImage}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.3)" }}
            draggable={false}
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        {/* Field color glow at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[200px] opacity-20"
          style={{
            background: `linear-gradient(to top, ${instructor.fieldColor}50, transparent)`,
          }}
        />

        {/* Content */}
        <motion.div
          className="relative z-10 h-full flex items-end"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 pb-16 sm:pb-20 lg:pb-24">
            <div className="flex flex-col lg:flex-row items-end gap-6 lg:gap-12">
              {/* Left: Portrait in large rounded frame */}
              <motion.div
                className="shrink-0"
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
              >
                <div className="relative">
                  {/* Glow ring */}
                  <div
                    className="absolute -inset-1 rounded-2xl lg:rounded-3xl opacity-60 blur-sm"
                    style={{
                      background: `linear-gradient(135deg, ${instructor.fieldColor}, ${instructor.fieldColor}40)`,
                    }}
                  />
                  <div
                    className="relative rounded-2xl lg:rounded-3xl overflow-hidden"
                    style={{
                      width: "clamp(140px, 22vw, 260px)",
                      aspectRatio: "3/4",
                      border: `3px solid ${instructor.fieldColor}80`,
                    }}
                  >
                    <img
                      src={instructor.image}
                      alt={`${instructor.firstName} ${instructor.lastName}`}
                      className="w-full h-full object-cover"
                      loading="eager"
                      draggable={false}
                    />
                  </div>
                  {/* Field badge on portrait */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                    <span
                      className="px-4 py-1.5 rounded-full text-[11px] font-bold text-white whitespace-nowrap shadow-lg"
                      style={{ background: instructor.fieldColor }}
                    >
                      {instructor.field}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Right: Text content */}
              <div className="flex-1 lg:pb-2">
                {/* Back link */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Link
                    href="/egitmenler"
                    className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors mb-4"
                  >
                    <ArrowLeft size={14} />
                    Eğitmenler
                  </Link>
                </motion.div>

                {/* Name */}
                <motion.h1
                  className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white mb-2 leading-[0.95] tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                >
                  {instructor.firstName}{" "}
                  <span className="text-white/85">{instructor.lastName}</span>
                </motion.h1>

                {/* Title */}
                <motion.p
                  className="text-base sm:text-lg lg:text-xl text-white/50 mb-5 font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55, duration: 0.5 }}
                >
                  {instructor.title}
                </motion.p>

                {/* Badges + Social */}
                <motion.div
                  className="flex flex-wrap items-center gap-2.5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  {badgeItems.map((badge) => (
                    <span
                      key={badge.text}
                      className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-white/70 bg-white/[0.08] border border-white/[0.08] backdrop-blur-sm"
                    >
                      {badge.text}
                    </span>
                  ))}

                  {socialItems.length > 0 && (
                    <>
                      <span className="w-px h-5 bg-white/10 mx-1 hidden sm:block" />
                      {socialItems.map((s) => (
                        <a
                          key={s.key}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.15] transition-all backdrop-blur-sm"
                        >
                          {s.icon}
                        </a>
                      ))}
                    </>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
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
          Test 2 — Cinematic Banner
        </h2>
        <p className="text-[var(--theme-text-secondary)]">
          Sinematik arka plan (kitaplık/alan görseli) üzerine eğitmen portresi sol altta büyük rounded frame içinde.
          Metin sağda, altta hizalı. Mevcut yapıya yakın ama portre ayrı frame&apos;de öne çıkarılmış.
        </p>
      </div>

      <Footer />
    </main>
  );
}
