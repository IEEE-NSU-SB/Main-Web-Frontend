import FadeIn from "@/components/ui/FadeIn";

interface ChapterQuestion {
  "1": string[];
  "2": string[];
  "3": string[];
  "4": string[];
}

interface PageData {
  name: string;
  missionVisionColor: string;
  secondaryColor: string;
  textColor: string;
  question: ChapterQuestion[];
}

interface WhatWhyHowProps {
  pageData: PageData;
}

const WhatWhyHowSection: React.FC<WhatWhyHowProps> = ({ pageData }) => {
  const element = pageData;
  const questions = element.question[0];

  return (
    <FadeIn>
      <div
        className="w-full mx-auto my-10 md:px-0 px-3"
        style={{ backgroundColor: element.missionVisionColor, color: element.textColor }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {["1", "2", "3", "4"].map((key, i) => (
            <div
              key={i}
              className={`flex flex-col text-justify md:p-8 p-3 ${
                i % 2 === 0 ? "md:items-end" : "md:items-start"
              }`}
            >
              <div className="flex flex-col md:max-w-[480px]">
                <h1 className="text-3xl mb-6" style={{ color: element.secondaryColor }}>
                  {i === 0
                    ? `What is ${element.name}?`
                    : i === 1
                    ? `Why join ${element.name}?`
                    : i === 2
                    ? `What activities do we usually do?`
                    : `How to join IEEE NSU ${element.name} SBC?`}
                </h1>
                <p>{questions[key as keyof ChapterQuestion][0]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
};

export default WhatWhyHowSection;
