import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const printImages = [
  {
    src: "/oldimages/1.jpg",
    alt: "Fine art print showcased in a curated interior",
  },
  {
    src: "/oldimages/Whispers_5c337dee41dcf.jpg",
    alt: "Fine art print installation detail",
  },
  {
    src: "/oldimages/shhh.-londonjpg1.jpg",
    alt: "Framed fine art photography in modern space",
  },
];

const PrintsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="prints" className="section-padding bg-background" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 md:order-1"
          >
            <p className="mb-3 font-body text-xs uppercase tracking-[0.4em] text-primary">Premium Collection</p>
            <h2 className="font-display text-4xl font-semibold text-foreground md:text-5xl">
              Fine Art <span className="gradient-gold-text">Prints</span>
            </h2>
            <div className="gradient-gold mt-6 h-[2px] w-16" />
            <p className="mt-8 font-body text-sm font-light leading-[1.9] text-muted-foreground">
              You haven't truly experienced the emotional depth and grandeur of a photograph until you've seen 
              it properly printed and displayed. My Premium Limited Edition Fine Art Prints are produced using 
              the most advanced processes and the highest quality materials available.
            </p>
            <p className="mt-4 font-body text-sm font-light leading-[1.9] text-muted-foreground">
              Combined with my commitment to the finest results, investing in one of these pieces will bring 
              the enriching and visual elegance of nature into your home or office daily.
            </p>
            <a
              href="https://dougstratton.wpengine.com/about/fine-art-printing/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block border border-primary px-8 py-3 font-body text-xs uppercase tracking-[0.3em] text-primary transition-all hover:bg-primary hover:text-primary-foreground"
            >
              Learn More
            </a>
            <div className="mt-8 flex gap-12">
              <div>
                <p className="font-display text-3xl text-primary">50+</p>
                <p className="mt-1 font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">Limited Editions</p>
              </div>
              <div>
                <p className="font-display text-3xl text-primary">12</p>
                <p className="mt-1 font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">Countries</p>
              </div>
              <div>
                <p className="font-display text-3xl text-primary">25+</p>
                <p className="mt-1 font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">Years</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="order-1 md:order-2"
          >
            <div className="grid gap-3 md:grid-cols-2">
              <img
                src={printImages[0].src}
                alt={printImages[0].alt}
                className="col-span-2 aspect-[16/10] w-full rounded-md border border-primary/20 object-cover"
                loading="lazy"
                width={1200}
                height={750}
              />
              <img
                src={printImages[1].src}
                alt={printImages[1].alt}
                className="aspect-[4/3] w-full rounded-md border border-primary/20 object-cover"
                loading="lazy"
                width={900}
                height={675}
              />
              <img
                src={printImages[2].src}
                alt={printImages[2].alt}
                className="aspect-[4/3] w-full rounded-md border border-primary/20 object-cover"
                loading="lazy"
                width={900}
                height={675}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PrintsSection;
