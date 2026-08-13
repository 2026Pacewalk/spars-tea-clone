import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { handleNavClick } from "@/lib/scroll";

import banner1 from "@/assets/sparsh/banners/banner-1.jpg";
import banner2 from "@/assets/sparsh/banners/banner-2.jpg";
import banner3 from "@/assets/sparsh/banners/banner-3.jpg";
import banner4 from "@/assets/sparsh/banners/banner-4.jpg";
import banner5 from "@/assets/sparsh/banners/banner-5.jpg";
import banner6 from "@/assets/sparsh/banners/banner-6.jpg";

const banners = [banner1, banner2, banner3, banner4, banner5, banner6];
const AUTOPLAY_MS = 6000;

export default function HeroSlider3D() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const n = banners.length;

  const setPausedBoth = (v: boolean) => { pausedRef.current = v; setPaused(v); };
  const go = (d: number) => setI((v) => (v + d + n) % n);

  useEffect(() => {
    const t = setInterval(() => {
      if (!pausedRef.current) setI((v) => (v + 1) % n);
    }, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [n]);

  const onTouchStart = (x: number) => { touchStartX.current = x; };
  const onTouchEnd = (x: number) => {
    if (touchStartX.current === null) return;
    const dx = x - touchStartX.current;
    if (dx > 60) go(-1);
    else if (dx < -60) go(1);
    touchStartX.current = null;
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-dark select-none"
      onMouseEnter={() => setPausedBoth(true)}
      onMouseLeave={() => setPausedBoth(false)}
    >
      {/* Banner stage — full source ratio on mobile; on desktop it fits the
          viewport height (below the 118px header) so the whole banner is visible
          without scrolling. object-contain keeps the art uncropped. */}
      <div
        className="relative w-full aspect-[1672/941] lg:aspect-auto lg:h-[calc(100vh-118px)]"
        onTouchStart={(e) => onTouchStart(e.touches[0].clientX)}
        onTouchEnd={(e) => onTouchEnd(e.changedTouches[0].clientX)}
      >
        {banners.map((b, idx) => {
          const isActive = i === idx;
          return (
            <a
              key={idx}
              href="/shop"
              onClick={(e) => handleNavClick(e, "products", "shop")}
              aria-label={`Sparsh Tea banner ${idx + 1} — shop now`}
              tabIndex={isActive ? 0 : -1}
              className={`absolute inset-0 transition-opacity duration-[900ms] ease-out ${isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
            >
              {/* Blurred fill so the letterbox areas on wide screens look intentional */}
              <img
                src={b}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-50"
              />
              <img
                src={b}
                alt={`Sparsh Tea banner ${idx + 1}`}
                draggable={false}
                loading={idx === 0 ? "eager" : "lazy"}
                className="relative z-10 w-full h-full object-contain"
              />
            </a>
          );
        })}
      </div>

      {/* Arrows */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous banner"
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/40 text-white grid place-items-center bg-dark/20 hover:bg-primary hover:border-primary hover:text-primary-foreground transition backdrop-blur"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next banner"
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/40 text-white grid place-items-center bg-dark/20 hover:bg-primary hover:border-primary hover:text-primary-foreground transition backdrop-blur"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Go to banner ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${i === idx ? "w-8 bg-primary" : "w-2 bg-white/60 hover:bg-white"}`}
          />
        ))}
      </div>

      {/* Autoplay progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
        <div
          key={i}
          className="h-full bg-primary"
          style={{ animation: `heroProgress ${AUTOPLAY_MS}ms linear forwards`, animationPlayState: paused ? "paused" : "running" }}
        />
      </div>
    </section>
  );
}
