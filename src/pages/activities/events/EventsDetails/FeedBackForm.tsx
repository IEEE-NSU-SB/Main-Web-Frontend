import SectionHeading from "@/components/ui/SectionHeading";
import React, { useState, useRef, useEffect } from "react";

interface Feedback {
  name: string;
  feedback: string;
  satisfaction: string;
}

const FeedbackForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    "How satisfied were you?"
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    satisfaction: "",
    comment: "",
  });

  const selectRef = useRef<HTMLDivElement>(null);

  const satisfactionOptions = [
    { value: "very-satisfied", label: "Very Satisfied" },
    { value: "satisfied", label: "Satisfied" },
    { value: "not-satisfied", label: "Not Satisfied" },
  ];

  // Example feedbacks (you can fetch from API later)
  const feedbacks: Feedback[] = [
    {
      name: "Aarif Rahman",
      feedback: "Amazing event! Everything was perfectly organized.",
      satisfaction: "Very Satisfied",
    },
    {
      name: "Nusrat Jahan",
      feedback: "Loved the speakers and the networking sessions!",
      satisfaction: "Satisfied",
    },
    {
      name: "Tanvir Ahmed",
      feedback: "It was good, but I think the event could be longer.",
      satisfaction: "Not Satisfied",
    },
    {
      name: "Sadia Karim",
      feedback: "Superb! The volunteers did a great job.",
      satisfaction: "Very Satisfied",
    },
  ];

  // --- Dropdown behavior ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectOption = (value: string, label: string) => {
    setSelectedOption(label);
    setFormData({ ...formData, satisfaction: value });
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Feedback submitted successfully!");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- Carousel infinite scroll effect ---
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollAmount = 0;
    const scrollSpeed = 1; // pixels per frame
    const container = carouselRef.current;

    const scroll = () => {
      if (container) {
        scrollAmount += scrollSpeed;
        if (scrollAmount >= container.scrollWidth / 2) {
          scrollAmount = 0;
        }
        container.scrollLeft = scrollAmount;
      }
      requestAnimationFrame(scroll);
    };

    const animation = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <div>
        {/* ---- Feedback Carousel ---- */}
        {feedbacks.length > 0 && ( 
      <><SectionHeading title="Participants Feedback" /><div
                  ref={carouselRef}
                  className="overflow-hidden whitespace-nowrap relative px-5 my-10"
              >
                  <div className="flex gap-6 animate-scroll">
                      {[...feedbacks, ...feedbacks].map((item, i) => (
                          <div
                              key={i}
                              className="min-w-[300px] md:min-w-[400px] bg-[#f7f7f7] rounded-2xl p-6 flex flex-col justify-between"
                          >
                              <p className="text-gray-700 text-sm md:text-base italic text-wrap">
                                  “{item.feedback}”
                              </p>
                              <div className="flex flex-row items-center gap-3 mt-4">
                                  <div className="rounded-full h-10 w-10 overflow-hidden">
                                      <img src="https://i.ibb.co.com/yBsqX5Dy/image.png" alt="" className="w-full h-full" />
                                  </div>
                                  <div>
                                      <p className="font-semibold text-gray-900">{item.name}</p>
                                      <p className="text-sm text-gray-500">{item.satisfaction}</p>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div></>
)}
      {/* ---- Feedback Form ---- */}
      <SectionHeading title="Leave a Feedback" />
      <div className="px-4 max-w-[1080px] mx-auto">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-5 py-4 bg-[#f0f0f0] text-base text-gray-800 rounded placeholder-gray-400 focus:outline-none focus:bg-[#e8e8e8] transition-colors"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-5 py-4 bg-[#f0f0f0] text-base text-gray-800 rounded placeholder-gray-400 focus:outline-none focus:bg-[#e8e8e8] transition-colors"
            />
          </div>

          {/* Dropdown */}
          <div className="relative" ref={selectRef}>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="w-full px-5 py-4 bg-[#f0f0f0] rounded text-base text-gray-800 cursor-pointer flex justify-between items-center hover:bg-[#e8e8e8] transition-colors"
            >
              <span>{selectedOption}</span>
              <span
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </div>

            <div
              className={`absolute top-full left-0 right-0 mt-0.5 bg-[#f0f0f0] rounded overflow-hidden z-10 transition-all duration-300 ${
                isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {satisfactionOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelectOption(option.value, option.label)}
                  className="px-5 py-4 bg-[#d9d9d9] text-gray-800 cursor-pointer hover:bg-[#c5c5c5] border-b border-[#c0c0c0] last:border-b-0 transition-colors"
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <textarea
              name="comment"
              placeholder="Your comment here...."
              value={formData.comment}
              onChange={handleInputChange}
              rows={6}
              className="w-full px-5 py-4 bg-[#f0f0f0] text-base text-gray-800 rounded placeholder-gray-400 focus:outline-none focus:bg-[#e8e8e8] transition-colors resize-y min-h-[150px]"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="flex justify-center mb-8">
            <button
              type="submit"
              className="w-full md:w-auto transition-all duration-300 border-1 border-ieee-darkblue hover:bg-[#002855] hover:text-white text-[#002855] bg-white px-6 py-2 rounded cursor-pointer"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
