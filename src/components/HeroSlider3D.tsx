import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Leaf, Star, Truck, ShieldCheck } from "lucide-react";
import { handleNavClick } from "@/lib/scroll";

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
  price: string;
  rating: number;
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
    price: "₹280",
    rating: 4.8,
  },
  {
    eyebrow: "signature blend",
    title: "Bold. Aromatic.",
    em: "Sparsh Nagni",
    desc: "Our strongest cup — malty, robust and unforgettable.",
    bg: about2,
    product: mockup2,
    price: "₹280",
    rating: 4.9,
  },
  {
    eyebrow: "spiced tradition",
    title: "The Warmth of",
    em: "Masala Chai",
    desc: "A perfect balance of cardamom, ginger, clove and cinnamon.",
    bg: carousel2,
    product: mockup3,
    price: "₹260",
    rating: 4.9,
  },
  {
    eyebrow: "garden to cup",
    title: "Sip a Touch",
    em: "of Nature",
    desc: "100% natural leaves, packaged fresh at the source.",
    bg: about4,
    product: mockup1,
    price: "₹340",
    rating: 4.7,
  },
];

const AUTOPLAY_MS = 7000;

const trustPills = [
  { icon: Leaf, label: "100% Natural" },
  { icon: Truck, label: "Free Shipping" },
  { icon: ShieldCheck, label: "Secure Checkout" },
];

// Decorative floating leaves (position + rotation + delay)
const leaves = [
  { top: "14%", left: "8%", size: 26, r: "-18deg", delay: "0s", op: 0.25 },
  { top: "72%", left: "16%", size: 20, r: "12deg", delay: "1.4s", op: 0.2 },
  { top: "22%", right: "12%", size: 30, r: "24deg", delay: "0.8s", op: 0.18 },
  { top: "80%", right: "26%", size: 18, r: "-10deg", delay: "2.1s", op: 0.22 },
];

