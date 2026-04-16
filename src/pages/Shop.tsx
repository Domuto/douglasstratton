import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import productsData from "@/data/products.json";

type Product = {
  id: string;
  title: string;
  slug: string;
  description: string;
  excerpt: string;
  regular_price: number | null;
  sale_price: number | null;
  sku: string;
  stock_status: "instock" | "outofstock" | string;
  image_url: string;
  gallery_urls: string[];
  categories: string[];
  tags: string[];
};

const formatCurrency = (value?: number | null) => {
  if (value == null) return "Price on request";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
};

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  const products = useMemo(
    () =>
      (productsData as Product[])
        .filter((product) => product?.id && product?.title)
        .sort((a, b) => a.title.localeCompare(b.title)),
    [],
  );

  const allCategories = useMemo(() => {
    const categorySet = new Set<string>();
    products.forEach((product) => {
      (product.categories ?? []).forEach((category) => categorySet.add(category));
    });
    return Array.from(categorySet).sort((a, b) => a.localeCompare(b));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const haystack = `${product.title} ${product.excerpt ?? ""} ${product.description ?? ""}`.toLowerCase();
      const matchesSearch = !searchTerm || haystack.includes(searchTerm.toLowerCase());
      if (!matchesSearch) return false;

      const categories = product.categories ?? [];
      const matchesCategory = categoryFilter === "all" || categories.includes(categoryFilter);
      if (!matchesCategory) return false;

      if (stockFilter === "all") return true;
      return (product.stock_status ?? "instock") === stockFilter;
    });
  }, [products, searchTerm, categoryFilter, stockFilter]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-deep-black/95 px-6 py-4 backdrop-blur-md md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <p className="font-display text-2xl text-foreground">Shop Prints</p>
            <p className="mt-1 font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">Douglas Stratton Fine Art Photography</p>
          </div>
          <Link
            to="/"
            className="border border-primary px-4 py-2 font-body text-xs uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Back to Home
          </Link>
        </div>
      </header>

      <main className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-4 rounded-md border border-border bg-card/40 p-4 md:grid-cols-3">
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by title, keyword, or description"
              className="h-11 w-full rounded-md border border-border bg-background px-3 font-body text-sm text-foreground outline-none ring-primary/40 transition focus:ring-2"
            />

            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="h-11 w-full rounded-md border border-border bg-background px-3 font-body text-sm text-foreground outline-none ring-primary/40 transition focus:ring-2"
            >
              <option value="all">All Categories</option>
              {allCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={stockFilter}
              onChange={(event) => setStockFilter(event.target.value)}
              className="h-11 w-full rounded-md border border-border bg-background px-3 font-body text-sm text-foreground outline-none ring-primary/40 transition focus:ring-2"
            >
              <option value="instock">In Stock</option>
              <option value="outofstock">Out of Stock</option>
              <option value="all">All Stock Statuses</option>
            </select>
          </div>

          <p className="mb-6 font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">{filteredProducts.length} products</p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => {
              return (
                <article key={product.id} className="overflow-hidden rounded-md border border-border bg-card/40">
                  <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.title}
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                    width={800}
                    height={600}
                  />

                  <div className="space-y-4 p-4">
                    <div>
                      <p className="font-display text-2xl text-foreground">{product.title}</p>
                      {product.excerpt ? <p className="mt-1 font-body text-sm text-muted-foreground">{product.excerpt}</p> : null}
                    </div>

                    {!!(product.categories ?? []).length && (
                      <div className="flex flex-wrap gap-2">
                        {(product.categories ?? []).slice(0, 3).map((category) => (
                          <span key={`${product.id}-${category}`} className="rounded border border-primary/30 px-2 py-1 font-body text-[10px] uppercase tracking-[0.15em] text-primary">
                            {category}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <p className="font-display text-xl text-primary">{formatCurrency(product.sale_price ?? product.regular_price)}</p>
                      <span
                        className={`font-body text-xs uppercase tracking-[0.15em] ${
                          (product.stock_status ?? "instock") === "instock" ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {(product.stock_status ?? "instock") === "instock" ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Shop;
