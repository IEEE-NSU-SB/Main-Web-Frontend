import Skeleton from "@/components/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import FadeIn from "@/components/ui/FadeIn";
import { useFetchDataJSON } from "@/hooks/fetchdata";

interface ChapterQuestion {
  "1": string[];
  "2": string[];
  "3": string[];
  "4": string[];
}

interface ChapterData {
  name: string;
  missionVisionColor: string;
  secondaryColor: string;
  textColor: string;
  mission: string[];
  vision: string[];
  question: ChapterQuestion[];
}

interface ChaptersJSON {
  [key: string]: ChapterData[];
}

interface WhatWhyHowProps {
  chapterId: number; // numeric chapter ID
}

const WhatWhyHow: React.FC<WhatWhyHowProps> = ({ chapterId }) => {
  const { loading, data, error, refetch } = useFetchDataJSON<ChaptersJSON>({
    path: "pages/society-and-ag/data/ScAg.json",
  });

  const chapterData = data?.[chapterId.toString()]?.[0];

  // Fallback if data not found
  const element = chapterData || {
    name: "Affinity Group",
    missionVisionColor: "",
    secondaryColor : "",
    textColor: "",
    question: [{ "1": [""], "2": [""], "3": [""], "4": [""] }],
  };

  const questions = element.question[0];

  return (
    <section className="mx-auto">
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-md border border-gray-200 p-6"
            >
              <Skeleton className="h-6 w-8/12 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-10/12 mb-2" />
              <Skeleton className="h-4 w-9/12" />
            </div>
          ))}
        </div>
      ) : error ? (
        <ErrorMessage message="Failed to load About data" onRetry={refetch} />
      ) : (
        <FadeIn>
          <div
            className="w-full mx-auto my-10 md:px-0 px-3"
            style={{
              backgroundColor: element.missionVisionColor,
              color: element.textColor,
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* What is section */}
              <div className="flex flex-col text-justify md:items-end md:p-8 p-3 md:border-r md:border-b md:mb-0 mb-5">
                <div className="flex flex-col md:max-w-[480px]">
                  <h1
                    className="text-3xl mb-6"
                    style={{ color: element.secondaryColor }}
                  >
                    What is {element.name}?
                  </h1>
                  <p>{questions["1"][0]}</p>
                </div>
              </div>

              {/* Why join section */}
              <div className="flex flex-col text-justify md:items-start md:p-8 p-3 md:border-l md:border-b md:mb-0 mb-5">
                <div className="flex flex-col md:max-w-[480px]">
                  <h1
                    className="text-3xl mb-6"
                    style={{ color: element.secondaryColor }}
                  >
                    Why join {element.name}?
                  </h1>
                  <p>{questions["2"][0]}</p>
                </div>
              </div>

              {/* Activities section */}
              <div className="flex flex-col text-justify md:items-end md:p-8 p-3 md:border-t mb-5">
                <div className="flex flex-col md:max-w-[480px]">
                  <h1
                    className="text-3xl mb-6"
                    style={{ color: element.secondaryColor }}
                  >
                    What activities do we usually do?
                  </h1>
                  <p>{questions["3"][0]}</p>
                </div>
              </div>

              {/* How to join section */}
              <div className="flex flex-col text-justify md:items-start md:p-8 p-3 md:border-l-1 md:border-t">
                <div className="flex flex-col md:max-w-[480px]">
                  <h1
                    className="text-3xl mb-6"
                    style={{ color: element.secondaryColor }}
                  >
                    How to join IEEE NSU {element.name} SBC?
                  </h1>
                  <p>{questions["4"][0]}</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      )}
    </section>
  );
};

export default WhatWhyHow;
