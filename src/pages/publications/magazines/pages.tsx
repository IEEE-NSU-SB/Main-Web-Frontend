import { motion } from "framer-motion";
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
    title: "Chronicons",
    publishedBy: "A Publication of IEEE NSU Student Branch",
    publishDate: "Dec. 17, 2018",
    picture:
      "https://api.ieeensusb.org/media_files/main_website_files/magazine_pictures/Chronics.png",
    description:
      "Chronicons is the first edition of IEEE NSU Student Branch’s magazine. Chronicons is not just a magazine, it is an assortment of research papers, technical articles and interviews that will spur the mind of everyone who has a reach to this spectacular piece of brochure",
    file: "https://api.ieeensusb.org/media_files/main_website_files/Magazine/Chronicons.pdf",
  },
  {
    title: "Zenith",
    publishedBy: "A Publication of IEEE NSU Power and Energy Society Student Branch Chapter",
    publishDate: "Feb. 1, 2018",
    picture:
      "https://api.ieeensusb.org/media_files/main_website_files/magazine_pictures/Zenith.png",
    description:
      "“Zenith” is the footmark of the first event organized by PES, “POWERBUZZ”. It is an event which connected the faculties and the students in the same bond. Zenith features works from the students and the faculties and let them express their contribution in the field of engineering.",
    file: "https://api.ieeensusb.org/media_files/main_website_files/Magazine/Zenith.pdf",
  },
  {
    title: "Prodigy",
    publishedBy: "A Publication of IEEE NSU Student Branch - Women in Engineering Affinity Group",
    publishDate: "Oct. 1, 2016",
    picture:
      "https://api.ieeensusb.org/media_files/main_website_files/magazine_pictures/Prodigy.png",
    description:
      "Prodigy’ is a testimony to what this student body (WIE) stands for. The sole purpose of this publication is to promote Women in Engineering. Even in 21st century whenever we hear the term ‘ENGINEER’, we automatically imagine a guy or a male, WIE is working towards breaking this taboo. Prodigy is the first step of reaching that goal.",
    file: "https://dl.bdebooks.com/Bangladeshi%20Author/Romena%20Afaz/Series%20Books/Dosshu%20Bonhur/101-102%20Dosshu%20Javed-%20Mohachakkro%20by%20Romena%20Afaz(BDebooks.Com).pdf",
  },
];

export default function MagazinesPage() {
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
        <div className="bg-ieee-white max-w-[1080px] m-auto p-5 w-full grid grid-cols-1 sm:grid-cols-2 gap-10">
          {magazineData.map((mag, i) => (
            <motion.div
              key={i}
              className="relative bg-white rounded-lg hover:shadow-[4px_4px_10px_var(--color-ieee-gray-50)] shadow-[2px_2px_8px_var(--color-ieee-gray-50)] transition-all overflow-hidden"
            >
              <div className="flex max-md:flex-col">
                <div className="w-70 h-100 max-md:w-full overflow-hidden">
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

                  <div className="mt-4 flex flex-col gap-2 mb-2 text-center">
                    <button
                      onClick={() => window.open(mag.file, "_blank")}
                      className="hover:bg-ieee-darkblue hover:text-ieee-white text-ieee-darkblue py-1 px-8 rounded-[4px] bg-transparent transition-all duration-300 border border-ieee-darkblue cursor-pointer"
                    >
                      Read Magazine
                    </button>

                    <button
                      onClick={() => handleDownload(mag.file, mag.title)}
                      className="hover:bg-ieee-darkblue hover:text-ieee-white text-ieee-darkblue py-1 px-8 rounded-[4px] bg-transparent transition-all duration-300 border border-ieee-darkblue cursor-pointer"
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </FadeIn>
    </>
  );
}
