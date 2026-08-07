import { useState, useEffect } from "react";
import { Search, User, Heart, ShoppingBag, ChevronRight, Menu, X, Leaf, Truck, Phone, Star, Instagram, Facebook, Twitter, ChevronDown, Gift, Sparkles, Home as HomeIcon, Mail } from "lucide-react";
import { handleNavClick } from "@/lib/scroll";
import logo from "@/assets/sparsh/logo.png";

const announcements = [
  { icon: Truck, text: "Free shipping across India on orders over ₹499" },
  { icon: Gift, text: "Buy 2 gift packs, get 1 free — this week only" },
  { icon: Sparkles, text: "New harvest just in — fresh from Assam & Nilgiri" },
];

const navLinks = [
  { label: "Home", slug: "", id: "home", icon: HomeIcon },
  { label: "Shop", slug: "shop", id: "shop", icon: ShoppingBag },
  { label: "About", slug: "about", id: "about", icon: Leaf },
  { label: "Reviews", slug: "reviews", id: "reviews", icon: Star },
  { label: "Contact", slug: "contact", id: "contact", icon: Mail },
];

const popularSearches = ["Masala Chai", "Nagni Strong", "Green Blends", "Gift Packs"];

const hrefFor = (slug: string) => (slug ? `/${slug}` : "/");

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [announceIdx, setAnnounceIdx] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setAnnounceIdx((i) => (i + 1) % announcements.length), 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* Announcement bar (rotating, collapses on scroll) */}
      <div className={`bg-forest text-forest-foreground overflow-hidden transition-all duration-500 ${scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"}`}>
        <div className="max-w-[1400px] mx-auto px-6 h-9 flex items-center justify-between text-xs">
          <div className="relative flex-1 h-full">
            {announcements.map((a, i) => {
              const Ic = a.icon;
              return (
                <span
                  key={i}
                  className={`absolute inset-y-0 left-0 flex items-center gap-2 transition-all duration-500 ${i === announceIdx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
                >
                  <Ic className="w-3.5 h-3.5 text-primary" />
                  <span className="tracking-wide">{a.text}</span>
                </span>
              );
            })}
          </div>
          <div className="hidden md:flex items-center gap-4 opacity-90 flex-shrink-0">
            <button className="flex items-center gap-1 hover:text-primary transition">ENG <ChevronDown className="w-3 h-3" /></button>
            <span className="w-px h-3 bg-forest-foreground/30" />
            <button className="flex items-center gap-1 hover:text-primary transition">₹ INR <ChevronDown className="w-3 h-3" /></button>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b transition-all duration-300 ${scrolled ? "border-border shadow-[0_10px_30px_-12px_rgba(0,0,0,0.18)]" : "border-transparent"}`}>
        <div className={`max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-3 items-center transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}>
          {/* Left nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((n) => (
              <a key={n.label} href={hrefFor(n.slug)} onClick={(e) => handleNavClick(e, n.id, n.slug)} className="relative group uppercase tracking-wider text-[13px] font-medium text-dark hover:text-primary transition-colors">
                {n.label}
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-primary rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          {/* Logo */}
          <a href="/" onClick={(e) => handleNavClick(e, "home", "")} className="flex items-center justify-start md:justify-center">
            <img src={logo} alt="Sparsh Tea" className={`w-auto transition-all duration-300 ${scrolled ? "h-12" : "h-16"}`} />
          </a>
          {/* Right icons (desktop) */}
          <div className="hidden md:flex items-center justify-end gap-1.5 text-dark">
            <button onClick={() => setSearchOpen((v) => !v)} aria-label="Search" title="Search" className="w-10 h-10 grid place-items-center rounded-full hover:bg-cream transition">
              {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>
            <button aria-label="Account" title="Login / Register" className="w-10 h-10 grid place-items-center rounded-full hover:bg-cream transition"><User className="w-5 h-5" /></button>
            <button aria-label="Wishlist" title="Wishlist" className="relative w-10 h-10 grid place-items-center rounded-full hover:bg-cream transition">
              <Heart className="w-5 h-5" />
              <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 grid place-items-center rounded-full bg-primary text-primary-foreground text-[10px] font-semibold">2</span>
            </button>
            <button aria-label="Cart" title="Cart" className="relative flex items-center gap-2 pl-2.5 pr-4 h-10 rounded-full bg-forest text-forest-foreground hover:bg-primary transition ml-1">
              <span className="relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 min-w-[16px] h-4 px-1 grid place-items-center rounded-full bg-primary text-primary-foreground text-[10px] font-semibold ring-2 ring-forest">0</span>
              </span>
              <span className="text-xs font-medium">Cart</span>
            </button>
          </div>
          {/* Right icons (mobile) */}
          <div className="md:hidden flex items-center justify-end gap-0.5">
            <button onClick={() => setSearchOpen((v) => !v)} aria-label="Search" className="w-10 h-10 grid place-items-center">
              {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>
            <button aria-label="Cart" className="relative w-10 h-10 grid place-items-center">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 grid place-items-center rounded-full bg-primary text-primary-foreground text-[10px] font-semibold">0</span>
            </button>
            <button onClick={() => setMenuOpen(true)} aria-label="Open menu" className="w-10 h-10 grid place-items-center"><Menu className="w-6 h-6" /></button>
          </div>
        </div>

        {/* Expandable search panel */}
        <div className={`border-t bg-white overflow-hidden transition-all duration-300 ${searchOpen ? "max-h-44 opacity-100 border-border" : "max-h-0 opacity-0 border-transparent"}`}>
          <div className="max-w-[1400px] mx-auto px-6 py-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="text" placeholder="Search for teas, blends, gift packs…" className="w-full bg-cream rounded-full pl-12 pr-12 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
              <button onClick={() => setSearchOpen(false)} aria-label="Close search" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-dark transition"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-xs text-muted-foreground">Popular:</span>
              {popularSearches.map((s) => (
                <button key={s} className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition">{s}</button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile slide-in drawer */}
      <div className={`fixed inset-0 z-[60] md:hidden ${menuOpen ? "visible" : "invisible"}`} aria-hidden={!menuOpen}>
        <div onClick={() => setMenuOpen(false)} className={`absolute inset-0 bg-dark/60 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`} />
        <aside className={`absolute right-0 top-0 h-full w-[86%] max-w-sm bg-background shadow-2xl flex flex-col transition-transform duration-300 ease-out ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between px-5 h-20 border-b border-border flex-shrink-0">
            <img src={logo} alt="Sparsh Tea" className="h-12 w-auto" />
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="w-10 h-10 grid place-items-center rounded-full hover:bg-cream transition"><X className="w-6 h-6" /></button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="bg-forest text-forest-foreground text-xs px-5 py-2.5 flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-primary flex-shrink-0" /> Free shipping on orders over ₹499
            </div>

            <div className="px-5 pt-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="text" placeholder="Search teas, blends, gift packs…" className="w-full bg-cream rounded-full pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
              </div>
            </div>

            <nav className="px-3 py-3 flex flex-col">
              {navLinks.map((n, i) => (
                <a
                  key={n.label}
                  href={hrefFor(n.slug)}
                  onClick={(e) => { handleNavClick(e, n.id, n.slug); setMenuOpen(false); }}
                  style={{ transitionDelay: menuOpen ? `${120 + i * 55}ms` : "0ms" }}
                  className={`group flex items-center gap-4 px-3 py-3 rounded-2xl text-dark hover:bg-cream transition-all duration-300 ${menuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"}`}
                >
                  <span className="w-11 h-11 rounded-full bg-cream text-dark group-hover:bg-primary group-hover:text-primary-foreground grid place-items-center transition"><n.icon className="w-5 h-5" /></span>
                  <span className="flex-1 uppercase tracking-wide text-sm font-medium">{n.label}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition" />
                </a>
              ))}
            </nav>

            <div className="px-5 pt-1 pb-4">
              <button className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-full py-3.5 text-xs uppercase tracking-widest hover:bg-dark transition">
                <User className="w-4 h-4" /> Login / Register
              </button>
            </div>

            <div className="px-5 pb-5 grid grid-cols-2 gap-3">
              <button className="relative flex items-center justify-center gap-2 py-3 rounded-2xl border border-border text-dark text-sm font-medium hover:border-primary hover:text-primary transition">
                <Heart className="w-5 h-5" /> Wishlist
                <span className="min-w-[18px] h-[18px] px-1 grid place-items-center rounded-full bg-primary text-primary-foreground text-[10px] font-semibold">2</span>
              </button>
              <button className="relative flex items-center justify-center gap-2 py-3 rounded-2xl border border-border text-dark text-sm font-medium hover:border-primary hover:text-primary transition">
                <ShoppingBag className="w-5 h-5" /> Cart
                <span className="min-w-[18px] h-[18px] px-1 grid place-items-center rounded-full bg-primary text-primary-foreground text-[10px] font-semibold">0</span>
              </button>
            </div>
          </div>

          <div className="border-t border-border px-5 py-4 flex-shrink-0 space-y-3.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <a href="tel:+919814721027" className="flex items-center gap-2 hover:text-primary transition"><Phone className="w-3.5 h-3.5 text-primary" /> +91 98147 21027</a>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1 hover:text-primary transition">ENG <ChevronDown className="w-3 h-3" /></button>
                <span className="w-px h-3 bg-border" />
                <button className="flex items-center gap-1 hover:text-primary transition">₹ INR <ChevronDown className="w-3 h-3" /></button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {[
                { Ic: Facebook, url: "https://facebook.com" },
                { Ic: Instagram, url: "https://instagram.com" },
                { Ic: Twitter, url: "https://twitter.com" },
              ].map(({ Ic, url }, i) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer" aria-label="Social link" className="w-9 h-9 rounded-full border border-border grid place-items-center text-dark hover:bg-primary hover:border-primary hover:text-primary-foreground transition"><Ic className="w-4 h-4" /></a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
