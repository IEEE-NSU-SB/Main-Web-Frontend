import { useEffect, useRef } from "react";
import Odometer from "odometer";
import "odometer/themes/odometer-theme-default.css";

const stats = [
  { value: 4, label: "CHAPTER & AG" },
  { value: 636, label: "MEMBERS" },
  { value: 264, label: "EVENTS" },
  { value: 57, label: "ACHIEVEMENTS" },
];

const StatsSection = () => {
  const refs = useRef<(HTMLParagraphElement | null)[]>([]);
  const backgroundRef = useRef<HTMLDivElement | null>(null);

  // Odometer animation
  useEffect(() => {
    refs.current.forEach((el, index) => {
      if (!el) return;

      const odometer = new Odometer({ el: el, value: 0 });
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
  }, []);

  // Shapes move with mouse
  useEffect(() => {
    const createShapes = () => {
      if (!backgroundRef.current) return;
      const shapeTypes = ["square", "circle", "triangle", "rectangle"];
      for (let i = 0; i < 40; i++) {
        const shape = document.createElement("div");
        shape.className = `shape ${shapeTypes[Math.floor(Math.random() * shapeTypes.length)]}`;

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

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;

      const shapes = backgroundRef.current?.querySelectorAll<HTMLDivElement>(".shape");
      shapes?.forEach((shape) => {
        const initialX = parseFloat(shape.dataset.initialX || "0");
        const initialY = parseFloat(shape.dataset.initialY || "0");

        const moveX = initialX + x * 5; // adjust 5 for intensity
        const moveY = initialY + y * 5;

        shape.style.left = `${moveX}%`;
        shape.style.top = `${moveY}%`;
      });
    };

    createShapes();
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const boxClasses = "rounded text-[#00629B] bg-[#fff]/75 backdrop-blur-l relative z-10";
  const valueClasses = "text-5xl font-bold mb-2 m-8 odometer text-stroke";
  const labelClasses = "text-lg font-bold mb-8";

  return (
    <section
      className="w-full py-20 relative bg-cover bg-center overflow-hidden max-md:px-5"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1950&q=80')",
          background:"#00629b",
      }}
    >
      <div ref={backgroundRef} id="geometric-background" className="absolute inset-0 z-0"></div>
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      <div className="relative max-w-[1000px] mx-auto z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className={boxClasses}>
              <p
                className={valueClasses}
                ref={(el) => (refs.current[index] = el)}
              >
                0
              </p>
              <p className={labelClasses}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
