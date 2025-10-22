import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { Calendar } from "lucide-react";
import { Link } from "react-router";

interface FeaturedEvent {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
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
    <FadeIn>
      <SectionHeading
        title="Featured Events"
        widthClass="w-58"
        titleColor={color}
        underlineColor={color}
      />
      <div className="md:max-w-[1080px] w-full mx-auto my-10 px-3 flex flex-wrap justify-center gap-4 mb-15">
        {events.map((event) => (
          <article
            key={event.id}
            className="w-full md:w-[calc(33.333%-1rem)] bg-white h-[460px] border rounded-md overflow-hidden hover:shadow-lg transition-all"
            style={{ backgroundColor: `${color}E6` }}
          >
            <Link to={event.id}>
              <div className="relative h-[200px] overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transform transition duration-500 hover:scale-105 hover:brightness-90"
                />
              </div>
            </Link>
            <div className="p-4 text-white">
              <Link to={event.id}>
                <h3 className="text-[20px] font-semibold mb-4 line-clamp-1">
                  {event.title}
                </h3>
              </Link>
              <h5 className="flex gap-2 text-sm font-semibold mb-2">
                <Calendar className="w-4 h-4" /> {event.date}
              </h5>
              <p className="text-[16px] line-clamp-4 h-24 mb-5">
                {event.description}
              </p>
              <a
                href="#"
                className="border border-white bg-white/20 hover:bg-white text-white hover:text-black px-4 py-1 rounded transition-all"
              >
                Read More
              </a>
            </div>
          </article>
        ))}
      </div>
      <div className="text-center flex justify-center my-16">
        <Link to="/events">
          <button
            className="cursor-pointer flex items-center gap-2 border-1 font-bold py-2 px-4 duration-300 rounded-md "
            style={{
              backgroundColor: "white",
              borderColor: color,
              color: color,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = `${color}`,
              e.currentTarget.style.color = `white`)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = `white`,
              e.currentTarget.style.color = `${color}`)
            }
          >
            <Calendar className="w-4 h-4" /> See All Events
          </button>
        </Link>
      </div>
    </FadeIn>
  );
};

export default FeaturedEventCard;
