import FadeIn from "@/components/ui/FadeIn";
import Wave from "@/components/Wave";
import { useState } from "react";
import { useFetchDataAPI } from "@/hooks/fetchdata";

interface QA {
  question: string;
  answer: string;
}

interface Category {
  title: string;
  qas: QA[];
}

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { loading: dataLoading, data, error } = useFetchDataAPI<any>({
    apiUrl: "main_website/get_faq/",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setModalMsg("Please fill in all required fields!");
      setShowModal(true);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/main_website/submit_question/`, // Update with your actual endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const responseData = await res.json();
      setModalMsg(
        responseData?.message ||
        "Your message has been submitted successfully! We'll get back to you soon."
      );

      // Reset form
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      setModalMsg(err.message || "Something went wrong! Please try again.");
    } finally {
      setLoading(false);
      setShowModal(true);
    }
  };

  if (dataLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">Error loading FAQ data</div>
      </div>
    );
  }

  const faqData: Category[] = data
    ? Object.keys(data).map((key) => ({
      title: key,
      qas: data[key],
    }))
    : [];

  return (
    <>
      <Wave title="Frequently Asked Questions - IEEE NSU SB" />

      <FadeIn>
        <section className="py-16 px-5 flex flex-col items-center max-w-[1080px] m-auto">
          <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8 md:gap-10">
            <div className="relative block md:hidden w-full">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full border border-gray-300 bg-white text-[#002855] font-semibold rounded-md p-3 flex justify-between items-center shadow-sm focus:outline-none"
              >
                {faqData[activeCategory]?.title}
                <span
                  className={`transform transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                >
                  ▼
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
                      className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors ${activeCategory === index
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

            <ul className="hidden md:flex md:flex-col md:w-1/4 w-full justify-start gap-3">
              {faqData.map((category, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      setActiveCategory(index);
                      setOpenQuestion(null);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-md border transition-all duration-300 cursor-pointer ${activeCategory === index
                      ? "bg-[#002855] text-[#FFD100]"
                      : "bg-white hover:bg-[#002855] hover:text-[#FFD100] text-black"
                      }`}
                  >
                    {category.title}
                  </button>
                </li>
              ))}
            </ul>

            <div className="md:w-3/4 w-full space-y-4">
              {faqData[activeCategory]?.qas.map((qa, i) => (
                <div
                  key={i}
                  className="bg-[#E6F0FB] rounded-lg shadow-sm overflow-hidden transition-all"
                >
                  <button
                    onClick={() =>
                      setOpenQuestion(openQuestion === i ? null : i)
                    }
                    className="flex justify-between items-center w-full px-5 py-3 font-semibold text-[#002855] text-left text-base sm:text-lg cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xl font-bold">+</span> {qa.question}
                    </span>
                  </button>
                  <div
                    className={`px-5 text-[#002855] transition-all duration-500 ease-in-out ieee-scrollbar ${openQuestion === i
                      ? "max-h-96 py-3 overflow-y-scroll"
                      : "max-h-0 overflow-hidden"
                      }`}
                  >
                    <p
                      className="text-sm sm:text-base leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: qa.answer }}
                    />
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
                Ask us any question related to IEEE NSU SB. We'll email you the
                answer as soon as possible.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="md:w-1/2 w-full flex flex-col gap-4 bg-[#0a1b2c] p-6 rounded-2xl shadow-lg"
            >
              <div>
                <label className="text-white text-sm mb-1 block">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 rounded-md border border-gray-400 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-[#00B5E2] transition"
                />
              </div>

              <div>
                <label className="text-white text-sm mb-1 block">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 rounded-md border border-gray-400 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-[#00B5E2] transition"
                />
              </div>

              <div>
                <label className="text-white text-sm mb-1 block">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full p-2 rounded-md border border-gray-400 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-[#00B5E2] transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#00B5E2] hover:bg-[#009dc7] text-white font-semibold py-2 rounded-md transition-all duration-300 w-full sm:w-32 self-center md:self-start disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </section>
      </FadeIn>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 w-80 text-center">
            <p className="mb-4 text-gray-800">{modalMsg}</p>
            <button
              className="px-4 py-2 bg-[#00B5E2] text-white rounded hover:bg-[#009dc7] transition-colors"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FAQPage;