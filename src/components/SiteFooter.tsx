import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Leaf, Truck, Mail, Phone, MapPin, Star, Instagram, Facebook, Twitter, Clock, Send, CheckCircle2, ArrowUp, ShieldCheck, RotateCcw } from "lucide-react";
import { handleNavClick } from "@/lib/scroll";
import logo from "@/assets/sparsh/logo.png";
import PaymentBadges from "@/components/PaymentBadges";

const trustBadges = [
  { icon: Truck, title: "Free Shipping", sub: "On all orders over ₹499" },
  { icon: ShieldCheck, title: "Secure Payments", sub: "100% protected checkout" },
  { icon: Leaf, title: "100% Natural", sub: "No additives, ever" },
  { icon: RotateCcw, title: "Easy Returns", sub: "7-day return policy" },
];

const socials = [
  { Ic: Facebook, url: "https://facebook.com" },
  { Ic: Instagram, url: "https://instagram.com" },
  { Ic: Twitter, url: "https://twitter.com" },
];

const hrefFor = (slug: string) => (slug ? `/${slug}` : "/");

export default function SiteFooter() {
  const [newsletterSent, setNewsletterSent] = useState(false);

  // In-page section link with clean slug + smooth scroll
  const Slug = ({ id, slug, children, className }: { id: string; slug: string; children: React.ReactNode; className?: string }) => (
    <a href={hrefFor(slug)} onClick={(e) => handleNavClick(e, id, slug)} className={className}>{children}</a>
  );

  return (
    <footer className="relative bg-dark text-white/70 leaf-bg">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 py-12 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="eyebrow text-primary mb-3">newsletter</p>
            <h3 className="font-heading text-3xl md:text-4xl text-white leading-tight mb-2">Join the Sparsh Tea Club</h3>
            <p className="text-sm text-white/60 max-w-md">Subscribe for brewing tips, early access to new harvests, and members-only offers.</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setNewsletterSent(true); }} className="w-full">
            {newsletterSent ? (
              <p className="flex items-center gap-2 text-primary font-medium"><CheckCircle2 className="w-5 h-5" /> Thanks for subscribing — welcome to the club!</p>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input required type="email" placeholder="Enter your email address" className="w-full bg-white/5 border border-white/15 rounded-full pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition" />
                </div>
                <button type="submit" className="bg-primary text-primary-foreground px-8 py-3.5 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-dark transition inline-flex items-center justify-center gap-2 flex-shrink-0">
                  Subscribe <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Trust badges */}
      <div className="border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustBadges.map((b) => (
            <div key={b.title} className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-primary/15 text-primary grid place-items-center flex-shrink-0">
                <b.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">{b.title}</p>
                <p className="text-xs text-white/50">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main columns */}
      <div className="max-w-[1400px] mx-auto px-6 pt-16 pb-10 grid md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
        <div className="lg:col-span-4">
          <img src={logo} alt="Sparsh Tea" className="h-14 w-auto mb-6" />
          <p className="text-sm leading-relaxed mb-6 max-w-xs">Sparsh Tea — a family-run house crafting bold, aromatic Indian blends from handpicked leaves.</p>
          <div className="flex items-center gap-2 mb-6 text-sm">
            <div className="flex gap-0.5 text-primary">
              {Array.from({ length: 5 }).map((_, s) => <Star key={s} className="w-4 h-4 fill-primary" />)}
            </div>
            <span className="text-white/70">4.8/5 from 2,000+ happy customers</span>
          </div>
          <div className="flex gap-3">
            {socials.map(({ Ic, url }, i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer" aria-label="Social link" className="w-10 h-10 rounded-full border border-white/20 grid place-items-center hover:bg-primary hover:border-primary hover:text-primary-foreground hover:-translate-y-0.5 transition"><Ic className="w-4 h-4" /></a>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2">
          <h5 className="font-heading text-xl text-white mb-5">Shop</h5>
          <ul className="space-y-3 text-sm">
            {["Sparsh Nagni Tea", "Sparsh No.1 Tea", "Sparsh Masala Tea", "Premium Blends", "Gift Packs"].map((l) => (
              <li key={l}><Slug id="shop" slug="shop" className="inline-flex items-center gap-1.5 hover:text-primary hover:translate-x-1 transition-all">{l}</Slug></li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-2">
          <h5 className="font-heading text-xl text-white mb-5">Company</h5>
          <ul className="space-y-3 text-sm">
            <li><Slug id="about" slug="about" className="hover:text-primary hover:translate-x-1 inline-block transition-all">About Us</Slug></li>
            <li><Slug id="blog" slug="about" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Our Story</Slug></li>
            <li><Slug id="reviews" slug="reviews" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Reviews</Slug></li>
            <li><Slug id="contact" slug="contact" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Contact</Slug></li>
            <li><Link to="/sitemap" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Sitemap</Link></li>
          </ul>
        </div>
        <div className="lg:col-span-4">
          <h5 className="font-heading text-xl text-white mb-5">Get in Touch</h5>
          <ul className="space-y-4 text-sm mb-6">
            <li className="flex items-start gap-3"><MapPin className="w-4 h-4 mt-1 text-primary flex-shrink-0" />Assam Tea House, Dhanu Mal Street, Kotkapura</li>
            <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary" /><a href="tel:+919814721027" className="hover:text-primary">+91 98147 21027</a></li>
            <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary" /><a href="mailto:info@sparshtea.in" className="hover:text-primary">info@sparshtea.in</a></li>
          </ul>
          <div className="flex items-start gap-3 text-sm">
            <Clock className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
            <div>
              <p className="text-white/80">Mon–Fri: 9:00 am – 7:00 pm</p>
              <p className="text-white/50 text-xs mt-0.5">Sat: 9 am – 12 pm · Sun: Closed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p className="order-2 md:order-1 text-center md:text-left">© {new Date().getFullYear()} sparshtea.in — All Rights Reserved. · Developed by <a href="https://pacewalk.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline underline-offset-4">PACEWALK</a></p>
          <div className="order-1 md:order-2 flex items-center gap-4">
            <PaymentBadges />
            <a href="/" onClick={(e) => handleNavClick(e, "home", "")} aria-label="Back to top" className="w-9 h-9 rounded-full bg-white/10 grid place-items-center hover:bg-primary hover:text-primary-foreground transition flex-shrink-0"><ArrowUp className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
