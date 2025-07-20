
const StatsSection = () => {
  return (
    <section className="py-16 bg-white ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="border-4 border-dashed border-ieee-blue rounded-xl">
            <p className="text-4xl font-bold mb-2 text-ieee-blue m-8">4</p>
            <p className="text-lg font-bold text-ieee-blue mb-8">
              CHAPTER & AG
            </p>
          </div>
          <div className="border-4 border-dashed border-ieee-blue rounded-xl">
            <p className="text-4xl font-bold mb-2 text-ieee-blue m-8">636</p>
            <p className="text-lg font-bold text-ieee-blue mb-8">MEMBERS</p>
          </div>
          <div className="border-4 border-dashed border-ieee-blue rounded-xl">
            <p className="text-4xl font-bold mb-2 text-ieee-blue m-8">264</p>
            <p className="text-lg font-bold text-ieee-blue mb-8">EVENTS</p>
          </div>
          <div className="border-4 border-dashed border-ieee-blue rounded-xl">
            <p className="text-4xl font-bold mb-2 text-ieee-blue m-8">57</p>
            <p className="text-lg font-bold text-ieee-blue mb-8">ACHIEVEMENTS</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
