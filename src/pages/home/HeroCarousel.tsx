import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Skeleton from "@/components/Skeleton";
import { useFetchDataJSON } from "@/hooks/fetchdata";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { Button } from "@/components/ui/Button";
import SplitText from "@/components/ui/SplitText";

interface MediaItem {
  type: "image" | "video";
  src: string;
  alt?: string;
  firstText?: string;
  secondText?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

interface MediaResponse {
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
  const { loading, data, error, refetch } = useFetchDataJSON<MediaResponse>({
    path: "pages/home/data/hero.json",
  });

  const media: MediaItem[] = data?.media ?? [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const autoPlayTimerRef = useRef<number | null>(null);

  // Helper: Convert YouTube URLs to embed format
  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/embed/")) return url;
    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("youtube.com/watch")) {
      const urlParams = new URLSearchParams(url.split("?")[1]);
      videoId = urlParams.get("v") || "";
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const goToNext = () => {
    if (!media.length) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Autoplay (for image-only carousels)
  useEffect(() => {
    if (!media.length || !isPlaying) return;
    const hasVideo = media.some((m) => m.type === "video");
    if (hasVideo) return; // stop autoplay if video present

    autoPlayTimerRef.current = window.setTimeout(() => {
      goToNext();
    }, autoPlayInterval);

    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    };
  }, [currentIndex, isPlaying, autoPlayInterval, media]);

  // Handle video playback
  useEffect(() => {
    const currentMedia = media[currentIndex];
    if (!currentMedia) return;

    videoRefs.current.forEach((video) => video?.pause());
    if (currentMedia.type === "video") {
      const videoElement = videoRefs.current[currentIndex];
      if (videoElement && isPlaying) {
        videoElement.currentTime = 0;
        videoElement
          .play()
          .catch((err) => console.error("Video play error:", err));
      }
    }
  }, [currentIndex, isPlaying, media]);

  // Loading / Error / Empty States
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

  // Rendering
  const hasVideo = media.some((m) => m.type === "video");

  return (
    <div className="relative w-full h-[100vh] overflow-hidden bg-ieee-black mt-[-72px]">
      {/* Video Mode (Only first video shown) */}
      {hasVideo ? (
        media
          .filter((item) => item.type === "video")
          .slice(0, 1)
          .map((item, index) => (
            <div key={index} className="absolute inset-0 w-full h-full">
              {item.src.includes("youtube.com") ||
              item.src.includes("youtu.be") ? (
                <iframe
                  src={`${getYouTubeEmbedUrl(
                    item.src
                  )}?autoplay=1&mute=1&loop=1&controls=0&playlist=${getYouTubeEmbedUrl(
                    item.src
                  )
                    .split("/")
                    .pop()}`}
                  className="absolute inset-0 w-full h-full"
                  style={{ objectFit: "cover" }}
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  title="Hero Video"
                />
              ) : (
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
              )}
            </div>
          ))
      ) : (
        <>
          {/* Image Carousel */}
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
              {/* dark overlay */}
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
