import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Leaf, Heart, Sparkles, Sprout, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";

import logo from "@/assets/sparsh/logo.png";
import carousel1 from "@/assets/sparsh/carousel-1.jpg";
import carousel2 from "@/assets/sparsh/carousel-2.jpg";
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

const slides = [
  { img: carousel1, sup: "Welcome to", brand: "Sparsh Tea", title: "Brewing Excellence, One Cup at a Time.", cta: "Explore More" },
  { img: carousel2, sup: "Your", brand: "Refreshment", title: "Organic & Quality Tea Production", cta: "View Products" },
];

const testimonials = [
  { name: "Vikram", img: t2, text: "Tea is an essential part of my daily routine, and this website has become my go-to. The quality is top-notch, and I feel so much better after drinking their herbal teas. It's like a natural detox for both my body and mind!" },
  { name: "Priya", img: t3, text: "I've tried several online tea brands, but none compare to the freshness and quality I get here. The special chai blends have become a favorite in my family, and we enjoy it every morning. It's a perfect way to start the day!" },
  { name: "Sakshi", img: t1, text: "As a tea enthusiast, I've tried many brands, but this one stands out. The variety of teas offered is incredible, and each one has a unique flavor. Plus, I've noticed a significant improvement in my digestion since I started drinking their green tea daily." },
];

const features = [
  { icon: Leaf, title: "A Natural Boost for Health", text: "Rich in antioxidants and nutrients that support wellness." },
  { icon: Heart, title: "A Ritual of Relaxation", text: "A warm cup that helps you slow down and savor the moment." },
  { icon: Sprout, title: "A Sustainable Choice", text: "Ethically sourced leaves from lush, responsible plantations." },
  { icon: Sparkles, title: "A Canvas for Creativity", text: "Blend, brew and experiment to craft your perfect cup." },
];

