import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-[oklch(0.14_0.03_45)] mt-24">
      <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.55_0.14_45)] to-[oklch(0.3_0.06_40)]">
              <span className="text-xl">🍫</span>
            </span>
            <div>
              <div className="font-display text-xl text-cream">Cacao &amp; Co.</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Choc Ice Atelier</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Slow-churned chocolate ice cream, crafted with single-origin cacao since 2014.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-cream">Shop</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shop" className="hover:text-gold">All Flavours</Link></li>
            <li><Link to="/shop" className="hover:text-gold">Bars</Link></li>
            <li><Link to="/shop" className="hover:text-gold">Sundaes</Link></li>
            <li><Link to="/shop" className="hover:text-gold">Cones</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-cream">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-gold">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            <li><a href="#" className="hover:text-gold">Stores</a></li>
            <li><a href="#" className="hover:text-gold">Careers</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-cream">Newsletter</h4>
          <p className="mt-3 text-sm text-muted-foreground">Cocoa drops in your inbox.</p>
          <form className="mt-3 flex gap-2">
            <input
              type="email"
              placeholder="you@email.com"
              className="flex-1 rounded-full bg-input px-4 py-2 text-sm text-cream placeholder:text-muted-foreground/70 outline-none focus:ring-2 focus:ring-gold"
            />
            <button className="rounded-full bg-gold px-4 py-2 text-xs font-bold uppercase tracking-wider text-[oklch(0.2_0.04_50)]">
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Cacao &amp; Co. All chocolate, all the time.
      </div>
    </footer>
  );
}
