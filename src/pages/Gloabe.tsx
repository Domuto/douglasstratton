import { useEffect, useMemo, useRef, useState } from "react";
import ReactGlobe from "react-globe.gl";

type LocationPoint = {
  id: string;
  name: string;
  region: string;
  lat: number;
  lon: number;
  images: string[];
  description: string;
};

const locationPoints: LocationPoint[] = [
  {
    id: "namibia",
    name: "Sossusvlei",
    region: "Namibia",
    lat: -24.73,
    lon: 15.29,
    images: ["/oldimages/products-Waves_Sandstone__52efa6eb85135.jpg"],
    description: "Dune studies and desert light across the Namib landscape.",
  },
  {
    id: "yosemite",
    name: "Yosemite",
    region: "California, USA",
    lat: 37.74,
    lon: -119.59,
    images: ["/oldimages/products-Falls_in_the_mea_4f278ea47fe76.jpg"],
    description: "Water, stone, and mountain atmosphere in changing conditions.",
  },
  {
    id: "newyork",
    name: "New York City",
    region: "New York, USA",
    lat: 40.71,
    lon: -74.0,
    images: ["/oldimages/shhh.-londonjpg1.jpg", "/oldimages/DSC04346-color-copy.jpg"],
    description: "Urban rhythm, reflections, and architectural forms.",
  },
  {
    id: "charleston",
    name: "Charleston",
    region: "South Carolina, USA",
    lat: 32.78,
    lon: -79.93,
    images: ["/oldimages/1.jpg", "/oldimages/Whispers_5c337dee41dcf.jpg"],
    description: "Coastal light and atmospheric southern landscapes.",
  },
  {
    id: "london",
    name: "London",
    region: "United Kingdom",
    lat: 51.5,
    lon: -0.12,
    images: ["/oldimages/shhh.-londonjpg1.jpg"],
    description: "Street abstraction, movement, and graphic light.",
  },
  {
    id: "bigsur",
    name: "Big Sur",
    region: "California, USA",
    lat: 36.27,
    lon: -121.81,
    images: ["/oldimages/Untitled_Panorama2print-web.jpg"],
    description: "Panoramic coastline work and long-form composition.",
  },
  {
    id: "argentina",
    name: "Buenos Aires",
    region: "Argentina",
    lat: -34.6,
    lon: -58.38,
    images: ["/oldimages/products-Lost_Souls_57053e7fca245.jpg"],
    description: "Fine-art studies of city texture and contrast.",
  },
  {
    id: "hawaii",
    name: "Hawaii",
    region: "USA",
    lat: 20.79,
    lon: -156.33,
    images: ["/oldimages/products-Day_Dreams_of_Bi_4f37436b28694.jpg"],
    description: "Ocean energy, volcanic landforms, and atmospheric color.",
  },
  {
    id: "goldenisles",
    name: "Golden Isles",
    region: "Georgia, USA",
    lat: 31.18,
    lon: -81.38,
    images: ["/oldimages/boneyard-starlights.jpg", "/oldimages/products-California_Sunse_4f1c7271c842e.jpg"],
    description: "Night sky and shoreline work from the southeastern coast.",
  },
];

