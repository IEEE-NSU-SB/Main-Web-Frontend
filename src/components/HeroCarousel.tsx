import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
      src: "https://assets.mixkit.co/videos/preview/mixkit-students-walking-in-a-university-campus-4519-large.mp4",
      title: "Campus Life at NSU",
      description: "Join our vibrant community of innovators",
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
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const autoPlayTimerRef = useRef<number | null>(null);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + media.length) % media.length,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
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
    <div className="relative w-full h-[600px] overflow-hidden bg-black">
      {/* Media Items */}
      <div className="absolute inset-0">
        {media.map((item, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 w-full h-full transition-opacity duration-1000",
              currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0",
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
                src={item.src}
                className="w-full h-full object-cover"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={item.title || "Video"}
              />
            ) : (
              <video
                ref={(el) => { videoRefs.current[index] = el; }}
                src={item.src}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
              />
            )}

            {/* Content Overlay */}
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-8 md:px-16 lg:px-24">
              <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {item.title}
              </h2>
              <p className="text-white/90 text-lg md:text-xl max-w-2xl">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      {showControls && (
        <div className="absolute z-20 bottom-8 right-8 flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/20 hover:bg-white/40 text-white"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous slide</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/20 hover:bg-white/40 text-white"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
            <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/20 hover:bg-white/40 text-white"
            onClick={goToNext}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next slide</span>
          </Button>
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
                currentIndex === index ? "bg-white w-6" : "bg-white/50",
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
