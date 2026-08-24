import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { u as useCart } from "./router-cFbiadrS.js";
function ProductCard({ product }) {
  const cart = useCart();
  return /* @__PURE__ */ jsxs("article", { className: "group relative overflow-hidden rounded-2xl bg-card shadow-cocoa transition-transform duration-500 hover:-translate-y-2", children: [
    /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/products/$slug",
        params: { slug: product.slug },
        className: "block relative aspect-square overflow-hidden",
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: product.image,
              alt: product.name,
              loading: "lazy",
              width: 768,
              height: 768,
              className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            }
          ),
          product.badge && /* @__PURE__ */ jsx("span", { className: "absolute top-3 left-3 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[oklch(0.2_0.04_50)]", children: product.badge }),
          /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-[0.2em] text-gold", children: product.category }),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/products/$slug",
              params: { slug: product.slug },
              className: "mt-1 block font-display text-lg text-cream leading-snug hover:text-gold transition-colors",
              children: product.name
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-right shrink-0", children: /* @__PURE__ */ jsxs("div", { className: "font-display text-xl text-gradient-gold", children: [
          "$",
          product.price
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground line-clamp-2", children: product.description }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => {
            cart.add(product);
            cart.open();
          },
          className: "mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-[oklch(0.62_0.16_45)]",
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
            " Add to cart"
          ]
        }
      )
    ] })
  ] });
}
export {
  ProductCard as P
};
