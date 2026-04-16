import { useMemo } from "react";
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

export default function Exhibitions() {
  const posts = useMemo(
    () =>
      [...(postsData as Post[])]
        .filter((post) => post.categories?.includes("Exhibitions"))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [],
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-deep-black/95 px-6 py-4 backdrop-blur-md md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <p className="font-display text-2xl text-foreground">Exhibitions</p>
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
          <h1 className="font-display text-4xl text-foreground md:text-5xl mb-4">Exhibitions</h1>
          <p className="font-body text-muted-foreground text-lg max-w-2xl">
            Gallery shows, art auctions, and exhibitions featuring Douglas
            Stratton's fine art photography from around the world.
          </p>
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No exhibitions found.</p>
          </div>
        )}

        {posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group hover:opacity-80 transition"
              >
                <div className="space-y-4">
                  {post.image_url && (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full aspect-video object-cover rounded-lg group-hover:scale-105 transition duration-300"
                    />
                  )}
                  <div>
                    <h2 className="font-display text-2xl text-foreground group-hover:text-gold transition">
                      {post.title}
                    </h2>
                    {post.date && (
                      <p className="font-body text-sm text-muted-foreground mt-1">
                        {formatDate(post.date)}
                      </p>
                    )}
                  </div>
                  {post.excerpt && (
                    <p className="font-body text-muted-foreground">
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
