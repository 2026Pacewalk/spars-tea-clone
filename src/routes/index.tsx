import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, User, Heart, ShoppingBag, ChevronRight, Menu, X, Leaf, Sprout, Package, Truck, Mail, Phone, MapPin, Star, Instagram, Facebook, Twitter } from "lucide-react";

import logo from "@/assets/sparsh/logo.png";
import carousel1 from "@/assets/sparsh/carousel-1.jpg";
import about1 from "@/assets/sparsh/about-1.jpg";
import about2 from "@/assets/sparsh/about-2.jpg";
import about3 from "@/assets/sparsh/about-3.jpg";
import about4 from "@/assets/sparsh/about-4.jpg";
import about5 from "@/assets/sparsh/about-5.jpg";
import about6 from "@/assets/sparsh/about-6.jpg";
import mockup1 from "@/assets/sparsh/Sparsh-Mockup.png";
import mockup2 from "@/assets/sparsh/Sparsh-Mockup-2.png";
import mockup3 from "@/assets/sparsh/Sparsh-Mockup-3.png";
import article from "@/assets/sparsh/article.jpg";
import product1 from "@/assets/sparsh/product-1.jpg";
import product2 from "@/assets/sparsh/product-2.jpg";
import product3 from "@/assets/sparsh/product-3.jpg";
import product4 from "@/assets/sparsh/product-4.jpg";
import t1 from "@/assets/sparsh/testimonial-1.jpg";
import t2 from "@/assets/sparsh/testimonial-2.jpg";
import t3 from "@/assets/sparsh/testimonial-3.jpg";

export const Route = createFileRoute("/")({ component: Home });

type Product = { name: string; price: string; img: string; hover: string; tag?: string; rating: number };

const productsByTab: Record<string, Product[]> = {
  "New-In": [
    { name: "Sparsh Nagni Strong Tea", price: "₹280 – ₹680", img: mockup1, hover: product1, tag: "Bestseller", rating: 4.8 },
    { name: "Sparsh No.1 Normal Tea", price: "₹220 – ₹560", img: mockup2, hover: product2, tag: "New", rating: 4.6 },
    { name: "Sparsh Masala Chai", price: "₹260 – ₹640", img: mockup3, hover: product3, tag: "Spiced", rating: 4.9 },
    { name: "Sparsh Premium Blend", price: "₹340 – ₹820", img: product4, hover: mockup1, tag: "New", rating: 4.7 },
  ],
  "Best Seller": [
    { name: "Sparsh Nagni Strong Tea", price: "₹280 – ₹680", img: mockup1, hover: product1, tag: "Bestseller", rating: 4.9 },
    { name: "Sparsh Masala Chai", price: "₹260 – ₹640", img: mockup3, hover: product3, tag: "Bestseller", rating: 4.9 },
    { name: "Sparsh Premium Blend", price: "₹340 – ₹820", img: product4, hover: mockup2, tag: "Bestseller", rating: 4.8 },
    { name: "Sparsh No.1 Normal Tea", price: "₹220 – ₹560", img: mockup2, hover: product2, rating: 4.6 },
  ],
  "Most Popular": [
    { name: "Sparsh Masala Chai", price: "₹260 – ₹640", img: mockup3, hover: product3, tag: "Popular", rating: 4.9 },
    { name: "Sparsh Nagni Strong Tea", price: "₹280 – ₹680", img: mockup1, hover: product1, tag: "Popular", rating: 4.8 },
    { name: "Sparsh No.1 Normal Tea", price: "₹220 – ₹560", img: mockup2, hover: product2, rating: 4.6 },
    { name: "Sparsh Premium Blend", price: "₹340 – ₹820", img: product4, hover: mockup3, rating: 4.7 },
  ],
};

const categories = [
  { name: "Strong Tea", img: product1, count: 4 },
  { name: "Normal Tea", img: product2, count: 3 },
  { name: "Masala Chai", img: product3, count: 5 },
  { name: "Green Blends", img: about1, count: 2 },
  { name: "Loose Leaf", img: about3, count: 6 },
  { name: "Gift Packs", img: product4, count: 3 },
];

