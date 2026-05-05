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
  const globeRef = useRef<any>(null);

  const selected = useMemo(
    () => locationPoints.find((point) => point.id === selectedId) ?? locationPoints[0],
    [selectedId],
  );

  const points = useMemo(
    () =>
      locationPoints.map((point) => ({
        ...point,
        size: selectedId === point.id ? 0.5 : 0.25,
        color: selectedId === point.id ? "#f0c15a" : "#d6a847",
      })),
    [selectedId],
  );

  const rings = useMemo(
    () =>
      locationPoints
        .filter((point) => point.id === selectedId)
        .map((point) => ({
          lat: point.lat,
          lon: point.lon,
        })),
    [selectedId],
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
    globeRef.current?.pointOfView(
      {
        lat: selected.lat,
        lng: selected.lon,
        altitude: 2.1,
      },
      900,
    );
  }, [selected]);

  return (
    <div className="min-h-screen bg-background pt-28 pb-16 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-3 font-body text-xs uppercase tracking-[0.4em] text-primary">Photo Map</p>
          <h1 className="font-display text-4xl text-foreground md:text-6xl">
            Interactive <span className="gradient-gold-text">Globe</span>
          </h1>
          <p className="mt-4 font-body text-muted-foreground">
            Drag the real-world globe, click a highlighted location, and view photos made there.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[460px,1fr] lg:items-start">
          <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-b from-card/70 to-card/30 p-5 shadow-2xl shadow-black/30">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(214,168,71,0.18),transparent_55%)]" />
            <div className="relative mx-auto h-[420px] w-[420px] overflow-hidden rounded-full ring-1 ring-primary/30">
              <ReactGlobe
                ref={globeRef}
                width={420}
                height={420}
                globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundImageUrl="https://unpkg.com/three-globe/example/img/night-sky.png"
                backgroundColor="rgba(0,0,0,0)"
                showAtmosphere
                atmosphereColor="#d6a847"
                atmosphereAltitude={0.18}
                showGraticules
                pointsData={points}
                pointLat="lat"
                pointLng="lon"
                pointAltitude="size"
                pointColor="color"
                pointRadius={0.48}
                pointResolution={14}
                pointLabel={(point) => {
                  const p = point as LocationPoint;
                  return `<div style=\"padding:6px 8px; font-size:12px\"><strong>${p.name}</strong><br/>${p.region}</div>`;
                }}
                ringsData={rings}
                ringLat="lat"
                ringLng="lon"
                ringColor={() => ["rgba(240,193,90,0.75)", "rgba(240,193,90,0.15)"]}
                ringMaxRadius={7}
                ringPropagationSpeed={1.5}
                ringRepeatPeriod={900}
                onPointClick={(point) => {
                  const clicked = point as LocationPoint;
                  setSelectedId(clicked.id);
                }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-primary/20 bg-gradient-to-b from-card/65 to-card/35 p-6">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-primary">Selected Location</p>
            <h2 className="mt-2 font-display text-3xl text-foreground">{selected.name}</h2>
            <p className="mt-1 font-body text-sm text-muted-foreground">{selected.region}</p>
            <p className="mt-4 font-body text-muted-foreground">{selected.description}</p>

            <div className="mt-6">
              <p className="mb-3 font-body text-xs uppercase tracking-[0.28em] text-primary/80">Jump to location</p>
              <div className="flex flex-wrap gap-2">
                {locationPoints.map((point) => {
                  const isActive = point.id === selectedId;
                  return (
                    <button
                      key={point.id}
                      type="button"
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

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {selected.images.map((imageSrc) => (
                <a
                  key={imageSrc}
                  href={imageSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group overflow-hidden rounded-md border border-primary/20"
                >
                  <img
                    src={imageSrc}
                    alt={`${selected.name} by Douglas Stratton`}
                    className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Globe;