export default function HeroSlider3D() {
  const [i, setI] = useState(0);
  const [drag, setDrag] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = slides.length;
  const startX = useRef<number | null>(null);
  const pausedRef = useRef(false);

  const setPausedBoth = (v: boolean) => {
    pausedRef.current = v;
    setPaused(v);
  };

  useEffect(() => {
    const t = setInterval(() => {
      if (!pausedRef.current && startX.current === null) {
        setI((v) => (v + 1) % n);
      }
    }, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [n]);

  const go = (d: number) => setI((v) => (v + d + n) % n);

  const onDown = (x: number) => { startX.current = x; setDrag(0); };
  const onMove = (x: number) => { if (startX.current === null) return; setDrag(x - startX.current); };
  const onUp = () => {
    if (startX.current === null) return;
    const threshold = 80;
    if (drag > threshold) go(-1);
    else if (drag < -threshold) go(1);
    startX.current = null;
    setDrag(0);
  };

  const active = slides[i];

  return (
    <section
      className="relative overflow-hidden bg-dark select-none"
      onMouseEnter={() => setPausedBoth(true)}
      onMouseLeave={() => { setPausedBoth(false); onUp(); }}
    >
      {/* Coverflow 3D stage */}
      <div
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        style={{ perspective: "1800px", perspectiveOrigin: "50% 55%" }}
        onMouseDown={(e) => onDown(e.clientX)}
        onMouseMove={(e) => startX.current !== null && onMove(e.clientX)}
        onMouseUp={onUp}
        onTouchStart={(e) => onDown(e.touches[0].clientX)}
        onTouchMove={(e) => onMove(e.touches[0].clientX)}
        onTouchEnd={onUp}
      >
        {slides.map((s, idx) => {
          const raw = ((idx - i + n) % n + n) % n;
          const rel = raw > n / 2 ? raw - n : raw;
          const abs = Math.abs(rel);
          const dragShift = drag / 60;
          const eff = rel - dragShift;
          const effAbs = Math.abs(eff);
          const isActive = abs === 0;

          const translateX = eff * 42;
          const rotateY = eff * -38;
          const translateZ = -Math.min(effAbs, 2) * 220;
          const opacity = effAbs > 2.2 ? 0 : isActive ? 1 : 0.5;
          const scale = isActive ? 1 : 0.9;

          return (
            <div
              key={idx}
              className={`absolute inset-0 ${startX.current === null ? "transition-all duration-[800ms] ease-out" : ""}`}
              style={{
                transform: `translate3d(${translateX}%, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                transformStyle: "preserve-3d",
                pointerEvents: isActive ? "auto" : "none",
                zIndex: 10 - Math.round(effAbs * 2),
              }}
            >
              <img
                src={s.bg}
                alt=""
                draggable={false}
                className="w-full h-full object-cover"
                style={{ transform: isActive ? "scale(1.08)" : "scale(1)", transition: "transform 7s ease-out" }}
              />
              {/* Rich overlays: side gradient + bottom vignette */}
              <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/75 to-dark/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-dark/30" />
              {!isActive && <div className="absolute inset-0 bg-dark/50" />}
            </div>
          );
        })}
      </div>

      {/* Decorative floating leaves */}
      <div className="absolute inset-0 z-[15] pointer-events-none">
        {leaves.map((l, idx) => (
          <Leaf
            key={idx}
            className="hero-leaf absolute text-primary"
            style={{ top: l.top, left: (l as any).left, right: (l as any).right, width: l.size, height: l.size, opacity: l.op, ["--r" as any]: l.r, animationDelay: l.delay }}
          />
        ))}
      </div>

      {/* Foreground content */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-6 py-32 md:py-40 lg:py-48 grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-10 min-h-[640px] lg:min-h-[780px] pointer-events-none">
        <div className="relative">
          {slides.map((s, idx) => {
            const on = i === idx;
            const d = (ms: number) => ({ transitionDelay: on ? `${ms}ms` : "0ms" });
            return (
              <div
                key={idx}
                className={on ? "opacity-100 relative" : "opacity-0 absolute inset-0 pointer-events-none"}
                style={{ transition: "opacity 500ms" }}
              >
                <p className={`eyebrow text-primary mb-5 flex items-center gap-3 transition-all duration-700 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={d(80)}>
                  <span className="w-8 h-px bg-primary" /> {s.eyebrow}
                </p>
                <h1 className={`font-heading text-white text-5xl md:text-7xl lg:text-8xl leading-[1.02] max-w-2xl mb-6 transition-all duration-700 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={d(180)}>
                  {s.title}
                  <br />
                  <em className="not-italic block bg-gradient-to-r from-primary to-[#d8f3a8] bg-clip-text text-transparent">{s.em}</em>
                  {s.tail && <><br />{s.tail}</>}
                </h1>
                <p className={`text-white/85 text-lg mb-8 max-w-md transition-all duration-700 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={d(320)}>{s.desc}</p>
                <div className={`flex flex-wrap items-center gap-4 mb-8 transition-all duration-700 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={d(440)}>
                  <a
                    href="/shop"
                    onClick={(e) => handleNavClick(e, "products", "shop")}
                    className="pointer-events-auto group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm font-medium tracking-wider uppercase hover:bg-white hover:text-dark transition shadow-lg shadow-primary/30"
                  >
                    Shop Our Teas <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </a>
                  <a
                    href="/about"
                    onClick={(e) => handleNavClick(e, "about", "about")}
                    className="pointer-events-auto inline-flex items-center gap-2 text-white/90 px-6 py-4 rounded-full text-sm font-medium tracking-wider uppercase border border-white/30 hover:bg-white/10 hover:border-white transition"
                  >
                    Our Story
                  </a>
                </div>
                {/* Trust pills */}
                <div className={`flex flex-wrap gap-2.5 transition-all duration-700 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={d(560)}>
                  {trustPills.map((p) => (
                    <span key={p.label} className="inline-flex items-center gap-2 text-xs text-white/85 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-3.5 py-1.5">
                      <p.icon className="w-3.5 h-3.5 text-primary" /> {p.label}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* 3D floating product */}
        <div className="hidden lg:block relative h-[600px]" style={{ perspective: "1400px" }}>
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
                  {/* Rotating dashed ring */}
                  <div className="absolute left-1/2 top-1/2 -ml-[240px] -mt-[240px] w-[480px] h-[480px] rounded-full border border-dashed border-primary/30" style={{ animation: "heroSpin 26s linear infinite" }} />
                  <img
                    src={s.product}
                    alt={s.em}
                    draggable={false}
                    className="relative max-h-[640px] w-auto drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]"
                  />
                  {/* Pulsing glow */}
                  <div
                    className="absolute -inset-10 -z-10 rounded-full blur-3xl"
                    style={{ background: "radial-gradient(closest-side, var(--color-primary), transparent 70%)", animation: "pulseGlow 5s ease-in-out infinite" }}
                  />
                  {/* Floating rating badge */}
                  <div className="pointer-events-none absolute top-4 -right-2 bg-white/95 backdrop-blur rounded-2xl px-4 py-3 shadow-xl text-dark">
                    <div className="flex items-center gap-1 text-primary">
                      <Star className="w-4 h-4 fill-primary" />
                      <span className="text-sm font-semibold">{s.rating.toFixed(1)}</span>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">Top Rated</p>
                  </div>
                  {/* Floating price badge */}
                  <div className="pointer-events-none absolute bottom-8 -left-4 bg-forest text-forest-foreground rounded-2xl px-4 py-3 shadow-xl">
                    <p className="text-[10px] uppercase tracking-widest text-primary">from</p>
                    <p className="text-xl font-heading leading-none">{s.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <button onClick={() => go(-1)} aria-label="Previous slide" className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/30 text-white grid place-items-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition backdrop-blur">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={() => go(1)} aria-label="Next slide" className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/30 text-white grid place-items-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition backdrop-blur">
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Thumbnail navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {slides.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`relative overflow-hidden rounded-lg border-2 transition-all duration-300 ${i === idx ? "w-16 h-11 border-primary" : "w-11 h-11 border-white/30 opacity-70 hover:opacity-100"}`}
          >
            <img src={s.bg} alt="" className="w-full h-full object-cover" draggable={false} />
            {i !== idx && <span className="absolute inset-0 bg-dark/40" />}
          </button>
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-10 right-8 z-30 hidden md:flex items-center gap-2 text-white/70 text-xs uppercase tracking-widest">
        <span className="text-white font-medium">{String(i + 1).padStart(2, "0")}</span>
        <span className="w-10 h-px bg-white/40" />
        <span>{String(n).padStart(2, "0")}</span>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-8 z-30 hidden md:flex flex-col items-center gap-2 text-white/60">
        <span className="text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-lr] rotate-180">Scroll</span>
        <span className="relative w-5 h-8 rounded-full border border-white/40 grid justify-center pt-1.5">
          <span className="w-1 h-1 rounded-full bg-primary" style={{ animation: "scrollDot 1.6s ease-in-out infinite" }} />
        </span>
      </div>

      {/* Autoplay progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
        <div
          key={i}
          className="h-full bg-primary"
          style={{ animation: `heroProgress ${AUTOPLAY_MS}ms linear forwards`, animationPlayState: paused ? "paused" : "running" }}
        />
      </div>
    </section>
  );
}
