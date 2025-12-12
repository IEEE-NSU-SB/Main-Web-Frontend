import { useState, useEffect } from "react";
import iconLearning from "./assets/img/learning.png";
import iconNetworking from "./assets/img/networking.png";
import iconCompetitions from "./assets/img/competitions.png";
import iconSkillBuilding from "./assets/img/skills.png";
import iconEvents from "./assets/img/events.png";
import iconAchievements from "./assets/img/achievements.png";

import FadeIn from "@/components/ui/FadeIn";
import Skeleton from "@/components/Skeleton";
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
              "We immerse ourselves in emerging technologies across electronics, programming, robotics, and more. This empowers us to innovate, collaborate, and solve real-world challenges through continuous learning and research.",
            icon: iconLearning,
          },
          {
            title: "NETWORKING",
            description:
              "Connect with like-minded individuals, industry professionals, and innovators across diverse domains. Build meaningful relationships that expand your professional network and create opportunities for future growth.",
            icon: iconNetworking,
          },
          {
            title: "COMPETITIONS",
            description:
              "Challenge yourself to apply knowledge creatively and develop critical problem-solving skills under pressure. Compete in technical and non-technical domains while fostering teamwork and achieving excellence.",
            icon: iconCompetitions,
          },
          {
            title: "SKILL BUILDING",
            description:
              "Develop hands-on expertise in programming, electronics, robotics, and emerging technologies. Enhance both theoretical understanding and practical application through continuous learning and real-world projects.",
            icon: iconSkillBuilding,
          },
          {
            title: "EVENTS",
            description:
              "Organize and participate in events that showcase innovation and engage the community. Develop leadership, communication, and organizational skills while creating meaningful experiences for personal and collective growth.",
            icon: iconEvents,
          },
          {
            title: "ACHIEVEMENTS",
            description:
              "Our accomplishments reflect dedication and innovation across successful projects, awards, and recognitions. These achievements inspire continuous improvement and set high standards for future endeavors.",
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
