"use client";

import { useState } from "react";
import Wave from "@/components/wave";
import FadeIn from "@/components/ui/fade-in";

interface QA {
  question: string;
  answer: string;
}

interface Category {
  title: string;
  qas: QA[];
}

const faqData: Category[] = [
  {
    title: "About IEEE",
    qas: [
      { question: "What is IEEE ?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
      { question: "Vision and mission of IEEE", answer: "Curabitur commodo justo vitae dolor tincidunt aliquam." },
      { question: "Globalization of IEEE", answer: "Suspendisse potenti. Integer non dui nec eros viverra fringilla." },
      { question: "Advantages and resources of IEEE", answer: "Praesent eget sem euismod, posuere elit et, malesuada nunc." },
    ],
  },
  {
    title: "Benefits of IEEE membership",
    qas: [
      { question: "Training for Student Branch Development", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
      { question: "Membership resources", answer: "Proin sed arcu eget orci ullamcorper malesuada." },
      { question: "IEEE membership all across the world", answer: "Vestibulum vitae purus sed libero facilisis blandit." },
      { question: "Volunteer Development and resources", answer: "Aliquam erat volutpat. Donec mattis turpis in urna posuere." },
    ],
  },
  {
    title: "About IEEE NSU SB",
    qas: [
      { question: "What is IEEE NSU SB?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
      { question: "Purpose and Objective of IEEE NSU SB", answer: "Sed dignissim turpis nec sapien feugiat ultricies." },
      { question: "Member opportunities of IEEE NSU SB", answer: "Aenean sit amet arcu suscipit, convallis neque quis, varius justo." },
      { question: "Executive body of IEEE NSU SB", answer: "Curabitur tincidunt erat in tincidunt aliquet, ex erat egestas turpis." },
      { question: "How to connect with IEEE NSU SB", answer: "Morbi luctus erat at felis tristique, nec fermentum ex finibus." },
    ],
  },
  {
    title: "Societies of IEEE NSU SB",
    qas: [
      { question: "Chapters and Affinity Group of IEEE NSU SB", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
      { question: "IEEE NSU PES Student Branch Chapter", answer: "Nullam consequat risus non justo blandit, ut imperdiet justo gravida." },
      { question: "IEEE NSU RAS Student Branch Chapter", answer: "Vivamus a lorem ac diam iaculis facilisis." },
      { question: "IEEE NSU IAS Student Branch Chapter", answer: "Mauris vulputate diam id lacus fringilla ultricies." },
      { question: "IEEE NSU WIE Affinity Group", answer: "Nam posuere elit id libero vulputate viverra." },
    ],
  },
  {
    title: "How to join with us",
    qas: [
      { question: "Join IEEE NSU SB", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
      { question: "How to join a chapter of IEEE", answer: "Etiam porta lorem sed magna pretium, sed blandit purus suscipit." },
      { question: "How much to pay for IEEE membership?", answer: "Donec malesuada erat ut metus tempus, in sodales eros ultricies." },
      { question: "Renewal Fee", answer: "Aenean porttitor leo in augue gravida, non tincidunt nulla aliquam." },
      { question: "How to connect with IEEE and IEEE NSU SB?", answer: "Proin bibendum magna vitae ante ullamcorper tincidunt." },
    ],
  },
];

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <Wave title="Frequently Asked Questions - IEEE NSU SB" />

      <FadeIn>
        <section className="py-16 px-6 flex flex-col items-center">
          <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="relative block md:hidden w-full">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full border border-gray-300 bg-white text-[#002855] font-semibold rounded-md p-3 flex justify-between items-center shadow-sm focus:outline-none"
              >
                {faqData[activeCategory].title}
                <span
                  className={`transform transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  😭
                </span>
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
                  {faqData.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveCategory(index);
                        setIsDropdownOpen(false);
                        setOpenQuestion(null);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                        activeCategory === index
                          ? "bg-[#002855] text-[#FFD100]"
                          : "hover:bg-[#E6F0FB] text-[#002855]"
                      }`}
                    >
                      {category.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <ul className="hidden md:flex md:flex-col md:w-1/3 w-full justify-start gap-3">
              {faqData.map((category, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      setActiveCategory(index);
                      setOpenQuestion(null);
                    }}
                    className={`w-full text-left px-5 py-2 font-medium rounded-md border transition-all duration-300 ${
                      activeCategory === index
                        ? "bg-[#002855] text-[#FFD100]"
                        : "bg-white hover:bg-[#002855] hover:text-[#FFD100] text-black"
                    }`}
                  >
                    {category.title}
                  </button>
                </li>
              ))}
            </ul>

            <div className="md:w-2/3 w-full space-y-4">
              {faqData[activeCategory].qas.map((qa, i) => (
                <div key={i} className="bg-[#E6F0FB] rounded-lg shadow-sm overflow-hidden transition-all">
                  <button
                    onClick={() =>
                      setOpenQuestion(openQuestion === i ? null : i)
                    }
                    className="flex justify-between items-center w-full px-5 py-3 font-semibold text-[#002855] text-left text-base sm:text-lg"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xl font-bold">+</span> {qa.question}
                    </span>
                  </button>
                  <div
                    className={`px-5 text-[#002855] transition-all duration-500 ease-in-out ${
                      openQuestion === i
                        ? "max-h-40 py-3"
                        : "max-h-0 overflow-hidden"
                    }`}
                  >
                    <p className="text-sm sm:text-base leading-relaxed">{qa.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full bg-[#06121D] py-16 px-6 flex justify-center">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12 w-full max-w-5xl">
            <div className="md:w-1/2 w-full text-center md:text-left">
              <h2 className="text-[#FFD100] text-3xl sm:text-4xl font-semibold mb-3 leading-tight">
                Would you like to know more?
              </h2>

              <div className="flex justify-center md:justify-start items-center gap-2 mb-4">
                <div className="h-1.5 w-1.5 bg-[#00629B] rounded-full" />
                <div className="h-1.5 w-1.5 bg-[#00629B] rounded-full" />
                <div className="h-1.5 w-1.5 bg-[#00629B] rounded-full" />
                <div className="h-1.5 w-24 bg-[#00629B] rounded-full" />
              </div>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                Ask us any question related to IEEE NSU SB. We’ll email you the
                answer as soon as possible.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Your message has been submitted!"); //dummy form no functionality yet :')
              }}
              className="md:w-1/2 w-full flex flex-col gap-4 bg-[#0a1b2c] p-6 rounded-2xl shadow-lg"
            >
              <div>
                <label className="text-white text-sm mb-1 block">Your Name</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 rounded-md border border-gray-400 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-[#00B5E2] transition"
                />
              </div>

              <div>
                <label className="text-white text-sm mb-1 block">Your Email</label>
                <input
                  type="email"
                  required
                  className="w-full p-2 rounded-md border border-gray-400 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-[#00B5E2] transition"
                />
              </div>

              <div>
                <label className="text-white text-sm mb-1 block">Your Message</label>
                <textarea
                  required
                  rows={4}
                  className="w-full p-2 rounded-md border border-gray-400 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-[#00B5E2] transition"
                />
              </div>

              <button
                type="submit"
                className="bg-[#00B5E2] hover:bg-[#009dc7] text-white font-semibold py-2 rounded-md transition-all duration-300 w-full sm:w-32 self-center md:self-start"
              >
                Submit
              </button>
            </form>
          </div>
        </section>
      </FadeIn>
    </>
  );
};

export default FAQPage;
