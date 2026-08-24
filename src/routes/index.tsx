import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Award, Leaf, Truck } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sweet Scoop Showcase — Slow-Churned Chocolate Ice Cream" },
      {
        name: "description",
        content:
          "Single-origin chocolate ice cream, hand-crafted bars, sundaes and cones. 30+ chocolate flavours delivered cold.",
      },
      { property: "og:title", content: "Cacao & Co. — Chocolate Ice Cream Atelier" },
      {
        property: "og:description",
        content: "30+ chocolate ice cream creations, slow-churned with single-origin cacao.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://cacao-co.lovable.app/og-default.jpg" },
      { property: "og:url", content: "https://cacao-co.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Cacao & Co. — Chocolate Ice Cream Atelier" },
      { name: "twitter:image", content: "https://cacao-co.lovable.app/og-default.jpg" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Store",
          name: "Cacao & Co.",
          image: "https://cacao-co.lovable.app/og-default.jpg",
          description:
            "Single-origin chocolate ice cream, hand-crafted bars, sundaes and cones.",
          url: "https://cacao-co.lovable.app/",
          priceRange: "$$",
          servesCuisine: "Chocolate Ice Cream",
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.slice(0, 8);

  return (
    <div className="bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster=""
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/hero.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

        <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-16 max-w-4xl">
          <span className="inline-flex w-fit items-center gap-2 rounded-full glass-dark px-4 py-2 text-xs uppercase tracking-[0.3em] text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" /> Est. 2014 · Single Origin
          </span>
          <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl text-cream leading-[0.95]">
            Pure chocolate,
            <br />
            <span className="text-gradient-gold italic">slowly churned.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-cream/85">
            Thirty chocolate ice cream creations made from rare single-origin cacao,
            hand-finished by our chocolatiers and delivered cold to your door.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-[oklch(0.2_0.04_50)] transition-all hover:bg-[oklch(0.85_0.14_75)]"
            >
              Explore the Atelier
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-cream hover:bg-cream/10"
            >
              Our Story
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-cream/60">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-cream/60 to-transparent" />
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <section className="border-y border-border bg-[oklch(0.14_0.03_45)] py-8 overflow-hidden">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8 px-6 text-center">
          {[
            { icon: Award, label: "Award-winning cacao" },
            { icon: Leaf, label: "Sustainably sourced" },
            { icon: Truck, label: "Cold-chain delivery" },
            { icon: Award, label: "30+ chocolate creations" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-center gap-3 text-cream/80">
              <item.icon className="h-5 w-5 text-gold" />
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Just out of the churn</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl text-cream">Today's favourites</h2>
          </div>
          <Link
            to="/shop"
            className="text-sm uppercase tracking-wider text-gold hover:underline underline-offset-4"
          >
            View all 30 →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* QUOTE BAND */}
      <section className="bg-gradient-cocoa py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Maison philosophy</p>
          <blockquote className="mt-6 font-display text-3xl md:text-5xl text-cream leading-tight italic">
            "Real chocolate ice cream is a slow conversation between
            <span className="text-gradient-gold"> cacao, cream, and patience.</span>"
          </blockquote>
          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-muted-foreground">
            — Émile Marchand, Head Chocolatier
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
