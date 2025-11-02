import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Wave from "@/components/Wave";

const Gallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(3);
  const [containerHeight, setContainerHeight] = useState(0);
  const [items, setItems] = useState([
    { id: "1", img: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg", url: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg", height: 400 },
    { id: "2", img: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png", url: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png", height: 600 },
    { id: "3", img: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg", url: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg", height: 250 },
    { id: "4", img: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png", url: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png", height: 600 },
    { id: "5", img: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg", url: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg", height: 250 },
    { id: "6", img: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png", url: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png", height: 600 },
    { id: "7", img: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg", url: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg", height: 250 },
    { id: "8", img: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png", url: "https://api.ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png", height: 600 },
  ]);

  // responsive columns
  useEffect(() => {
    const updateColumns = () => {
      const w = window.innerWidth;
      if (w >= 1500) setColumns(5);
      else if (w >= 1000) setColumns(4);
      else if (w >= 600) setColumns(3);
      else if (w >= 400) setColumns(2);
      else setColumns(1);
    };
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // infinite scroll
  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        loadMoreItems();
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  const loadMoreItems = () => {
    const newItems = items.map((item, index) => ({
      ...item,
      id: `new-${items.length + index}`,
    }));
    setItems((prev) => [...prev, ...newItems]);
  };

  // compute positions
  const [gridItems, setGridItems] = useState<any[]>([]);
  useEffect(() => {
    if (!containerRef.current) return;
    const gap = 16;
    const colHeights = Array(columns).fill(0);
    const width = containerRef.current.offsetWidth;
    const colWidth = (width - (columns - 1) * gap) / columns;

    const positions = items.map((item) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (colWidth + gap);
      const y = colHeights[col];
      const h = item.height / 2;
      colHeights[col] += h + gap;
      return { ...item, x, y, w: colWidth, h };
    });

    setContainerHeight(Math.max(...colHeights));
    setGridItems(positions);
  }, [items, columns]);

  // animate from bottom smoothly
  useEffect(() => {
    gridItems.forEach((item, index) => {
      gsap.fromTo(
        `[data-key="${item.id}"]`,
        { opacity: 0, y: item.y + 50 }, // start 50px below
        { opacity: 1, x: item.x, y: item.y, width: item.w, height: item.h, duration: 0.8, ease: "power3.out", delay: index * 0.05 }
      );
    });
  }, [gridItems]);

  return (
    <>
      <Wave title="Gallery" />
      <div ref={containerRef} className="relative w-full m-auto max-w-[1080px] mt-5 scale-96 max-md:scale-90" style={{ height: containerHeight }}>
        {gridItems.map((item) => (
          <div
            key={item.id}
            data-key={item.id}
            className="absolute cursor-pointer rounded-lg shadow-lg overflow-hidden"
            style={{ willChange: "transform, width, height" }}
            onClick={() => window.open(item.url, "_blank")}
          >
            <div
              className="w-full h-full bg-cover bg-center hover:scale-105 duration-300 ease-in"
              style={{ backgroundImage: `url(${item.img})` }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Gallery;
