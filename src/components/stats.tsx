
const StatsSection = ({stats}) => {
  return (
    <section className="max-w-[1078px] mx-auto py-16 bg-white ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="border-4 border-dashed border-ieee-blue rounded-xl">
            <p className="text-4xl font-bold mb-2 text-ieee-blue m-8">{stats.sc_ag_count}</p>
            <p className="text-lg font-bold text-ieee-blue mb-8">
              CHAPTER & AG
            </p>
          </div>
          <div className="border-4 border-dashed border-ieee-blue rounded-xl">
            <p className="text-4xl font-bold mb-2 text-ieee-blue m-8">{stats.all_member_count}</p>
            <p className="text-lg font-bold text-ieee-blue mb-8">MEMBERS</p>
          </div>
          <div className="border-4 border-dashed border-ieee-blue rounded-xl">
            <p className="text-4xl font-bold mb-2 text-ieee-blue m-8">{stats.event_count}</p>
            <p className="text-lg font-bold text-ieee-blue mb-8">EVENTS</p>
          </div>
          <div className="border-4 border-dashed border-ieee-blue rounded-xl">
            <p className="text-4xl font-bold mb-2 text-ieee-blue m-8">{stats.achievement_count}</p>
            <p className="text-lg font-bold text-ieee-blue mb-8">ACHIEVEMENTS</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
