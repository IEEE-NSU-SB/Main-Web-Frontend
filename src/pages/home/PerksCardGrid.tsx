import { useState, useEffect } from "react";
import iconLearning from "./assets/img/learning.png";
import iconNetworking from "./assets/img/networking.png";
import iconCompetitions from "./assets/img/competitions.png";
import iconSkillBuilding from "./assets/img/skills.png";
import iconEvents from "./assets/img/events.png";
import iconAchievements from "./assets/img/achievements.png";

import FadeIn from "@/components/ui/FadeIn";
import Skeleton from "@/components/skeeleton";
import ErrorMessage from "../../components/ui/ErrorMessage";

type Perk = {
  title: string;
  description: string;
  icon: string;
};

export default function PerksCardGrid() {
  const [loading, setLoading] = useState(true);
  const [perks, setPerks] = useState<Perk[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPerks = async () => {
      try {
        setLoading(true);
        setError(null);

        const perksData: Perk[] = [
          {
            title: "LEARNING",
            description:
              "We immerse ourselves in learning about appearing technologies traversing diverse fields such as electronics, programming, robotics and more. Concurrently, we confront various research endeavors to foster improvement and innovation.",
            icon: iconLearning,
          },
          {
            title: "NETWORKING",
            description:
              "Being an IEEE NSU SB member offers more than just networking possibilities and exposure for advancing your professional career. It also helps you to connect with various individuals and make friends.",
            icon: iconNetworking,
          },
          {
            title: "COMPETITIONS",
            description:
              "Engage in the numerous beneficial contests organized and accessible to students by IEEE NSU SB, extending your expertise and experience to boost your CV.",
            icon: iconCompetitions,
          },
          {
            title: "SKILL BUILDING",
            description:
              "Develop new skills and refine existing ones across a broad spectrum of options, including content writing, social media management, graphic design, user interface design, and web development.",
            icon: iconSkillBuilding,
          },
          {
            title: "EVENTS",
            description:
              "IEEE NSU SB organizes various workshops, industrial tours, seminars, and competitions, providing a prosperity of knowledge and practical experiences contributing to career development.",
            icon: iconEvents,
          },
          {
            title: "ACHIEVEMENTS",
            description:
              'From securing the "Best Exemplary Student Branch" award in Region 10 for two consecutive years to achieving first place in the IEEE R10 Web Contest, IEEE NSU SB has had numerous praiseworthy achievements, solidifying its position as one of the best IEEE student branches out there!',
            icon: iconAchievements,
          },
        ];

        await new Promise((res) => setTimeout(res, 400));

        setPerks(perksData);
      } catch (err: any) {
        setError(err.message || "Failed to load perks.");
        setPerks(null);
      } finally {
        setLoading(false);
      }
    };

    loadPerks();
  }, []);

  return (
    <div className="max-w-[1080px] mx-auto my-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-5 max-sm:px-5 max-lg:px-11">
      {loading ? (
        Array.from({ length: 6 }).map((_, i) => (
          <FadeIn key={i} delay={i / 10}>
            <div className="flex flex-col items-start space-y-3 animate-pulse">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-32 w-full rounded-xl" />
            </div>
          </FadeIn>
        ))
      ) : error ? (
        <div className="col-span-3">
          <ErrorMessage
            message={"Failed to load perks"}
            onRetry={() => window.location.reload()}
          />
        </div>
      ) : (
        perks?.map((item, index) => (
          <FadeIn delay={index / 10} key={index}>
            <div className="group bg-linear-to-br from-white/90 to-white/70 dark:from-gray-800/80 dark:to-gray-700/60 p-6 rounded-2xl transition-all duration-500 transform border border-white backdrop-blur-md">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-10 h-10 transition-transform duration-500 group-hover:rotate-5 group-hover:scale-110"
                />
                <h3 className="text-[20px] font-bold text-gray-800 dark:text-white shine-text">
                  {item.title}
                </h3>
              </div>
              <p className="text-ieee-black/90 dark:text-gray-300 text-[16px] text-center leading-relaxed">
                {item.description}
              </p>
            </div>
          </FadeIn>
        ))
      )}
    </div>
  );
}
