import { useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

export function CartDrawer() {
  const { isOpen, close, items, remove, setQuantity, subtotal, clear } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={close}
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isOpen}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-card text-foreground shadow-cocoa transition-transform duration-500 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <header className="flex items-center justify-between border-b border-border px-6 py-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Your selection</p>
            <h2 className="font-display text-2xl text-cream">Cart</h2>
          </div>
          <button
            onClick={close}
            className="rounded-full p-2 text-cream hover:bg-cream/10 transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center gap-4 py-16">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
                <ShoppingBag className="h-8 w-8 text-gold" />
              </div>
              <div>
                <h3 className="font-display text-xl text-cream">Your cart is empty</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Add a creation from the atelier.
                </p>
              </div>
              <Link
                to="/shop"
                onClick={close}
                className="mt-2 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-[oklch(0.2_0.04_50)] hover:bg-[oklch(0.85_0.14_75)] transition-colors"
              >
                Browse the shop
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-border bg-secondary/40 p-3"
                >
                  <Link
                    to="/products/$slug"
                    params={{ slug: item.slug }}
                    onClick={close}
                    className="shrink-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-xl object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to="/products/$slug"
                        params={{ slug: item.slug }}
                        onClick={close}
                        className="font-display text-base text-cream leading-snug hover:text-gold"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => remove(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-border bg-background">
                        <button
                          onClick={() => setQuantity(item.id, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-cream hover:bg-cream/10"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm tabular-nums text-cream">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(item.id, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-cream hover:bg-cream/10"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-display text-lg text-gradient-gold tabular-nums">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-border bg-background/40 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span className="font-display text-2xl text-gradient-gold tabular-nums">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Shipping and taxes calculated at checkout.
            </p>
            <button
              onClick={() => {
                close();
                navigate({ to: "/checkout" });
              }}
              className="w-full rounded-full bg-gold py-3.5 text-sm font-bold uppercase tracking-wider text-[oklch(0.2_0.04_50)] hover:bg-[oklch(0.85_0.14_75)] transition-colors"
            >
              Proceed to checkout
            </button>
            <button
              onClick={clear}
              className="w-full text-xs uppercase tracking-wider text-muted-foreground hover:text-cream transition-colors"
            >
              Clear cart
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}
