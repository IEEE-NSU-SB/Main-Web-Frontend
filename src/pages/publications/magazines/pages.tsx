"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Wave from "@/components/Wave";
import FadeIn from "@/components/ui/FadeIn";

interface Magazine {
  title: string;
  publishedBy: string;
  publishDate: string;
  picture: string;
  description: string;
  file: string;
}

const magazineData: Magazine[] = [
  {
    title: "Innovators Quarterly",
    publishedBy: "IEEE NSU SB",
    publishDate: "July 2024",
    picture:
      "https://ieeensusb.org/media_files/main_website_files/magazine_pictures/Chronics.png",
    description:
      "Chronicons is the first edition of IEEE NSU Student Branch’s magazine. Chronicons is not just a magazine, it is an assortment of research papers, technical articles and interviews that will spur the mind of everyone who has a reach to this spectacular piece of brochure",
    file: "https://dl.bdebooks.com/Bangladeshi%20Author/Romena%20Afaz/Series%20Books/Dosshu%20Bonhur/101-102%20Dosshu%20Javed-%20Mohachakkro%20by%20Romena%20Afaz(BDebooks.Com).pdf",
  },
  {
    title: "Tech Horizon",
    publishedBy: "IEEE NSU SB",
    publishDate: "March 2024",
    picture:
      "https://ieeensusb.org/media_files/main_website_files/magazine_pictures/Zenith.png",
    description:
      "“Zenith” is the footmark of the first event organized by PES, “POWERBUZZ”. It is an event which connected the faculties and the students in the same bond. Zenith features works from the students and the faculties and let them express their contribution in the field of engineering.",
    file: "https://dl.bdebooks.com/Bangladeshi%20Author/Romena%20Afaz/Series%20Books/Dosshu%20Bonhur/101-102%20Dosshu%20Javed-%20Mohachakkro%20by%20Romena%20Afaz(BDebooks.Com).pdf",
  },
  {
    title: "Circuit Chronicles",
    publishedBy: "IEEE NSU SB",
    publishDate: "November 2023",
    picture:
      "https://ieeensusb.org/media_files/main_website_files/magazine_pictures/Prodigy.png",
    description:
      "Prodigy’ is a testimony to what this student body (WIE) stands for. The sole purpose of this publication is to promote Women in Engineering. Even in 21st century whenever we hear the term ‘ENGINEER’, we automatically imagine a guy or a male, WIE is working towards breaking this taboo. Prodigy is the first step of reaching that goal.",
    file: "https://dl.bdebooks.com/Bangladeshi%20Author/Romena%20Afaz/Series%20Books/Dosshu%20Bonhur/101-102%20Dosshu%20Javed-%20Mohachakkro%20by%20Romena%20Afaz(BDebooks.Com).pdf",
  },
];

export default function MagazinesPage() {
  const [openPDF, setOpenPDF] = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState<string>("");

  const overlayRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) setOpenPDF(null);
  };

  useEffect(() => {
    const closeOnEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenPDF(null);
    };
    window.addEventListener("keydown", closeOnEsc);
    return () => window.removeEventListener("keydown", closeOnEsc);
  }, []);

  useEffect(() => {
  if (openPDF) {
    // Disable scroll
    document.body.style.overflow = "hidden";
  } else {
    // Re-enable scroll
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [openPDF]);

  const handleDownload = async (url: string, title: string) => {
    try {
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error("Failed to fetch file");
      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `${title.replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Unable to download file. Please try again.");
    }
  };

  return (
    <>
      <Wave title="Magazines" />
      <FadeIn>
        <div className="bg-ieee-white max-w-[1080px] m-auto p-5 w-full grid grid-cols-1 sm:grid-cols-2  gap-10">
          {magazineData.map((mag, i) => (
            <motion.div
              key={i}
              className="relative bg-white rounded-lg hover:shadow-[4px_4px_10px_var(--color-ieee-gray-50)] shadow-[2px_2px_8px_var(--color-ieee-gray-50)]  transition-all overflow-hidden"
            >
              <div className="flex">
                <div className="w-70 h-80 overflow-hidden">
                  <img
                    src={mag.picture}
                    alt={mag.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div className="px-6 py-2 flex flex-col w-80 justify-between bg-gradient-to-b from-[#ffffff] to-[#f5f7fb]">
                  <div>
                    <h2 className="text-[24px] font-semibold text-[#002855] mb-2 line-clamp-1">
                      {mag.title}
                    </h2>
                    <p className="text-gray-500 text-sm mb-2">
                      A Publication of {mag.publishedBy} <br />
                      {mag.publishDate}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-1 w-10 bg-[#002855] rounded-full" />
                      <div className="h-1 w-2 bg-[#002855] rounded-full" />
                      <div className="h-1 w-2 bg-[#002855] rounded-full" />
                    </div>
                    <p className="text-gray-800 text-left leading-relaxed line-clamp-5 h-32">
                      {mag.description}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-center mb-2">
                    <button
                      onClick={() => {
                        setOpenPDF(mag.file);
                        setActiveTitle(mag.title);
                      }}
                      className="hover:bg-ieee-darkblue hover:text-ieee-white text-ieee-darkblue py-1 px-8 rounded-[4px] bg-transparent transition-all duration-300 border-1 border-ieee-darkblue cursor-pointer"
                    >
                      Read Magazine
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </FadeIn>

      <AnimatePresence>
        {openPDF && (
          <motion.div
            ref={overlayRef}
            onClick={handleOverlayClick}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-6xl h-[90vh] bg-ieee-white rounded-xl overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="flex items-center justify-between bg-gradient-to-r from-[#002855] to-[#003a78] text-white px-6 py-4">
                <div>
                  <h2 className="font-semibold text-lg">{activeTitle}</h2>
                  {/* <p className="text-sm text-[#FFD100]">
                    IEEE Digital Preview Edition
                  </p> */}
                </div>
                <div className="flex items-center gap-6">
                  <button
                    onClick={() =>
                      handleDownload(openPDF, activeTitle || "IEEE_Magazine")
                    }
                    className="cursor-pointer  hover:bg-ieee-darkblue bg-ieee-white hover:text-white text-ieee-darkblue ease-in-out duration-300 px-4 py-2 rounded-md font-medium text-sm shadow-md hover:shadow-lg transition-all"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => setOpenPDF(null)}
                    className="w-9 h-9 rounded-full text-ieee-white text-lg font-semibold cursor-pointer flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <iframe
                src={`https://docs.google.com/gview?url=${encodeURIComponent(
                  openPDF
                )}&embedded=true`}
                title="Magazine PDF Viewer"
                className="w-full h-full bg-[#101820] border-none outline-none"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