const features = [
  { icon: Leaf, title: "Handpicked Tea", text: "Selected leaf-by-leaf from lush Assam and Nilgiri plantations." },
  { icon: Sprout, title: "100% Natural", text: "No artificial colours or preservatives — pure garden freshness." },
  { icon: Package, title: "Packaged Fresh at Source", text: "Sealed at origin to lock in aroma, flavour and antioxidants." },
  { icon: Truck, title: "Shipped Direct to Doorstep", text: "Fast, careful shipping across India from our Kotkapura house." },
];

const reviews = [
  { name: "Vikram", date: "January 2024", avatar: t2, text: "Tea is an essential part of my daily routine, and Sparsh has become my go-to. The quality is top-notch — it's like a natural detox for body and mind." },
  { name: "Priya", date: "May 2024", avatar: t3, text: "I've tried several tea brands, but none compare to the freshness here. The masala chai has become a family favourite every morning." },
  { name: "Sakshi", date: "July 2024", avatar: t1, text: "As a tea enthusiast, Sparsh stands out. The variety is incredible and I've noticed a real improvement in my digestion since switching." },
  { name: "Rahul", date: "August 2024", avatar: t2, text: "Bold, malty, and perfectly balanced. Sparsh Nagni is my go-to morning cup — nothing else comes close." },
];

const gallery = [about1, about2, about3, about4, about5, about6];

