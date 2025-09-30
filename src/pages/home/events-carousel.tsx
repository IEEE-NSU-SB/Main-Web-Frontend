import React, { useEffect, useRef, useState } from "react";
import dummy1 from "../../assets/dummy/image1.png";
import dummy2 from "../../assets/dummy/image2.png";
import dummy3 from "../../assets/dummy/image3.png";
import dummy4 from "../../assets/dummy/image4.png";
import dummy5 from "../../assets/dummy/image5.png";
import SectionHeading from "@/components/ui/section-heading";
import eventsData from "./data/featured-events.json";
import FadeIn from "@/components/ui/fade-in";

interface EventImage {
  src: string;
  alt: string;
}

interface EventsCarouselProps {
  title?: string;
  width?: string;
}

// Map image paths in JSON to actual imports
const imageMap: Record<string, string> = {
  "/assets/dummy/image1.png": dummy1,
  "/assets/dummy/image2.png": dummy2,
  "/assets/dummy/image3.png": dummy3,
  "/assets/dummy/image4.png": dummy4,
  "/assets/dummy/image5.png": dummy5,
};

const images: EventImage[] = eventsData.map((event) => ({
  src: imageMap[event.src] || event.src,
  alt: event.alt,
}));

const EventsCarousel: React.FC<EventsCarouselProps> = ({
  title = "Featured Events",
  width = "36",
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

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
    return () => window.removeEventListener("resize", measureCardWidth);
  }, []);

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
      element.scrollLeft = start + change * easeInOutQuad(progress);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current || cardWidth === 0) return;
    const container = scrollRef.current;
    const maxOffset = container.scrollWidth - container.clientWidth;
    const offset = Math.min(
      Math.max(
        index * cardWidth - container.clientWidth / 2 + cardWidth / 2,
        0
      ),
      maxOffset
    );
    animateScrollTo(container, offset, 600);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (cardWidth === 0) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        scrollToIndex(nextIndex);
        return nextIndex;
      });
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [cardWidth]);

  const handleScroll = () => {
    if (!scrollRef.current || cardWidth === 0) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const index = Math.round(
      (scrollLeft + container.clientWidth / 2 - cardWidth / 2) / cardWidth
    );
    if (index !== currentIndex && index >= 0 && index < images.length)
      setCurrentIndex(index);
  };

  const prevSlide = () =>
    scrollToIndex((currentIndex - 1 + images.length) % images.length);
  const nextSlide = () => scrollToIndex((currentIndex + 1) % images.length);

  return (
    <div className="w-full py-4 relative">
        <SectionHeading title={title} widthClass={`w-${width}`} />
        <FadeIn>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="
      absolute left-4 md:left-10 top-[62%] transform -translate-y-1/2
      bg-ieee-blue-50
      text-ieee-white text-lg md:text-xl
      rounded-full border p-3 md:px-5
      shadow-lg hover:shadow-2xl
      transition-all duration-300 ease-in-out
      z-20
      flex items-center justify-center
      ring-1 ring-ieee-white-25 hover:ring-ieee-white-50
      cursor-pointer
    "
          aria-label="Previous Slide"
        >
          &#10094;
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="
      absolute right-4 md:right-10 top-[62%] transform -translate-y-1/2
      bg-ieee-blue-50
      text-ieee-white text-lg md:text-xl
      rounded-full border p-3 md:px-5
      shadow-lg hover:shadow-2xl
      transition-all duration-300 ease-in-out
      z-20
      flex items-center justify-center
      ring-1 ring-ieee-white-25 hover:ring-ieee-white-50
      cursor-pointer
    "
          aria-label="Next Slide"
        >
          &#10095;
        </button>

        {/* Carousel */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto scroll-smooth py-6 scrollbar-hide"
        >
          {images.map((img, index) => (
            <div
              key={index}
              className="
              snap-center flex-shrink-0 overflow-hidden rounded-lg
              max-w-[100%] md:max-w-[50%] lg:max-w-[33.3333%]
              px-2
            "
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto object-cover rounded-lg cursor-pointer"
                onClick={() => scrollToIndex(index)}
              />
            </div>
          ))}
        </div>
    </FadeIn>
      </div>
  );
};

export default EventsCarousel;
