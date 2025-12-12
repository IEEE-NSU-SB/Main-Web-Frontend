import React, { useState, useRef, useEffect } from "react";
import Wave from "@/components/Wave";
import { useFetchDataAPI } from "@/hooks/fetchdata";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface ImageItem {
  id: number;
  image: string;
}

interface VideoItem {
  id: number;
  title: string;
  link: string;
  description: string;
}

interface GalleryData {
  images: ImageItem[];
  videos: VideoItem[];
}

const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"images" | "videos">("images");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number; distance: number } | null>(null);

  const { loading, data, error } = useFetchDataAPI<GalleryData>({
    apiUrl: "main_website/get_gallery/",
  });

  // Reset zoom when image changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [lightboxIndex]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setTimeout(() => {
      setLightboxIndex(null);
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }, 300);
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null && data?.images) {
      setLightboxIndex((lightboxIndex - 1 + data.images.length) % data.images.length);
    }
  };

  const nextLightbox = () => {
    if (lightboxIndex !== null && data?.images) {
      setLightboxIndex((lightboxIndex + 1) % data.images.length);
    }
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 5));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.5, 1));
    if (scale <= 1.5) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleResetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for pinch zoom and swipe
  const getTouchDistance = (touch1: React.Touch, touch2: React.Touch) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch zoom start
      const distance = getTouchDistance(e.touches[0], e.touches[1]);
      touchStartRef.current = {
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
        distance,
      };
    } else if (e.touches.length === 1 && scale > 1) {
      // Pan start
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
      setIsDragging(true);
    } else if (e.touches.length === 1) {
      // Swipe start
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        distance: 0,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchStartRef.current) {
      // Pinch zoom
      e.preventDefault();
      const distance = getTouchDistance(e.touches[0], e.touches[1]);
      const scaleChange = distance / touchStartRef.current.distance;
      setScale((prev) => Math.min(Math.max(prev * scaleChange, 1), 5));
      touchStartRef.current.distance = distance;
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      // Pan
      e.preventDefault();
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0 && touchStartRef.current && scale === 1) {
      // Swipe detection
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);

      if (Math.abs(deltaX) > 50 && deltaY < 100) {
        if (deltaX > 0) {
          prevLightbox();
        } else {
          nextLightbox();
        }
      }
    }
    setIsDragging(false);
    touchStartRef.current = null;

    if (scale < 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;

      switch (e.key) {
        case "ArrowLeft":
          prevLightbox();
          break;
        case "ArrowRight":
          nextLightbox();
          break;
        case "Escape":
          closeLightbox();
          break;
        case "+":
        case "=":
          handleZoomIn();
          break;
        case "-":
          handleZoomOut();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, data?.images]);

  if (loading) {
    return (
      <>
        <Wave title="Gallery" />
        <div className="flex justify-center items-center min-h-[500px]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 font-medium">Loading gallery...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Wave title="Gallery" />
        <div className="flex justify-center items-center min-h-[500px]">
          <div className="text-center">
            <div className="text-red-600 text-5xl mb-4">⚠</div>
            <p className="text-red-600 font-medium text-lg">Failed to load gallery</p>
            <p className="text-gray-500 mt-2">Please try again later</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Wave title="Gallery" />

      {/* Tabs */}
      <div className="max-w-[1080px] mx-auto px-5 mt-8">
        <div className="flex gap-2 border-b-2 border-gray-200">
          <button
            className={`relative px-8 py-4 font-semibold text-lg hover:cursor-pointer transition-all duration-300 ${activeTab === "images"
              ? "text-blue-600"
              : "text-gray-500 hover:text-gray-700"
              }`}
            onClick={() => setActiveTab("images")}
          >
            Images
            {activeTab === "images" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
          <button
            className={`relative px-8 py-4 font-semibold text-lg hover:cursor-pointer transition-all duration-300 ${activeTab === "videos"
              ? "text-blue-600"
              : "text-gray-500 hover:text-gray-700"
              }`}
            onClick={() => setActiveTab("videos")}
          >
            Videos
            {activeTab === "videos" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-[1080px] mx-auto px-5 py-8">
        {/* Images Tab */}
        {activeTab === "images" && data?.images && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.images.map((item, idx) => (
              <div
                key={item.id}
                className="relative aspect-square overflow-hidden bg-gray-100 cursor-pointer group rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                onClick={() => openLightbox(idx)}
              >
                <img
                  src={item.image}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt={`Gallery image ${item.id}`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Videos Tab - 2 Columns on Desktop, 1 Column on Mobile */}
        {activeTab === "videos" && data?.videos && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.videos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <div className="aspect-video bg-black">
                  <iframe
                    src={video.link}
                    className="w-full h-full"
                    allowFullScreen
                    title={video.title}
                  />
                </div>
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {video.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Advanced Lightbox with Zoom Animation */}
      {lightboxIndex !== null && (
        <div
          className={`fixed inset-0 bg-black z-50 flex items-center justify-center transition-opacity duration-300 ${isLightboxOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 z-50 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
            onClick={closeLightbox}
          >
            <X size={24} strokeWidth={2.5} />
          </button>

          {/* Zoom Controls */}
          <div className="absolute top-6 left-6 z-50 flex flex-col gap-3">
            <button
              className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                handleZoomIn();
              }}
              title="Zoom In"
            >
              <ZoomIn size={20} strokeWidth={2.5} />
            </button>
            <button
              className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                handleZoomOut();
              }}
              title="Zoom Out"
            >
              <ZoomOut size={20} strokeWidth={2.5} />
            </button>
            {scale > 1 && (
              <button
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  handleResetZoom();
                }}
              >
                Reset
              </button>
            )}
          </div>

          {/* Image Counter */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg">
            {lightboxIndex + 1} / {data?.images?.length || 0}
          </div>

          {/* Navigation Buttons */}
          <button
            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-50 bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-full transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              prevLightbox();
            }}
            disabled={scale > 1}
            title="Previous Image"
          >
            <ChevronLeft size={28} strokeWidth={2.5} />
          </button>
          <button
            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-50 bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-full transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              nextLightbox();
            }}
            disabled={scale > 1}
            title="Next Image"
          >
            <ChevronRight size={28} strokeWidth={2.5} />
          </button>

          {/* Image Container with Zoom Animation */}
          <div
            ref={containerRef}
            className={`relative w-full h-full flex items-center justify-center overflow-hidden transition-transform duration-300 ${isLightboxOpen ? "scale-100" : "scale-90"
              }`}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
          >
            <img
              ref={imageRef}
              src={data?.images?.[lightboxIndex]?.image}
              className={`max-h-[90vh] max-w-[90vw] object-contain select-none transition-all duration-300 ${isLightboxOpen ? "opacity-100" : "opacity-0"
                }`}
              style={{
                transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                transformOrigin: "center center",
              }}
              alt={`Gallery image ${data?.images?.[lightboxIndex]?.id}`}
              draggable={false}
            />
          </div>

          {/* Instructions */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg">
            <span className="hidden md:inline">Arrow keys • +/- zoom • ESC close</span>
            <span className="md:hidden">Pinch zoom • Swipe navigate</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;