function Home() {
  const [tab, setTab] = useState("New-In");
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = ["Home", "Shop", "About", "Blog", "Contact"];

  return (
    <div className="bg-background text-foreground">
      {/* Top strip */}
      <div className="bg-forest text-forest-foreground text-xs">
        <div className="max-w-[1400px] mx-auto px-6 h-9 flex items-center justify-between">
          <p>Free shipping across India on orders over ₹499. <a className="underline underline-offset-4 ml-2" href="#products">See details ›</a></p>
          <div className="hidden md:flex items-center gap-6 opacity-90">
            <span>ENG ▾</span><span>₹ INR ▾</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 h-20 grid grid-cols-2 md:grid-cols-3 items-center">
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {nav.map((n) => (
              <a key={n} href={`#${n.toLowerCase()}`} className="hover:text-primary transition-colors uppercase tracking-wider text-[13px]">{n}</a>
            ))}
          </nav>
          <a href="#home" className="flex items-center justify-start md:justify-center gap-2">
            <img src={logo} alt="Sparsh Tea" className="h-10 w-auto" />
            <span className="font-heading text-3xl italic text-dark">sparsh</span>
          </a>
          <div className="hidden md:flex items-center justify-end gap-5 text-dark">
            <button aria-label="Search"><Search className="w-5 h-5" /></button>
            <button aria-label="Account" className="flex items-center gap-2 text-sm"><User className="w-5 h-5" /><span className="hidden lg:inline">Login / Register</span></button>
            <button aria-label="Wishlist"><Heart className="w-5 h-5" /></button>
            <button aria-label="Cart" className="flex items-center gap-1"><ShoppingBag className="w-5 h-5" /><span className="text-xs">(0)</span></button>
          </div>
          <button className="md:hidden justify-self-end" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-white">
            <div className="px-6 py-4 flex flex-col gap-3">
              {nav.map((n) => <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="font-medium">{n}</a>)}
            </div>
          </div>
        )}
      </header>

      {/* Hero — dark image, headline left */}
      <section id="home" className="relative overflow-hidden bg-dark">
        <img src={carousel1} alt="Sparsh Tea" className="absolute inset-0 w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/60 to-transparent" />
        <div className="relative max-w-[1400px] mx-auto px-6 py-32 md:py-44 lg:py-56">
          <p className="eyebrow text-primary mb-5">organic indian tea</p>
          <h1 className="font-heading text-white text-5xl md:text-7xl lg:text-8xl leading-[1.05] max-w-2xl mb-6">
            Start Your<br /><em className="not-italic block">Relaxing Life</em><br />Today
          </h1>
          <p className="text-white/85 text-lg mb-10 max-w-md">The wonderful taste of life — brewing excellence, one cup at a time.</p>
          <a href="#products" className="inline-flex items-center gap-3 bg-white text-dark px-8 py-4 rounded-full text-sm font-medium tracking-wider uppercase hover:bg-primary hover:text-primary-foreground transition">
            Shop Our Teas <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* About green band */}
      <section id="about" className="relative bg-forest text-forest-foreground leaf-bg py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow text-primary mb-4">about us</p>
          <h2 className="font-heading text-5xl md:text-6xl mb-8 leading-tight">Welcome to<br /><em className="not-italic">Sparsh Tea</em></h2>
          <p className="text-forest-foreground/85 text-lg leading-relaxed mb-10">
            We are a family-run tea house founded on a passion for tea. Every leaf of Sparsh is handpicked from lush Indian plantations and blended with a promise: we would never sell a tea we wouldn't happily drink at home.
          </p>
          <a href="#products" className="inline-flex items-center gap-2 border border-forest-foreground/40 text-forest-foreground px-8 py-3.5 rounded-full text-xs uppercase tracking-widest hover:bg-primary hover:text-primary-foreground hover:border-primary transition">
            Learn More <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* Products with tabs */}
      <section id="shop" className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="font-heading text-5xl md:text-6xl text-dark mb-8">Shop Our <em className="not-italic">Teas</em></h2>
            <div className="flex flex-wrap gap-3 md:gap-8 justify-center">
              {Object.keys(productsByTab).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`text-sm uppercase tracking-widest pb-2 border-b-2 transition ${tab === t ? "border-primary text-dark" : "border-transparent text-muted-foreground hover:text-dark"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div id="products" className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {productsByTab[tab].map((p) => <ProductCard key={p.name + tab} p={p} />)}
          </div>

          {/* Promo band */}
          <div className="mt-16 relative overflow-hidden rounded-sm bg-cream">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-10 md:p-16">
                <p className="eyebrow mb-4">popular flavoured tea</p>
                <h3 className="font-heading text-4xl md:text-5xl text-dark mb-4 leading-tight">Exquisite Taste,<br /><em className="not-italic">Refreshing Blends.</em></h3>
                <p className="text-muted-foreground mb-8">Popular flavoured teas from the Sparsh house — you must try them.</p>
                <a href="#products" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest border-b-2 border-dark text-dark pb-1 hover:border-primary hover:text-primary transition">
                  Discover More <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="relative h-80 md:h-96">
                <img src={article} alt="Sparsh Tea" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-wrap items-end justify-between mb-12 gap-6">
            <div>
              <p className="eyebrow mb-3">explore our range</p>
              <h2 className="font-heading text-5xl md:text-6xl text-dark">Browse by <em className="not-italic">Category</em></h2>
            </div>
            <a href="#products" className="text-xs uppercase tracking-widest border-b-2 border-dark text-dark pb-1 hover:border-primary hover:text-primary transition">View All Products ›</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((c) => (
              <a key={c.name} href="#products" className="group text-center">
                <div className="aspect-square rounded-full overflow-hidden bg-white mb-4 border border-border">
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <h4 className="font-heading text-xl text-dark group-hover:text-primary transition">{c.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{c.count} Products</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Why we're great */}
      <section id="blog" className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src={about2} alt="Tea plantation" className="w-full aspect-[4/5] object-cover rounded-sm" />
            <div className="absolute -bottom-6 -right-6 md:bottom-8 md:right-8 bg-primary text-primary-foreground px-8 py-6 rounded-full font-heading">
              <div className="text-4xl leading-none">100%</div>
              <div className="text-xs uppercase tracking-widest mt-1">Natural Leaf</div>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-4">why we're great</p>
            <h2 className="font-heading text-5xl md:text-6xl text-dark mb-6 leading-tight">Crafted by<br /><em className="not-italic">Leading Tea Experts</em></h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">Our ingredients represent less than 1% of all teas available worldwide. Our diverse, subtle flavours are the result of blending without compromise.</p>
            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((f) => (
                <div key={f.title}>
                  <div className="w-12 h-12 rounded-full bg-primary/15 text-primary grid place-items-center mb-4">
                    <f.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading text-2xl text-dark mb-2">{f.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Master tasters */}
      <section className="relative py-24 px-6 bg-dark text-white overflow-hidden">
        <img src={about4} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="eyebrow mb-4">master tea taster selections</p>
          <h2 className="font-heading text-5xl md:text-6xl mb-6 leading-tight">A Sip of Perfection,<br /><em className="not-italic">A Touch of Nature</em></h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">We protect our ingredients with premium foil packaging to lock in freshness and flavour, so you get the best tea experience every single time.</p>
          <a href="#contact" className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-dark transition">Meet Our Team <ChevronRight className="w-4 h-4" /></a>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">testimonials</p>
            <h2 className="font-heading text-5xl md:text-6xl text-dark">Customer <em className="not-italic">Reviews</em></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((r, i) => (
              <div key={i} className="bg-cream p-8 rounded-sm">
                <div className="flex gap-1 text-primary mb-4">
                  {Array.from({ length: 5 }).map((_, s) => <Star key={s} className="w-4 h-4 fill-primary" />)}
                </div>
                <p className="text-dark leading-relaxed mb-6 font-heading text-lg italic">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={r.avatar} alt={r.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-medium text-dark">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Follow us gallery */}
      <section className="py-16 px-6 bg-cream">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-10">
            <p className="eyebrow mb-3">follow us on instagram</p>
            <h2 className="font-heading text-4xl md:text-5xl text-dark">@sparsh<em className="not-italic">tea</em></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {gallery.map((g, i) => (
              <a href="#" key={i} className="relative group aspect-square overflow-hidden">
                <img src={g} alt="" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition grid place-items-center">
                  <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-dark text-white/80 pt-20 pb-8 px-6">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img src={logo} alt="Sparsh Tea" className="h-10 w-auto" />
              <span className="font-heading text-3xl italic text-white">sparsh</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">Sparsh Tea — a family-run house crafting bold, aromatic Indian blends from handpicked leaves.</p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter].map((Ic, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/20 grid place-items-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition"><Ic className="w-4 h-4" /></a>
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-heading text-xl text-white mb-5">Shop</h5>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#products" className="hover:text-primary">Sparsh Nagni Tea</a></li>
              <li><a href="#products" className="hover:text-primary">Sparsh No.1 Tea</a></li>
              <li><a href="#products" className="hover:text-primary">Sparsh Masala Tea</a></li>
              <li><a href="#products" className="hover:text-primary">Premium Blends</a></li>
              <li><a href="#products" className="hover:text-primary">Gift Packs</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-heading text-xl text-white mb-5">Company</h5>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#about" className="hover:text-primary">About Us</a></li>
              <li><a href="#" className="hover:text-primary">Our Story</a></li>
              <li><a href="#" className="hover:text-primary">Tea Journal</a></li>
              <li><a href="#" className="hover:text-primary">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-heading text-xl text-white mb-5">Get in Touch</h5>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3"><MapPin className="w-4 h-4 mt-1 text-primary flex-shrink-0" />Assam Tea House, Dhanu Mal Street, Kotkapura</li>
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary" /><a href="tel:+919814721027" className="hover:text-primary">+91 98147 21027</a></li>
              <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary" /><a href="mailto:info@sparshtea.in" className="hover:text-primary">info@sparshtea.in</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>© {new Date().getFullYear()} sparshtea.in — All Rights Reserved.</p>
          <p>Handcrafted with care in Kotkapura, India.</p>
        </div>
      </footer>
    </div>
  );
}

function ProductCard({ p }: { p: Product }) {
  return (
    <div className="group text-center">
      <div className="relative overflow-hidden bg-cream aspect-square mb-4">
        <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0" />
        <img src={p.hover} alt="" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {p.tag && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">{p.tag}</span>
        )}
        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition duration-300">
          {[Heart, Search, ShoppingBag].map((Ic, i) => (
            <button key={i} className="w-9 h-9 rounded-full bg-white grid place-items-center shadow-sm hover:bg-primary hover:text-primary-foreground transition"><Ic className="w-4 h-4" /></button>
          ))}
        </div>
        <button className="absolute bottom-0 inset-x-0 bg-dark text-white text-xs uppercase tracking-widest py-3 translate-y-full group-hover:translate-y-0 transition duration-300">Add to Cart</button>
      </div>
      <div className="flex justify-center gap-0.5 text-primary mb-1">
        {Array.from({ length: 5 }).map((_, s) => <Star key={s} className={`w-3 h-3 ${s < Math.round(p.rating) ? "fill-primary" : ""}`} />)}
        <span className="text-xs text-muted-foreground ml-1">({p.rating})</span>
      </div>
      <h3 className="font-heading text-xl text-dark hover:text-primary transition cursor-pointer">{p.name}</h3>
      <p className="text-sm text-muted-foreground mt-1">{p.price}</p>
    </div>
  );
}
