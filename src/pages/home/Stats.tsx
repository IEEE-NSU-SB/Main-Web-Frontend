import { useRef, useEffect } from "react";
import Odometer from "odometer";
import "odometer/themes/odometer-theme-default.css";

import ScaleUp from "@/components/ui/ScaleUp";
import Skeleton from "@/components/skeeleton";
import { useFetchDataAPI } from "@/hooks/fetchdata";
import ErrorMessage from "../../components/ui/ErrorMessage";

type Stat = {
  label: string;
  value: number;
};

type StatsResponse = {
  stats: Stat[];
};

const Stats = () => {
  const { loading, data, error, refetch } = useFetchDataAPI<StatsResponse>({
    apiUrl: "main_website/get_sc_ag_stats/",
  });

  const stats: Stat[] = data?.stats ?? [];
  const refs = useRef<(HTMLParagraphElement | null)[]>([]);
  const backgroundRef = useRef<HTMLDivElement | null>(null);

  // Odometer animation
  useEffect(() => {
    if (!stats.length) return;

    refs.current.forEach((el, index) => {
      if (!el) return;

      const odometer = new Odometer({ el, value: 0 });
      let hasRun = false;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasRun) {
              odometer.update(stats[index].value);
              hasRun = true;
            }
          });
        },
        { threshold: 0.8 }
      );

      observer.observe(el);
    });
  }, [stats]);

  // Shapes move with mouse
  useEffect(() => {
    const createShapes = () => {
      if (!backgroundRef.current) return;
      const shapeTypes = ["square", "circle", "triangle", "rectangle"];

      // Decide number of shapes based on viewport width
      let numberOfShapes = 40; // default for desktop
      if (window.innerWidth < 768) numberOfShapes = 15; // phones
      else if (window.innerWidth < 1024) numberOfShapes = 25; // tablets

      for (let i = 0; i < numberOfShapes; i++) {
        const shape = document.createElement("div");
        shape.className = `shape ${
          shapeTypes[Math.floor(Math.random() * shapeTypes.length)]
        }`;

        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 10 + 10;

        shape.style.left = `${posX}%`;
        shape.style.top = `${posY}%`;
        shape.dataset.initialX = posX.toString();
        shape.dataset.initialY = posY.toString();
        shape.style.animationDelay = `${delay}s`;
        shape.style.animationDuration = `${duration}s`;

        backgroundRef.current.appendChild(shape);
      }
    };

    createShapes();
  }, []);

  const boxClasses =
    "rounded text-ieee-blue bg-ieee-white/80 backdrop-blur-lg relative z-10 shadow-[2px_2px_4px_theme(colors.ieee-black-25)]";
  const valueClasses = "text-3xl md:text-5xl font-bold mb-2 m-8 odometer";
  const labelClasses = "text-sm md:text-lg font-bold mb-8";

  return (
    <section className="w-full py-20 relative bg-cover bg-center overflow-hidden px-5 bg-ieee-darkblue">
      <div
        ref={backgroundRef}
        id="geometric-background"
        className="absolute inset-0 z-0"
      ></div>
      <div className="absolute inset-0  z-0"></div>

      <div className="relative max-w-[1040px] mx-auto z-10">
        <ScaleUp>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <Skeleton className="h-35 w-full" />
              <Skeleton className="h-35 w-full" />
              <Skeleton className="h-35 w-full" />
              <Skeleton className="h-35 w-full" />
            </div>
          ) : error ? (
            <ErrorMessage message={"Failed to load stats"} onRetry={refetch} />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className={boxClasses}>
                  <p
                    className={valueClasses}
                    ref={(el) => {
                      refs.current[index] = el;
                    }}
                  >
                    0
                  </p>
                  <p className={labelClasses}>{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </ScaleUp>
      </div>
    </section>
  );
};

export default Stats;
