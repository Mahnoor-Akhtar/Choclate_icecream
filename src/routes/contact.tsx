import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Sweet Scoop Showcase" },
      { name: "description", content: "Get in touch with our chocolate ice cream atelier." },
      { property: "og:title", content: "Contact — Cacao & Co." },
      { property: "og:description", content: "Visit, call, or write to our chocolate atelier." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <section className="pt-36 pb-12 px-6">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Contact</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl text-cream">
            Say <span className="text-gradient-gold italic">hello.</span>
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Wholesale orders, press, or just a love letter to chocolate — we read every message.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24 grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          {[
            { icon: MapPin, title: "Atelier", value: "14 Rue du Cacao, Paris 11ᵉ" },
            { icon: Phone, title: "Phone", value: "+33 1 42 00 14 88" },
            { icon: Mail, title: "Email", value: "hello@cacao-co.com" },
          ].map((c) => (
            <div key={c.title} className="flex gap-4 rounded-2xl bg-card p-5 shadow-cocoa">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <c.icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-gold">{c.title}</div>
                <div className="mt-1 text-cream">{c.value}</div>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="rounded-2xl bg-card p-6 shadow-cocoa space-y-4"
        >
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-gold">Name</label>
            <input
              required
              className="mt-2 w-full rounded-lg bg-input px-4 py-3 text-cream outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-gold">Email</label>
            <input
              required
              type="email"
              className="mt-2 w-full rounded-lg bg-input px-4 py-3 text-cream outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-gold">Message</label>
            <textarea
              required
              rows={5}
              className="mt-2 w-full rounded-lg bg-input px-4 py-3 text-cream outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-gold py-3 text-sm font-bold uppercase tracking-wider text-[oklch(0.2_0.04_50)] hover:bg-[oklch(0.85_0.14_75)]"
          >
            {sent ? "Sent — merci! 🍫" : "Send message"}
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
}
