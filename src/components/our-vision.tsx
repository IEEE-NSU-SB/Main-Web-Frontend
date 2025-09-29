import { useEffect, useState } from "react";
import SectionHeading from "./ui/section-heading";
import Skeleton from "@/components/skeleton";
import visionData from "@/data/vision.json"; // Uncomment this while using local JSON
import { useFetchDataAPI, useFetchDataJSON } from "@/hooks/fetchdata";
import FadeIn from "./ui/fade-in";

const VisionSection = () => {
  const [loading, setLoading] = useState(true);
  const [vision, setVision] = useState(null);

  useEffect(() => {
    const fetchVision = async () => {
      try {
        setLoading(true);

        // ✅ Local JSON for now
        const data = visionData;

        // ✅ Later: Fetch from API
        // const res = await fetch("https://api.example.com/vision");
        // if (!res.ok) throw new Error("Failed to fetch");
        // const data = await res.json();

        setVision(data);
      } catch (err) {
        console.error("Error fetching vision:", err);
        setVision(null);
      } finally {
        setLoading(false);
      }
    };

    fetchVision();
  }, []);

  return (
    <>
      <FadeIn>
        <SectionHeading title="Our Vision" widthClass="w-42" />
        <section className="max-w-[1080px] mx-auto py-2 pb-16 px-5 sm:px-12 lg:px-5">
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-6/12" />
            </div>
          ) : vision ? (
            <p className="text-lg text-ieee-black-75 leading-relaxed text-justify">
              {vision.text}
            </p>
          ) : (
            <p className="text-red-500 px-4">
              Failed to load vision statement.
            </p>
          )}
        </section>
      </FadeIn>
    </>
  );
};

export default VisionSection;