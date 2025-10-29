import FadeIn from "@/components/ui/FadeIn";
import type { EventData } from "@/types/event";
import { Calendar, DollarSign, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router";

type EventDetailsProps = {
  eventData: EventData;
};


const RegisterDetails: React.FC<EventDetailsProps> = ({ eventData }) => {
  const [currentUrl, setCurrentUrl] = useState("");
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);
  return (
    <FadeIn>
      <div className="max-w-[1080px] mx-auto px-[4px] md:px-[6px]">
        <div className="max-w-sm mx-auto">
          <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
            {/* Event Details Section */}
            <div className="p-3 space-y-4">
              {/* Start Time */}
              <div className="flex items-start gap-6 bg-ieee-darkblue/5 p-4 rounded-sm">
                <div className="mt-2">
                  <Calendar className="w-7 h-7 text-ieee-darkblue/90" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">
                    Start Time
                  </h3>
                  <p className="text-sm text-gray-600">
                    {eventData.start_date}
                  </p>
                </div>
              </div>

              {/* End Time */}
              <div className="flex items-start gap-6 bg-ieee-darkblue/5 p-4 rounded-sm">
                <div className="mt-2">
                  <Calendar className="w-7 h-7 text-ieee-darkblue/90" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">
                    End Time
                  </h3>
                  <p className="text-sm text-gray-600">{eventData.end_date}</p>
                </div>
              </div>

              {/* Cost */}
              <div className="flex items-start gap-6 bg-ieee-darkblue/5 p-4 rounded-sm">
                <div className="mt-2">
                  <DollarSign className="w-7 h-7 text-ieee-darkblue/90" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">
                    COST
                  </h3>
                  <p
                    className="text-sm text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: eventData.registration_fee_amount,
                    }}
                  />
                </div>
              </div>

              {/* More Info */}
              <div className="flex items-start gap-6 bg-ieee-darkblue/5 p-4 rounded-sm">
                <div className="mt-2">
                  <Info className="w-7 h-7 text-ieee-darkblue/90" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">
                    MORE INFO
                  </h3>
                  <a
                    href={eventData.read_more_link}
                    target="_blank"
                    className="text-sm text-ieee-blue-75 hover:text-ieee-blue hover:underline"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>

            {/* Register Button */}
            <div className="px-3 pb-6">
              <Link to={eventData.register_link}>
                <button className="border-1 border-ieee-darkblue cursor-pointer w-full bg-[#002855] hover:bg-ieee-white hover:text-ieee-darkblue text-white font-bold py-4 px-6 rounded transition-colors duration-200">
                  REGISTER
                </button>
              </Link>
            </div>
          </div>
          {/* Share Section */}
          <div className="p-6 mt-6 rounded-md bg-ieee-white border border-gray-200 shadow-sm">
            <h3 className="text-center text-md font-bold text-ieee-blue mb-4">
              SHARE THIS EVENT
            </h3>

            <div className="flex justify-center items-center gap-4">
              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  currentUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1877F2] hover:text-[#0C63D4] transition-colors"
                aria-label="Share on Facebook"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Twitter/X */}
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  currentUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-gray-700 transition-colors"
                aria-label="Share on Twitter"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                  currentUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0A66C2] hover:text-[#004182] transition-colors"
                aria-label="Share on LinkedIn"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              {/* Email */}
              <a
                href={`mailto:?subject=Check this out&body=${encodeURIComponent(
                  currentUrl
                )}`}
                className="text-[#EA4335] hover:text-[#C5221F] transition-colors"
                aria-label="Share via Email"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default RegisterDetails;
