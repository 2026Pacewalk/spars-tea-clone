import { useState, useEffect } from "react";
import { Search, Heart, ShoppingBag, ChevronRight, Leaf, Sprout, Package, Truck, Mail, Phone, MapPin, Star, Instagram, Clock, Send, Recycle, Palette, HeartPulse, CheckCircle2 } from "lucide-react";
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
  { name: "Meera", date: "September 2024", avatar: t3, text: "The aroma the moment you open the pack is unreal. Fresh, fragrant and full of flavour — you can taste the garden." },
  { name: "Arjun", date: "October 2024", avatar: t1, text: "Fast delivery and beautiful packaging. The No.1 blend is now a daily ritual in our home. Highly recommended." },
  { name: "Neha", date: "November 2024", avatar: t2, text: "I switched to Sparsh masala chai and never looked back. Perfectly spiced, never bitter — exactly like home." },
];

const gallery = [about1, about2, about3, about4, about5, about6];

const teaDetails = [
  {
    tag: "Sparsh Nagni Tea",
    title: "A Bold Cup to Kickstart Your Day",
    img: mockup1,
    paras: [
      "Sparsh Nagni Strong Tea is the ultimate choice for those who crave a powerful, invigorating start to their day. Made from the finest tea leaves, it delivers a rich, bold flavour that stands out with every sip — a deep, malty taste and smooth finish that energises you for whatever the day holds.",
      "Whether you prefer it black or with a touch of milk, Sparsh Nagni promises a satisfying cup that awakens your senses, in the morning or during a long workday.",
    ],
  },
  {
    tag: "Sparsh No.1 Tea",
    title: "The Perfect Everyday Tea",
    img: mockup2,
    paras: [
      "Sparsh No.1 Normal Tea is the ideal choice for those who enjoy a smooth, balanced cup every day. With a mild yet flavourful blend, it offers a refreshing taste perfect for a peaceful morning, a quick afternoon break, or a relaxing evening ritual.",
      "Beyond its delightful taste, it is rich in antioxidants — supporting healthy digestion, improving immunity and providing a gentle energy boost that helps you unwind and rejuvenate.",
    ],
  },
  {
    tag: "Sparsh Masala Tea",
    title: "A Flavourful Blend of Tradition & Spice",
    img: mockup3,
    paras: [
      "Sparsh Masala Tea is a delightful fusion of aromatic spices and rich tea. With a perfect blend of cardamom, cinnamon, ginger and other traditional spices, it delivers a comforting, spicy kick in every sip — the authentic taste of Indian chai right in your cup.",
      "More than delicious, the blend of ginger and cinnamon helps improve digestion, boost metabolism and provide a natural immune boost — perfect for soothing colds or relaxing after a long day.",
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
  const [tab, setTab] = useState("New-In");
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
          <p className="text-forest-foreground/85 text-lg leading-relaxed mb-10">
            We are a family-run tea house founded on a passion for tea. Every leaf of Sparsh is handpicked from lush Indian plantations and blended with a promise: we would never sell a tea we wouldn't happily drink at home.
          </p>
          <a href="/shop" onClick={(e) => handleNavClick(e, "products", "shop")} className="inline-flex items-center gap-2 border border-forest-foreground/40 text-forest-foreground px-8 py-3.5 rounded-full text-xs uppercase tracking-widest hover:bg-primary hover:text-primary-foreground hover:border-primary transition">
            Learn More <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* Products with tabs */}
      <section id="shop" className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="font-heading text-5xl md:text-6xl text-dark mb-4">Shop Our <em className="not-italic">Teas</em></h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">Handpicked blends for every mood and moment — explore our best-loved teas.</p>
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
                <a href="/shop" onClick={(e) => handleNavClick(e, "products", "shop")} className="inline-flex items-center gap-2 text-xs uppercase tracking-widest border-b-2 border-dark text-dark pb-1 hover:border-primary hover:text-primary transition">
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

      {/* Our Products — detailed descriptions */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <p className="eyebrow mb-3">our products</p>
            <h2 className="font-heading text-5xl md:text-6xl text-dark mb-4">Tea has a complex positive<br /><em className="not-italic">effect on the body</em></h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Each Sparsh blend is crafted to invigorate your senses and uplift your day — a sip of perfection, a touch of nature.</p>
          </div>
          <div className="space-y-16">
            {teaDetails.map((tea, i) => (
              <div key={tea.tag} className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden rounded-sm bg-white border border-border">
                    <img src={tea.img} alt={tea.title} className="w-full h-full object-contain p-8" />
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
              <p className="eyebrow mb-3">explore our range</p>
              <h2 className="font-heading text-5xl md:text-6xl text-dark mb-3">Browse by <em className="not-italic">Category</em></h2>
              <p className="text-muted-foreground text-lg max-w-md">Find your perfect cup — shop teas grouped by type and taste.</p>
            </div>
            <a href="/shop" onClick={(e) => handleNavClick(e, "products", "shop")} className="text-xs uppercase tracking-widest border-b-2 border-dark text-dark pb-1 hover:border-primary hover:text-primary transition">View All Products ›</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
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
          <a href="/contact" onClick={(e) => handleNavClick(e, "contact", "contact")} className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-dark transition">Meet Our Team <ChevronRight className="w-4 h-4" /></a>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">testimonials</p>
            <h2 className="font-heading text-5xl md:text-6xl text-dark mb-4">Customer <em className="not-italic">Reviews</em></h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">What our clients say about our tea — real words from a family of tea lovers across India.</p>
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

      <SiteFooter />
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
