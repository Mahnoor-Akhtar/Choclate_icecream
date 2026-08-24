import { jsxs, jsx } from "react/jsx-runtime";
import { N as Navbar, F as Footer } from "./Footer-BtVx7xbU.js";
import { P as ProductCard } from "./ProductCard-BLOSq4mQ.js";
import { p as products } from "./router-cFbiadrS.js";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Award, Leaf, Truck } from "lucide-react";
import "react";
function Home() {
  const featured = products.slice(0, 8);
  return /* @__PURE__ */ jsxs("div", { className: "bg-background", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("section", { className: "relative h-screen w-full overflow-hidden", children: [
      /* @__PURE__ */ jsx("video", { autoPlay: true, loop: true, muted: true, playsInline: true, poster: "", className: "absolute inset-0 h-full w-full object-cover", src: "/videos/hero.mp4" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex h-full flex-col justify-center px-6 md:px-16 max-w-4xl", children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex w-fit items-center gap-2 rounded-full glass-dark px-4 py-2 text-xs uppercase tracking-[0.3em] text-gold", children: [
          /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-gold animate-pulse" }),
          " Est. 2014 · Single Origin"
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "mt-6 font-display text-5xl md:text-7xl lg:text-8xl text-cream leading-[0.95]", children: [
          "Pure chocolate,",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-gradient-gold italic", children: "slowly churned." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-xl text-lg text-cream/85", children: "Thirty chocolate ice cream creations made from rare single-origin cacao, hand-finished by our chocolatiers and delivered cold to your door." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-wrap gap-4", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/shop", className: "group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-[oklch(0.2_0.04_50)] transition-all hover:bg-[oklch(0.85_0.14_75)]", children: [
            "Explore the Atelier",
            /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })
          ] }),
          /* @__PURE__ */ jsx(Link, { to: "/about", className: "inline-flex items-center gap-2 rounded-full border border-cream/30 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-cream hover:bg-cream/10", children: "Our Story" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-cream/60", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.3em]", children: "Scroll" }),
        /* @__PURE__ */ jsx("div", { className: "h-10 w-px bg-gradient-to-b from-cream/60 to-transparent" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "border-y border-border bg-[oklch(0.14_0.03_45)] py-8 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8 px-6 text-center", children: [{
      icon: Award,
      label: "Award-winning cacao"
    }, {
      icon: Leaf,
      label: "Sustainably sourced"
    }, {
      icon: Truck,
      label: "Cold-chain delivery"
    }, {
      icon: Award,
      label: "30+ chocolate creations"
    }].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 text-cream/80", children: [
      /* @__PURE__ */ jsx(item.icon, { className: "h-5 w-5 text-gold" }),
      /* @__PURE__ */ jsx("span", { className: "text-sm", children: item.label })
    ] }, i)) }) }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-6 py-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between mb-12 gap-6 flex-wrap", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-gold", children: "Just out of the churn" }),
          /* @__PURE__ */ jsx("h2", { className: "mt-3 font-display text-4xl md:text-5xl text-cream", children: "Today's favourites" })
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "/shop", className: "text-sm uppercase tracking-wider text-gold hover:underline underline-offset-4", children: "View all 30 →" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: featured.map((p) => /* @__PURE__ */ jsx(ProductCard, { product: p }, p.id)) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-gradient-cocoa py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl px-6 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-gold", children: "Maison philosophy" }),
      /* @__PURE__ */ jsxs("blockquote", { className: "mt-6 font-display text-3xl md:text-5xl text-cream leading-tight italic", children: [
        '"Real chocolate ice cream is a slow conversation between',
        /* @__PURE__ */ jsx("span", { className: "text-gradient-gold", children: " cacao, cream, and patience." }),
        '"'
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 text-sm uppercase tracking-[0.2em] text-muted-foreground", children: "— Émile Marchand, Head Chocolatier" })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  Home as component
};
