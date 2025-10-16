import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import Skeleton from "@/components/Skeleton";
import { useFetchDataAPI } from "@/hooks/fetchdata";
import ErrorMessage from "@/components/ui/ErrorMessage";

interface EventImage {
  id: number;
  image: string;
  alt: string;
  link: string;
}

interface EventsCarouselProps {
  title?: string;
  width?: string;
}

const EventsCarousel: React.FC<EventsCarouselProps> = ({
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  // Fetch async JSON
  const { loading, data, error, refetch } = useFetchDataAPI({
    apiUrl: "main_website/get_featured_events/1/",
  });

  const images: EventImage[] =
    data?.map((event: any, idx: number) => ({
      id: idx,
      image: event.image,
      alt: event.alt,
      link: `/event_details/${event.id}`,
    })) ?? [];

  // Measure card width after data loads
  useEffect(() => {
    if (!scrollRef.current) return;
    const firstCard = scrollRef.current.querySelector("div > div");
    if (firstCard) {
      setCardWidth((firstCard as HTMLElement).offsetWidth);
    }
  }, [data]); // recalc when data changes

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

  // Auto-scroll after images + cardWidth are ready
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
  }, [cardWidth, images]); // rerun when data or size changes

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
      {location.pathname === "/" && (
        <SectionHeading title="Featured Events" widthClass="w-58" />
      )}
      <FadeIn>
        {error && (
          <div className="py-10">
            <ErrorMessage
              message="Failed to load featured events"
              onRetry={refetch}
            />
          </div>
        )}

        {loading && (
          <div className="flex gap-4 overflow-hidden py-6 max-sm:flex-col">
            <Skeleton className="w-150 max-sm:w-70 h-60 rounded-lg m-auto" />
            <Skeleton className="w-150 h-60 rounded-lg max-sm:hidden" />
            <Skeleton className="w-150 h-60 rounded-lg max-sm:hidden" />
          </div>
        )}

        {!loading && !error && images.length > 0 && (
          <>
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="absolute left-4 md:left-10 top-[52%] transform -translate-y-1/2
                bg-ieee-black-25 text-ieee-white text-lg md:text-xl
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
              className="absolute right-4 md:right-10 top-[52%] transform -translate-y-1/2
                bg-ieee-black-25 text-ieee-white text-lg md:text-xl
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
                      src={img.image}
                      alt={img.alt}
                      className="w-full h-[100%] object-cover rounded-lg cursor-pointer"
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
