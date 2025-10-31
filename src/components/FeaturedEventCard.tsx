import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { BiCategory } from "react-icons/bi";
import { Calendar } from "lucide-react";
import { Link } from "react-router";

interface FeaturedEvent {
  id: string;
  name: string;
  description: string;
  image: string;
  date: string;
  category: string;
}

interface FeaturedEventCardProps {
  events: FeaturedEvent[];
  color?: string;
}

const FeaturedEventCard: React.FC<FeaturedEventCardProps> = ({
  events,
  color,
}) => {
  if (!events || events.length === 0) return null; // don't render if no events

  return (
    <>
      <SectionHeading
        title="Featured Events"
        titleColor={`${color}b6`}
        underlineColor={`${color}b6`}
      />
      <FadeIn threshold={0}>
        <div className="md:max-w-[1080px] w-full mx-auto my-10 px-3 flex flex-wrap justify-baseline gap-11 mb-15">
          {events.slice(0, 6).map((event) => (
            <article
              key={event.id}
              className="w-full md:w-[calc(31.333%-1rem)] h-[400px] border rounded-md overflow-hidden hover:shadow-[4px_4px_10px_var(--color-ieee-gray-50)] shadow-[2px_2px_8px_var(--color-ieee-gray-50)] transition-all"
              style={{
                background: `linear-gradient(
              to bottom right,
              ${color} 0%,              
              ${color}b6 22%,    
              ${color}32 33%,        
              ${color}12 50%,        
              ${color}12 82%,              
              ${color}42 89%,    
              ${color}86 100%       
            )`,
              }}
            >
              <Link to={event.id ? `/events/${event.id}` : "#"}>
                <div className="relative h-[180px] overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover transform transition duration-500 hover:scale-105 hover:brightness-90"
                  />
                </div>
                <div className="p-4 text-ieee-black-75">
                  <h5 className="inline-flex gap-2 text-[12px] font-semibold px-2 py-1 border-1 rounded-full border-ieee-gray mr-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(event.date).toISOString().split("T")[0]}
                  </h5>
                  <h5 className="inline-flex gap-2 text-[12px] font-semibold px-2 py-1 border-1 rounded-full border-ieee-gray">
                    <BiCategory className="w-4 h-4" /> {event.category}
                  </h5>
                  <h3 className="text-[20px] font-semibold mt-3 line-clamp-1 hover:underline">
                    {event.name}
                  </h3>
                  <p
                    className="text-[16px] line-clamp-4 h-24 mb-5"
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />
                </div>
              </Link>
            </article>
          ))}
        </div>
      </FadeIn>
      <div className="text-center flex justify-center my-16">
        <Link to="/events">
          <button
            className="cursor-pointer flex items-center gap-2 border-1 font-bold py-2 px-4 duration-300 rounded-[4px] "
            style={{
              backgroundColor: "white",
              borderColor: color,
              color: color,
            }}
            onMouseEnter={(e) => (
              (e.currentTarget.style.backgroundColor = `${color}`),
              (e.currentTarget.style.color = `white`)
            )}
            onMouseLeave={(e) => (
              (e.currentTarget.style.backgroundColor = `white`),
              (e.currentTarget.style.color = `${color}`)
            )}
          >
            <Calendar className="w-4 h-4" /> See All Events
          </button>
        </Link>
      </div>
    </>
  );
};

export default FeaturedEventCard;
