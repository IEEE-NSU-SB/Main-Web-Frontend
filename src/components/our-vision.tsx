import { useEffect, useState } from "react";
import SectionHeading from "./ui/section-heading";
import Skeleton from "@/components/skeleton";
import visionData from "@/data/vision.json"; // Local JSON fallback
import FadeIn from "./ui/fade-in";

const VisionSection = () => {
  const [loading, setLoading] = useState(true);
  const [vision, setVision] = useState<{ text: string } | null>(null);

  useEffect(() => {
    const fetchVision = async () => {
      try {
        setLoading(true);

        // ✅ Try fetching from API first
        const res = await fetch("https://api.example.com/vision");
        if (!res.ok) throw new Error("API request failed");

        const data = await res.json();
        setVision(data);
      } catch (err) {
        console.warn("API fetch failed, using local JSON fallback", err);

        // ✅ Fallback to local JSON if API fails
        setVision(visionData);
      } finally {
        setLoading(false);
      }
    };

    fetchVision();
  }, []);

  return (
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
          <p className="text-red-500 px-4">Failed to load vision statement.</p>
        )}
      </section>
    </FadeIn>
  );
};

export default VisionSection;
