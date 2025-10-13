import FadeIn from "./FadeIn";

interface SectionHeadingProps {
  title: string;
  widthClass: string; // e.g., 'w-48'
  titleColor?: string; // hex color from JSON or fallback
  underlineColor?: string; // hex color from JSON or fallback
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  widthClass,
  titleColor,
  underlineColor,
}) => {
  return (
    <FadeIn>
      <h2
        className={`max-w-[1080px] mx-auto text-3xl font-bold mt-10 px-5 max-sm:px-5 max-lg:px-12 max-md:text-[25px] ${
          !titleColor ? "text-ieee-blue/90" : ""
        }`}
        style={{ color: titleColor }}
      >
        {title}
      </h2>

      <div className="flex gap-1 max-w-[1080px] mx-auto mt-1 mb-4 max-md:ml-4 px-5 max-sm:px-1 max-lg:px-12">
        <div
          className={`h-[3px] ${widthClass} rounded ${
            !underlineColor ? "bg-ieee-blue/90" : ""
          }`}
          style={{ backgroundColor: underlineColor }}
        ></div>
        <div
          className={`h-[3px] w-2 rounded ${
            !underlineColor ? "bg-ieee-blue/90" : ""
          }`}
          style={{ backgroundColor: underlineColor || undefined }}
        ></div>
        <div
          className={`h-[3px] w-2 rounded ${
            !underlineColor ? "bg-ieee-blue/90" : ""
          }`}
          style={{ backgroundColor: underlineColor || undefined }}
        ></div>
      </div>
    </FadeIn>
  );
};

export default SectionHeading;
