import Masonry from "@/components/Masonry";
import Wave from "@/components/Wave";

// app/(or pages)/MasonryDemo.tsx
const items = [
  {
    id: "1",
    img: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg",
    url: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg",
    height: 400,
  },
  {
    id: "2",
    img: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg",
    url: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg",
    height: 250,
  },
  {
    id: "3",
    img: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png",
    url: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png",
    height: 600,
  },
  {
    id: "4",
    img: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg",
    url: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg",
    height: 250,
  },
  {
    id: "5",
    img: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png",
    url: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png",
    height: 600,
  },
  {
    id: "6",
    img: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg",
    url: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg",
    height: 250,
  },
  {
    id: "7",
    img: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png",
    url: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png",
    height: 600,
  },
  {
    id: "8",
    img: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg",
    url: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg",
    height: 250,
  },
  {
    id: "9",
    img: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png",
    url: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png",
    height: 600,
  },
  {
    id: "10",
    img: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg",
    url: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg",
    height: 250,
  },
  {
    id: "11",
    img: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png",
    url: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png",
    height: 600,
  },
  {
    id: "12",
    img: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg",
    url: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg",
    height: 250,
  },
  {
    id: "13",
    img: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png",
    url: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png",
    height: 600,
  },
  {
    id: "14",
    img: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg",
    url: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg",
    height: 250,
  },
  {
    id: "15",
    img: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png",
    url: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png",
    height: 600,
  },
  {
    id: "16",
    img: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg",
    url: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg",
    height: 250,
  },
  {
    id: "17",
    img: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png",
    url: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png",
    height: 600,
  },
  {
    id: "18",
    img: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg",
    url: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/IMG_6879-01.jpeg",
    height: 250,
  },
  {
    id: "19",
    img: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png",
    url: "https://ieeensusb.org/media_files/main_website_files/gallery_pictures/15.png",
    height: 600,
  },
];

export default function MasonryDemo() {
  return (
    <>
      <Wave title="Gallery" />
      <div className="min-h-screen p-6 max-w-[1080px] m-auto overflow-auto">
        <Masonry
          items={items}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.95}
          blurToFocus={true}
          colorShiftOnHover={false}
        />
      </div>
    </>
  );
}
