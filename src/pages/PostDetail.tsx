import { useParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";
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

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = useMemo(
    () => (postsData as Post[]).find((item) => item.slug === slug),
    [slug],
  );

  if (!post) {
    return (
      <div className="min-h-screen bg-background pt-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl text-foreground mb-4">Post Not Found</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-primary hover:text-primary/80 transition flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-deep-black/95 px-6 py-4 backdrop-blur-md md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <p className="font-display text-2xl text-foreground">Article</p>
            <p className="mt-1 font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">Douglas Stratton Fine Art Photography</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 border border-primary px-4 py-2 font-body text-xs uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>
      </header>

      <main className="section-padding">
      <div className="max-w-2xl mx-auto">

        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full aspect-video object-cover rounded-lg mb-8"
          />
        )}

        <article>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-3">{post.title}</h1>

          <div className="flex flex-col gap-2 text-muted-foreground mb-8">
            {post.date && <time>{formatDate(post.date)}</time>}
            {post.categories?.length > 0 && (
              <div className="text-sm">
                {post.categories.join(" • ")}
              </div>
            )}
          </div>

          {post.excerpt && (
            <p className="font-body text-xl text-muted-foreground mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {post.content && (
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                {post.content}
              </div>
            </div>
          )}
        </article>
      </div>
      </main>
    </div>
  );
}