const Globe = () => {
  const [selectedId, setSelectedId] = useState(locationPoints[0].id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [globeSize, setGlobeSize] = useState(560);
  const globeRef = useRef<any>(null);

  const activeId = hoveredId ?? selectedId;

  const activeLocation = useMemo(
    () => locationPoints.find((point) => point.id === activeId) ?? locationPoints[0],
    [activeId],
  );

  const points = useMemo(
    () =>
      locationPoints.map((point) => ({
        ...point,
        size: activeId === point.id ? 0.42 : 0.12,
        color: activeId === point.id ? "#ffd97f" : "rgba(214,168,71,0.8)",
      })),
    [activeId],
  );

  const rings = useMemo(
    () =>
      locationPoints
        .filter((point) => point.id === activeId)
        .map((point) => ({
          lat: point.lat,
          lon: point.lon,
        })),
    [activeId],
  );

  useEffect(() => {
    const controls = globeRef.current?.controls?.();
    if (!controls) return;

    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.enablePan = false;
    controls.minDistance = 180;
    controls.maxDistance = 340;
  }, []);

  useEffect(() => {
    const updateSize = () => {
      const vw = window.innerWidth;
      if (vw < 420) {
        setGlobeSize(300);
      } else if (vw < 640) {
        setGlobeSize(340);
      } else if (vw < 768) {
        setGlobeSize(420);
      } else if (vw < 1024) {
        setGlobeSize(500);
      } else {
        setGlobeSize(560);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    globeRef.current?.pointOfView(
      {
        lat: activeLocation.lat,
        lng: activeLocation.lon,
        altitude: 1.95,
      },
      850,
    );
  }, [activeLocation]);

  return (
    <div className="min-h-screen overflow-hidden bg-background pt-28 pb-16 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="mb-3 font-body text-xs uppercase tracking-[0.4em] text-primary">Photo Map</p>
          <h1 className="font-display text-4xl text-foreground md:text-6xl">
            Interactive <span className="gradient-gold-text">Globe</span>
          </h1>
          <p className="mt-4 font-body text-muted-foreground">
            Hover a location to light up a beam and pop open the work from that place.
          </p>
        </div>

        <div className="relative mt-8 flex items-center justify-center">
          <div
            className="pointer-events-none absolute rounded-full bg-[radial-gradient(circle,rgba(214,168,71,0.28),transparent_62%)] blur-3xl"
            style={{ height: globeSize + 80, width: globeSize + 80 }}
          />

          <div className="relative flex w-full max-w-[980px] flex-col items-center justify-center md:block">
            <div
              className="relative overflow-hidden rounded-full border border-primary/30 bg-black/25 shadow-[0_0_80px_rgba(214,168,71,0.2)] ring-1 ring-primary/25"
              style={{ height: globeSize, width: globeSize }}
            >
              <ReactGlobe
                ref={globeRef}
                width={globeSize}
                height={globeSize}
                globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundImageUrl="https://unpkg.com/three-globe/example/img/night-sky.png"
                backgroundColor="rgba(0,0,0,0)"
                showAtmosphere
                atmosphereColor="#f0c15a"
                atmosphereAltitude={0.22}
                showGraticules
                pointsData={points}
                pointLat="lat"
                pointLng="lon"
                pointAltitude="size"
                pointColor="color"
                pointRadius={0.3}
                pointResolution={20}
                pointLabel={(point) => {
                  const p = point as LocationPoint;
                  return `<div style=\"padding:7px 9px; font-size:12px\"><strong>${p.name}</strong><br/>${p.region}</div>`;
                }}
                ringsData={rings}
                ringLat="lat"
                ringLng="lon"
                ringColor={() => ["rgba(255,217,127,0.9)", "rgba(255,217,127,0.2)"]}
                ringMaxRadius={9}
                ringPropagationSpeed={1.8}
                ringRepeatPeriod={820}
                onPointHover={(point) => {
                  const hovered = point as LocationPoint | null;
                  setHoveredId(hovered?.id ?? null);
                }}
                onPointClick={(point) => {
                  const clicked = point as LocationPoint;
                  setSelectedId(clicked.id);
                }}
              />
            </div>

            <div
              className={`mt-4 w-full max-w-sm rounded-xl border border-primary/35 bg-card/90 p-4 shadow-2xl backdrop-blur-md transition-all duration-300 md:absolute md:bottom-auto md:left-auto md:right-0 md:top-1/2 md:mt-0 md:w-[360px] md:-translate-y-1/2 ${
                hoveredId
                  ? "opacity-100 md:translate-x-8"
                  : "opacity-95 md:translate-x-6"
              }`}
            >
              <p className="font-body text-[10px] uppercase tracking-[0.28em] text-primary/85">Location</p>
              <h2 className="mt-1 font-display text-2xl text-foreground">{activeLocation.name}</h2>
              <p className="mt-1 font-body text-xs text-muted-foreground">{activeLocation.region}</p>
              <p className="mt-3 font-body text-sm text-muted-foreground">{activeLocation.description}</p>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {activeLocation.images.slice(0, 2).map((imageSrc) => (
                  <a
                    key={imageSrc}
                    href={imageSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group overflow-hidden rounded-md border border-primary/25"
                  >
                    <img
                      src={imageSrc}
                      alt={`${activeLocation.name} by Douglas Stratton`}
                      className="h-28 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {locationPoints.map((point) => {
            const isActive = point.id === activeId;
            return (
              <button
                key={point.id}
                type="button"
                onMouseEnter={() => setHoveredId(point.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedId(point.id)}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  isActive
                    ? "border-primary bg-primary/20 text-foreground"
                    : "border-primary/25 bg-background/30 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {point.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Globe;