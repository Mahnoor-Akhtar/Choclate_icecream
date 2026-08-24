import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { N as Navbar, F as Footer } from "./Footer-BtVx7xbU.js";
import "lucide-react";
import "react";
import "./router-cFbiadrS.js";
const SplitNotFoundComponent = () => /* @__PURE__ */ jsxs("div", { className: "bg-background min-h-screen", children: [
  /* @__PURE__ */ jsx(Navbar, {}),
  /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-6 pt-40 pb-24 text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-5xl text-cream", children: "Flavour not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground", children: "The creation you're looking for has melted away." }),
    /* @__PURE__ */ jsx(Link, { to: "/shop", className: "mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold uppercase tracking-wider text-[oklch(0.2_0.04_50)]", children: "Back to shop" })
  ] }),
  /* @__PURE__ */ jsx(Footer, {})
] });
export {
  SplitNotFoundComponent as notFoundComponent
};
