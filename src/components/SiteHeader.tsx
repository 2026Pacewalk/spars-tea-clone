import { useState, useEffect } from "react";
import { Search, User, Heart, ShoppingBag, ChevronRight, Menu, X, Leaf, Truck, Phone, Star, Instagram, Facebook, Twitter, ChevronDown, Gift, Sparkles, Home as HomeIcon, Mail } from "lucide-react";
import { handleNavClick } from "@/lib/scroll";
import { searchProducts, productCardId, type Product } from "@/lib/products";
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

const popularSearches = ["Naagni Strong", "Masala Chai", "Elaichi", "Royal Assam"];

const hrefFor = (slug: string) => (slug ? `/${slug}` : "/");

// Briefly outlines the product card a search result jumped to.
const HIGHLIGHT = ["ring-2", "ring-primary", "ring-offset-8", "ring-offset-white"];

function SearchResults({ query, results, onPick }: { query: string; results: Product[]; onPick: (id: string) => void }) {
  if (!query.trim()) return null;
  if (results.length === 0) {
    return <p className="mt-3 text-sm text-muted-foreground">No teas match “{query.trim()}”. Try Naagni, No.1, Gold, Masala, Elaichi or Royal.</p>;
  }
  return (
    <ul className="mt-3 divide-y divide-border border border-border rounded-2xl overflow-hidden bg-white">
      {results.map((p) => (
        <li key={p.id}>
          <button type="button" onClick={() => onPick(p.id)} className="group w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-cream transition">
            <img src={p.imgs[0]} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
            <span className="flex-1 min-w-0">
              <span className="block font-heading text-base text-dark truncate">{p.name}</span>
              <span className="block text-xs text-muted-foreground truncate">{p.price}</span>
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition flex-shrink-0" />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const results = searchProducts(query);

  const goToProduct = (id: string) => {
    setSearchOpen(false);
    setMenuOpen(false);
    setQuery("");
    // Wait a beat so the drawer's scroll lock is released before scrolling.
    setTimeout(() => {
      const el = document.getElementById(productCardId(id));
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add(...HIGHLIGHT);
      setTimeout(() => el.classList.remove(...HIGHLIGHT), 2600);
    }, 120);
  };

  const submitSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (results.length > 0) goToProduct(results[0].id);
  };
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
      <div className={`bg-forest text-forest-foreground overflow-hidden transition-all duration-500 ${scrolled ? "max-h-0 opacity-0" : "max-h-16 opacity-100"}`}>
        <div className="max-w-[max(1400px,78vw)] mx-auto px-6 h-9 md:h-[clamp(44px,2vw,60px)] flex items-center justify-between text-xs md:text-[clamp(14px,0.68vw,19px)]">
          <div className="relative flex-1 h-full">
            {announcements.map((a, i) => {
              const Ic = a.icon;
              return (
                <span
                  key={i}
                  className={`absolute inset-y-0 left-0 flex items-center gap-2 transition-all duration-500 ${i === announceIdx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
                >
                  <Ic className="w-3.5 h-3.5 md:w-[1.15em] md:h-[1.15em] text-primary" />
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
        <div className={`max-w-[max(1400px,78vw)] mx-auto px-6 grid grid-cols-2 md:grid-cols-3 items-center transition-all duration-300 ${scrolled ? "h-16 md:h-[clamp(72px,3.5vw,104px)]" : "h-20 md:h-[clamp(96px,4.7vw,140px)]"}`}>
          {/* Left nav */}
          <nav className="hidden md:flex items-center gap-[clamp(2rem,2.1vw,3.75rem)]">
            {navLinks.map((n) => (
              <a key={n.label} href={hrefFor(n.slug)} onClick={(e) => handleNavClick(e, n.id, n.slug)} className="relative group uppercase tracking-wider text-[clamp(15px,0.78vw,22px)] font-medium text-dark hover:text-primary transition-colors">
                {n.label}
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-primary rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          {/* Logo */}
          <a href="/" onClick={(e) => handleNavClick(e, "home", "")} className="flex items-center justify-start md:justify-center">
            <img src={logo} alt="Sparsh Tea" className={`w-auto transition-all duration-300 ${scrolled ? "h-12 md:h-[clamp(56px,2.9vw,84px)]" : "h-16 md:h-[clamp(80px,4vw,116px)]"}`} />
          </a>
          {/* Right icons (desktop) */}
          <div className="hidden md:flex items-center justify-end gap-1.5 text-dark text-[clamp(16px,0.8vw,23px)]">
            <button onClick={() => setSearchOpen((v) => !v)} aria-label="Search" title="Search" className="w-[2.75em] h-[2.75em] grid place-items-center rounded-full hover:bg-cream transition">
              {searchOpen ? <X className="w-[1.5em] h-[1.5em]" /> : <Search className="w-[1.5em] h-[1.5em]" />}
            </button>
            <button aria-label="Account" title="Login / Register" className="w-[2.75em] h-[2.75em] grid place-items-center rounded-full hover:bg-cream transition"><User className="w-[1.5em] h-[1.5em]" /></button>
            <button aria-label="Wishlist" title="Wishlist" className="relative w-[2.75em] h-[2.75em] grid place-items-center rounded-full hover:bg-cream transition">
              <Heart className="w-[1.5em] h-[1.5em]" />
              <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 grid place-items-center rounded-full bg-primary text-primary-foreground text-[10px] font-semibold">2</span>
            </button>
            <button aria-label="Cart" title="Cart" className="relative flex items-center gap-2 pl-[0.8em] pr-[1.25em] h-[2.75em] rounded-full bg-forest text-forest-foreground hover:bg-primary transition ml-1">
              <span className="relative">
                <ShoppingBag className="w-[1.3em] h-[1.3em]" />
                <span className="absolute -top-2 -right-2 min-w-[16px] h-4 px-1 grid place-items-center rounded-full bg-primary text-primary-foreground text-[10px] font-semibold ring-2 ring-forest">0</span>
              </span>
              <span className="text-[0.875em] font-medium">Cart</span>
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
        <div className={`border-t bg-white transition-all duration-300 ${searchOpen ? "max-h-[75vh] overflow-y-auto opacity-100 border-border" : "max-h-0 overflow-hidden opacity-0 border-transparent"}`}>
          <div className="max-w-[max(1400px,78vw)] mx-auto px-6 py-4">
            <form onSubmit={submitSearch} role="search" className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              {/* 16px text on phones stops iOS zooming the page when the field is focused */}
              <input type="search" enterKeyHint="search" value={query} onChange={(e) => setQuery(e.target.value)} tabIndex={searchOpen ? 0 : -1} aria-label="Search teas" placeholder="Search for teas — Naagni, Masala, Elaichi…" className="w-full bg-cream rounded-full pl-12 pr-12 py-3.5 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 [&::-webkit-search-cancel-button]:hidden" />
              <button type="button" onClick={() => { setSearchOpen(false); setQuery(""); }} aria-label="Close search" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-dark transition"><X className="w-4 h-4" /></button>
            </form>
            <SearchResults query={query} results={results} onPick={goToProduct} />
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-xs text-muted-foreground">Popular:</span>
              {popularSearches.map((s) => (
                <button key={s} type="button" onClick={() => setQuery(s)} className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition">{s}</button>
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
              <form onSubmit={submitSearch} role="search" className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="search" enterKeyHint="search" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search teas" placeholder="Search teas — Naagni, Masala…" className="w-full bg-cream rounded-full pl-10 pr-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary/40 [&::-webkit-search-cancel-button]:hidden" />
              </form>
              <SearchResults query={query} results={results} onPick={goToProduct} />
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
