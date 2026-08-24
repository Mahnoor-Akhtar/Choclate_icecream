import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ic1 from "@/assets/ic-1.jpg";
import ic3 from "@/assets/ic-3.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Sweet Scoop Showcase" },
      {
        name: "description",
        content: "How a small chocolatier became a chocolate ice cream atelier crafting single-origin creations.",
      },
      { property: "og:title", content: "Our Story — Cacao & Co." },
      {
        property: "og:description",
        content: "From a single bean to thirty creations: the story of Cacao & Co.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <section className="pt-36 pb-20 px-6">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Our Story</p>
          <h1 className="mt-3 font-display text-5xl md:text-7xl text-cream leading-[0.95]">
            One bean.
            <br />
            <span className="text-gradient-gold italic">A whole obsession.</span>
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 grid md:grid-cols-2 gap-12 items-center">
        <img src={ic1} alt="Chocolate scoop" className="rounded-2xl shadow-cocoa" />
        <div className="space-y-4 text-muted-foreground">
          <p>
            Cacao &amp; Co. began in 2014 in a small atelier with a copper churn, a sack of
            single-origin Madagascan beans, and a stubborn idea: chocolate ice cream should taste
            of chocolate first, sugar second.
          </p>
          <p>
            A decade later we still roast our cacao in tiny batches, temper our chocolate by hand,
            and refuse to use any flavouring that didn't grow on a tree.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 mt-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4 text-muted-foreground md:order-1 order-2">
          <h2 className="font-display text-3xl text-cream">From bean to bowl</h2>
          <p>
            Every step happens under one roof — sorting, roasting, conching, churning, dipping.
            When you taste a Cacao &amp; Co. scoop, you're tasting a craft that took weeks, not minutes.
          </p>
          <p>
            Today we offer thirty chocolate creations across scoops, bars, cones, sundaes and
            sandwiches. Each one starts the same way: a single bean, treated with reverence.
          </p>
        </div>
        <img src={ic3} alt="Chocolate cone" className="rounded-2xl shadow-cocoa md:order-2 order-1" />
      </section>

      <section className="mx-auto max-w-5xl px-6 mt-24 grid sm:grid-cols-3 gap-6 text-center">
        {[
          { n: "30+", l: "Chocolate creations" },
          { n: "11", l: "Single-origin beans" },
          { n: "72h", l: "Slow-conching time" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl bg-card p-8 shadow-cocoa">
            <div className="font-display text-5xl text-gradient-gold">{s.n}</div>
            <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
