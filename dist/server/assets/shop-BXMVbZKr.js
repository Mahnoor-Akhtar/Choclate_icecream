import { jsxs, jsx } from "react/jsx-runtime";
import { N as Navbar, F as Footer } from "./Footer-BtVx7xbU.js";
import { P as ProductCard } from "./ProductCard-BLOSq4mQ.js";
import { p as products, c as categories } from "./router-cFbiadrS.js";
import * as React from "react";
import { useState, useMemo } from "react";
import { ChevronDown, Check, ChevronUp, Search, X } from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import "@tanstack/react-router";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
function Shop() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popularity");
  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = active === "All" ? [...products] : products.filter((p) => p.category === active);
    if (q) {
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
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
  return /* @__PURE__ */ jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("section", { className: "pt-36 pb-12 px-6", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-gold", children: "The Collection" }),
      /* @__PURE__ */ jsxs("h1", { className: "mt-3 font-display text-5xl md:text-6xl text-cream", children: [
        "Thirty shades of ",
        /* @__PURE__ */ jsx("span", { className: "text-gradient-gold italic", children: "chocolate" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-2xl text-muted-foreground", children: "From velvety scoops to molten sundaes — every creation begins with single-origin cacao and ends in your bowl." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-full lg:max-w-md", children: [
          /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsx("input", { type: "search", value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search flavours, ingredients…", className: "w-full rounded-full border border-border bg-secondary/40 py-3 pl-11 pr-10 text-sm text-cream placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 transition-colors", "aria-label": "Search products" }),
          query && /* @__PURE__ */ jsx("button", { onClick: () => setQuery(""), className: "absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-cream", "aria-label": "Clear search", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Sort" }),
          /* @__PURE__ */ jsxs(Select, { value: sort, onValueChange: (v) => setSort(v), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[200px] rounded-full border-border bg-secondary/40 text-cream", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "popularity", children: "Most popular" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "name", children: "Name (A–Z)" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "price-asc", children: "Price: low to high" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "price-desc", children: "Price: high to low" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 flex flex-wrap gap-3", children: categories.map((c) => /* @__PURE__ */ jsx("button", { onClick: () => setActive(c), className: `rounded-full px-5 py-2 text-sm transition-all ${active === c ? "bg-gold text-[oklch(0.2_0.04_50)] font-semibold" : "border border-border text-cream/80 hover:border-gold hover:text-gold"}`, children: c }, c)) }),
      /* @__PURE__ */ jsxs("p", { className: "mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground", children: [
        list.length,
        " ",
        list.length === 1 ? "creation" : "creations",
        query && ` matching "${query}"`
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-6 pb-24", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl", children: list.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-border bg-card/40 p-16 text-center", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl text-cream", children: "No creations match your search" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Try a different flavour or clear the filters." }),
      /* @__PURE__ */ jsx("button", { onClick: () => {
        setQuery("");
        setActive("All");
        setSort("popularity");
      }, className: "mt-6 rounded-full bg-gold px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-[oklch(0.2_0.04_50)]", children: "Reset filters" })
    ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: list.map((p) => /* @__PURE__ */ jsx(ProductCard, { product: p }, p.id)) }) }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  Shop as component
};
