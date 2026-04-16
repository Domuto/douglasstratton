import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const images = [
  {
    src: "/oldimages/Untitled_Panorama2print-web.jpg",
    title: "Panorama Study",
    location: "Selected Works",
    span: "md:col-span-2",
    ratio: "aspect-[16/9]",
    href: "/oldimages/Untitled_Panorama2print-web.jpg",
  },
  {
    src: "/oldimages/products-Day_Dreams_of_Bi_4f37436b28694.jpg",
    title: "Day Dreams",
    location: "Selected Works",
    span: "",
    ratio: "aspect-[4/5]",
    href: "/oldimages/products-Day_Dreams_of_Bi_4f37436b28694.jpg",
  },
  {
    src: "/oldimages/products-Waves_Sandstone__52efa6eb85135.jpg",
    title: "Waves Sandstone",
    location: "Selected Works",
    span: "",
    ratio: "aspect-[4/5]",
    href: "/oldimages/products-Waves_Sandstone__52efa6eb85135.jpg",
  },
  {
    src: "/oldimages/DSC04346-color-copy.jpg",
    title: "Color Field",
    location: "Fine Art Series",
    span: "",
    ratio: "aspect-[4/5]",
    href: "/oldimages/DSC04346-color-copy.jpg",
  },
  {
    src: "/oldimages/boneyard-starlights.jpg",
    title: "Boneyard Starlights",
    location: "Landscape Collection",
    span: "md:col-span-2",
    ratio: "aspect-[16/9]",
    href: "/oldimages/boneyard-starlights.jpg",
  },
  {
    src: "/oldimages/products-California_Sunse_4f1c7271c842e.jpg",
    title: "California Sunset",
    location: "Selected Works",
    span: "",
    ratio: "aspect-[4/5]",
    href: "/oldimages/products-California_Sunse_4f1c7271c842e.jpg",
  },
  {
    src: "/oldimages/products-Falls_in_the_mea_4f278ea47fe76.jpg",
    title: "Falls in the Meadow",
    location: "Landscape Collection",
    span: "",
    ratio: "aspect-[4/5]",
    href: "/oldimages/products-Falls_in_the_mea_4f278ea47fe76.jpg",
  },
  {
    src: "/oldimages/products-Lost_Souls_57053e7fca245.jpg",
    title: "Lost Souls",
    location: "Selected Works",
    span: "md:col-span-2",
    ratio: "aspect-[16/9]",
    href: "/oldimages/products-Lost_Souls_57053e7fca245.jpg",
  },
];

const GalleryItem = ({ image, index }: { image: typeof images[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.a
      ref={ref}
      href={image.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative block cursor-pointer overflow-hidden rounded-md border border-primary/20 bg-card/40 ${image.span} ${image.ratio}`}
    >
      <img
        src={image.src}
        alt={`${image.title} - ${image.location}`}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        width={1024}
        height={1024}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
      <div className="absolute bottom-0 left-0 w-full p-5 md:p-6">
        <p className="font-display text-lg text-foreground">{image.title}</p>
        <p className="mt-1 font-body text-xs uppercase tracking-[0.2em] text-primary">{image.location}</p>
      </div>
    </motion.a>
  );
};

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="gallery" className="section-padding bg-deep-black" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 font-body text-xs uppercase tracking-[0.4em] text-primary">Portfolio</p>
          <h2 className="font-display text-4xl font-semibold text-foreground md:text-5xl">
            Selected <span className="gradient-gold-text">Works</span>
          </h2>
          <div className="gradient-gold mx-auto mt-6 h-[2px] w-16" />
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {images.map((image, i) => (
            <GalleryItem key={image.title} image={image} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
