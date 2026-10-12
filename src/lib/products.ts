import naagni1 from "@/assets/sparsh/products/naagni-1.jpg";
import naagni2 from "@/assets/sparsh/products/naagni-2.jpg";
import naagni3 from "@/assets/sparsh/products/naagni-3.jpg";
import no11 from "@/assets/sparsh/products/no1-1.jpg";
import no12 from "@/assets/sparsh/products/no1-2.jpg";
import no13 from "@/assets/sparsh/products/no1-3.jpg";
import gold1 from "@/assets/sparsh/products/gold-1.jpg";
import gold2 from "@/assets/sparsh/products/gold-2.jpg";
import gold3 from "@/assets/sparsh/products/gold-3.jpg";
import masala1 from "@/assets/sparsh/products/masala-1.jpg";
import masala2 from "@/assets/sparsh/products/masala-2.jpg";
import masala3 from "@/assets/sparsh/products/masala-3.jpg";
import elaichi1 from "@/assets/sparsh/products/elaichi-1.jpg";
import elaichi2 from "@/assets/sparsh/products/elaichi-2.jpg";
import elaichi3 from "@/assets/sparsh/products/elaichi-3.jpg";
import royal1 from "@/assets/sparsh/products/royal-1.jpg";
import royal2 from "@/assets/sparsh/products/royal-2.jpg";
import royal3 from "@/assets/sparsh/products/royal-3.jpg";

export type Product = {
  id: string;
  name: string;
  price: string;
  imgs: string[];
  tag?: string;
  rating: number;
  // Extra words people search by (alternate spellings, flavour, style).
  keywords: string;
};

export const products: Product[] = [
  { id: "naagni", name: "Sparsh Naagni Tea", price: "Premium · Strong", imgs: [naagni1, naagni2, naagni3], tag: "New", rating: 4.9, keywords: "nagni nagini kadak strong bold ctc black" },
  { id: "no1", name: "Sparsh No.1 Tea", price: "Smooth · Everyday", imgs: [no11, no12, no13], tag: "Popular", rating: 4.7, keywords: "no 1 no1 number one daily smooth ctc" },
  { id: "gold", name: "Sparsh Gold Tea", price: "Naturally Sweet", imgs: [gold1, gold2, gold3], tag: "Everyday", rating: 4.6, keywords: "golden sweet ctc orthodox" },
  { id: "masala", name: "Sparsh Masala Tea", price: "Spiced Masala Chai", imgs: [masala1, masala2, masala3], tag: "Spiced", rating: 4.9, keywords: "spice spicy ginger adrak cinnamon clove" },
  { id: "elaichi", name: "Sparsh Elaichi Tea", price: "Cardamom Aromatic", imgs: [elaichi1, elaichi2, elaichi3], tag: "Aromatic", rating: 4.8, keywords: "elachi ilaichi cardamom flavoured" },
  { id: "royal", name: "Sparsh Royal Tea", price: "Rich & Premium", imgs: [royal1, royal2, royal3], tag: "Premium", rating: 4.8, keywords: "assam loose sweet orthodox" },
];

export const productCardId = (id: string) => `product-${id}`;

// Words that appear in every product, so they can't narrow a search.
const GENERIC = new Set(["sparsh", "tea", "teas", "chai", "pouch", "pouches", "pack", "packs", "the", "and"]);

// Lowercase, strip punctuation, and collapse doubled letters so that
// "nagni" finds "Naagni" and "elachi" finds "Elaichi".
const normalise = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/([a-z])\1+/g, "$1").trim();

export function searchProducts(query: string): Product[] {
  const tokens = normalise(query).split(" ").filter(Boolean);
  if (tokens.length === 0) return [];
  const specific = tokens.filter((t) => !GENERIC.has(t));
  if (specific.length === 0) return products;
  return products.filter((p) => {
    const words = normalise(`${p.name} ${p.price} ${p.tag ?? ""} ${p.keywords}`).split(" ");
    const joined = words.join("");
    return specific.every((t) => words.some((w) => w.startsWith(t)) || (t.length >= 3 && joined.includes(t)));
  });
}
