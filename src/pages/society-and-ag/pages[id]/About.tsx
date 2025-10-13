import Skeleton from "@/components/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { useFetchDataJSON } from "@/hooks/fetchdata";

import { useParams } from "react-router-dom";

interface AGAbout {
  id: number;
  filteredKey: string;
  ag_group_name: string;
  question_1: string;
  question_2: string;
  question_3: string;
  question_4: string;
}

interface AGAboutData {
  agAbout: AGAbout[];
}

const ScAgAbout = () => {
  const { id } = useParams();
  const { loading, data, error, refetch } = useFetchDataJSON<AGAboutData>({
    path: "pages/society-and-ag/data/ScAgAbout.json",
  });

  const agAboutData = data?.agAbout || [];

  const elementMapping: Record<string, AGAbout[]> = {
    "ieee-nsu-ras-sbc": agAboutData.filter((e) =>
      e.filteredKey?.toLowerCase().includes("ras")
    ),
    "ieee-nsu-pes-sbc": agAboutData.filter((e) =>
      e.filteredKey?.toLowerCase().includes("pes")
    ),
    "ieee-nsu-ias-sbc": agAboutData.filter((e) =>
      e.filteredKey?.toLowerCase().includes("ias")
    ),
    "ieee-nsu-wie-ag": agAboutData.filter((e) =>
      e.filteredKey?.toLowerCase().includes("wie")
    ),
  };

  const agAboutShow = id && elementMapping[id] ? elementMapping[id] : agAboutData;

  return (
    <section className="mx-auto py-2 pb-16">
      <SectionHeading title="About the Affinity Group" widthClass="w-102" />

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
          <div className="w-full bg-black text-white mx-auto my-10 md:px-0 px-3">
            {agAboutShow.map((element) => (
              <div key={element.id}>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* What is section */}
                  <div className="flex flex-col text-justify md:p-8 p-3 md:border-r md:border-b md:mb-0 mb-5">
                    <div className="md:max-w-[420px] md:mx-auto">
                      <h1 className="text-3xl mb-6">
                        What is {element.ag_group_name}?
                      </h1>
                      <p>{element.question_1}</p>
                    </div>
                  </div>

                  {/* Why join section */}
                  <div className="flex flex-col text-justify md:p-8 p-3 md:border-l md:border-b md:mb-0 mb-5">
                    <div className="md:max-w-[420px] md:mx-auto">
                      <h1 className="text-3xl mb-6">
                        Why join {element.ag_group_name}?
                      </h1>
                      <p>{element.question_2}</p>
                    </div>
                  </div>

                  {/* Activities section */}
                  <div className="flex flex-col text-justify md:p-8 p-3 md:border-t mb-5">
                    <div className="md:max-w-[420px] md:mx-auto">
                      <h1 className="text-3xl mb-6">
                        What activities do we usually do?
                      </h1>
                      <p>{element.question_3}</p>
                    </div>
                  </div>

                  {/* How to join section */}
                  <div className="flex flex-col text-justify md:p-8 p-3 md:border-l-1 md:border-t">
                    <div className="md:max-w-[420px] md:mx-auto">
                      <h1 className="text-3xl mb-6">
                        How to join IEEE NSU {element.ag_group_name} SBC?
                      </h1>
                      <p>{element.question_4}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      )}
    </section>
  );
};

export default ScAgAbout;
