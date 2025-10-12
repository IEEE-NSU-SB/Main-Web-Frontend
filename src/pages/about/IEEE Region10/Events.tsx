import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa"; // optional icon for link

const EventsSection: React.FC = () => {
  return (
    <section className="bg-gray-100 text-left md:px-70 w-full">
      <div className="flex flex-col px-6 py-12">
        {/* Header */}
        <h2 className="text-3xl font-bold text-[var(--ieee-darkblue)] inline ">
          Events and Conference
        </h2>
        <span className="block w-16 h-1 bg-yellow-400 mt-2"></span>

        {/* Description */}
        <p className="text-gray-700 text-base md:text-lg mt-3 mb-6">
          TENCON is the flagship premier international technical{" "}
          <span className="font-semibold italic">conference</span> of{" "}
          <span className="font-semibold">IEEE Region 10</span>. IEEE sponsors
          more than 1,900 annual{" "}
          <span className="font-semibold italic">conferences</span> and{" "}
          <span className="font-semibold italic">events</span> worldwide, curating
          cutting-edge content for all of the technical fields of interest within{" "}
          <span className="font-semibold italic">IEEE</span>.
        </p>

        {/* Link */}
        <a
          href="#"
          className="text-blue-900 font-semibold flex items-center gap-1 hover:underline"
        >
          <FaExternalLinkAlt className="w-4 h-4" />
          Events List
        </a>
      </div>
    </section>
  );
};

export default EventsSection;