import { jsxs, jsx } from "react/jsx-runtime";
import { N as Navbar, F as Footer } from "./Footer-BtVx7xbU.js";
import { MapPin, Phone, Mail } from "lucide-react";
import { useState } from "react";
import "@tanstack/react-router";
import "./router-cFbiadrS.js";
function Contact() {
  const [sent, setSent] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("section", { className: "pt-36 pb-12 px-6", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-gold", children: "Contact" }),
      /* @__PURE__ */ jsxs("h1", { className: "mt-3 font-display text-5xl md:text-6xl text-cream", children: [
        "Say ",
        /* @__PURE__ */ jsx("span", { className: "text-gradient-gold italic", children: "hello." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-xl text-muted-foreground", children: "Wholesale orders, press, or just a love letter to chocolate — we read every message." })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-5xl px-6 pb-24 grid md:grid-cols-2 gap-10", children: [
      /* @__PURE__ */ jsx("div", { className: "space-y-6", children: [{
        icon: MapPin,
        title: "Atelier",
        value: "14 Rue du Cacao, Paris 11ᵉ"
      }, {
        icon: Phone,
        title: "Phone",
        value: "+33 1 42 00 14 88"
      }, {
        icon: Mail,
        title: "Email",
        value: "hello@cacao-co.com"
      }].map((c) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4 rounded-2xl bg-card p-5 shadow-cocoa", children: [
        /* @__PURE__ */ jsx("span", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground", children: /* @__PURE__ */ jsx(c.icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-gold", children: c.title }),
          /* @__PURE__ */ jsx("div", { className: "mt-1 text-cream", children: c.value })
        ] })
      ] }, c.title)) }),
      /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        setSent(true);
      }, className: "rounded-2xl bg-card p-6 shadow-cocoa space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs uppercase tracking-[0.2em] text-gold", children: "Name" }),
          /* @__PURE__ */ jsx("input", { required: true, className: "mt-2 w-full rounded-lg bg-input px-4 py-3 text-cream outline-none focus:ring-2 focus:ring-gold" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs uppercase tracking-[0.2em] text-gold", children: "Email" }),
          /* @__PURE__ */ jsx("input", { required: true, type: "email", className: "mt-2 w-full rounded-lg bg-input px-4 py-3 text-cream outline-none focus:ring-2 focus:ring-gold" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs uppercase tracking-[0.2em] text-gold", children: "Message" }),
          /* @__PURE__ */ jsx("textarea", { required: true, rows: 5, className: "mt-2 w-full rounded-lg bg-input px-4 py-3 text-cream outline-none focus:ring-2 focus:ring-gold" })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "w-full rounded-full bg-gold py-3 text-sm font-bold uppercase tracking-wider text-[oklch(0.2_0.04_50)] hover:bg-[oklch(0.85_0.14_75)]", children: sent ? "Sent — merci! 🍫" : "Send message" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  Contact as component
};
