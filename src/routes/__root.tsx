import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

function NotFoundComponent() {
  const suggestions = [
    { label: "Shop Our Teas", href: "/shop" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Sitemap", href: "/sitemap" },
  ];
  return (
    <div className="bg-background text-foreground">
      <SiteHeader />
      <div className="relative flex min-h-[82vh] items-center justify-center overflow-hidden bg-forest text-forest-foreground leaf-bg px-6 py-20">
      {/* Soft glow accents */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-xl text-center">
        {/* 404 with a tea cup as the 0 */}
        <div className="mb-6 flex items-center justify-center gap-3 md:gap-5">
          <span className="font-heading text-8xl md:text-9xl leading-none text-white">4</span>
          <span className="relative grid h-24 w-24 md:h-32 md:w-32 place-items-center animate-float">
            <svg viewBox="0 0 64 64" className="h-full w-full" fill="none" aria-hidden="true">
              <path d="M12 26h34v12a14 14 0 0 1-14 14H26a14 14 0 0 1-14-14V26z" fill="#ffffff" fillOpacity="0.12" stroke="currentColor" strokeWidth="2.5" className="text-primary" />
              <path d="M46 30h5a6 6 0 0 1 0 12h-5" stroke="currentColor" strokeWidth="2.5" className="text-primary" />
              <path d="M22 8c-2 3 0 5 0 8M32 6c-2 3 0 5 0 8M42 8c-2 3 0 5 0 8" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </span>
          <span className="font-heading text-8xl md:text-9xl leading-none text-white">4</span>
        </div>

        <p className="eyebrow text-primary mb-3">oops — page not found</p>
        <h1 className="font-heading text-4xl md:text-5xl text-white mb-4 leading-tight">
          This cup seems to be <em className="not-italic">empty</em>
        </h1>
        <p className="text-forest-foreground/80 text-lg mb-8 max-w-md mx-auto leading-relaxed">
          The page you're looking for has steeped away or never existed. Let's get you back to something warm.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-xs font-medium uppercase tracking-widest text-primary-foreground transition hover:bg-white hover:text-dark"
          >
            Back to Home
          </Link>
          <a
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-3.5 text-xs font-medium uppercase tracking-widest text-white transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            Shop Our Teas
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <span className="text-forest-foreground/60">Popular pages:</span>
          {suggestions.map((s) => (
            <a key={s.label} href={s.href} className="text-forest-foreground/90 underline-offset-4 hover:text-primary hover:underline transition">
              {s.label}
            </a>
          ))}
        </div>
      </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sparsh Tea — Brewing Excellence, One Cup at a Time" },
      { name: "description", content: "Sparsh Tea: premium Indian tea blends including Nagni Strong, No.1 Normal, and Masala Chai. Crafted from handpicked leaves." },
      { property: "og:title", content: "Sparsh Tea — Brewing Excellence, One Cup at a Time" },
      { property: "og:description", content: "Premium Indian tea blends: Nagni Strong, No.1 Normal, and Masala Chai." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Jost:wght@300;400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
