import { motion } from "framer-motion";
import Wave from "@/components/Wave";
import FadeIn from "@/components/ui/FadeIn";
import { useFetchDataAPI } from "@/hooks/fetchdata";

interface Magazine {
  title: string;
  publishedBy: string;
  publishDate: string;
  picture: string;
  description: string;
  file: string;
}

export default function MagazinesPage() {

  const { data } = useFetchDataAPI<Magazine[]>({
      apiUrl: "main_website/get_magazines/",
    });
    
  const handleDownload = async (url: string, title: string) => {
    try {
      const response = await fetch(url);
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
          {data?.map((mag, i) => (
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
                    <div className="text-gray-800 text-left leading-relaxed line-clamp-5 h-32" dangerouslySetInnerHTML={{ __html: mag.description }}></div>
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
