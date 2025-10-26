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

const EventsCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const [cardWidth, setCardWidth] = useState(0);

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

  // Duplicate images for seamless loop
  const loopImages = [...images, ...images];

  useEffect(() => {
    if (!scrollRef.current) return;
    const firstCard = scrollRef.current.querySelector("div > div");
    if (firstCard) {
      setCardWidth((firstCard as HTMLElement).offsetWidth);
    }
  }, [data]);

  // Continuous auto-scroll
  useEffect(() => {
    if (!scrollRef.current || images.length === 0) return;

    const container = scrollRef.current;
    const scrollSpeed = 0.8; // adjust speed (px/frame)

    const scroll = () => {
      container.scrollLeft += scrollSpeed;

      // reset to half point (start again seamlessly)
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }

      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [images, cardWidth]);

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
          <div
            ref={scrollRef}
            className="flex overflow-x-hidden whitespace-nowrap py-6"
          >
            {loopImages.map((img, index) => (
              <div
                key={index}
                className="flex-shrink-0 overflow-hidden rounded-lg
                  max-w-[100%] md:max-w-[50%] lg:max-w-[33.3333%] px-2"
              >
                <Link to={img.link}>
                  <img
                    src={img.image}
                    alt={img.alt}
                    className="w-full h-[100%] object-cover rounded-lg cursor-pointer"
                  />
                </Link>
              </div>
            ))}
          </div>
        )}
      </FadeIn>
    </div>
  );
};

export default EventsCarousel;
