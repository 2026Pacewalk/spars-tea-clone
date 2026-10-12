import { useState, useEffect } from "react";
import { Search, Heart, ShoppingBag, ChevronRight, Leaf, Sprout, Package, Truck, Mail, Phone, MapPin, Star, Instagram, Clock, Send, Recycle, Palette, HeartPulse, CheckCircle2, MessageCircle } from "lucide-react";
import HeroSlider3D from "@/components/HeroSlider3D";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { handleNavClick } from "@/lib/scroll";

import about1 from "@/assets/sparsh/about-1.jpg";
import about2 from "@/assets/sparsh/about-2.jpg";
import about3 from "@/assets/sparsh/about-3.jpg";
import about4 from "@/assets/sparsh/about-4.jpg";
import about5 from "@/assets/sparsh/about-5.jpg";
import about6 from "@/assets/sparsh/about-6.jpg";
import mockup1 from "@/assets/sparsh/Sparsh-Mockup.png";
import mockup3 from "@/assets/sparsh/Sparsh-Mockup-3.png";
import article from "@/assets/sparsh/article.jpg";
import product1 from "@/assets/sparsh/product-1.jpg";
import product3 from "@/assets/sparsh/product-3.jpg";
import t1 from "@/assets/sparsh/testimonial-1.jpg";
import t2 from "@/assets/sparsh/testimonial-2.jpg";
import t3 from "@/assets/sparsh/testimonial-3.jpg";

import naagniLifestyle from "@/assets/sparsh/products/naagni-lifestyle.jpg";
import masalaLifestyle from "@/assets/sparsh/products/masala-lifestyle.jpg";
import elaichiLifestyle from "@/assets/sparsh/products/elaichi-lifestyle.jpg";
import goldLifestyle from "@/assets/sparsh/products/gold-lifestyle.jpg";
import royalLifestyle from "@/assets/sparsh/products/royal-lifestyle.jpg";
import no1Lifestyle from "@/assets/sparsh/products/no1-lifestyle.jpg";
import qualityImg from "@/assets/sparsh/quality-you-can-trust.png";
import timelessImg from "@/assets/sparsh/timeless-blends.png";
import catCtc from "@/assets/sparsh/categories/ctc-tea.jpg";
import catOrthodox from "@/assets/sparsh/categories/orthodox-tea.jpg";
import catGift from "@/assets/sparsh/categories/gift-packs.jpg";

import { products, productCardId, type Product } from "@/lib/products";

const categories = [
  { name: "CTC Tea", img: catCtc, count: 6 },
  { name: "Orthodox Tea", img: catOrthodox, count: 1 },
  { name: "Gift Packs", img: catGift, count: 3 },
];

const features = [
  { icon: Leaf, title: "Carefully Selected", text: "Leaves chosen with quality in mind, blend after blend." },
  { icon: Package, title: "Freshly Packed", text: "Packaging designed to preserve freshness and aroma." },
  { icon: CheckCircle2, title: "Consistent Quality", text: "A dependable cup, every single time." },
  { icon: Star, title: "Authentic Flavour", text: "Crafted for a rich, satisfying taste." },
  { icon: HeartPulse, title: "No Acidity", text: "Gentle on your stomach, easy on your day." },
];

const reviews = [
  { name: "Vikram", date: "on Sparsh Naagni Tea", avatar: t2, text: "Rich flavour, beautiful aroma — my everyday morning chai." },
  { name: "Priya", date: "on Sparsh Elaichi Tea", avatar: t3, text: "The Elaichi Tea has become part of our family tea routine." },
  { name: "Sakshi", date: "on Sparsh Masala Tea", avatar: t1, text: "Perfectly spiced masala chai — comforting, aromatic and never bitter." },
  { name: "Rahul", date: "on Sparsh Naagni Tea", avatar: t2, text: "Strong and full-bodied, but no acidity at all. Exactly what I wanted in a chai." },
  { name: "Meera", date: "on Sparsh Gold Tea", avatar: t3, text: "Naturally sweet and smooth — an easy, pleasant cup the whole family enjoys." },
  { name: "Arjun", date: "on Sparsh No.1 Tea", avatar: t1, text: "A dependable, balanced everyday cup. Fresh, aromatic and consistent." },
  { name: "Neha", date: "on Sparsh Premium Orthodox Tea", avatar: t2, text: "Delicate and fragrant — a lovely, refined change from regular chai." },
];

const gallery = [about1, about2, about3, about4, about5, about6];

