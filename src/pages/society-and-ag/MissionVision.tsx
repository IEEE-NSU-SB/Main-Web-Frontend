import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { type ChapterPageData } from "@/types/chapter";

interface MissionVisionProps {
  pageData: ChapterPageData;
}

const MissionVision: React.FC<MissionVisionProps> = ({ pageData }) => {
  const primaryColor = pageData.primaryColor || "#006699";
  const textColor = pageData.textColor || "#fff";
  const missionColor = pageData.missionVisionColor || primaryColor;
  
  const missionDescription = pageData.mission || "";
  const visionDescription = pageData.vision || "";

  const missionImage = pageData.missionImage || "";
  const visionImage = pageData.visionImage || "";

  return (
    <>
      <SectionHeading
        title="Mission & Vision"
        titleColor={`${primaryColor}b6`}
        underlineColor={`${primaryColor}b6`}
      />

      <div className="md:max-w-[1080px] w-full mx-auto my-10 px-5 space-y-10">
        {/* Mission */}
        <FadeIn>
          <div
            className="flex flex-col md:flex-row rounded-md border overflow-hidden"
            style={{ backgroundColor: missionColor, color: textColor }}
          >
            <div className="w-full md:w-1/2 p-7 text-justify">
              <h1 className="text-4xl font-bold mb-6">Mission</h1>
              <p dangerouslySetInnerHTML={{ __html: missionDescription }}/>
            </div>
            {missionImage && (
              <div className="w-full md:w-1/2">
                <img
                  src={missionImage}
                  alt="Mission"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </FadeIn>

        {/* Vision */}
        <FadeIn>
          <div
            className="flex flex-col md:flex-row-reverse rounded-md border overflow-hidden"
            style={{ backgroundColor: missionColor, color: textColor }}
          >
            <div className="w-full md:w-1/2 p-7 text-justify">
              <h1 className="text-4xl font-bold mb-6">Vision</h1>
              <p dangerouslySetInnerHTML={{ __html: visionDescription }}/>
            </div>
            {visionImage && (
              <div className="w-full md:w-1/2">
                <img
                  src={visionImage}
                  alt="Vision"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </>
  );
};

export default MissionVision;
