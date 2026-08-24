import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products, categories, type Product } from "@/data/products";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortKey = "popularity" | "name" | "price-asc" | "price-desc";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — 30 Chocolate Ice Creams · Sweet Scoop Showcase" },
      {
        name: "description",
        content:
          "Browse 30 chocolate ice cream creations: scoops, bars, cones, sundaes and sandwiches. Search and sort by name, price or popularity.",
      },
      { property: "og:title", content: "Shop Chocolate Ice Cream — Cacao & Co." },
      {
        property: "og:description",
        content: "Thirty single-origin chocolate ice cream creations, ready to ship cold.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://cacao-co.lovable.app/og-shop.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("popularity");

  const list = useMemo<Product[]>(() => {
    const q = query.trim().toLowerCase();
    let result = active === "All" ? [...products] : products.filter((p) => p.category === active);
    if (q) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }
    switch (sort) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "popularity":
      default:
        result.sort((a, b) => b.popularity - a.popularity);
    }
    return result;
  }, [active, query, sort]);

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <section className="pt-36 pb-12 px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">The Collection</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl text-cream">
            Thirty shades of <span className="text-gradient-gold italic">chocolate</span>
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            From velvety scoops to molten sundaes — every creation begins with single-origin cacao
            and ends in your bowl.
          </p>

          {/* Search + Sort row */}
          <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search flavours, ingredients…"
                className="w-full rounded-full border border-border bg-secondary/40 py-3 pl-11 pr-10 text-sm text-cream placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 transition-colors"
                aria-label="Search products"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-cream"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Sort
              </span>
              <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
                <SelectTrigger className="w-[200px] rounded-full border-border bg-secondary/40 text-cream">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Most popular</SelectItem>
                  <SelectItem value="name">Name (A–Z)</SelectItem>
                  <SelectItem value="price-asc">Price: low to high</SelectItem>
                  <SelectItem value="price-desc">Price: high to low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-6 flex flex-wrap gap-3">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full px-5 py-2 text-sm transition-all ${
                  active === c
                    ? "bg-gold text-[oklch(0.2_0.04_50)] font-semibold"
                    : "border border-border text-cream/80 hover:border-gold hover:text-gold"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {list.length} {list.length === 1 ? "creation" : "creations"}
            {query && ` matching "${query}"`}
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          {list.length === 0 ? (
            <div className="rounded-3xl border border-border bg-card/40 p-16 text-center">
              <h3 className="font-display text-2xl text-cream">No creations match your search</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Try a different flavour or clear the filters.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setActive("All");
                  setSort("popularity");
                }}
                className="mt-6 rounded-full bg-gold px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-[oklch(0.2_0.04_50)]"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
