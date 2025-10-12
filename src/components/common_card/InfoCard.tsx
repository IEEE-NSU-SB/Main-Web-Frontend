import React from "react";

interface InfoCardProps {
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
}

interface InfoCardSectionProps {
  data: InfoCardProps[];
  className?: string; 
}

/* ---------- Single Card ---------- */
const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  linkText,
  linkUrl,
}) => {
  return (
    <div className="flex-1 border-l border-gray-600 pl-6 text-gray-200 max-w-xl">
      <h2 className="text-3xl whitespace-nowrap font-bold mb-3 inline-block ">
        {title}
        <span className="block w-20 h-1 bg-white mt-2 rounded"></span>
      </h2>
      <p className="text-lg leading-relaxed mb-4">{description}</p>
      <a
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-yellow-400 text-xl font-semibold flex items-center gap-1 hover:text-white"
      >
        ↗ {linkText}
      </a>
    </div>
  );
};

/* ---------- Section Wrapper ---------- */
const InfoCardSection: React.FC<InfoCardSectionProps> = ({
  data,
  className = "",
}) => {
  return (
    <div
      className={`py-10 px-6 flex flex-col md:flex-row md:items-start md:justify-center gap-10 md:gap-16 flex-wrap ${className}`}
    >
      {data.map((item, index) => (
        <InfoCard
          key={index}
          title={item.title}
          description={item.description}
          linkText={item.linkText}
          linkUrl={item.linkUrl}
        />
      ))}
    </div>
  );
};

export default InfoCardSection;
