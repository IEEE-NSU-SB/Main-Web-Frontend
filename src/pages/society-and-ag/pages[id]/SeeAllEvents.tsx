import { Calendar } from "lucide-react";

const SeeAllEvents = () => {
  return (
      <div className="text-center flex justify-center my-16">
        <button className="bg-[#50C878] cursor-pointer flex font-bold py-2 px-4 duration-300 rounded-md hover:bg-[#61A60E]">
          <Calendar /> See All Events
        </button>
      </div>
  );
};

export default SeeAllEvents;
