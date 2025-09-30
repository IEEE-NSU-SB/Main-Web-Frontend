import FadeIn from "./fade-in";

interface SectionHeadingProps {
  title: string;
  widthClass: string; // e.g., 'w-62'
  underlineColor?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  widthClass,
  underlineColor="bg-ieee-darkblue-75"
}) => {
  return (
    <>
    <FadeIn>
      <h2 className="max-w-[1080px] mx-auto text-ieee-darkblue-75 text-3xl font-bold mt-10 px-5 max-sm:px-5 max-lg:px-12">
        {title}
      </h2>
      <div className="flex gap-1 max-w-[1080px] mx-auto mt-2 mb-4 max-md:ml-4 px-3 max-sm:px-2 max-lg:px-12">
        <div
          className={`h-1 ${widthClass} ${underlineColor} rounded-xs`}
        ></div>
        <div className={`h-1 w-2 ${underlineColor} rounded-xs`}></div>
        <div className={`h-1 w-2 ${underlineColor} rounded-xs`}></div>
      </div>
      </FadeIn>
    </>
  );
};

export default SectionHeading;
