import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import Skeleton from "@/components/skeeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useFetchDataJSON } from "@/hooks/fetchdata";


interface FeaturedEvent {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

interface FeaturedEventsCarouselProps {
  events: FeaturedEvent[];
  color?: string;
}

interface EventImage {
  id: number;
  image: string;
  alt: string;
  link: string;
}

const FeaturedEventsCarousel: React.FC<FeaturedEventsCarouselProps> = ({
  events,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const location = useLocation();

  // ✅ Use fetchDataJSON and point path relative to src
  const { loading, data, error, refetch } = useFetchDataJSON({
    path: "pages/society-and-ag/data/Events.json",
  });

  const images: EventImage[] =
    events?.map((event: any) => ({
      id: event.id,
      alt: event.name,
      image: event.image,
      link: `/event_details/${event.id}`,
    })) ?? [];

  const loopImages = [...images, ...images];

  useEffect(() => {
    if (!scrollRef.current) return;
    const firstCard = scrollRef.current.querySelector("div > div");
    if (firstCard) setCardWidth((firstCard as HTMLElement).offsetWidth);
  }, [data]);

  useEffect(() => {
    if (!scrollRef.current || images.length === 0) return;

    const container = scrollRef.current;
    const scrollSpeed = 0.8;

    const scroll = () => {
      container.scrollLeft += scrollSpeed;
      if (container.scrollLeft >= container.scrollWidth / 2)
        container.scrollLeft = 0;
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    // ✅ Proper cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null; // reset
      }
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

export default FeaturedEventsCarousel;
