import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { N as Navbar, F as Footer } from "./Footer-BtVx7xbU.js";
import { P as ProductCard } from "./ProductCard-BLOSq4mQ.js";
import { R as Route, u as useCart, p as products } from "./router-cFbiadrS.js";
import { useState } from "react";
import { ChevronLeft, Minus, Plus, Check, ShoppingBag } from "lucide-react";
function ProductPage() {
  const {
    product
  } = Route.useLoaderData();
  const cart = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const handleAdd = () => {
    cart.add(product, qty);
    setAdded(true);
    cart.open();
    setTimeout(() => setAdded(false), 1800);
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("section", { className: "pt-32 pb-16 px-6", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/shop", className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-gold", children: [
        /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }),
        " Back to shop"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "relative aspect-square overflow-hidden rounded-3xl bg-card shadow-cocoa", children: [
            /* @__PURE__ */ jsx("img", { src: product.gallery[activeImage], alt: product.name, className: "h-full w-full object-cover transition-opacity duration-500" }),
            product.badge && /* @__PURE__ */ jsx("span", { className: "absolute top-4 left-4 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[oklch(0.2_0.04_50)]", children: product.badge })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 grid grid-cols-3 gap-4", children: product.gallery.map((img, i) => /* @__PURE__ */ jsx("button", { onClick: () => setActiveImage(i), className: `relative aspect-square overflow-hidden rounded-2xl border-2 transition-all ${activeImage === i ? "border-gold" : "border-border opacity-70 hover:opacity-100"}`, "aria-label": `View image ${i + 1}`, children: /* @__PURE__ */ jsx("img", { src: img, alt: "", className: "h-full w-full object-cover" }) }, i)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "lg:pt-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-gold", children: product.category }),
          /* @__PURE__ */ jsx("h1", { className: "mt-3 font-display text-4xl md:text-5xl text-cream leading-tight", children: product.name }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center gap-4", children: [
            /* @__PURE__ */ jsxs("span", { className: "font-display text-4xl text-gradient-gold", children: [
              "$",
              product.price
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "/ serving" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-6 text-base text-cream/80 leading-relaxed", children: product.description }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground leading-relaxed", children: "Slow-churned in small batches with single-origin cacao. Each creation is finished by hand at our atelier and shipped cold to your doorstep within 48 hours." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 space-y-2", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xs uppercase tracking-[0.3em] text-gold", children: "Ingredients" }),
            /* @__PURE__ */ jsx("ul", { className: "flex flex-wrap gap-2", children: product.ingredients.map((ing) => /* @__PURE__ */ jsx("li", { className: "rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-cream/80", children: ing }, ing)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-10 flex items-center gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 rounded-full border border-border bg-secondary/40", children: [
              /* @__PURE__ */ jsx("button", { onClick: () => setQty((q) => Math.max(1, q - 1)), className: "flex h-12 w-12 items-center justify-center rounded-full text-cream hover:bg-cream/10", "aria-label": "Decrease quantity", children: /* @__PURE__ */ jsx(Minus, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsx("span", { className: "w-10 text-center font-display text-xl text-cream tabular-nums", children: qty }),
              /* @__PURE__ */ jsx("button", { onClick: () => setQty((q) => q + 1), className: "flex h-12 w-12 items-center justify-center rounded-full text-cream hover:bg-cream/10", "aria-label": "Increase quantity", children: /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }) })
            ] }),
            /* @__PURE__ */ jsx("button", { onClick: handleAdd, className: "flex flex-1 items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-sm font-bold uppercase tracking-wider text-[oklch(0.2_0.04_50)] hover:bg-[oklch(0.85_0.14_75)] transition-colors", children: added ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }),
              " Added"
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(ShoppingBag, { className: "h-4 w-4" }),
              " Add to cart · $",
              (product.price * qty).toFixed(2)
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 grid grid-cols-3 gap-4 text-center text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border p-3", children: [
              /* @__PURE__ */ jsx("div", { className: "font-display text-base text-cream", children: "48h" }),
              "Cold delivery"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border p-3", children: [
              /* @__PURE__ */ jsx("div", { className: "font-display text-base text-cream", children: "100%" }),
              "Single origin"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border p-3", children: [
              /* @__PURE__ */ jsx("div", { className: "font-display text-base text-cream", children: "Hand" }),
              "Finished"
            ] })
          ] })
        ] })
      ] }),
      related.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-24", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-gold", children: "Pairs well with" }),
        /* @__PURE__ */ jsxs("h2", { className: "mt-3 font-display text-3xl md:text-4xl text-cream", children: [
          "More from the ",
          product.category,
          " collection"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: related.map((p) => /* @__PURE__ */ jsx(ProductCard, { product: p }, p.id)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  ProductPage as component
};
