import React from "react";
import pac24Image from "../assets/dummy/image1.png"; // Use placeholder image path
import SectionHeading from "./ui/section-heading";

type EventData = {
  image: string;
  date: string;
  author: string;
  title: string;
  description: string;
};

const events: EventData[] = [
  {
    image: pac24Image,
    date: "23rd December, 2025",
    author: "Azima Islam Ruba",
    title: "Human, In a battleground with Human-made Machines",
    description:
      "Join us for an exclusive and inspiring session titled “Ivy League Insights: A Step-by-Step Guide for Aspiring Engineers by Dr Ramisa Fariha” brought to you by IEEE NSU Student...",
  },
  {
    image: pac24Image,
    date: "23rd December, 2025",
    author: "Azima Islam Ruba",
    title: "Human, In a battleground with Human-made Machines",
    description:
      "Join us for an exclusive and inspiring session titled “Ivy League Insights: A Step-by-Step Guide for Aspiring Engineers by Dr Ramisa Fariha” brought to you by IEEE NSU Student...",
  },
  {
    image: pac24Image,
    date: "23rd December, 2025",
    author: "Azima Islam Ruba",
    title: "Human, In a battleground with Human-made Machines",
    description:
      "Join us for an exclusive and inspiring session titled “Ivy League Insights: A Step-by-Step Guide for Aspiring Engineers by Dr Ramisa Fariha” brought to you by IEEE NSU Student...",
  },
];

const EventCardList: React.FC = () => {
  return (
    <div className="w-full py-4">
      <SectionHeading title="Blogs" widthClass="w-32" />
      <div className="flex flex-wrap justify-center items-start gap-2 p-6 max-sm:px-5">
        {events.map((event, index) => (
          <div
            key={index}
            className="max-w-[330px] bg-ieee-white rounded-sm border overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="overflow-hidden h-48 w-full">
              <img
                src={event.image}
                alt={`Event ${index}`}
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-4 rounded-sm">
              <p className="text-sm font-semibold text-ieee-gray mb-1">{event.date}</p>
              <p className="text-sm font-semibold text-ieee-gray truncate">
                By {event.author}
              </p>
              <h3 className="font-bold my-3 line-clamp-2 text-ieee-black-75">
                {event.title}
              </h3>
              <p className="text-ieee-black-75 mb-4 line-clamp-4">
                {event.description}
              </p>
              <button className="cursor-pointer bg-ieee-darkblue-90 hover:bg-ieee-white text-ieee-white hover:text-ieee-darkblue-90 text-sm font-semibold px-5 py-[.25rem] border-1 border-ieee-darkblue-90 rounded-[.25rem] transition-colors duration-300">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCardList;
