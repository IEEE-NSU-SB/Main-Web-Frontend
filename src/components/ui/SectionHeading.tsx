interface SectionHeadingProps {
  title: string;
  widthClass: string; // e.g., 'w-62'
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, widthClass }) => {
  return (
    <>
      <h2 className="max-w-[1078px] mx-auto text-ieee-darkblue-75 text-3xl font-bold px-4 mt-10">
        {title}
      </h2>
      <div className="flex gap-1 max-w-[1045px] mx-auto mt-2 mb-4 max-md:ml-4">
        <div className={`h-1 ${widthClass} bg-ieee-darkblue-75 rounded-xs`}></div>
        <div className="h-1 w-2 bg-ieee-darkblue-75 rounded-xs"></div>
        <div className="h-1 w-2 bg-ieee-darkblue-75 rounded-xs"></div>
      </div>
    </>
  );
};

export default SectionHeading;