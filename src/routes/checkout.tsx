import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import { ChevronLeft, Minus, Plus, Trash2, Check, ShoppingBag, Lock } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Sweet Scoop Showcase" },
      { name: "description", content: "Review your order and complete checkout." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

const SHIPPING_FLAT = 6.5;
const FREE_SHIPPING_THRESHOLD = 50;
const TAX_RATE = 0.08;

function CheckoutPage() {
  const cart = useCart();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState<{ orderId: string; total: number } | null>(null);

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zip: "",
    country: "United States",
  });

  const subtotal = cart.subtotal;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FLAT;
  const tax = +(subtotal * TAX_RATE).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.items.length === 0) return;
    const orderId = `CC-${Date.now().toString(36).toUpperCase()}`;
    setPlaced({ orderId, total });
    cart.clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (placed) {
    return (
      <div className="bg-background min-h-screen">
        <Navbar />
        <section className="pt-36 pb-24 px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold">
              <Check className="h-10 w-10 text-[oklch(0.2_0.04_50)]" strokeWidth={3} />
            </div>
            <p className="mt-8 text-xs uppercase tracking-[0.3em] text-gold">Order confirmed</p>
            <h1 className="mt-3 font-display text-5xl text-cream">Merci beaucoup.</h1>
            <p className="mt-4 text-muted-foreground">
              Your chocolate is heading to the cold-chain courier. We've sent a confirmation to
              your inbox.
            </p>
            <div className="mt-10 rounded-3xl border border-border bg-card p-8 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Order number
                </span>
                <span className="font-display text-lg text-cream">{placed.orderId}</span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Total charged
                </span>
                <span className="font-display text-2xl text-gradient-gold tabular-nums">
                  ${placed.total.toFixed(2)}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Estimated delivery
                </span>
                <span className="text-sm text-cream">
                  {new Date(Date.now() + 1000 * 60 * 60 * 48).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-bold uppercase tracking-wider text-[oklch(0.2_0.04_50)] hover:bg-[oklch(0.85_0.14_75)]"
              >
                Continue shopping
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-7 py-3 text-sm font-bold uppercase tracking-wider text-cream hover:bg-cream/10"
              >
                Back home
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="bg-background min-h-screen">
        <Navbar />
        <section className="pt-36 pb-24 px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
              <ShoppingBag className="h-9 w-9 text-gold" />
            </div>
            <h1 className="mt-8 font-display text-5xl text-cream">Your cart is empty</h1>
            <p className="mt-4 text-muted-foreground">
              Add a creation from the atelier to begin checkout.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-bold uppercase tracking-wider text-[oklch(0.2_0.04_50)] hover:bg-[oklch(0.85_0.14_75)]"
            >
              Browse the shop
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <section className="pt-32 pb-16 px-6">
        <div className="mx-auto max-w-7xl">
          <button
            onClick={() => navigate({ to: "/shop" })}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-gold"
          >
            <ChevronLeft className="h-4 w-4" /> Continue shopping
          </button>

          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-gold">Final step</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl text-cream">Checkout</h1>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-10">
              <fieldset className="space-y-4">
                <legend className="font-display text-2xl text-cream mb-2">Contact</legend>
                <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
              </fieldset>

              <fieldset className="space-y-4">
                <legend className="font-display text-2xl text-cream mb-2">Shipping address</legend>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="First name" name="firstName" value={form.firstName} onChange={handleChange} required />
                  <Field label="Last name" name="lastName" value={form.lastName} onChange={handleChange} required />
                </div>
                <Field label="Address" name="address" value={form.address} onChange={handleChange} required />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="City" name="city" value={form.city} onChange={handleChange} required />
                  <Field label="ZIP" name="zip" value={form.zip} onChange={handleChange} required />
                </div>
                <Field label="Country" name="country" value={form.country} onChange={handleChange} required />
              </fieldset>

              <fieldset className="space-y-4">
                <legend className="font-display text-2xl text-cream mb-2">Payment</legend>
                <div className="rounded-2xl border border-dashed border-gold/40 bg-gold/5 p-5 text-sm text-cream/80">
                  <div className="flex items-center gap-2 text-gold">
                    <Lock className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-[0.2em] font-semibold">
                      Demo mode
                    </span>
                  </div>
                  <p className="mt-2">
                    No real payment is collected. Click "Place order" below to simulate an order
                    confirmation. Hook up a payment provider to accept live cards.
                  </p>
                </div>
              </fieldset>

              <button
                type="submit"
                className="hidden lg:flex w-full items-center justify-center gap-2 rounded-full bg-gold py-4 text-sm font-bold uppercase tracking-wider text-[oklch(0.2_0.04_50)] hover:bg-[oklch(0.85_0.14_75)] transition-colors"
              >
                <Lock className="h-4 w-4" /> Place order · ${total.toFixed(2)}
              </button>
            </form>

            {/* Order summary */}
            <aside className="lg:sticky lg:top-28 h-fit rounded-3xl border border-border bg-card p-6 shadow-cocoa">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl text-cream">Order summary</h2>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {cart.count} {cart.count === 1 ? "item" : "items"}
                </span>
              </div>

              <ul className="mt-6 space-y-4 max-h-80 overflow-y-auto pr-2">
                {cart.items.map((item) => (
                  <li key={item.id} className="flex gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-xl object-cover"
                      />
                      <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-[oklch(0.2_0.04_50)]">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col">
                      <span className="font-display text-sm text-cream leading-snug">
                        {item.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ${item.price.toFixed(2)} each
                      </span>
                      <div className="mt-1 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => cart.setQuantity(item.id, item.quantity - 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-cream hover:bg-cream/10"
                            aria-label="Decrease"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => cart.setQuantity(item.id, item.quantity + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-cream hover:bg-cream/10"
                            aria-label="Increase"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => cart.remove(item.id)}
                            className="ml-1 flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:text-destructive"
                            aria-label="Remove"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm text-cream tabular-nums">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
                <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
                <Row
                  label="Shipping"
                  value={
                    shipping === 0 ? (
                      <span className="text-gold">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )
                  }
                />
                <Row label="Tax (8%)" value={`$${tax.toFixed(2)}`} />
                {subtotal < FREE_SHIPPING_THRESHOLD && (
                  <p className="pt-1 text-xs text-muted-foreground">
                    Spend ${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} more for free
                    cold-chain shipping.
                  </p>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="font-display text-lg text-cream">Total</span>
                <span className="font-display text-3xl text-gradient-gold tabular-nums">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                form=""
                onClick={handleSubmit}
                className="mt-6 lg:hidden flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-sm font-bold uppercase tracking-wider text-[oklch(0.2_0.04_50)] hover:bg-[oklch(0.85_0.14_75)]"
              >
                <Lock className="h-4 w-4" /> Place order
              </button>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-muted-foreground">
      <span>{label}</span>
      <span className="text-cream tabular-nums">{value}</span>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1.5 w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-cream placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 transition-colors"
      />
    </label>
  );
}
