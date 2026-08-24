import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { N as Navbar, F as Footer } from "./Footer-BtVx7xbU.js";
import { u as useCart } from "./router-cFbiadrS.js";
import { useState } from "react";
import { Check, ShoppingBag, ChevronLeft, Lock, Minus, Plus, Trash2 } from "lucide-react";
const SHIPPING_FLAT = 6.5;
const FREE_SHIPPING_THRESHOLD = 50;
const TAX_RATE = 0.08;
function CheckoutPage() {
  const cart = useCart();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(null);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zip: "",
    country: "United States"
  });
  const subtotal = cart.subtotal;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FLAT;
  const tax = +(subtotal * TAX_RATE).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);
  const handleChange = (e) => setForm((f) => ({
    ...f,
    [e.target.name]: e.target.value
  }));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.items.length === 0) return;
    const orderId = `CC-${Date.now().toString(36).toUpperCase()}`;
    setPlaced({
      orderId,
      total
    });
    cart.clear();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  if (placed) {
    return /* @__PURE__ */ jsxs("div", { className: "bg-background min-h-screen", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsx("section", { className: "pt-36 pb-24 px-6", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold", children: /* @__PURE__ */ jsx(Check, { className: "h-10 w-10 text-[oklch(0.2_0.04_50)]", strokeWidth: 3 }) }),
        /* @__PURE__ */ jsx("p", { className: "mt-8 text-xs uppercase tracking-[0.3em] text-gold", children: "Order confirmed" }),
        /* @__PURE__ */ jsx("h1", { className: "mt-3 font-display text-5xl text-cream", children: "Merci beaucoup." }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground", children: "Your chocolate is heading to the cold-chain courier. We've sent a confirmation to your inbox." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-10 rounded-3xl border border-border bg-card p-8 text-left", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Order number" }),
            /* @__PURE__ */ jsx("span", { className: "font-display text-lg text-cream", children: placed.orderId })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Total charged" }),
            /* @__PURE__ */ jsxs("span", { className: "font-display text-2xl text-gradient-gold tabular-nums", children: [
              "$",
              placed.total.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Estimated delivery" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-cream", children: new Date(Date.now() + 1e3 * 60 * 60 * 48).toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric"
            }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-wrap justify-center gap-4", children: [
          /* @__PURE__ */ jsx(Link, { to: "/shop", className: "inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-bold uppercase tracking-wider text-[oklch(0.2_0.04_50)] hover:bg-[oklch(0.85_0.14_75)]", children: "Continue shopping" }),
          /* @__PURE__ */ jsx(Link, { to: "/", className: "inline-flex items-center gap-2 rounded-full border border-cream/30 px-7 py-3 text-sm font-bold uppercase tracking-wider text-cream hover:bg-cream/10", children: "Back home" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] });
  }
  if (cart.items.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "bg-background min-h-screen", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsx("section", { className: "pt-36 pb-24 px-6", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary", children: /* @__PURE__ */ jsx(ShoppingBag, { className: "h-9 w-9 text-gold" }) }),
        /* @__PURE__ */ jsx("h1", { className: "mt-8 font-display text-5xl text-cream", children: "Your cart is empty" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground", children: "Add a creation from the atelier to begin checkout." }),
        /* @__PURE__ */ jsx(Link, { to: "/shop", className: "mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-bold uppercase tracking-wider text-[oklch(0.2_0.04_50)] hover:bg-[oklch(0.85_0.14_75)]", children: "Browse the shop" })
      ] }) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("section", { className: "pt-32 pb-16 px-6", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => navigate({
        to: "/shop"
      }), className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-gold", children: [
        /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }),
        " Continue shopping"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-8 text-xs uppercase tracking-[0.3em] text-gold", children: "Final step" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 font-display text-4xl md:text-5xl text-cream", children: "Checkout" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-10 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10", children: [
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-10", children: [
          /* @__PURE__ */ jsxs("fieldset", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("legend", { className: "font-display text-2xl text-cream mb-2", children: "Contact" }),
            /* @__PURE__ */ jsx(Field, { label: "Email", name: "email", type: "email", value: form.email, onChange: handleChange, required: true })
          ] }),
          /* @__PURE__ */ jsxs("fieldset", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("legend", { className: "font-display text-2xl text-cream mb-2", children: "Shipping address" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsx(Field, { label: "First name", name: "firstName", value: form.firstName, onChange: handleChange, required: true }),
              /* @__PURE__ */ jsx(Field, { label: "Last name", name: "lastName", value: form.lastName, onChange: handleChange, required: true })
            ] }),
            /* @__PURE__ */ jsx(Field, { label: "Address", name: "address", value: form.address, onChange: handleChange, required: true }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsx(Field, { label: "City", name: "city", value: form.city, onChange: handleChange, required: true }),
              /* @__PURE__ */ jsx(Field, { label: "ZIP", name: "zip", value: form.zip, onChange: handleChange, required: true })
            ] }),
            /* @__PURE__ */ jsx(Field, { label: "Country", name: "country", value: form.country, onChange: handleChange, required: true })
          ] }),
          /* @__PURE__ */ jsxs("fieldset", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("legend", { className: "font-display text-2xl text-cream mb-2", children: "Payment" }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-dashed border-gold/40 bg-gold/5 p-5 text-sm text-cream/80", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-gold", children: [
                /* @__PURE__ */ jsx(Lock, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-[0.2em] font-semibold", children: "Demo mode" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-2", children: 'No real payment is collected. Click "Place order" below to simulate an order confirmation. Hook up a payment provider to accept live cards.' })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("button", { type: "submit", className: "hidden lg:flex w-full items-center justify-center gap-2 rounded-full bg-gold py-4 text-sm font-bold uppercase tracking-wider text-[oklch(0.2_0.04_50)] hover:bg-[oklch(0.85_0.14_75)] transition-colors", children: [
            /* @__PURE__ */ jsx(Lock, { className: "h-4 w-4" }),
            " Place order · $",
            total.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("aside", { className: "lg:sticky lg:top-28 h-fit rounded-3xl border border-border bg-card p-6 shadow-cocoa", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl text-cream", children: "Order summary" }),
            /* @__PURE__ */ jsxs("span", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: [
              cart.count,
              " ",
              cart.count === 1 ? "item" : "items"
            ] })
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "mt-6 space-y-4 max-h-80 overflow-y-auto pr-2", children: cart.items.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative shrink-0", children: [
              /* @__PURE__ */ jsx("img", { src: item.image, alt: item.name, className: "h-16 w-16 rounded-xl object-cover" }),
              /* @__PURE__ */ jsx("span", { className: "absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-[oklch(0.2_0.04_50)]", children: item.quantity })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col", children: [
              /* @__PURE__ */ jsx("span", { className: "font-display text-sm text-cream leading-snug", children: item.name }),
              /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground", children: [
                "$",
                item.price.toFixed(2),
                " each"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-1 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx("button", { type: "button", onClick: () => cart.setQuantity(item.id, item.quantity - 1), className: "flex h-6 w-6 items-center justify-center rounded-full border border-border text-cream hover:bg-cream/10", "aria-label": "Decrease", children: /* @__PURE__ */ jsx(Minus, { className: "h-3 w-3" }) }),
                  /* @__PURE__ */ jsx("button", { type: "button", onClick: () => cart.setQuantity(item.id, item.quantity + 1), className: "flex h-6 w-6 items-center justify-center rounded-full border border-border text-cream hover:bg-cream/10", "aria-label": "Increase", children: /* @__PURE__ */ jsx(Plus, { className: "h-3 w-3" }) }),
                  /* @__PURE__ */ jsx("button", { type: "button", onClick: () => cart.remove(item.id), className: "ml-1 flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:text-destructive", "aria-label": "Remove", children: /* @__PURE__ */ jsx(Trash2, { className: "h-3 w-3" }) })
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "text-sm text-cream tabular-nums", children: [
                  "$",
                  (item.price * item.quantity).toFixed(2)
                ] })
              ] })
            ] })
          ] }, item.id)) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-2 border-t border-border pt-4 text-sm", children: [
            /* @__PURE__ */ jsx(Row, { label: "Subtotal", value: `$${subtotal.toFixed(2)}` }),
            /* @__PURE__ */ jsx(Row, { label: "Shipping", value: shipping === 0 ? /* @__PURE__ */ jsx("span", { className: "text-gold", children: "Free" }) : `$${shipping.toFixed(2)}` }),
            /* @__PURE__ */ jsx(Row, { label: "Tax (8%)", value: `$${tax.toFixed(2)}` }),
            subtotal < FREE_SHIPPING_THRESHOLD && /* @__PURE__ */ jsxs("p", { className: "pt-1 text-xs text-muted-foreground", children: [
              "Spend $",
              (FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2),
              " more for free cold-chain shipping."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between border-t border-border pt-4", children: [
            /* @__PURE__ */ jsx("span", { className: "font-display text-lg text-cream", children: "Total" }),
            /* @__PURE__ */ jsxs("span", { className: "font-display text-3xl text-gradient-gold tabular-nums", children: [
              "$",
              total.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("button", { type: "submit", form: "", onClick: handleSubmit, className: "mt-6 lg:hidden flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-sm font-bold uppercase tracking-wider text-[oklch(0.2_0.04_50)] hover:bg-[oklch(0.85_0.14_75)]", children: [
            /* @__PURE__ */ jsx(Lock, { className: "h-4 w-4" }),
            " Place order"
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function Row({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-muted-foreground", children: [
    /* @__PURE__ */ jsx("span", { children: label }),
    /* @__PURE__ */ jsx("span", { className: "text-cream tabular-nums", children: value })
  ] });
}
function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required
}) {
  return /* @__PURE__ */ jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("input", { type, name, value, onChange, required, className: "mt-1.5 w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-cream placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 transition-colors" })
  ] });
}
export {
  CheckoutPage as component
};
