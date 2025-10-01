import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"; // assuming you use react-router
import dummy1 from "../../assets/dummy/image1.png";
import dummy2 from "../../assets/dummy/image2.png";
import dummy3 from "../../assets/dummy/image3.png";
import dummy4 from "../../assets/dummy/image4.png";
import dummy5 from "../../assets/dummy/image5.png";

import SectionHeading from "@/components/ui/section-heading";
import FadeIn from "@/components/ui/fade-in";
import Skeleton from "@/components/skeleton";
import { useFetchDataJSON } from "@/hooks/fetchdata";
import ErrorMessage from "@/components/ui/error-msg";

interface EventImage {
  id: number;
  src: string;
  alt: string;
  link: string;
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

const EventsCarousel: React.FC<EventsCarouselProps> = ({
  title = "Featured Events",
  width = "36",
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  // 🔹 Fetch events.json with error handling
  const { loading, data, error, refetch } = useFetchDataJSON({
    path: "pages/home/data/events-carousel.json",
  });

  const images: EventImage[] =
    data?.map((event: any, idx: number) => ({
      id: idx,
      src: imageMap[event.src] || event.src,
      alt: event.alt,
      link: `/event_details/${idx}`, // dynamic link
    })) ?? [];

  // 🔹 Measure card width for scroll
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

  // 🔹 Smooth scroll animation
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

  // 🔹 Scroll to index
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

  // 🔹 Auto-scroll effect
  useEffect(() => {
    if (cardWidth === 0 || images.length === 0) return;

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
  }, [cardWidth, images.length]);

  // 🔹 Update index on manual scroll
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
        {/* 🔹 Error State */}
        {error && (
          <div className="py-10">
            <ErrorMessage message={"Failed to load featured events"} onRetry={refetch} />
          </div>
        )}

        {/* 🔹 Loading State */}
        {loading && (
          <div className="flex gap-4 overflow-hidden py-6 max-sm:flex-col">
            <Skeleton className="w-150 max-sm:w-70 h-60 rounded-lg m-auto" />
            <Skeleton className="w-150 h-60 rounded-lg max-sm:hidden" />
            <Skeleton className="w-150 h-60 rounded-lg max-sm:hidden" />
          </div>
        )}

        {/* 🔹 Carousel when data is ready */}
        {!loading && !error && (
          <>
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="absolute left-4 md:left-10 top-[62%] transform -translate-y-1/2
                bg-ieee-blue-50 text-ieee-white text-lg md:text-xl
                rounded-full border p-3 md:px-5 shadow-lg hover:shadow-2xl
                transition-all duration-300 ease-in-out z-20
                flex items-center justify-center ring-1 ring-ieee-white-25 hover:ring-ieee-white-50
                cursor-pointer"
              aria-label="Previous Slide"
            >
              &#10094;
            </button>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="absolute right-4 md:right-10 top-[62%] transform -translate-y-1/2
                bg-ieee-blue-50 text-ieee-white text-lg md:text-xl
                rounded-full border p-3 md:px-5 shadow-lg hover:shadow-2xl
                transition-all duration-300 ease-in-out z-20
                flex items-center justify-center ring-1 ring-ieee-white-25 hover:ring-ieee-white-50
                cursor-pointer"
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
                  key={img.id}
                  className="snap-center flex-shrink-0 overflow-hidden rounded-lg
                    max-w-[100%] md:max-w-[50%] lg:max-w-[33.3333%] px-2"
                >
                  <Link to={img.link}>
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-auto object-cover rounded-lg cursor-pointer"
                      onClick={() => scrollToIndex(index)}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </FadeIn>
    </div>
  );
};

export default EventsCarousel;