import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { getProductBySlug, products } from "@/data/products";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import { Plus, Minus, ChevronLeft, ShoppingBag, Check } from "lucide-react";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product — Sweet Scoop Showcase" }] };
    }
    const { product } = loaderData;
    const url = `https://cacao-co.lovable.app/products/${product.slug}`;
    const ogImage = `https://cacao-co.lovable.app${product.image}`;
    return {
      meta: [
        { title: `${product.name} — Cacao & Co.` },
        { name: "description", content: product.description },
        { property: "og:title", content: `${product.name} — Cacao & Co.` },
        { property: "og:description", content: product.description },
        { property: "og:type", content: "product" },
        { property: "og:image", content: ogImage },
        { property: "og:url", content: url },
        { property: "product:price:amount", content: String(product.price) },
        { property: "product:price:currency", content: "USD" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: product.name },
        { name: "twitter:description", content: product.description },
        { name: "twitter:image", content: ogImage },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: ogImage,
            sku: `CACAO-${product.id}`,
            category: product.category,
            brand: { "@type": "Brand", name: "Cacao & Co." },
            offers: {
              "@type": "Offer",
              url,
              priceCurrency: "USD",
              price: product.price,
              availability: "https://schema.org/InStock",
            },
          }),
        },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="bg-background min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 pt-40 pb-24 text-center">
        <h1 className="font-display text-5xl text-cream">Flavour not found</h1>
        <p className="mt-4 text-muted-foreground">
          The creation you're looking for has melted away.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold uppercase tracking-wider text-[oklch(0.2_0.04_50)]"
        >
          Back to shop
        </Link>
      </div>
      <Footer />
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="bg-background min-h-screen flex items-center justify-center p-6">
      <p className="text-cream">Something went wrong: {error.message}</p>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const cart = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAdd = () => {
    cart.add(product, qty);
    setAdded(true);
    cart.open();
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <section className="pt-32 pb-16 px-6">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-gold"
          >
            <ChevronLeft className="h-4 w-4" /> Back to shop
          </Link>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Gallery */}
            <div>
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-card shadow-cocoa">
                <img
                  src={product.gallery[activeImage]}
                  alt={product.name}
                  className="h-full w-full object-cover transition-opacity duration-500"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[oklch(0.2_0.04_50)]">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                {product.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative aspect-square overflow-hidden rounded-2xl border-2 transition-all ${
                      activeImage === i ? "border-gold" : "border-border opacity-70 hover:opacity-100"
                    }`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="lg:pt-4">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">{product.category}</p>
              <h1 className="mt-3 font-display text-4xl md:text-5xl text-cream leading-tight">
                {product.name}
              </h1>
              <div className="mt-4 flex items-center gap-4">
                <span className="font-display text-4xl text-gradient-gold">${product.price}</span>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  / serving
                </span>
              </div>

              <p className="mt-6 text-base text-cream/80 leading-relaxed">{product.description}</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Slow-churned in small batches with single-origin cacao. Each creation is finished by
                hand at our atelier and shipped cold to your doorstep within 48 hours.
              </p>

              <div className="mt-8 space-y-2">
                <h2 className="text-xs uppercase tracking-[0.3em] text-gold">Ingredients</h2>
                <ul className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing) => (
                    <li
                      key={ing}
                      className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-cream/80"
                    >
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 flex items-center gap-4">
                <div className="flex items-center gap-1 rounded-full border border-border bg-secondary/40">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex h-12 w-12 items-center justify-center rounded-full text-cream hover:bg-cream/10"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center font-display text-xl text-cream tabular-nums">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="flex h-12 w-12 items-center justify-center rounded-full text-cream hover:bg-cream/10"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={handleAdd}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-sm font-bold uppercase tracking-wider text-[oklch(0.2_0.04_50)] hover:bg-[oklch(0.85_0.14_75)] transition-colors"
                >
                  {added ? (
                    <>
                      <Check className="h-4 w-4" /> Added
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" /> Add to cart · ${(product.price * qty).toFixed(2)}
                    </>
                  )}
                </button>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 text-center text-xs text-muted-foreground">
                <div className="rounded-xl border border-border p-3">
                  <div className="font-display text-base text-cream">48h</div>
                  Cold delivery
                </div>
                <div className="rounded-xl border border-border p-3">
                  <div className="font-display text-base text-cream">100%</div>
                  Single origin
                </div>
                <div className="rounded-xl border border-border p-3">
                  <div className="font-display text-base text-cream">Hand</div>
                  Finished
                </div>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-24">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Pairs well with</p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl text-cream">
                More from the {product.category} collection
              </h2>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
