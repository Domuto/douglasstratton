import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Play } from "lucide-react";

const videos = [
  {
    title: "A Day in the Life",
    location: "Selected Works",
    href: "https://www.youtube.com/watch?v=nJapwtcRnZ8",
    thumbnail: "https://douglasstratton.com/wp-content/uploads/2019/11/day-in-life-tn.png",
  },
  {
    title: "Chasing Light",
    location: "American South West",
    href: "https://vimeo.com/162739040",
    thumbnail: "https://i.vimeocdn.com/video/565358272-12667681942476b248ebed1f130d687f5fd587ff3688861305dcb0695d312b0f-d_840?region=us",
  },
  {
    title: "Pieces of Dreams",
    location: "Selected Works",
    href: "https://vimeo.com/304435338",
    thumbnail: "https://i.vimeocdn.com/video/743657970-14e413fa8e16ae9a92eaf0d49f8310570c68e5e8024867ac428c13b2ddc06f74-d_840?region=us",
  },
  {
    title: "Heart of the City",
    location: "Selected Works",
    href: "https://vimeo.com/321808007",
    thumbnail: "https://i.vimeocdn.com/video/764606629-72c6fbe960ea679bfd6b2a9ae16b8e91c808814c5bc51bcdc5297bd43091820c-d_840?region=us",
  },
  {
    title: "Rust Dune Sossusvlei Namibia",
    location: "Namibia",
    href: "https://www.youtube.com/watch?v=lxQQ81vL2G8",
    thumbnail: "https://i.ytimg.com/vi/lxQQ81vL2G8/maxresdefault.jpg",
  },
];

const VideoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="videos" className="section-padding bg-deep-black" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 font-body text-xs uppercase tracking-[0.4em] text-primary">Motion</p>
          <h2 className="font-display text-4xl font-semibold text-foreground md:text-5xl">
            A Day in the <span className="gradient-gold-text">Life</span>
          </h2>
          <div className="gradient-gold mx-auto mt-6 h-[2px] w-16" />
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {videos.map((video, i) => (
            <motion.div
              key={video.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative overflow-hidden"
            >
              <div className="relative aspect-video">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width={1280}
                  height={720}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-background/30 transition-colors group-hover:bg-background/50">
                  <a
                    href={video.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary text-primary transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground"
                  >
                    <Play className="ml-1 h-6 w-6" />
                  </a>
                </div>
              </div>
              <div className="mt-4">
                <p className="font-display text-lg text-foreground">{video.title}</p>
                <p className="mt-1 font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">{video.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
