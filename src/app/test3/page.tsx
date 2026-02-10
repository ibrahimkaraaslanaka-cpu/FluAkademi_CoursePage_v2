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
 * TEST 3 — "Gradient Field + Portrait"
 * fieldColor gradient arka plan + hafif noise texture.
 * Büyük eğitmen portresi sağda. Minimal, temiz, renk odaklı.
 */

export default function Test3Page() {
  const instructor = instructors.find((i) => i.slug === "omer-aygun")!;
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 60]);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY, view } = e;
      if (!view) return;
      mouseX.set((clientX - view.innerWidth / 2) / 50);
      mouseY.set((clientY - view.innerHeight / 2) / 50);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isTouchDevice, mouseX, mouseY]);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

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

  // Derive lighter and darker shades from fieldColor for gradient
  const fieldColor = instructor.fieldColor;

  return (
    <main className="min-h-screen bg-[var(--theme-bg-primary)]">
      <FloatingHeader />

      <section
        ref={sectionRef}
        className="relative h-[85vh] sm:h-[90vh] lg:h-screen w-full overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #05111E 0%, #0a1628 30%, ${fieldColor}15 70%, ${fieldColor}25 100%)`,
        }}
      >
        {/* Abstract gradient orbs for visual interest */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-[10%] right-[15%] w-[600px] h-[600px] rounded-full opacity-[0.08] blur-[120px]"
            style={{
              background: `radial-gradient(circle, ${fieldColor} 0%, transparent 70%)`,
            }}
          />
          <div
            className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] rounded-full opacity-[0.06] blur-[100px]"
            style={{
              background: `radial-gradient(circle, ${fieldColor} 0%, transparent 70%)`,
            }}
          />
          <div
            className="absolute top-[40%] left-[50%] w-[300px] h-[300px] rounded-full opacity-[0.04] blur-[80px]"
            style={{
              background: "radial-gradient(circle, #5E55FF 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(${fieldColor}30 1px, transparent 1px), linear-gradient(90deg, ${fieldColor}30 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Content */}
        <motion.div
          className="relative z-10 h-full flex items-center"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <div className="max-w-7xl mx-auto w-full px-5 sm:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              {/* Left: Text */}
              <div className="lg:w-[55%] text-center lg:text-left order-2 lg:order-1">
                {/* Back link */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Link
                    href="/egitmenler"
                    className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors mb-6"
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
                    className="px-4 py-2 rounded-full text-xs font-bold text-white"
                    style={{ background: fieldColor }}
                  >
                    {instructor.field}
                  </span>
                </motion.div>

                {/* Name */}
                <motion.h1
                  className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white mb-3 leading-[0.92] tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                >
                  <span className="block">{instructor.firstName}</span>
                  <span
                    className="block"
                    style={{ color: fieldColor }}
                  >
                    {instructor.lastName}
                  </span>
                </motion.h1>

                {/* Title */}
                <motion.p
                  className="text-lg sm:text-xl text-white/50 mb-6 font-light max-w-lg mx-auto lg:mx-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  {instructor.title}
                </motion.p>

                {/* Short bio */}
                <motion.p
                  className="text-sm text-white/35 mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  {instructor.shortBio}
                </motion.p>

                {/* Badges + Social */}
                <motion.div
                  className="flex flex-wrap items-center gap-2.5 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  {badgeItems.map((badge) => (
                    <span
                      key={badge.text}
                      className="px-4 py-2 rounded-full text-xs font-semibold text-white/70 backdrop-blur-sm"
                      style={{
                        background: `${fieldColor}15`,
                        border: `1px solid ${fieldColor}30`,
                      }}
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
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-white/50 hover:text-white transition-all backdrop-blur-sm"
                          style={{
                            background: `${fieldColor}15`,
                            border: `1px solid ${fieldColor}20`,
                          }}
                        >
                          {s.icon}
                        </a>
                      ))}
                    </>
                  )}
                </motion.div>
              </div>

              {/* Right: Large portrait */}
              <motion.div
                className="lg:w-[45%] flex justify-center order-1 lg:order-2"
                style={{ x: springX, y: springY }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 5.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="relative">
                      {/* Portrait */}
                      <div
                        className="relative rounded-3xl overflow-hidden"
                        style={{
                          width: "clamp(220px, 35vw, 340px)",
                          aspectRatio: "3/4",
                          border: `2px solid ${fieldColor}40`,
                          boxShadow: `0 30px 80px ${fieldColor}15, 0 0 0 1px ${fieldColor}10`,
                        }}
                      >
                        <img
                          src={instructor.image}
                          alt={`${instructor.firstName} ${instructor.lastName}`}
                          className="w-full h-full object-cover"
                          loading="eager"
                          draggable={false}
                        />
                        {/* Bottom gradient */}
                        <div
                          className="absolute inset-x-0 bottom-0 h-20"
                          style={{
                            background: `linear-gradient(to top, ${fieldColor}20, transparent)`,
                          }}
                        />
                      </div>

                      {/* Decorative accent line */}
                      <div
                        className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-1 rounded-full"
                        style={{
                          width: "60%",
                          background: `linear-gradient(90deg, transparent, ${fieldColor}, transparent)`,
                          opacity: 0.5,
                        }}
                      />

                      {/* Background glow */}
                      <div
                        className="absolute -inset-12 -z-10 rounded-full opacity-15 blur-3xl"
                        style={{
                          background: `radial-gradient(circle, ${fieldColor} 0%, transparent 70%)`,
                        }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
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
          Test 3 — Gradient Field + Portrait
        </h2>
        <p className="text-[var(--theme-text-secondary)]">
          Eğitmenin alan renginden oluşan gradient arka plan + subtle grid pattern.
          Sağda büyük portre, solda isim (soyadı alan renginde). Minimal ve renk odaklı.
          Mouse parallax + float animasyonu.
        </p>
      </div>

      <Footer />
    </main>
  );
}
