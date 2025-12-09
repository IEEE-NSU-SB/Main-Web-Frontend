import React, { useState } from "react";
import Wave from "@/components/Wave";

interface ImageItem {
  id: string;
  img: string;
}

interface VideoItem {
  id: string;
  src: string;
  title: string;
  date: string;
  description: string;
}

const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"images" | "videos">("images");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items: ImageItem[] = [
    { id: "1", img: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg" },
    { id: "2", img: "https://portal.ieeensusb.org/media_files/main_website_files/gallery_pictures/04.MS4.png" },
    { id: "3", img: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg" },
    { id: "4", img: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png" },
    { id: "5", img: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg" },
    { id: "6", img: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png" },
    { id: "7", img: "https://portal.ieeensusb.org/media_files/main_website_files/gallery_pictures/Picture30.jpeg" },
    { id: "8", img: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png" },
    { id: "1", img: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg" },
    { id: "2", img: "https://portal.ieeensusb.org/media_files/main_website_files/gallery_pictures/04.MS4.png" },
    { id: "3", img: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg" },
    { id: "4", img: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png" },
    { id: "5", img: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg" },
    { id: "6", img: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png" },
    { id: "7", img: "https://portal.ieeensusb.org/media_files/main_website_files/gallery_pictures/Picture30.jpeg" },
    { id: "8", img: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png" },
    { id: "1", img: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg" },
    { id: "2", img: "https://portal.ieeensusb.org/media_files/main_website_files/gallery_pictures/04.MS4.png" },
    { id: "3", img: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg" },
    { id: "4", img: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png" },
    { id: "5", img: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg" },
    { id: "6", img: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png" },
    { id: "7", img: "https://portal.ieeensusb.org/media_files/main_website_files/gallery_pictures/Picture30.jpeg" },
    { id: "8", img: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png" },
  ];

  const videos: VideoItem[] = [
    { id: "v1", src: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "Video 1", date: "2025-11-03", description: "This is the first video description." },
    { id: "v2", src: "https://www.youtube.com/embed/9bZkp7q19f0", title: "Video 2", date: "2025-11-02", description: "This is the second video description." },
  ];

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevLightbox = () => {
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex - 1 + items.length) % items.length);
  };
  const nextLightbox = () => {
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex + 1) % items.length);
  };

  return (
    <>
      <Wave title="Gallery" />

      {/* Tabs */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          className={`px-4 py-2 rounded ${activeTab === "images" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("images")}
        >
          Images
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "videos" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("videos")}
        >
          Videos
        </button>
      </div>

      <div className="max-w-[1080px] w-full mx-auto my-6">
        {/* Images Tab */}
        {activeTab === "images" && (
          <div
            className="columns-2 md:columns-4 gap-4"
            style={{ columnGap: "16px" }}
          >
            {items.map((item, idx) => (
              <div
                key={item.id}
                className="mb-4 break-inside-avoid rounded-lg shadow-md overflow-hidden cursor-pointer"
                onClick={() => openLightbox(idx)}
              >
                <img
                  src={item.img}
                  className="w-full object-cover rounded hover:scale-105 duration-300"
                  alt=""
                />
              </div>
            ))}
          </div>
        )}

        {/* Videos Tab */}
        {activeTab === "videos" && (
          <div className="flex flex-col gap-6">
            {videos.map((v) => (
              <div
                key={v.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg shadow-md overflow-hidden"
              >
                {/* Video */}
                <div className="w-full">
                  <iframe src={v.src} className="w-full aspect-video" allowFullScreen />
                </div>
                {/* Details */}
                <div className="flex flex-col justify-center p-4">
                  <h2 className="text-xl font-semibold mb-2">{v.title}</h2>
                  <p className="text-sm text-gray-500 mb-2">{v.date}</p>
                  <p className="text-gray-700">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeLightbox}
        >
          <button
            className="absolute left-4 text-white text-3xl"
            onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
          >
            ◀
          </button>
          <img
            src={items[lightboxIndex].img}
            className="max-h-[90%] max-w-[90%] object-contain rounded"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 text-white text-3xl"
            onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
          >
            ▶
          </button>
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={closeLightbox}
          >
            ✖
          </button>
        </div>
      )}
    </>
  );
};

export default Gallery;
