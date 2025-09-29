import iconLearning from "./assets/img/learning.png";
import iconNetworking from "./assets/img/networking.png";
import iconCompetitions from "./assets/img/competitions.png";
import iconSkillBuilding from "./assets/img/skills.png";
import iconEvents from "./assets/img/events.png";
import iconAchievements from "./assets/img/achievements.png";
import FadeIn from "@/components/ui/fade-in";

export default function LearningCardGrid() {
  const learningData = [
    {
      title: "LEARNING",
      description:
        "We immerse ourselves in learning about appearing technologies traversing diverse fields such as electronics , programming , robotics and more. Concurrently, we confront various research endeavors to foster improvement and innovation.",
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
        "IEEE NSU SB organizes various workshops , industrial tours , seminars and competitions , providing a prosperity of knowledge and practical experiences contributing to career development.",
      icon: iconEvents,
    },
    {
      title: "ACHIEVEMENTS",
      description:
        'From securing the "Best Exemplary Student Branch" award in Region 10 for two consecutive years to achieving first place in the IEEE R10 Web Contest, IEEE NSU SB has had numerous praiseworthy achievements , solidifying its position as one of the best IEEE student branches out there!',
      icon: iconAchievements,
    },
  ];

  return (
    <FadeIn>
      <div className="max-w-[1080px] mx-auto my-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-5 max-sm:px-5 max-lg:px-11">
        {learningData.map((item, index) => (
          <div key={index} className="flex items-start space-x-4">
            <img src={item.icon} alt={item.title} className="w-8 h-8" />
            <div className="text-left">
              <h3 className="font-bold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-ieee-black-75 text-base/6 learning-card-grid.text text-justify text-wrap">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}