function Home() {
  const [slide, setSlide] = useState(0);
  const [ti, setTi] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);

  const nav = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#products", label: "Products" },
    { href: "#features", label: "Features" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <img src={logo} alt="Sparsh Tea" className="h-11 w-auto" />
            <span className="font-heading text-2xl font-bold text-dark">Sparsh <span className="text-primary">Tea</span></span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-sm font-semibold text-dark hover:text-primary transition-colors">{n.label}</a>
            ))}
          </nav>
          <a href="#contact" className="hidden md:inline-flex items-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition">Get in touch</a>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-white">
            <div className="px-6 py-4 flex flex-col gap-3">
              {nav.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="text-dark font-semibold">{n.label}</a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero carousel */}
      <section id="home" className="relative h-screen min-h-[600px] pt-20 overflow-hidden">
        {slides.map((s, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === slide ? "opacity-100" : "opacity-0"}`}>
            <img src={s.img} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
              <div className="max-w-3xl">
                <p className="text-white text-lg md:text-xl mb-4">{s.sup} <span className="text-secondary font-semibold">{s.brand}</span></p>
                <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-primary leading-tight mb-8">{s.title}</h1>
                <a href="#about" className="inline-flex items-center rounded-full bg-white text-dark px-8 py-3.5 font-semibold hover:bg-secondary transition">{s.cta}</a>
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => setSlide((slide - 1 + slides.length) % slides.length)} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur text-white grid place-items-center transition"><ChevronLeft /></button>
        <button onClick={() => setSlide((slide + 1) % slides.length)} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur text-white grid place-items-center transition"><ChevronRight /></button>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-4">
            <img src={about1} alt="Tea plantation" className="rounded-lg w-full h-full object-cover aspect-[4/5]" />
            <img src={about3} alt="Tea leaves" className="rounded-lg w-full h-full object-cover aspect-[4/5] mt-8" />
            <img src={about4} alt="Tea cup" className="rounded-lg w-full h-full object-cover aspect-[4/5]" />
            <img src={about2} alt="Tea brewing" className="rounded-lg w-full h-full object-cover aspect-[4/5] mt-8" />
          </div>
          <div>
            <p className="section-label mb-3">About</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-dark mb-8 leading-tight">Sparsh Tea: A Sip of Perfection, A Touch of Nature</h2>
            <div className="flex gap-5 mb-6">
              <img src={about5} alt="" className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
              <div>
                <h5 className="font-heading text-xl font-semibold mb-2 text-dark">Experience the Warmth of Sparsh Tea</h5>
                <p className="text-muted-foreground leading-relaxed">Discover the perfect blend of tradition and taste with Sparsh Tea. Every sip is a journey into the heart of natural flavors, crafted to invigorate your senses and uplift your day. Made with the finest handpicked leaves from lush plantations, Sparsh Tea ensures a rich and refreshing experience in every cup.</p>
              </div>
            </div>
            <div className="flex gap-5">
              <img src={about6} alt="" className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
              <div>
                <h5 className="font-heading text-xl font-semibold mb-2 text-dark">Crafted for Tea Lovers, Loved by All</h5>
                <p className="text-muted-foreground leading-relaxed">From the very first sip, Sparsh Tea captivates you with its unmatched freshness and bold taste. Our dedication to excellence ensures that every leaf is carefully selected and processed to retain its natural goodness.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products intro */}
      <section id="products" className="py-24 px-6 bg-muted">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <p className="section-label mb-3">Our Products</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-dark max-w-3xl mx-auto">Tea has a complex positive effect on the body</h2>
        </div>

        {/* Product 1 - Nagni */}
        <ProductRow
          image={mockup1}
          label="About"
          title="Sparsh Nagni Tea"
          reverse={false}
          items={[
            { h: "A Bold Cup to Kickstart Your Day", p: "Sparsh Nagni Strong Tea is the ultimate choice for those who crave a powerful and invigorating start to their day. Made from the finest tea leaves, it delivers a rich, bold flavor with a deep, malty taste and smooth finish." },
            { h: "Crafted for Tea Lovers, Loved by All", p: "From the very first sip, Sparsh Tea captivates you with its unmatched freshness and bold taste. Our dedication to excellence ensures that every leaf is carefully selected and processed to retain its natural goodness." },
          ]}
        />

        {/* Product 2 - No.1 */}
        <ProductRow
          image={mockup2}
          label="About"
          title="Sparsh No.1 Tea"
          reverse
          items={[
            { h: "The Perfect Everyday Tea", p: "Sparsh Normal Tea is ideal for those who enjoy a smooth, balanced cup every day. A mild yet flavorful blend perfect for a peaceful morning, a quick afternoon break, or a relaxing evening ritual." },
            { h: "A Tea for Health and Relaxation", p: "Rich in antioxidants, it supports well-being by promoting healthy digestion, improving immunity, and providing a gentle energy boost. Its calming properties make it a great choice for unwinding after a long day." },
          ]}
        />

        {/* Product 3 - Masala */}
        <ProductRow
          image={mockup3}
          label="About"
          title="Sparsh Masala Tea"
          reverse={false}
          items={[
            { h: "A Flavorful Blend of Tradition and Spice", p: "A delightful fusion of aromatic spices—cardamom, cinnamon, ginger and more—delivering a comforting and spicy kick in every sip. The authentic taste of Indian chai in your cup." },
            { h: "A Healthful, Invigorating Drink", p: "The blend of spices helps improve digestion, boost metabolism and provide a natural immune boost. Perfect for soothing colds or relaxing after a long day." },
          ]}
        />

        {/* Product grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[product1, product2, product3, product4].map((p, i) => (
            <div key={i} className="group relative overflow-hidden rounded-lg bg-white">
              <img src={p} alt={`Sparsh Tea product ${i + 1}`} className="w-full aspect-square object-cover group-hover:scale-105 transition duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label mb-3">Features</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-dark mb-6 leading-tight">Diverse Varieties for Every Palate</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">Tea offers an expansive range of types—green, black, white, oolong, herbal, and more. Each variety comes with its unique flavor profile, aroma, and health benefits.</p>
            <p className="text-muted-foreground leading-relaxed">Whether it's a morning pick-me-up, an afternoon indulgence, or an evening wind-down, tea fits seamlessly into every moment of the day.</p>
          </div>
          <img src={article} alt="Tea features" className="rounded-lg w-full object-cover aspect-[4/3]" />
        </div>

        <div className="max-w-7xl mx-auto mt-20">
          <div className="max-w-3xl mb-12">
            <h3 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-4">Tea is a drink of health and beauty</h3>
            <p className="text-muted-foreground leading-relaxed">Rich in antioxidants, vitamins and minerals, tea promotes glowing skin, enhances metabolism, and helps detoxify the body.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-lg border border-border bg-card p-6 hover:shadow-lg hover:-translate-y-1 transition">
                <div className="w-12 h-12 rounded-full bg-primary/15 text-primary grid place-items-center mb-4">
                  <f.icon className="w-6 h-6" />
                </div>
                <h4 className="font-heading text-lg font-semibold text-dark mb-2">{f.title}</h4>
                <p className="text-sm text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-dark text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-label mb-3">Testimonial</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-12">What our clients say about our tea</h2>
          <div className="relative">
            <p className="text-lg md:text-xl leading-relaxed italic text-white/90 mb-8">"{testimonials[ti].text}"</p>
            <img src={testimonials[ti].img} alt={testimonials[ti].name} className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-primary" />
            <h5 className="font-heading text-xl font-semibold mt-4">{testimonials[ti].name}</h5>
            <p className="text-sm text-white/60">Customer</p>
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setTi(i)} aria-label={`Testimonial ${i + 1}`} className={`w-2.5 h-2.5 rounded-full transition ${i === ti ? "bg-primary w-8" : "bg-white/30"}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="section-label mb-3">Contact Us</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-dark mb-6 leading-tight">Contact us right now</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">Have questions or need assistance? Reach out to us and let's brew the perfect tea experience together!</p>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/15 text-primary grid place-items-center flex-shrink-0"><Mail className="w-5 h-5" /></div>
                <div><p className="text-sm text-muted-foreground">Email us</p><a href="mailto:info@sparshtea.in" className="font-semibold text-dark">info@sparshtea.in</a></div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/15 text-primary grid place-items-center flex-shrink-0"><Phone className="w-5 h-5" /></div>
                <div><p className="text-sm text-muted-foreground">Call us</p><a href="tel:+919814721027" className="font-semibold text-dark">+91 98147 21027</a></div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/15 text-primary grid place-items-center flex-shrink-0"><MapPin className="w-5 h-5" /></div>
                <div><p className="text-sm text-muted-foreground">Visit us</p><p className="font-semibold text-dark">Assam Tea House, Dhanu Mal Street, Kotkapura</p></div>
              </li>
            </ul>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="bg-card border border-border rounded-lg p-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input className="w-full rounded-md border border-border bg-background px-4 py-3 focus:outline-none focus:border-primary" placeholder="Your Name" />
              <input type="email" className="w-full rounded-md border border-border bg-background px-4 py-3 focus:outline-none focus:border-primary" placeholder="Your Email" />
            </div>
            <input className="w-full rounded-md border border-border bg-background px-4 py-3 focus:outline-none focus:border-primary" placeholder="Subject" />
            <textarea rows={5} className="w-full rounded-md border border-border bg-background px-4 py-3 focus:outline-none focus:border-primary" placeholder="Message" />
            <button className="w-full rounded-full bg-primary text-primary-foreground py-3.5 font-semibold hover:opacity-90 transition">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white/70 py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Sparsh Tea" className="h-8 w-auto" />
            <span className="font-heading font-semibold text-white">Sparsh Tea</span>
          </div>
          <p>© sparshtea.in, All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function ProductRow({ image, label, title, items, reverse }: { image: string; label: string; title: string; items: { h: string; p: string }[]; reverse: boolean }) {
  return (
    <div className={`max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center py-12 ${reverse ? "lg:[&>div:first-child]:order-2" : ""}`}>
      <div className="flex justify-center">
        <img src={image} alt={title} className="max-w-md w-full h-auto" />
      </div>
      <div>
        <p className="section-label mb-3">{label}</p>
        <h3 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-6">{title}</h3>
        {items.map((it) => (
          <div key={it.h} className="mb-5">
            <h5 className="font-heading text-lg font-semibold text-primary mb-2">{it.h}</h5>
            <p className="text-muted-foreground leading-relaxed">{it.p}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
