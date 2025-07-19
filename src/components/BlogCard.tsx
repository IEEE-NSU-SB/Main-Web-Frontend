import React from "react";
import pac24Image from "../assets/dummy/image1.png"; // Use placeholder image path

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
      <h2 className="max-w-[1078px] mx-auto text-[rgba(0,40,85,0.8)] text-3xl font-bold px-4 mt-10">
        Blogs
      </h2>

      <div className="flex gap-1 max-w-[1045px] mx-auto mt-2 mb-4">
        <div className="h-1 w-32 bg-[rgba(0,40,85,0.8)] rounded-xs"></div>
        <div className="h-1 w-2 bg-[rgba(0,40,85,0.8)] rounded-xs"></div>
        <div className="h-1 w-2 bg-[rgba(0,40,85,0.8)] rounded-xs"></div>
      </div>
      <div className="flex flex-wrap justify-center items-start gap-6 p-6">
        {events.map((event, index) => (
          <div
            key={index}
            className="max-w-[330px] bg-white rounded-sm border overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 p-2"
          >
            <div className="overflow-hidden h-48 w-full rounded-sm">
              <img
                src={event.image}
                alt={`Event ${index}`}
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-3 bg-[rgba(189,189,189,0.22)] mt-2 rounded-sm">
              <p className="text-sm font-semibold text-[#464646] mb-1">{event.date}</p>
              <p className="text-sm font-semibold text-[#464646] truncate">
                By {event.author}
              </p>
              <h3 className="font-bold text-md my-1 line-clamp-2 text-black">
                {event.title}
              </h3>
              <p className="text-sm text-black mb-4 line-clamp-4">
                {event.description}
              </p>
              <button className=" bg-[rgba(0,40,85,0.9)] hover:bg-white text-white hover:text-[rgba(0,40,85,0.9)] text-sm font-semibold px-5 py-[.25rem] border-1 border-[rgba(0,40,85,0.9)] rounded-[.25rem] transition-colors duration-300">
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
