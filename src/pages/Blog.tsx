import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";
import postsData from "@/data/posts.json";

type Post = {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  image_url: string;
  categories: string[];
  tags: string[];
};

const TABS = [
  { id: "all", label: "All" },
  { id: "exhibitions", label: "Exhibitions" },
  { id: "moving-art", label: "Moving Art" },
  { id: "news", label: "News" },
];

export default function Blog() {
  const [activeTab, setActiveTab] = useState("all");

  const posts = useMemo(
    () =>
      [...(postsData as Post[])].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [],
  );

  const filteredPosts = useMemo(() => {
    if (activeTab === "all") return posts;

    const categoryMap: Record<string, string> = {
      exhibitions: "Exhibitions",
      "moving-art": "Moving Art",
      news: "News-Blog",
    };

    const category = categoryMap[activeTab];
    return posts.filter((post) => post.categories?.includes(category));
  }, [posts, activeTab]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-deep-black/95 px-6 py-4 backdrop-blur-md md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <p className="font-display text-2xl text-foreground">Blog & News</p>
            <p className="mt-1 font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">Douglas Stratton Fine Art Photography</p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 border border-primary px-4 py-2 font-body text-xs uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="font-display text-4xl text-foreground md:text-5xl mb-4">Blog & News</h1>
          <p className="font-body text-muted-foreground text-lg max-w-2xl">
            Exhibitions, moving art films, published features, and news from
            Douglas Stratton.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border overflow-x-auto pb-4">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap pb-2 px-2 font-body text-sm transition ${
                activeTab === tab.id
                  ? "text-gold border-b-2 border-gold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No posts found in this category.</p>
          </div>
        )}

        {filteredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group hover:opacity-80 transition"
              >
                <div className="space-y-3">
                  {post.image_url && (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full aspect-video object-cover rounded-lg group-hover:scale-105 transition duration-300"
                    />
                  )}
                  <div>
                    <h2 className="font-display text-xl text-foreground group-hover:text-gold transition">
                      {post.title}
                    </h2>
                    {post.date && (
                      <p className="font-body text-sm text-muted-foreground">
                        {formatDate(post.date)}
                      </p>
                    )}
                  </div>
                  {post.excerpt && (
                    <p className="font-body text-sm text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      </main>
    </div>
  );
}
