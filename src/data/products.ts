import ic1 from "@/assets/ic-1.jpg";
import ic2 from "@/assets/ic-2.jpg";
import ic3 from "@/assets/ic-3.jpg";
import ic4 from "@/assets/ic-4.jpg";
import ic5 from "@/assets/ic-5.jpg";
import ic6 from "@/assets/ic-6.jpg";

const images = [ic1, ic2, ic3, ic4, ic5, ic6];

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: "Scoops" | "Bars" | "Cones" | "Sundaes" | "Sandwiches";
  price: number;
  description: string;
  image: string;
  gallery: string[];
  badge?: string;
  ingredients: string[];
  popularity: number; // 0-100
};

const names = [
  ["Dark Velvet Scoop", "Scoops", "Single-origin 70% cacao churned slow."],
  ["Belgian Bar", "Bars", "Hand-dipped Belgian dark, cracking shell."],
  ["Hazelnut Crown Cone", "Cones", "Triple swirl with toasted hazelnuts."],
  ["Brownie Storm Sundae", "Sundaes", "Fudge layers and warm brownie chunks."],
  ["Mint Cocoa Bowl", "Scoops", "Garden mint folded with cacao nibs."],
  ["Cookie Drip Sandwich", "Sandwiches", "Soft cookie, molten chocolate drip."],
  ["Midnight Truffle", "Scoops", "Bittersweet ganache truffle scoops."],
  ["Salted Cocoa Bar", "Bars", "Sea salt flakes on pure cocoa shell."],
  ["Praline Tower Cone", "Cones", "Caramelized praline crunch in every bite."],
  ["Lava Fudge Sundae", "Sundaes", "Hot fudge core, whipped cream peak."],
  ["Espresso Mocha Scoop", "Scoops", "Cold brew espresso meets dark cocoa."],
  ["Almond Bark", "Bars", "Roasted almonds, milk chocolate snap."],
  ["Double Choc Cone", "Cones", "Chocolate cone, chocolate cream, chocolate chips."],
  ["Cocoa Swirl Sandwich", "Sandwiches", "Marbled cocoa cookies, fudge filling."],
  ["Hazelnut Gianduja", "Scoops", "Italian gianduja, silk on the spoon."],
  ["Caramel Crackle Bar", "Bars", "Caramel center, dark chocolate crackle."],
  ["Wafer Crunch Cone", "Cones", "Crisp wafer cone, chocolate ribbons."],
  ["Banoffee Choc Sundae", "Sundaes", "Banana, toffee, dark chocolate cascade."],
  ["Triple Cocoa Scoop", "Scoops", "Three roasts of cacao in one scoop."],
  ["Peanut Crunch Bar", "Bars", "Peanut brittle, deep cocoa coat."],
  ["Rocky Road Cone", "Cones", "Marshmallow, almonds, dark chocolate."],
  ["Chocolate Chip Sandwich", "Sandwiches", "Classic chip cookie, cocoa cream."],
  ["Cherry Cocoa Scoop", "Scoops", "Sour cherry ribbons in dark cocoa."],
  ["Orange Zest Bar", "Bars", "Bright orange peel, dark Belgian shell."],
  ["Tiramisu Cone", "Cones", "Mascarpone, espresso, cocoa dust."],
  ["Hot Fudge Brownie Sundae", "Sundaes", "Brownie base, fudge avalanche."],
  ["Cocoa Nib Scoop", "Scoops", "Raw cacao nibs for serious chocolate lovers."],
  ["Coconut Choc Bar", "Bars", "Toasted coconut, dark chocolate snap."],
  ["Rolled Wafer Cone", "Cones", "Hand-rolled wafer, chocolate fountain."],
  ["Salted Caramel Sundae", "Sundaes", "Sea salt caramel, dark chocolate sauce."],
];

const baseIngredients: Record<Product["category"], string[]> = {
  Scoops: ["Single-origin cacao 70%", "Fresh cream", "Whole milk", "Cane sugar", "Egg yolks", "Madagascar vanilla"],
  Bars: ["Belgian dark chocolate 72%", "Cocoa butter", "Fresh cream", "Cane sugar", "Sea salt", "Sunflower lecithin"],
  Cones: ["Wheat flour", "Cocoa powder", "Cane sugar", "Butter", "Single-origin chocolate", "Fresh cream"],
  Sundaes: ["Chocolate ice cream", "Hot fudge sauce", "Whipped cream", "Brownie pieces", "Cocoa nibs", "Sea salt"],
  Sandwiches: ["Cocoa cookies", "Chocolate ice cream", "Dark chocolate drizzle", "Butter", "Cane sugar", "Vanilla"],
};

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const products: Product[] = names.map(([name, category, description], i) => {
  const cat = category as Product["category"];
  const img = images[i % images.length];
  const gallery = [img, images[(i + 1) % images.length], images[(i + 2) % images.length]];
  return {
    id: i + 1,
    slug: slugify(name as string),
    name: name as string,
    category: cat,
    description: description as string,
    price: Number((4.5 + (i % 7) * 0.6).toFixed(2)),
    image: img,
    gallery,
    badge: i === 0 ? "Bestseller" : i === 6 ? "New" : i === 18 ? "Chef's Pick" : undefined,
    ingredients: baseIngredients[cat],
    // Pseudo-deterministic popularity score
    popularity: ((i * 37 + 13) % 100) + 1,
  };
});

export const categories: Array<Product["category"] | "All"> = [
  "All",
  "Scoops",
  "Bars",
  "Cones",
  "Sundaes",
  "Sandwiches",
];

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);
