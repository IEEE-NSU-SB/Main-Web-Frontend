import { useEffect, useRef, useState } from "react";
import FadeIn from "./FadeIn";

interface SectionHeadingProps {
  title: string;
  titleColor?: string;
  underlineColor?: string;
  align?: "left" | "center"; // optional alignment
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  titleColor,
  underlineColor,
  align = "left",
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [underlineWidth, setUnderlineWidth] = useState<number>(0);

  useEffect(() => {
    const updateWidth = () => {
      if (titleRef.current) {
        setUnderlineWidth(titleRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [title]);

  return (
    <FadeIn>
      <div
        className={`max-w-[1080px] mx-auto mt-10 mb-4 px-5 max-sm:px-5 max-lg:px-12 flex flex-col ${
          align === "center" ? "items-center" : "items-start"
        }`}
      >
        <h2
          ref={titleRef}
          className={`text-3xl font-bold max-md:text-[25px] inline-block ${
            !titleColor ? "text-ieee-darkblue/90" : ""
          }`}
          style={{ color: titleColor }}
        >
          {title}
        </h2>

        <div className="flex gap-1 mt-1">
          <div
            className={`h-[3px] rounded transition-all duration-300 ${
              !underlineColor ? "bg-ieee-darkblue/90" : ""
            }`}
            style={{
              backgroundColor: underlineColor,
              width: underlineWidth ? `${underlineWidth * 1.1}px` : "80px",
            }}
          ></div>
          <div
            className={`h-[3px] w-2 rounded ${
              !underlineColor ? "bg-ieee-darkblue/90" : ""
            }`}
            style={{ backgroundColor: underlineColor }}
          ></div>
          <div
            className={`h-[3px] w-2 rounded ${
              !underlineColor ? "bg-ieee-darkblue/90" : ""
            }`}
            style={{ backgroundColor: underlineColor }}
          ></div>
        </div>
      </div>
    </FadeIn>
  );
};

export default SectionHeading;
