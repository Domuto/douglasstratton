import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const dayInLifeImg = "https://douglasstratton.com/wp-content/uploads/2019/11/day-in-life-tn.png";
const chasingLightImg = "https://i.vimeocdn.com/video/565358272-12667681942476b248ebed1f130d687f5fd587ff3688861305dcb0695d312b0f-d_840?region=us";
const piecesOfDreamsImg = "https://i.vimeocdn.com/video/743657970-14e413fa8e16ae9a92eaf0d49f8310570c68e5e8024867ac428c13b2ddc06f74-d_840?region=us";
const heartOfTheCityImg = "https://i.vimeocdn.com/video/764606629-72c6fbe960ea679bfd6b2a9ae16b8e91c808814c5bc51bcdc5297bd43091820c-d_840?region=us";
const rustDuneImg = "https://i.ytimg.com/vi/lxQQ81vL2G8/maxresdefault.jpg";

const images = [
  {
    src: dayInLifeImg,
    title: "A Day in the Life",
    location: "Selected Works",
    span: "md:col-span-2",
    ratio: "aspect-[16/9]",
    href: "https://www.youtube.com/watch?v=nJapwtcRnZ8",
  },
  {
    src: chasingLightImg,
    title: "Chasing Light",
    location: "American South West",
    span: "",
    ratio: "aspect-[4/5]",
    href: "https://vimeo.com/162739040",
  },
  {
    src: piecesOfDreamsImg,
    title: "Pieces of Dreams",
    location: "Selected Works",
    span: "",
    ratio: "aspect-[4/5]",
    href: "https://vimeo.com/304435338",
  },
  {
    src: heartOfTheCityImg,
    title: "Heart of the City",
    location: "Selected Works",
    span: "",
    ratio: "aspect-[4/5]",
    href: "https://vimeo.com/321808007",
  },
  {
    src: rustDuneImg,
    title: "Rust Dune",
    location: "Sossusvlei, Namibia",
    span: "md:col-span-2",
    ratio: "aspect-[16/9]",
    href: "https://www.youtube.com/watch?v=lxQQ81vL2G8",
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
