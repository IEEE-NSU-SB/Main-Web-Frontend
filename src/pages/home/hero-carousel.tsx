import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface MediaItem {
  type: "image" | "video";
  src: string;
  alt?: string;
  title?: string;
  description?: string;
}

interface HeroCarouselProps {
  media?: MediaItem[];
  autoPlayInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
}

const HeroCarousel = ({
  media = [
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80",
      alt: "IEEE NSU Event",
      title: "Welcome to IEEE NSU Student Branch",
      description: "Empowering innovation and technology leadership",
    },
    {
      type: "video",
      src: "https://youtu.be/At6Ft9h0jjU?si=2S39GsmDQBXszDtd",
      title: "Industrial Tour 6.0",
      description: "PES",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
      alt: "IEEE Workshop",
      title: "Hands-on Workshops",
      description: "Learn practical skills from industry experts",
    },
  ],
  autoPlayInterval = 5000,
  showControls = true,
  showIndicators = true,
}: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const autoPlayTimerRef = useRef<number | null>(null);

  // Helper function to convert YouTube URLs to embed format
  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/embed/")) {
      return url;
    }

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
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Handle autoplay
  useEffect(() => {
    if (isPlaying) {
      autoPlayTimerRef.current = window.setTimeout(() => {
        goToNext();
      }, autoPlayInterval);
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, [currentIndex, isPlaying, autoPlayInterval]);

  // Handle video playback
  useEffect(() => {
    const currentMedia = media[currentIndex];

    // Pause all videos first
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
      }
    });

    // Play the current video if it's a video slide
    if (currentMedia.type === "video") {
      const videoElement = videoRefs.current[currentIndex];
      if (videoElement) {
        videoElement.currentTime = 0;
        if (isPlaying) {
          videoElement.play().catch((error) => {
            console.error("Error playing video:", error);
          });
        }
      }
    }
  }, [currentIndex, isPlaying, media]);

  return (
    <div className="relative w-full h-[100vh] max-md:h-70 overflow-hidden bg-ieee-black mt-[-80px]">
      {/* Media Items */}
      <div className="absolute inset-0">
        {media.map((item, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 w-full h-full transition-opacity duration-1000",
              currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={item.alt || "Carousel image"}
                className="w-full h-full object-cover"
              />
            ) : item.src.includes("youtube.com") ||
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
                title={item.title || "Video"}
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
                controls={false} // hides video controls
              />
            )}

            {/* Content Overlay */}
            <div className="absolute inset-0 bg-ieee-black-50 flex flex-col justify-center px-5 md:px-6 lg:px-65">
              <h2 className="text-ieee-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {item.title}
              </h2>
              <p className="text-ieee-white-75 text-lg md:text-xl max-w-2xl">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      {showControls && (
        <div className="absolute z-20 bottom-8 right-8 flex items-center gap-2">
          {/* <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/20 hover:bg-white/40 text-white"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous slide</span>
          </Button> */}

          {/* <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-ieee-white-25 hover:bg-ieee-white-50 text-ieee-white"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
            <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
          </Button> */}

          {/* <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/20 hover:bg-white/40 text-white"
            onClick={goToNext}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next slide</span>
          </Button> */}
        </div>
      )}

      {/* Indicators */}
      {showIndicators && (
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
    </div>
  );
};

export default HeroCarousel;