const teaDetails = [
  {
    tag: "Sparsh Naagni Tea · Premium",
    title: "A Bold Cup to Kickstart Your Day",
    img: naagniLifestyle,
    paras: [
      "Sparsh Naagni Tea is our premium pick for those who crave a powerful, invigorating start to their day. It delivers a rich, bold flavour with a deep, malty taste and smooth finish — without the acidity.",
      "Enjoy it with milk & sugar, morning or evening, for a full-bodied cup that never feels heavy on your stomach.",
    ],
  },
  {
    tag: "Sparsh No.1 Tea",
    title: "The Perfect Everyday Tea",
    img: no1Lifestyle,
    paras: [
      "Sparsh No.1 Tea is the ideal choice for those who enjoy a smooth, balanced cup every day.",
      "Perfect for a peaceful morning, a quick afternoon break, or a relaxing evening ritual with milk & sugar.",
    ],
  },
  {
    tag: "Sparsh Masala Tea",
    title: "A Flavourful Blend of Tradition & Spice",
    img: masalaLifestyle,
    paras: [
      "Sparsh Masala Tea is a delightful fusion of aromatic spices and rich tea — cardamom, cinnamon, ginger and other traditional spices.",
      "It delivers a comforting, spicy kick in every sip — the authentic taste of Indian masala chai, right in your cup.",
    ],
  },
  {
    tag: "Sparsh Elaichi Tea",
    title: "The Perfect Blend of Tea & Cardamom",
    img: elaichiLifestyle,
    paras: [
      "Sparsh Elaichi Tea brings together the richness of fine tea and the naturally aromatic taste of cardamom for a refreshing cup full of flavour.",
      "Perfect for a soothing morning, a relaxing afternoon break, or those special tea moments when you want something wonderfully fragrant and flavourful.",
    ],
  },
  {
    tag: "Sparsh Gold Tea · Premium",
    title: "A Rich & Refined Cup for Every Occasion",
    img: goldLifestyle,
    paras: [
      "Sparsh Gold Tea is crafted for those who appreciate a rich, smooth and refreshing cup of tea.",
      "Its carefully selected blend delivers a full-bodied flavour and inviting aroma with every sip.",
    ],
  },
  {
    tag: "Sparsh Royal Tea · Premium",
    title: "A Rich & Royal Cup of Assam Tea",
    img: royalLifestyle,
    paras: [
      "Sparsh Royal Tea is a premium Assam loose tea crafted for those who appreciate a rich, satisfying cup with a naturally sweet taste.",
      "Perfect for a peaceful morning, a refreshing afternoon break, or those special tea moments when you want to enjoy something truly premium.",
    ],
  },
];

const varieties = [
  { icon: HeartPulse, title: "A Natural Boost for Health", text: "Rich in antioxidants, vitamins and minerals to promote glowing skin, enhance metabolism and detoxify the body." },
  { icon: Leaf, title: "A Ritual of Relaxation", text: "A morning pick-me-up, an afternoon indulgence or an evening wind-down — tea fits seamlessly into every moment." },
  { icon: Recycle, title: "A Sustainable Choice", text: "Responsibly sourced from lush plantations and packaged with care for a cleaner, greener cup." },
  { icon: Palette, title: "A Canvas for Creativity", text: "Green, black, white, oolong, herbal and more — each variety a unique flavour, aroma and experience." },
];

const businessHours = [
  { day: "Monday – Friday", time: "09:00 am – 07:00 pm" },
  { day: "Saturday", time: "09:00 am – 12:00 pm" },
  { day: "Sunday", time: "Closed" },
];

