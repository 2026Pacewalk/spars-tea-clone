import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import carousel1 from "@/assets/sparsh/carousel-1.jpg";
import carousel2 from "@/assets/sparsh/carousel-2.jpg";
import about2 from "@/assets/sparsh/about-2.jpg";
import about4 from "@/assets/sparsh/about-4.jpg";
import mockup1 from "@/assets/sparsh/Sparsh-Mockup.png";
import mockup2 from "@/assets/sparsh/Sparsh-Mockup-2.png";
import mockup3 from "@/assets/sparsh/Sparsh-Mockup-3.png";

type Slide = {
  eyebrow: string;
  title: string;
  em: string;
  tail?: string;
  desc: string;
  bg: string;
  product: string;
};

const slides: Slide[] = [
  {
    eyebrow: "organic indian tea",
    title: "Start Your",
    em: "Relaxing Life",
    tail: "Today",
    desc: "Handpicked leaves from Assam & Nilgiri — brewed to perfection.",
    bg: carousel1,
    product: mockup1,
  },
  {
    eyebrow: "signature blend",
    title: "Bold. Aromatic.",
    em: "Sparsh Nagni",
    desc: "Our strongest cup — malty, robust and unforgettable.",
    bg: about2,
    product: mockup2,
  },
  {
    eyebrow: "spiced tradition",
    title: "The Warmth of",
    em: "Masala Chai",
    desc: "A perfect balance of cardamom, ginger, clove and cinnamon.",
    bg: carousel2,
    product: mockup3,
  },
  {
    eyebrow: "garden to cup",
    title: "Sip a Touch",
    em: "of Nature",
    desc: "100% natural leaves, packaged fresh at the source.",
    bg: about4,
    product: mockup1,
  },
];

export default function HeroSlider3D() {
  const [i, setI] = useState(0);
  const n = slides.length;

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % n), 6000);
    return () => clearInterval(t);
  }, [n]);

  const go = (d: number) => setI((v) => (v + d + n) % n);

  return (
    <section id="home" className="relative overflow-hidden bg-dark">
      {/* 3D background stage */}
      <div
        className="absolute inset-0"
        style={{ perspective: "1600px", perspectiveOrigin: "50% 50%" }}
      >
        {slides.map((s, idx) => {
          const offset = ((idx - i + n) % n + n) % n;
          const rel = offset > n / 2 ? offset - n : offset;
          const abs = Math.abs(rel);
          const isActive = rel === 0;
          const translateX = rel * 55; // %
          const rotateY = rel * -35; // deg
          const translateZ = isActive ? 0 : -350;
          const opacity = abs > 1 ? 0 : isActive ? 1 : 0.55;

          return (
            <div
              key={idx}
              className="absolute inset-0 transition-all duration-[900ms] ease-out"
              style={{
                transform: `translate3d(${translateX}%, 0, ${translateZ}px) rotateY(${rotateY}deg)`,
                opacity,
                transformStyle: "preserve-3d",
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              <img
                src={s.bg}
                alt=""
                className="w-full h-full object-cover"
                style={{
                  transform: isActive ? "scale(1.05)" : "scale(1)",
                  transition: "transform 6s ease-out",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/70 to-dark/10" />
            </div>
          );
        })}
      </div>

      {/* Foreground content */}
      <div className="relative max-w-[1400px] mx-auto px-6 py-32 md:py-44 lg:py-52 grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-10 min-h-[640px] lg:min-h-[760px]">
        <div className="relative">
          {slides.map((s, idx) => (
            <div
              key={idx}
              className={`transition-all duration-700 ${
                i === idx
                  ? "opacity-100 translate-y-0 relative"
                  : "opacity-0 translate-y-6 absolute inset-0 pointer-events-none"
              }`}
            >
              <p className="eyebrow text-primary mb-5">{s.eyebrow}</p>
              <h1 className="font-heading text-white text-5xl md:text-7xl lg:text-8xl leading-[1.02] max-w-2xl mb-6">
                {s.title}
                <br />
                <em className="not-italic block">{s.em}</em>
                {s.tail && (
                  <>
                    <br />
                    {s.tail}
                  </>
                )}
              </h1>
              <p className="text-white/85 text-lg mb-10 max-w-md">{s.desc}</p>
              <a
                href="#products"
                className="inline-flex items-center gap-3 bg-white text-dark px-8 py-4 rounded-full text-sm font-medium tracking-wider uppercase hover:bg-primary hover:text-primary-foreground transition"
              >
                Shop Our Teas <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* 3D floating product */}
        <div
          className="hidden lg:block relative h-[520px]"
          style={{ perspective: "1400px" }}
        >
          {slides.map((s, idx) => {
            const isActive = i === idx;
            return (
              <div
                key={idx}
                className="absolute inset-0 flex items-center justify-center transition-all duration-[900ms] ease-out"
                style={{
                  transform: isActive
                    ? "translate3d(0,0,0) rotateY(-14deg) rotateX(4deg)"
                    : "translate3d(120px, 40px, -400px) rotateY(-45deg)",
                  opacity: isActive ? 1 : 0,
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="relative animate-float">
                  <img
                    src={s.product}
                    alt={s.em}
                    className="max-h-[500px] w-auto drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]"
                  />
                  {/* Glow */}
                  <div
                    className="absolute -inset-10 -z-10 rounded-full blur-3xl opacity-40"
                    style={{ background: "radial-gradient(closest-side, var(--color-primary), transparent 70%)" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous slide"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/30 text-white grid place-items-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition backdrop-blur"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next slide"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/30 text-white grid place-items-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition backdrop-blur"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`transition-all rounded-full ${
              i === idx ? "w-10 h-2 bg-primary" : "w-2 h-2 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:flex items-center gap-2 text-white/70 text-xs uppercase tracking-widest">
        <span className="text-white font-medium">
          {String(i + 1).padStart(2, "0")}
        </span>
        <span className="w-10 h-px bg-white/40" />
        <span>{String(n).padStart(2, "0")}</span>
      </div>
    </section>
  );
}
