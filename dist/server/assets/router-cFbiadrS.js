import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useNavigate, Link, createRootRoute, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, notFound, createRouter, useRouter } from "@tanstack/react-router";
import { useState, useEffect, useMemo, createContext, useContext } from "react";
import { X, ShoppingBag, Trash2, Minus, Plus } from "lucide-react";
const CartContext = createContext(null);
const STORAGE_KEY = "cacao-cart-v1";
function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
    }
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
    }
  }, [items, hydrated]);
  const value = useMemo(() => {
    const count = items.reduce((s, i) => s + i.quantity, 0);
    const subtotal = items.reduce((s, i) => s + i.quantity * i.price, 0);
    return {
      items,
      isOpen,
      count,
      subtotal,
      add: (product, quantity = 1) => setItems((prev) => {
        const found = prev.find((i) => i.id === product.id);
        if (found) {
          return prev.map(
            (i) => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
          );
        }
        return [
          ...prev,
          {
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity
          }
        ];
      }),
      remove: (id) => setItems((prev) => prev.filter((i) => i.id !== id)),
      setQuantity: (id, quantity) => setItems(
        (prev) => quantity <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => i.id === id ? { ...i, quantity } : i)
      ),
      clear: () => setItems([]),
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((o) => !o)
    };
  }, [items, isOpen]);
  return /* @__PURE__ */ jsx(CartContext.Provider, { value, children });
}
function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
function CartDrawer() {
  const { isOpen, close, items, remove, setQuantity, subtotal, clear } = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        onClick: close,
        className: `fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`,
        "aria-hidden": !isOpen
      }
    ),
    /* @__PURE__ */ jsxs(
      "aside",
      {
        className: `fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-card text-foreground shadow-cocoa transition-transform duration-500 ease-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Shopping cart",
        children: [
          /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between border-b border-border px-6 py-5", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-gold", children: "Your selection" }),
              /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl text-cream", children: "Cart" })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: close,
                className: "rounded-full p-2 text-cream hover:bg-cream/10 transition-colors",
                "aria-label": "Close cart",
                children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto px-6 py-4", children: items.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex h-full flex-col items-center justify-center text-center gap-4 py-16", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-20 w-20 items-center justify-center rounded-full bg-secondary", children: /* @__PURE__ */ jsx(ShoppingBag, { className: "h-8 w-8 text-gold" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-display text-xl text-cream", children: "Your cart is empty" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Add a creation from the atelier." })
            ] }),
            /* @__PURE__ */ jsx(
              Link,
              {
                to: "/shop",
                onClick: close,
                className: "mt-2 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-[oklch(0.2_0.04_50)] hover:bg-[oklch(0.85_0.14_75)] transition-colors",
                children: "Browse the shop"
              }
            )
          ] }) : /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: items.map((item) => /* @__PURE__ */ jsxs(
            "li",
            {
              className: "flex gap-4 rounded-2xl border border-border bg-secondary/40 p-3",
              children: [
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: "/products/$slug",
                    params: { slug: item.slug },
                    onClick: close,
                    className: "shrink-0",
                    children: /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: item.image,
                        alt: item.name,
                        className: "h-20 w-20 rounded-xl object-cover"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                    /* @__PURE__ */ jsx(
                      Link,
                      {
                        to: "/products/$slug",
                        params: { slug: item.slug },
                        onClick: close,
                        className: "font-display text-base text-cream leading-snug hover:text-gold",
                        children: item.name
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => remove(item.id),
                        className: "text-muted-foreground hover:text-destructive transition-colors",
                        "aria-label": `Remove ${item.name}`,
                        children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-auto flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-full border border-border bg-background", children: [
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => setQuantity(item.id, item.quantity - 1),
                          className: "flex h-8 w-8 items-center justify-center rounded-full text-cream hover:bg-cream/10",
                          "aria-label": "Decrease quantity",
                          children: /* @__PURE__ */ jsx(Minus, { className: "h-3.5 w-3.5" })
                        }
                      ),
                      /* @__PURE__ */ jsx("span", { className: "w-6 text-center text-sm tabular-nums text-cream", children: item.quantity }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => setQuantity(item.id, item.quantity + 1),
                          className: "flex h-8 w-8 items-center justify-center rounded-full text-cream hover:bg-cream/10",
                          "aria-label": "Increase quantity",
                          children: /* @__PURE__ */ jsx(Plus, { className: "h-3.5 w-3.5" })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("span", { className: "font-display text-lg text-gradient-gold tabular-nums", children: [
                      "$",
                      (item.price * item.quantity).toFixed(2)
                    ] })
                  ] })
                ] })
              ]
            },
            item.id
          )) }) }),
          items.length > 0 && /* @__PURE__ */ jsxs("footer", { className: "border-t border-border bg-background/40 px-6 py-5 space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsx("span", { children: "Subtotal" }),
              /* @__PURE__ */ jsxs("span", { className: "font-display text-2xl text-gradient-gold tabular-nums", children: [
                "$",
                subtotal.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Shipping and taxes calculated at checkout." }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  close();
                  navigate({ to: "/checkout" });
                },
                className: "w-full rounded-full bg-gold py-3.5 text-sm font-bold uppercase tracking-wider text-[oklch(0.2_0.04_50)] hover:bg-[oklch(0.85_0.14_75)] transition-colors",
                children: "Proceed to checkout"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: clear,
                className: "w-full text-xs uppercase tracking-wider text-muted-foreground hover:text-cream transition-colors",
                children: "Clear cart"
              }
            )
          ] })
        ]
      }
    )
  ] });
}
const appCss = "/assets/styles-Df2pwgAe.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
const organizationJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cacao & Co.",
  description: "Slow-churned single-origin chocolate ice cream atelier.",
  url: "https://cacao-co.lovable.app",
  logo: "https://cacao-co.lovable.app/og-default.jpg",
  sameAs: []
});
const Route$6 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sweet Scoop Showcase — Slow-Churned Chocolate Ice Cream" },
      {
        name: "description",
        content: "Single-origin chocolate ice cream, hand-crafted bars, sundaes and cones. 30+ chocolate flavours delivered cold."
      },
      { name: "author", content: "Cacao & Co." },
      { name: "theme-color", content: "#2a1a14" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Cacao & Co." },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "canonical", href: "https://cacao-co.lovable.app/" },
      { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" }
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: organizationJsonLd
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  return /* @__PURE__ */ jsxs(CartProvider, { children: [
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(CartDrawer, {})
  ] });
}
const $$splitComponentImporter$5 = () => import("./shop-BXMVbZKr.js");
const Route$5 = createFileRoute("/shop")({
  head: () => ({
    meta: [{
      title: "Shop — 30 Chocolate Ice Creams · Sweet Scoop Showcase"
    }, {
      name: "description",
      content: "Browse 30 chocolate ice cream creations: scoops, bars, cones, sundaes and sandwiches. Search and sort by name, price or popularity."
    }, {
      property: "og:title",
      content: "Shop Chocolate Ice Cream — Cacao & Co."
    }, {
      property: "og:description",
      content: "Thirty single-origin chocolate ice cream creations, ready to ship cold."
    }, {
      property: "og:type",
      content: "website"
    }, {
      property: "og:image",
      content: "https://cacao-co.lovable.app/og-shop.jpg"
    }, {
      name: "twitter:card",
      content: "summary_large_image"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./contact-D_JUGuvM.js");
const Route$4 = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact — Sweet Scoop Showcase"
    }, {
      name: "description",
      content: "Get in touch with our chocolate ice cream atelier."
    }, {
      property: "og:title",
      content: "Contact — Cacao & Co."
    }, {
      property: "og:description",
      content: "Visit, call, or write to our chocolate atelier."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./checkout-CHq9iNMy.js");
const Route$3 = createFileRoute("/checkout")({
  head: () => ({
    meta: [{
      title: "Checkout — Sweet Scoop Showcase"
    }, {
      name: "description",
      content: "Review your order and complete checkout."
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./about-EnXWeonh.js");
const Route$2 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "Our Story — Sweet Scoop Showcase"
    }, {
      name: "description",
      content: "How a small chocolatier became a chocolate ice cream atelier crafting single-origin creations."
    }, {
      property: "og:title",
      content: "Our Story — Cacao & Co."
    }, {
      property: "og:description",
      content: "From a single bean to thirty creations: the story of Cacao & Co."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-BB2kDYMr.js");
const Route$1 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Sweet Scoop Showcase — Slow-Churned Chocolate Ice Cream"
    }, {
      name: "description",
      content: "Single-origin chocolate ice cream, hand-crafted bars, sundaes and cones. 30+ chocolate flavours delivered cold."
    }, {
      property: "og:title",
      content: "Cacao & Co. — Chocolate Ice Cream Atelier"
    }, {
      property: "og:description",
      content: "30+ chocolate ice cream creations, slow-churned with single-origin cacao."
    }, {
      property: "og:type",
      content: "website"
    }, {
      property: "og:image",
      content: "https://cacao-co.lovable.app/og-default.jpg"
    }, {
      property: "og:url",
      content: "https://cacao-co.lovable.app/"
    }, {
      name: "twitter:card",
      content: "summary_large_image"
    }, {
      name: "twitter:title",
      content: "Cacao & Co. — Chocolate Ice Cream Atelier"
    }, {
      name: "twitter:image",
      content: "https://cacao-co.lovable.app/og-default.jpg"
    }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Store",
        name: "Cacao & Co.",
        image: "https://cacao-co.lovable.app/og-default.jpg",
        description: "Single-origin chocolate ice cream, hand-crafted bars, sundaes and cones.",
        url: "https://cacao-co.lovable.app/",
        priceRange: "$$",
        servesCuisine: "Chocolate Ice Cream"
      })
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const ic1 = "/assets/ic-1-D7aVkfd_.jpg";
const ic2 = "/assets/ic-2-BKAP-fbd.jpg";
const ic3 = "/assets/ic-3-DuY-LyJv.jpg";
const ic4 = "/assets/ic-4-DuOGEpT-.jpg";
const ic5 = "/assets/ic-5-DS0Vy7-m.jpg";
const ic6 = "/assets/ic-6-CS5CA3NV.jpg";
const images = [ic1, ic2, ic3, ic4, ic5, ic6];
const names = [
  ["Dark Velvet Scoop", "Scoops", "Single-origin 70% cacao churned slow."],
  ["Belgian Bar", "Bars", "Hand-dipped Belgian dark, cracking shell."],
  ["Hazelnut Crown Cone", "Cones", "Triple swirl with toasted hazelnuts."],
  ["Brownie Storm Sundae", "Sundaes", "Fudge layers and warm brownie chunks."],
  ["Mint Cocoa Bowl", "Scoops", "Garden mint folded with cacao nibs."],
  ["Cookie Drip Sandwich", "Sandwiches", "Soft cookie, molten chocolate drip."],
  ["Midnight Truffle", "Scoops", "Bittersweet ganache truffle scoops."],
  ["Salted Cocoa Bar", "Bars", "Sea salt flakes on pure cocoa shell."],
  ["Praline Tower Cone", "Cones", "Caramelized praline crunch in every bite."],
  ["Lava Fudge Sundae", "Sundaes", "Hot fudge core, whipped cream peak."],
  ["Espresso Mocha Scoop", "Scoops", "Cold brew espresso meets dark cocoa."],
  ["Almond Bark", "Bars", "Roasted almonds, milk chocolate snap."],
  ["Double Choc Cone", "Cones", "Chocolate cone, chocolate cream, chocolate chips."],
  ["Cocoa Swirl Sandwich", "Sandwiches", "Marbled cocoa cookies, fudge filling."],
  ["Hazelnut Gianduja", "Scoops", "Italian gianduja, silk on the spoon."],
  ["Caramel Crackle Bar", "Bars", "Caramel center, dark chocolate crackle."],
  ["Wafer Crunch Cone", "Cones", "Crisp wafer cone, chocolate ribbons."],
  ["Banoffee Choc Sundae", "Sundaes", "Banana, toffee, dark chocolate cascade."],
  ["Triple Cocoa Scoop", "Scoops", "Three roasts of cacao in one scoop."],
  ["Peanut Crunch Bar", "Bars", "Peanut brittle, deep cocoa coat."],
  ["Rocky Road Cone", "Cones", "Marshmallow, almonds, dark chocolate."],
  ["Chocolate Chip Sandwich", "Sandwiches", "Classic chip cookie, cocoa cream."],
  ["Cherry Cocoa Scoop", "Scoops", "Sour cherry ribbons in dark cocoa."],
  ["Orange Zest Bar", "Bars", "Bright orange peel, dark Belgian shell."],
  ["Tiramisu Cone", "Cones", "Mascarpone, espresso, cocoa dust."],
  ["Hot Fudge Brownie Sundae", "Sundaes", "Brownie base, fudge avalanche."],
  ["Cocoa Nib Scoop", "Scoops", "Raw cacao nibs for serious chocolate lovers."],
  ["Coconut Choc Bar", "Bars", "Toasted coconut, dark chocolate snap."],
  ["Rolled Wafer Cone", "Cones", "Hand-rolled wafer, chocolate fountain."],
  ["Salted Caramel Sundae", "Sundaes", "Sea salt caramel, dark chocolate sauce."]
];
const baseIngredients = {
  Scoops: ["Single-origin cacao 70%", "Fresh cream", "Whole milk", "Cane sugar", "Egg yolks", "Madagascar vanilla"],
  Bars: ["Belgian dark chocolate 72%", "Cocoa butter", "Fresh cream", "Cane sugar", "Sea salt", "Sunflower lecithin"],
  Cones: ["Wheat flour", "Cocoa powder", "Cane sugar", "Butter", "Single-origin chocolate", "Fresh cream"],
  Sundaes: ["Chocolate ice cream", "Hot fudge sauce", "Whipped cream", "Brownie pieces", "Cocoa nibs", "Sea salt"],
  Sandwiches: ["Cocoa cookies", "Chocolate ice cream", "Dark chocolate drizzle", "Butter", "Cane sugar", "Vanilla"]
};
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const products = names.map(([name, category, description], i) => {
  const cat = category;
  const img = images[i % images.length];
  const gallery = [img, images[(i + 1) % images.length], images[(i + 2) % images.length]];
  return {
    id: i + 1,
    slug: slugify(name),
    name,
    category: cat,
    description,
    price: Number((4.5 + i % 7 * 0.6).toFixed(2)),
    image: img,
    gallery,
    badge: i === 0 ? "Bestseller" : i === 6 ? "New" : i === 18 ? "Chef's Pick" : void 0,
    ingredients: baseIngredients[cat],
    // Pseudo-deterministic popularity score
    popularity: (i * 37 + 13) % 100 + 1
  };
});
const categories = [
  "All",
  "Scoops",
  "Bars",
  "Cones",
  "Sundaes",
  "Sandwiches"
];
const getProductBySlug = (slug) => products.find((p) => p.slug === slug);
const $$splitErrorComponentImporter = () => import("./products._slug-BvVjWHzJ.js");
const $$splitNotFoundComponentImporter = () => import("./products._slug-CYbun8AN.js");
const $$splitComponentImporter = () => import("./products._slug-LYVFgJIJ.js");
const Route = createFileRoute("/products/$slug")({
  loader: ({
    params
  }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return {
      product
    };
  },
  head: ({
    loaderData
  }) => {
    if (!loaderData) {
      return {
        meta: [{
          title: "Product — Sweet Scoop Showcase"
        }]
      };
    }
    const {
      product
    } = loaderData;
    const url = `https://cacao-co.lovable.app/products/${product.slug}`;
    const ogImage = `https://cacao-co.lovable.app${product.image}`;
    return {
      meta: [{
        title: `${product.name} — Cacao & Co.`
      }, {
        name: "description",
        content: product.description
      }, {
        property: "og:title",
        content: `${product.name} — Cacao & Co.`
      }, {
        property: "og:description",
        content: product.description
      }, {
        property: "og:type",
        content: "product"
      }, {
        property: "og:image",
        content: ogImage
      }, {
        property: "og:url",
        content: url
      }, {
        property: "product:price:amount",
        content: String(product.price)
      }, {
        property: "product:price:currency",
        content: "USD"
      }, {
        name: "twitter:card",
        content: "summary_large_image"
      }, {
        name: "twitter:title",
        content: product.name
      }, {
        name: "twitter:description",
        content: product.description
      }, {
        name: "twitter:image",
        content: ogImage
      }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description,
          image: ogImage,
          sku: `CACAO-${product.id}`,
          category: product.category,
          brand: {
            "@type": "Brand",
            name: "Cacao & Co."
          },
          offers: {
            "@type": "Offer",
            url,
            priceCurrency: "USD",
            price: product.price,
            availability: "https://schema.org/InStock"
          }
        })
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
const ShopRoute = Route$5.update({
  id: "/shop",
  path: "/shop",
  getParentRoute: () => Route$6
});
const ContactRoute = Route$4.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$6
});
const CheckoutRoute = Route$3.update({
  id: "/checkout",
  path: "/checkout",
  getParentRoute: () => Route$6
});
const AboutRoute = Route$2.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$6
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$6
});
const ProductsSlugRoute = Route.update({
  id: "/products/$slug",
  path: "/products/$slug",
  getParentRoute: () => Route$6
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  CheckoutRoute,
  ContactRoute,
  ShopRoute,
  ProductsSlugRoute
};
const routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
  const router2 = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "An unexpected error occurred. Please try again." }),
    false,
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route as R,
  ic3 as a,
  categories as c,
  ic1 as i,
  products as p,
  router as r,
  useCart as u
};