export default function HomePage({ scrollTo }: { scrollTo?: string } = {}) {
  const [contactSent, setContactSent] = useState(false);

  // When arriving via a clean slug route (e.g. /shop), scroll to that section.
  useEffect(() => {
    if (!scrollTo) return;
    const el = document.getElementById(scrollTo);
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
  }, [scrollTo]);

  return (
    <div className="bg-background text-foreground">
      <SiteHeader />

      {/* Hero — 3D slider */}
      <div id="home">
        <HeroSlider3D />
      </div>

      {/* About green band */}
      <section id="about" className="relative bg-forest text-forest-foreground leaf-bg py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow text-primary mb-4">about us</p>
          <h2 className="font-heading text-5xl md:text-6xl mb-8 leading-tight">Welcome to<br /><em className="not-italic">Sparsh Tea</em></h2>
          <p className="text-forest-foreground/85 text-lg leading-relaxed mb-6">
            We are a family-run tea house founded on a passion for tea. Every leaf of Sparsh is handpicked from lush Indian plantations and blended with a promise: we would never sell a tea we wouldn't happily drink at home.
          </p>
          <p className="font-heading text-2xl md:text-3xl text-primary mb-10">Sparsh — Made for Moments That Matter.</p>
          <a href="/shop" onClick={(e) => handleNavClick(e, "products", "shop")} className="inline-flex items-center gap-2 border border-forest-foreground/40 text-forest-foreground px-8 py-3.5 rounded-full text-xs uppercase tracking-widest hover:bg-primary hover:text-primary-foreground hover:border-primary transition">
            Learn More <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* Products with tabs */}
      <section id="shop" className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <p className="eyebrow mb-3">our teas</p>
            <h2 className="font-heading text-5xl md:text-6xl text-dark mb-4">Explore the <em className="not-italic">Sparsh</em> Collection</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Six bold blends — find the strength and flavour that suits your taste.</p>
          </div>

          <div id="products" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => <ProductCard key={p.name} p={p} />)}
          </div>

          {/* Promo band */}
          <div className="mt-16 relative overflow-hidden rounded-sm bg-cream">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-10 md:p-16">
                <p className="eyebrow mb-4">timeless blends</p>
                <h3 className="font-heading text-4xl md:text-5xl text-dark mb-4 leading-tight">Rich Taste,<br /><em className="not-italic">Timeless Blends.</em></h3>
                <p className="text-muted-foreground mb-8">The most-loved teas from the Sparsh house — six bold blends and one delicate specialty tea, crafted for a truly satisfying cup.</p>
                <a href="/shop" onClick={(e) => handleNavClick(e, "products", "shop")} className="inline-flex items-center gap-2 text-xs uppercase tracking-widest border-b-2 border-dark text-dark pb-1 hover:border-primary hover:text-primary transition">
                  Discover More <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="relative h-80 md:h-96">
                <img src={timelessImg} alt="Fresh Sparsh tea leaves" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Products — detailed descriptions */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <p className="eyebrow mb-3">get to know them</p>
            <h2 className="font-heading text-5xl md:text-6xl text-dark mb-4">Rich Taste,<br /><em className="not-italic">Timeless Blends</em></h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">A closer look at the blends our customers reach for again and again — always served hot, with milk &amp; sugar to taste.</p>
          </div>
          <div className="space-y-16">
            {teaDetails.map((tea, i) => (
              <div key={tea.tag} className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden rounded-sm bg-cream">
                    <img src={tea.img} alt={tea.title} className="w-full h-full object-contain" />
                  </div>
                </div>
                <div>
                  <p className="eyebrow mb-3">{tea.tag}</p>
                  <h3 className="font-heading text-4xl md:text-5xl text-dark mb-6 leading-tight">{tea.title}</h3>
                  {tea.paras.map((p, k) => (
                    <p key={k} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
                  ))}
                  <a href="/shop" onClick={(e) => handleNavClick(e, "shop", "shop")} className="inline-flex items-center gap-2 mt-2 text-xs uppercase tracking-widest border-b-2 border-dark text-dark pb-1 hover:border-primary hover:text-primary transition">
                    Shop Now <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-wrap items-end justify-between mb-12 gap-6">
            <div>
              <p className="eyebrow mb-3">a range worth exploring</p>
              <h2 className="font-heading text-5xl md:text-6xl text-dark mb-3">Browse by <em className="not-italic">Category</em></h2>
              <p className="text-muted-foreground text-lg max-w-md">From bold blends like Naagni and Masala to the delicate Orthodox long leaf — every Sparsh tea has its own character and aroma.</p>
            </div>
            <a href="/shop" onClick={(e) => handleNavClick(e, "products", "shop")} className="text-xs uppercase tracking-widest border-b-2 border-dark text-dark pb-1 hover:border-primary hover:text-primary transition">View All Products ›</a>
          </div>
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            {categories.map((c) => (
              <a key={c.name} href="/shop" onClick={(e) => handleNavClick(e, "products", "shop")} className="group text-center">
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

      {/* Diverse Varieties — features */}
      <section id="blog" className="relative bg-forest text-forest-foreground leaf-bg py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="eyebrow text-primary mb-4">features</p>
            <h2 className="font-heading text-5xl md:text-6xl mb-6 leading-tight">Diverse Varieties<br /><em className="not-italic">for Every Palate</em></h2>
            <p className="text-forest-foreground/85 text-lg leading-relaxed">
              Tea is not only a comforting drink but a powerful elixir for health and beauty. Rich in antioxidants, vitamins and minerals, it fits every moment of the day — served hot or iced, alongside any meal.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {varieties.map((v) => (
              <div key={v.title} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 text-primary grid place-items-center mx-auto mb-5">
                  <v.icon className="w-7 h-7" />
                </div>
                <h4 className="font-heading text-2xl mb-3">{v.title}</h4>
                <p className="text-sm text-forest-foreground/80 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why we're great */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src={qualityImg} alt="A freshly brewed cup of Sparsh masala chai with tea leaves and spices" className="w-full aspect-[4/5] object-cover rounded-sm" />
            <div className="absolute -bottom-6 -right-6 md:bottom-8 md:right-8 bg-primary text-primary-foreground px-8 py-6 rounded-full font-heading">
              <div className="text-4xl leading-none">100%</div>
              <div className="text-xs uppercase tracking-widest mt-1">Natural Leaf</div>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-4">quality you can trust</p>
            <h2 className="font-heading text-5xl md:text-6xl text-dark mb-6 leading-tight">Quality You<br /><em className="not-italic">Can Trust</em></h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">Every cup of Sparsh is built on a simple promise — real quality you can taste and trust, blend after blend.</p>
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
          <a href="/contact" onClick={(e) => handleNavClick(e, "contact", "contact")} className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-dark transition">Meet Our Team <ChevronRight className="w-4 h-4" /></a>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">testimonials</p>
            <h2 className="font-heading text-5xl md:text-6xl text-dark mb-4">Loved by <em className="not-italic">Tea Lovers</em></h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Real words from a family of tea lovers across India.</p>
          </div>
        </div>
        <div className="marquee">
          <div className="marquee-track gap-6 px-3">
            {[...reviews, ...reviews].map((r, i) => (
              <div key={i} className="bg-cream p-8 rounded-sm w-[340px] md:w-[380px] flex-shrink-0">
                <div className="flex gap-1 text-primary mb-4">
                  {Array.from({ length: 5 }).map((_, s) => <Star key={s} className="w-4 h-4 fill-primary" />)}
                </div>
                <p className="text-dark leading-relaxed mb-6 font-heading text-lg italic">"{r.text}"</p>
                <div>
                  <p className="font-medium text-dark">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Tried a Sparsh tea? We'd love to hear from you.</p>
          <a href="/contact" onClick={(e) => handleNavClick(e, "contact", "contact")} className="inline-flex items-center gap-2 border border-dark text-dark px-8 py-3.5 rounded-full text-xs uppercase tracking-widest hover:bg-primary hover:text-primary-foreground hover:border-primary transition">
            Write a Review <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* Follow us gallery */}
      <section id="instagram" className="py-16 px-6 bg-cream">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-10">
            <p className="eyebrow mb-3">follow us on instagram</p>
            <h2 className="font-heading text-4xl md:text-5xl text-dark mb-4">@sparsh<em className="not-italic">tea</em></h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Follow along for brewing tips, fresh drops and moments from our garden to your cup.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {gallery.map((g, i) => (
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" key={i} className="relative group aspect-square overflow-hidden">
                <img src={g} alt="" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition grid place-items-center">
                  <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">contact us</p>
            <h2 className="font-heading text-5xl md:text-6xl text-dark mb-4">Contact Us <em className="not-italic">Right Now</em></h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Have questions or need assistance? Reach out and let's brew the perfect tea experience together.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-cream p-8 md:p-10 rounded-sm">
              {contactSent ? (
                <div className="h-full min-h-[320px] flex flex-col items-center justify-center text-center">
                  <CheckCircle2 className="w-14 h-14 text-primary mb-4" />
                  <h3 className="font-heading text-3xl text-dark mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">Your message has been received. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setContactSent(true); }} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <input required type="text" placeholder="Your Name" className="w-full bg-white border border-border rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary" />
                    <input required type="email" placeholder="Your Email" className="w-full bg-white border border-border rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary" />
                  </div>
                  <input type="tel" placeholder="Phone Number" className="w-full bg-white border border-border rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary" />
                  <textarea required rows={5} placeholder="Your Message" className="w-full bg-white border border-border rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none" />
                  <button type="submit" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full text-xs uppercase tracking-widest hover:bg-dark transition">
                    Send Message <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
            {/* Info + hours */}
            <div className="flex flex-col gap-6">
              <div className="bg-forest text-forest-foreground rounded-sm p-8 md:p-10 leaf-bg">
                <h3 className="font-heading text-3xl mb-6">Our House</h3>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3"><MapPin className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />Assam Tea House, Dhanu Mal Street, Kotkapura</li>
                  <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-primary" /><a href="tel:+919814721027" className="hover:text-primary transition">+91 98147 21027</a></li>
                  <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-primary" /><a href="mailto:info@sparshtea.in" className="hover:text-primary transition">info@sparshtea.in</a></li>
                </ul>
              </div>
              <div className="bg-cream rounded-sm p-8 md:p-10">
                <h3 className="font-heading text-3xl text-dark mb-6 flex items-center gap-3"><Clock className="w-6 h-6 text-primary" />Business Hours</h3>
                <ul className="divide-y divide-border">
                  {businessHours.map((h) => (
                    <li key={h.day} className="flex items-center justify-between py-3 text-sm">
                      <span className="text-dark font-medium">{h.day}</span>
                      <span className="text-muted-foreground">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Need help choosing — WhatsApp */}
      <section className="px-6 pb-8">
        <div className="max-w-[1400px] mx-auto bg-forest text-forest-foreground leaf-bg rounded-sm px-8 py-12 md:px-16 text-center">
          <p className="eyebrow text-primary mb-3">need help choosing your tea?</p>
          <h2 className="font-heading text-4xl md:text-5xl mb-4 leading-tight">Not sure which Sparsh is right for you?</h2>
          <p className="text-forest-foreground/85 text-lg max-w-2xl mx-auto mb-8">Our team is happy to help you choose based on your preferred strength and taste.</p>
          <a
            href="https://wa.me/919814721027?text=Hi%20Sparsh%2C%20please%20help%20me%20choose%20a%20tea"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-dark transition"
          >
            <MessageCircle className="w-5 h-5" /> Chat with Sparsh on WhatsApp
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">faq</p>
            <h2 className="font-heading text-5xl md:text-6xl text-dark">Common <em className="not-italic">Questions</em></h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "What type of tea does Sparsh offer?", a: "Premium CTC teas — Naagni, Royal, No.1, Gold, Masala, and Elaichi — along with one Orthodox long-leaf tea, Sparsh Premium Orthodox." },
              { q: "How do I prepare Sparsh Tea?", a: "Boil fresh water, add the recommended quantity of tea, let it brew, and add milk & sugar to taste." },
              { q: "How should I store my tea?", a: "Keep it in a cool, dry place, away from direct sunlight, moisture, and strong smells." },
            ].map((f) => (
              <details key={f.q} className="group bg-cream rounded-sm border border-border/60 px-6 py-5">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-heading text-xl text-dark">
                  {f.q}
                  <span className="text-primary text-2xl leading-none flex-shrink-0 transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="text-muted-foreground leading-relaxed mt-4">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function ProductCard({ p }: { p: Product }) {
  const [slide, setSlide] = useState(0);
  const [hovered, setHovered] = useState(false);
  const n = p.imgs.length;

  // While hovered, step through the remaining slides; reset to the pack shot on leave.
  useEffect(() => {
    if (!hovered) return;
    setSlide(1 % n);
    const t = setInterval(() => setSlide((s) => (s + 1) % n), 1200);
    return () => { clearInterval(t); setSlide(0); };
  }, [hovered, n]);

  return (
    <div id={productCardId(p.id)} className="group text-center scroll-mt-28 rounded-sm transition-shadow duration-500" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="relative overflow-hidden bg-cream aspect-square mb-4">
        {p.imgs.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={idx === 0 ? p.name : ""}
            loading={idx === 0 ? undefined : "lazy"}
            className={`${idx === 0 ? "" : "absolute inset-0"} w-full h-full object-cover transition-opacity duration-500 ${slide === idx ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute bottom-1 group-hover:bottom-10 inset-x-0 z-10 flex justify-center transition-all duration-300">
          {p.imgs.map((_, idx) => (
            <button key={idx} onClick={() => setSlide(idx)} aria-label={`Show ${p.name} image ${idx + 1}`} className="p-2">
              <span className={`block h-1.5 rounded-full transition-all duration-300 ${slide === idx ? "w-5 bg-primary" : "w-1.5 bg-dark/30"}`} />
            </button>
          ))}
        </div>
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
