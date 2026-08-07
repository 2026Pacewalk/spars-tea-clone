import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, ArrowLeft, FileCode2 } from "lucide-react";
import logo from "@/assets/sparsh/logo.png";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title: "Sitemap — Sparsh Tea" },
      { name: "description", content: "Browse all pages and sections of the Sparsh Tea website." },
    ],
  }),
  component: Sitemap,
});

type SiteLink = { label: string; href: string };
type SiteGroup = { title: string; links: SiteLink[] };

const groups: SiteGroup[] = [
  {
    title: "Main Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/#about" },
      { label: "Contact Us", href: "/#contact" },
    ],
  },
  {
    title: "Shop",
    links: [
      { label: "Shop Our Teas", href: "/#shop" },
      { label: "Our Products", href: "/#products" },
      { label: "Browse by Category", href: "/#shop" },
    ],
  },
  {
    title: "Our Teas",
    links: [
      { label: "Sparsh Nagni Tea", href: "/#products" },
      { label: "Sparsh No.1 Tea", href: "/#products" },
      { label: "Sparsh Masala Tea", href: "/#products" },
      { label: "Premium Blends", href: "/#products" },
      { label: "Gift Packs", href: "/#products" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Features", href: "/#blog" },
      { label: "Customer Reviews", href: "/#reviews" },
      { label: "Follow on Instagram", href: "/#instagram" },
    ],
  },
];

function Sitemap() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-[1100px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Sparsh Tea" className="h-14 w-auto" />
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-dark hover:text-primary transition">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        <section className="max-w-[1100px] mx-auto px-6 py-16 md:py-20">
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">navigate</p>
            <h1 className="font-heading text-5xl md:text-6xl text-dark mb-4">Sitemap</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Every page and section of the Sparsh Tea website, all in one place.
            </p>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full text-xs uppercase tracking-widest hover:bg-dark transition"
            >
              <FileCode2 className="w-4 h-4" /> View XML Sitemap
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {groups.map((g) => (
              <div key={g.title}>
                <h2 className="font-heading text-2xl text-dark mb-5 pb-3 border-b border-border">{g.title}</h2>
                <ul className="space-y-3">
                  {g.links.map((l) => (
                    <li key={l.label + l.href}>
                      <a
                        href={l.href}
                        className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-primary opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white/70 py-8 px-6">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <p>© {new Date().getFullYear()} sparshtea.in — All Rights Reserved.</p>
          <p>
            Developed by{" "}
            <a href="https://pacewalk.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline underline-offset-4">
              PACEWALK
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
