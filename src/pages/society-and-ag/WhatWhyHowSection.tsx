import FadeIn from "@/components/ui/FadeIn";
import { type ChapterPageData } from "@/types/chapter";

interface WhatWhyHowProps {
  pageData: ChapterPageData;
}

const WhatWhyHowSection: React.FC<WhatWhyHowProps> = ({ pageData }) => {
  const element = pageData;
  const questions = element.question || { "1": "", "2": "", "3": "", "4": "" };

  return (
    <FadeIn>
      <div
        className="w-full mx-auto my-10 md:px-0 px-3 bg-ieee-black"
        style={{ color: element.textColor || "#ffffff" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {["1", "2", "3", "4"].map((key, i) => (
            <div
              key={i}
              className={`flex flex-col md:border-ieee-white md:border-1 text-justify md:p-8 p-3 ${
                i % 2 === 0 ? "md:items-end" : "md:items-start"
              }`}
            >
              <div className="flex flex-col md:max-w-[480px]">
                <h1
                  className="text-3xl mb-6"
                  style={{ color: element.secondaryColor }}
                >
                  {i === 0
                    ? `What is ${element.name}?`
                    : i === 1
                    ? `Why join ${element.name}?`
                    : i === 2
                    ? `What activities do we usually do?`
                    : `How to join IEEE NSU ${element.name} SBC?`}
                </h1>
                <p
                  dangerouslySetInnerHTML={{
                    __html: questions[key as keyof typeof questions],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
};

export default WhatWhyHowSection;
