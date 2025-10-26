import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Skeleton from "@/components/Skeleton";
import { useFetchDataAPI } from "@/hooks/fetchdata";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { Button } from "@/components/ui/Button";
import SplitText from "@/components/ui/SplitText";

interface MediaItem {
  src: string;
  alt?: string;
  firstText?: string;
  secondText?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  banner_image?: string; // for images
  link?: string; // for videos
}

interface MediaGroup {
  type: "image" | "video";
  media: MediaItem[];
}

interface HeroCarouselProps {
  autoPlayInterval?: number;
  showIndicators?: boolean;
}

const HeroCarousel = ({
  autoPlayInterval = 5000,
  showIndicators = true,
}: HeroCarouselProps) => {
  const { loading, data, error, refetch } = useFetchDataAPI<MediaGroup>({
    apiUrl: "main_website/get_hero_section_landing/",
  });

  const [media, setMedia] = useState<MediaItem[]>([]);
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const autoPlayTimerRef = useRef<number | null>(null);

  // Process fetched data
  useEffect(() => {
    if (!data) return;

    // Validate structure
    if (data.type === "image" || data.type === "video") {
      setMediaType(data.type);

      const normalized = data.media.map((m) => ({
        ...m,
        src: data.type === "image" ? m.banner_image! : m.link!,
      }));

      setMedia(normalized);
    }
  }, [data]);

  const goToNext = () => {
    if (!media.length) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Autoplay (only for images)
  useEffect(() => {
    if (!media.length || !isPlaying || mediaType === "video") return;
    autoPlayTimerRef.current = window.setTimeout(() => {
      goToNext();
    }, autoPlayInterval);

    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    };
  }, [currentIndex, isPlaying, autoPlayInterval, mediaType, media]);

  // Handle video playback
  useEffect(() => {
    if (mediaType !== "video") return;

    videoRefs.current.forEach((video) => video?.pause());
    const videoElement = videoRefs.current[currentIndex];
    if (videoElement && isPlaying) {
      videoElement.currentTime = 0;
      videoElement.play().catch((err) => console.error("Video play error:", err));
    }
  }, [currentIndex, isPlaying, mediaType]);

  // Loading / Error / Empty
  if (loading)
    return (
      <div className="relative w-full h-[100vh] flex items-center justify-center bg-ieee-black mt-[-72px]">
        <Skeleton className="w-full h-full" />
      </div>
    );

  if (error)
    return (
      <div className="relative w-full h-[100vh] flex items-center justify-center bg-ieee-black mt-[-72px]">
        <ErrorMessage message="Failed to load hero media" onRetry={refetch} />
      </div>
    );

  if (!media.length)
    return (
      <div className="relative w-full h-[100vh] flex items-center justify-center bg-ieee-black mt-[-72px]">
        <p className="text-ieee-white text-xl">No media available</p>
      </div>
    );

  // --- Rendering ---
  return (
    <div className="relative w-full h-[100vh] overflow-hidden bg-ieee-black mt-[-72px]">
      {mediaType === "video" ? (
        // Video Mode
        media.map((item, index) => (
          <div key={index} className="absolute inset-0 w-full h-full">
            <video
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              src={item.src}
              className="absolute inset-0 w-full h-full object-cover"
              muted
              loop
              playsInline
              autoPlay
              controls={false}
            />
          </div>
        ))
      ) : (
        // Image Carousel Mode
        <>
          {media.map((item, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 w-full h-full transition-opacity duration-1000",
                currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
              )}
            >
              <img
                src={item.src}
                alt={item.alt || "Hero image"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Text Overlay */}
              <div className="absolute inset-0 flex flex-col justify-center m-auto max-w-[1080px] px-5 text-left md:text-center">
                {item.firstText && item.secondText && (
                  <div className="flex gap-3">
                    <SplitText
                      text={item.firstText}
                      className="text-ieee-white text-3xl md:text-4xl lg:text-5xl font-bold mb-2"
                      delay={0}
                      duration={0.6}
                      ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 40 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.2}
                      rootMargin="-100px"
                      textAlign="left"
                    />
                    <SplitText
                      text={item.secondText}
                      className="text-ieee-darkyellow text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                      delay={100}
                      duration={0.6}
                      ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 40 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.2}
                      rootMargin="-100px"
                      textAlign="left"
                    />
                  </div>
                )}

                {item.description && (
                  <SplitText
                    text={item.description}
                    className="text-ieee-white-75 text-lg md:text-xl max-w-2xl mb-6"
                    delay={200}
                    duration={0.6}
                    ease="elistic.out(1,0.3)"
                    splitType="lines"
                    from={{ opacity: 0, y: 20 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.3}
                    rootMargin="-100px"
                    textAlign="left"
                  />
                )}

                {item.buttonLink && item.buttonText && (
                  <Button
                    onClick={() => window.open(item.buttonLink, "_blank")}
                    className="bg-ieee-blue hover:bg-ieee-blue-75 text-white font-semibold w-fit px-6 py-2 rounded-xl shadow-[0px_4px_10px_rgba(0,0,0,0.3)] cursor-pointer items-baseline"
                  >
                    {item.buttonText}
                  </Button>
                )}
              </div>
            </div>
          ))}

          {/* Indicators */}
          {showIndicators && media.length > 1 && (
            <div className="absolute z-20 bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
              {media.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    currentIndex === index
                      ? "bg-ieee-white w-6"
                      : "bg-ieee-white-50"
                  )}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HeroCarousel;
