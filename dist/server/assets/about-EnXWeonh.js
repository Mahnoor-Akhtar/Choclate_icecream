import { jsxs, jsx } from "react/jsx-runtime";
import { N as Navbar, F as Footer } from "./Footer-BtVx7xbU.js";
import { i as ic1, a as ic3 } from "./router-cFbiadrS.js";
import "@tanstack/react-router";
import "lucide-react";
import "react";
function About() {
  return /* @__PURE__ */ jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("section", { className: "pt-36 pb-20 px-6", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-gold", children: "Our Story" }),
      /* @__PURE__ */ jsxs("h1", { className: "mt-3 font-display text-5xl md:text-7xl text-cream leading-[0.95]", children: [
        "One bean.",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "text-gradient-gold italic", children: "A whole obsession." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-5xl px-6 grid md:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsx("img", { src: ic1, alt: "Chocolate scoop", className: "rounded-2xl shadow-cocoa" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-muted-foreground", children: [
        /* @__PURE__ */ jsx("p", { children: "Cacao & Co. began in 2014 in a small atelier with a copper churn, a sack of single-origin Madagascan beans, and a stubborn idea: chocolate ice cream should taste of chocolate first, sugar second." }),
        /* @__PURE__ */ jsx("p", { children: "A decade later we still roast our cacao in tiny batches, temper our chocolate by hand, and refuse to use any flavouring that didn't grow on a tree." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-5xl px-6 mt-20 grid md:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-muted-foreground md:order-1 order-2", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl text-cream", children: "From bean to bowl" }),
        /* @__PURE__ */ jsx("p", { children: "Every step happens under one roof — sorting, roasting, conching, churning, dipping. When you taste a Cacao & Co. scoop, you're tasting a craft that took weeks, not minutes." }),
        /* @__PURE__ */ jsx("p", { children: "Today we offer thirty chocolate creations across scoops, bars, cones, sundaes and sandwiches. Each one starts the same way: a single bean, treated with reverence." })
      ] }),
      /* @__PURE__ */ jsx("img", { src: ic3, alt: "Chocolate cone", className: "rounded-2xl shadow-cocoa md:order-2 order-1" })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-5xl px-6 mt-24 grid sm:grid-cols-3 gap-6 text-center", children: [{
      n: "30+",
      l: "Chocolate creations"
    }, {
      n: "11",
      l: "Single-origin beans"
    }, {
      n: "72h",
      l: "Slow-conching time"
    }].map((s) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card p-8 shadow-cocoa", children: [
      /* @__PURE__ */ jsx("div", { className: "font-display text-5xl text-gradient-gold", children: s.n }),
      /* @__PURE__ */ jsx("div", { className: "mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground", children: s.l })
    ] }, s.l)) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  About as component
};
