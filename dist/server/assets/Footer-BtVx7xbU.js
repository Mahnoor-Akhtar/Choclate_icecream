import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { ShoppingBag, X, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { u as useCart } from "./router-cFbiadrS.js";
const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "Our Story" },
  { to: "/contact", label: "Contact" }
];
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const cart = useCart();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxs(
    "header",
    {
      className: `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass-dark py-3" : "bg-transparent py-5"}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-6", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 group", children: [
            /* @__PURE__ */ jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.55_0.14_45)] to-[oklch(0.3_0.06_40)] shadow-cocoa", children: /* @__PURE__ */ jsx("span", { className: "text-xl", children: "🍫" }) }),
            /* @__PURE__ */ jsxs("div", { className: "leading-tight", children: [
              /* @__PURE__ */ jsx("div", { className: "font-display text-xl text-cream", children: "Cacao & Co." }),
              /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-[0.3em] text-gold", children: "Choc Ice Atelier" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("nav", { className: "hidden md:flex items-center gap-8", children: links.map((l) => /* @__PURE__ */ jsx(
            Link,
            {
              to: l.to,
              className: "text-sm font-medium text-cream/80 hover:text-gold transition-colors",
              activeProps: { className: "text-gold" },
              activeOptions: { exact: l.to === "/" },
              children: l.label
            },
            l.to
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: cart.open,
                className: "relative flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-sm text-cream hover:bg-cream/10 transition-colors",
                "aria-label": "Open cart",
                children: [
                  /* @__PURE__ */ jsx(ShoppingBag, { className: "h-4 w-4" }),
                  /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Cart" }),
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: `ml-1 rounded-full px-2 py-0.5 text-[10px] font-bold transition-colors ${cart.count > 0 ? "bg-gold text-[oklch(0.2_0.04_50)]" : "bg-cream/10 text-cream/60"}`,
                      children: cart.count
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "md:hidden text-cream",
                onClick: () => setOpen((o) => !o),
                "aria-label": "Toggle menu",
                children: open ? /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) : /* @__PURE__ */ jsx(Menu, { className: "h-6 w-6" })
              }
            )
          ] })
        ] }),
        open && /* @__PURE__ */ jsx("div", { className: "md:hidden glass-dark mt-3 mx-4 rounded-2xl p-5", children: /* @__PURE__ */ jsx("nav", { className: "flex flex-col gap-4", children: links.map((l) => /* @__PURE__ */ jsx(
          Link,
          {
            to: l.to,
            onClick: () => setOpen(false),
            className: "text-cream/90 hover:text-gold",
            activeProps: { className: "text-gold" },
            activeOptions: { exact: l.to === "/" },
            children: l.label
          },
          l.to
        )) }) })
      ]
    }
  );
}
function Footer() {
  return /* @__PURE__ */ jsxs("footer", { className: "border-t border-border bg-[oklch(0.14_0.03_45)] mt-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.55_0.14_45)] to-[oklch(0.3_0.06_40)]", children: /* @__PURE__ */ jsx("span", { className: "text-xl", children: "🍫" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-display text-xl text-cream", children: "Cacao & Co." }),
            /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-[0.3em] text-gold", children: "Choc Ice Atelier" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "Slow-churned chocolate ice cream, crafted with single-origin cacao since 2014." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold text-cream", children: "Shop" }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-3 space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/shop", className: "hover:text-gold", children: "All Flavours" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/shop", className: "hover:text-gold", children: "Bars" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/shop", className: "hover:text-gold", children: "Sundaes" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/shop", className: "hover:text-gold", children: "Cones" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold text-cream", children: "Company" }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-3 space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/about", className: "hover:text-gold", children: "Our Story" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/contact", className: "hover:text-gold", children: "Contact" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-gold", children: "Stores" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-gold", children: "Careers" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold text-cream", children: "Newsletter" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Cocoa drops in your inbox." }),
        /* @__PURE__ */ jsxs("form", { className: "mt-3 flex gap-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              placeholder: "you@email.com",
              className: "flex-1 rounded-full bg-input px-4 py-2 text-sm text-cream placeholder:text-muted-foreground/70 outline-none focus:ring-2 focus:ring-gold"
            }
          ),
          /* @__PURE__ */ jsx("button", { className: "rounded-full bg-gold px-4 py-2 text-xs font-bold uppercase tracking-wider text-[oklch(0.2_0.04_50)]", children: "Join" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-t border-border py-5 text-center text-xs text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Cacao & Co. All chocolate, all the time."
    ] })
  ] });
}
export {
  Footer as F,
  Navbar as N
};
