import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const heroVideoUrl = "https://www.youtube.com/embed/lxQQ81vL2G8?autoplay=1&mute=1&controls=0&loop=1&playlist=lxQQ81vL2G8&modestbranding=1&playsinline=1&rel=0&start=20";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <iframe
          src={heroVideoUrl}
          title="Sand dune hero video"
          className="pointer-events-none absolute left-1/2 top-1/2 h-full min-h-[100vh] w-full min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2 scale-[1.2] border-0"
          allow="autoplay; fullscreen; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
      
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 font-body text-sm uppercase tracking-[0.4em] text-primary"
        >
          Fine Art Travel Photography
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-display text-5xl font-bold leading-tight text-foreground md:text-7xl lg:text-8xl"
        >
          Douglas Stratton
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="gradient-gold mt-8 h-[2px] w-24"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-6 max-w-lg font-body text-sm font-light leading-relaxed text-muted-foreground"
        >
          Capturing the essence of light, landscape, and the human experience through the art of photography
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <Link
            to="/portfolio"
            className="mt-10 inline-block border border-primary px-8 py-3 font-body text-xs uppercase tracking-[0.3em] text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          >
            View Portfolio
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="h-10 w-[1px] animate-pulse bg-primary/50" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
