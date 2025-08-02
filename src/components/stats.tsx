const stats = [
  { value: "4", label: "CHAPTER & AG" },
  { value: "636", label: "MEMBERS" },
  { value: "264", label: "EVENTS" },
  { value: "57", label: "ACHIEVEMENTS" },
];

const StatsSection = () => {
  const boxClasses =
    "border-4 border-dashed border-ieee-blue rounded-xl text-ieee-blue";
  const valueClasses = "text-4xl font-bold mb-2 m-8";
  const labelClasses = "text-lg font-bold mb-8";

  return (
    <section className="max-w-[1078px] mx-auto py-16 bg-ieee-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className={boxClasses}>
              <p className={valueClasses}>{stat.value}</p>
              <p className={labelClasses}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
