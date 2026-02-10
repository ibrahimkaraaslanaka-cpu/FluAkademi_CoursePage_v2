import FloatingHeader from "@/components/layout/FloatingHeader";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/effects/AnimatedBackground";
import ImmersiveHero from "@/components/sections/ImmersiveHero";
import BentoGrid from "@/components/sections/BentoGrid";
import TestimonialMarquee from "@/components/sections/TestimonialMarquee";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--theme-bg-primary)] overflow-hidden">
      {/* Animated Particle Background */}
      <AnimatedBackground />

      {/* Floating Glass Header */}
      <FloatingHeader />

      {/* Immersive Video Hero */}
      <ImmersiveHero />

      {/* Bento Grid Sections */}
      <BentoGrid />

      {/* Testimonial Marquee */}
      <TestimonialMarquee />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
