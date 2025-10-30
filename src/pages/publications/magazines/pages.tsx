"use client";

import { useState, useRef, useEffect } from "react";
import FadeIn from "@/components/ui/fade-in";
import Wave from "@/components/wave";
import { motion, AnimatePresence } from "framer-motion";

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
    picture: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200",
    description:
      "A deep dive into innovation in AI and emerging tech with insights from students and faculty.",
    file: "https://dl.bdebooks.com/Bangladeshi%20Author/Romena%20Afaz/Series%20Books/Dosshu%20Bonhur/101-102%20Dosshu%20Javed-%20Mohachakkro%20by%20Romena%20Afaz(BDebooks.Com).pdf",
  },
  {
    title: "Tech Horizon",
    publishedBy: "IEEE NSU SB",
    publishDate: "March 2024",
    picture: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200",
    description:
      "Exploring next-generation computing paradigms and the social impact of emerging technologies.",
    file: "https://dl.bdebooks.com/Bangladeshi%20Author/Romena%20Afaz/Series%20Books/Dosshu%20Bonhur/101-102%20Dosshu%20Javed-%20Mohachakkro%20by%20Romena%20Afaz(BDebooks.Com).pdf",
  },
  {
    title: "Circuit Chronicles",
    publishedBy: "IEEE NSU SB",
    publishDate: "November 2023",
    picture: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200",
    description:
      "Highlighting innovation, community projects, and IEEE activities shaping the global tech world.",
    file: "https://dl.bdebooks.com/Bangladeshi%20Author/Romena%20Afaz/Series%20Books/Dosshu%20Bonhur/101-102%20Dosshu%20Javed-%20Mohachakkro%20by%20Romena%20Afaz(BDebooks.Com).pdf",
  },
  {
    title: "Neural Frontiers",
    publishedBy: "IEEE NSU SB",
    publishDate: "February 2023",
    picture: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200",
    description:
      "Exploring neural interfaces, robotics, and the expanding frontiers of human-machine collaboration.",
    file: "https://dl.bdebooks.com/Bangladeshi%20Author/Romena%20Afaz/Series%20Books/Dosshu%20Bonhur/101-102%20Dosshu%20Javed-%20Mohachakkro%20by%20Romena%20Afaz(BDebooks.Com).pdf",
  },
  {
    title: "The Quantum Pulse",
    publishedBy: "IEEE NSU SB",
    publishDate: "October 2022",
    picture: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200",
    description:
      "From qubits to reality — exploring the next revolution in quantum communication and computing.",
    file: "https://dl.bdebooks.com/Bangladeshi%20Author/Romena%20Afaz/Series%20Books/Dosshu%20Bonhur/101-102%20Dosshu%20Javed-%20Mohachakkro%20by%20Romena%20Afaz(BDebooks.Com).pdf",
  },
  {
    title: "Future Vision",
    publishedBy: "IEEE NSU SB",
    publishDate: "May 2022",
    picture: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=1200",
    description:
      "Imagining sustainable innovation through technology, leadership, and interdisciplinary synergy.",
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
      <Wave title="Magazines - IEEE NSU SB" />
      <FadeIn>
        <section className="py-20 px-6 bg-[#FFFFFF] flex flex-col items-center">
          <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {magazineData.map((mag, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={mag.picture}
                    alt={mag.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div className="p-6 flex flex-col justify-between bg-gradient-to-b from-[#ffffff] to-[#f5f7fb]">
                  <div>
                    <h2 className="text-2xl font-semibold text-[#002855] mb-2">
                      {mag.title}
                    </h2>
                    <p className="text-gray-500 text-sm mb-2">
                      A Publication of {mag.publishedBy} <br />
                      {mag.publishDate}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-1.5 w-1.5 bg-[#002855] rounded-full" />
                      <div className="h-1.5 w-6 bg-[#002855] rounded-full" />
                      <div className="h-1.5 w-1.5 bg-[#002855] rounded-full" />
                    </div>
                    <p className="text-gray-800 text-justify leading-relaxed">
                      {mag.description}
                    </p>
                  </div>
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={() => {
                        setOpenPDF(mag.file);
                        setActiveTitle(mag.title);
                      }}
                      className="bg-[#002855] text-white font-semibold py-3 px-8 rounded-md hover:bg-[#003a78] transition-all duration-300 shadow-md hover:shadow-xl"
                    >
                      Read Magazine
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
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
              className="relative w-full max-w-6xl h-[90vh] bg-[#0d1826] rounded-3xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="flex items-center justify-between bg-gradient-to-r from-[#002855] to-[#003a78] text-white px-6 py-4">
                <div>
                  <h2 className="font-semibold text-lg">{activeTitle}</h2>
                  <p className="text-sm text-[#FFD100]">
                    IEEE Digital Preview Edition
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      handleDownload(openPDF, activeTitle || "IEEE_Magazine")
                    }
                    className="bg-[#00B5E2] hover:bg-[#009dc7] text-white px-4 py-2 rounded-md font-medium text-sm shadow-md hover:shadow-lg transition-all"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => setOpenPDF(null)}
                    className="w-9 h-9 rounded-full bg-[#FFD100] hover:bg-[#eac700] text-[#002855] text-lg font-bold flex items-center justify-center shadow-sm transition-all"
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
