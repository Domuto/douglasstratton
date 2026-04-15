import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const portraitImage = "https://douglasstratton.com/wp-content/uploads/2020/05/Douglass-Stratton-Artist.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-background" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src={portraitImage}
              alt="Douglas Stratton, fine art photographer"
              className="w-full object-cover"
              loading="lazy"
              width={800}
              height={1000}
            />
            <div className="absolute -bottom-4 -right-4 h-full w-full border border-primary/20" style={{ zIndex: -1 }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="mb-3 font-body text-xs uppercase tracking-[0.4em] text-primary">About the Artist</p>
            <h2 className="font-display text-4xl font-semibold text-foreground md:text-5xl">
              The Art of <span className="gradient-gold-text">Seeing</span>
            </h2>
            <div className="gradient-gold mt-6 h-[2px] w-16" />
            <p className="mt-8 font-body text-sm font-light leading-[1.9] text-muted-foreground">
              Whatever the subject, Stratton's intent is the same — capture the essence of his surroundings. 
              Since a camera does not capture all the levels of light that the human eye can see, Stratton 
              captures multiple levels of exposure in each photograph, reviving the dynamic range of light 
              that gets lost in translation between man and machine.
            </p>
            <p className="mt-4 font-body text-sm font-light leading-[1.9] text-muted-foreground">
              Stratton depicts not just beautiful compositions and intriguing scenes, but seeks to transport 
              the viewer into the ambience of the place itself — creating images that resonate with emotion 
              and invite contemplation.
            </p>
            <a
              href="https://dougstratton.wpengine.com/about/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block border border-primary px-8 py-3 font-body text-xs uppercase tracking-[0.3em] text-primary transition-all hover:bg-primary hover:text-primary-foreground"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
