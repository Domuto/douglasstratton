import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const portfolioImages = [
  { src: "/oldimages/1.jpg", title: "Portfolio Image 01" },
  { src: "/oldimages/DSC04346-color-copy.jpg", title: "Color Study" },
  { src: "/oldimages/Untitled_Panorama2print-web.jpg", title: "Untitled Panorama" },
  { src: "/oldimages/Whispers_5c337dee41dcf.jpg", title: "Whispers" },
  { src: "/oldimages/boneyard-starlights.jpg", title: "Boneyard Starlights" },
  { src: "/oldimages/phpThumb_generated_thumbnail-7-1.jpeg", title: "Thumbnail Study" },
  { src: "/oldimages/products-California_Sunse_4f1c7271c842e.jpg", title: "California Sunset" },
  { src: "/oldimages/products-Day_Dreams_of_Bi_4f37436b28694.jpg", title: "Day Dreams" },
  { src: "/oldimages/products-Falls_in_the_mea_4f278ea47fe76.jpg", title: "Falls in the Meadow" },
  { src: "/oldimages/products-Lost_Souls_57053e7fca245.jpg", title: "Lost Souls" },
  { src: "/oldimages/products-Waves_Sandstone__52efa6eb85135.jpg", title: "Waves Sandstone" },
  { src: "/oldimages/shhh.-londonjpg1.jpg", title: "London" },
];

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-deep-black/95 px-6 py-4 backdrop-blur-md md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <p className="font-display text-2xl text-foreground">Portfolio</p>
            <p className="mt-1 font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Douglas Stratton Fine Art Photography
            </p>
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
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="mb-3 font-body text-xs uppercase tracking-[0.4em] text-primary">Collection</p>
            <h1 className="font-display text-4xl text-foreground md:text-5xl">All Portfolio Images</h1>
            <div className="gradient-gold mx-auto mt-6 h-[2px] w-16" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioImages.map((image) => (
              <a
                key={image.src}
                href={image.src}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-md border border-primary/20 bg-card/40"
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="p-4">
                  <p className="font-display text-lg text-foreground">{image.title}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
