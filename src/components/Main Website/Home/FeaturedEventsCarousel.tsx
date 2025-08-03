import React, { useEffect, useRef, useState } from "react";
import dummy1 from "../../../assets/dummy/image1.png";
import dummy2 from "../../../assets/dummy/image2.png";
import dummy3 from "../../../assets/dummy/image3.png";
import dummy4 from "../../../assets/dummy/image4.png";
import dummy5 from "../../../assets/dummy/image5.png";
import SectionHeading from "../../ui/SectionHeading";

interface EventImage {
  src: string;
  alt: string;
}

const imageSources = [
  { src: dummy1, alt: "Event 1" },
  { src: dummy2, alt: "Event 2" },
  { src: dummy3, alt: "Event 3" },
  { src: dummy4, alt: "Event 4" },
  { src: dummy5, alt: "Event 5" },
  { src: dummy1, alt: "Event 1" },
  { src: dummy2, alt: "Event 2" },
  { src: dummy3, alt: "Event 3" },
  { src: dummy4, alt: "Event 4" },
  { src: dummy5, alt: "Event 5" },
  { src: dummy1, alt: "Event 1" },
  { src: dummy2, alt: "Event 2" },
  { src: dummy3, alt: "Event 3" },
  { src: dummy4, alt: "Event 4" },
  { src: dummy5, alt: "Event 5" },
];

const images: EventImage[] = imageSources.map(({ src, alt }) => ({ src, alt }));

const FeaturedEventsCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  // Measure card width on mount and resize
  useEffect(() => {
    const measureCardWidth = () => {
      if (!scrollRef.current) return;
      const firstCard = scrollRef.current.querySelector("div > div");
      if (firstCard) {
        setCardWidth((firstCard as HTMLElement).offsetWidth);
      }
    };

    measureCardWidth();
    window.addEventListener("resize", measureCardWidth);

    return () => {
      window.removeEventListener("resize", measureCardWidth);
    };
  }, []);

  // Manual smooth scroll animation helper
  const animateScrollTo = (
    element: HTMLElement,
    target: number,
    duration = 800
  ) => {
    const start = element.scrollLeft;
    const change = target - start;
    const startTime = performance.now();

    const easeInOutQuad = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutQuad(progress);

      element.scrollLeft = start + change * easedProgress;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current || cardWidth === 0) return;
    const container = scrollRef.current;
    const maxOffset = container.scrollWidth - container.clientWidth;
    const offset = Math.min(
      Math.max(index * cardWidth - container.clientWidth / 2 + cardWidth / 2, 0),
      maxOffset
    );

    animateScrollTo(container, offset, 2000);
    setCurrentIndex(index);
  };

  // Auto scroll every 5 seconds
  useEffect(() => {
    if (cardWidth === 0) return; // wait until cardWidth measured
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        scrollToIndex(nextIndex);
        return nextIndex;
      });
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [cardWidth]);

  // Sync currentIndex when user scrolls manually
  const handleScroll = () => {
    if (!scrollRef.current || cardWidth === 0) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const index = Math.round(
      (scrollLeft + container.clientWidth / 2 - cardWidth / 2) / cardWidth
    );

    if (index !== currentIndex && index >= 0 && index < images.length) {
      setCurrentIndex(index);
    }
  };

  return (
    <div className="w-full py-4">

      <SectionHeading title="Featured Events" widthClass="w-62" />

      {/* Carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto scroll-smooth px-4 scrollbar-hide"
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="
              snap-center flex-shrink-0 overflow-hidden shadow-md rounded-lg
              max-w-[100%] md:max-w-[50%] lg:max-w-[33.3333%]
              px-2
            "
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-auto object-cover rounded-lg cursor-pointer"
              onClick={() => scrollToIndex(index)} // optional: click on image to scroll
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-ieee-darkblue-75 scale-110" : "bg-ieee-gray-25"
            }`}
            onClick={() => scrollToIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedEventsCarousel;
