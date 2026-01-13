import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { useState } from "react";
import { type ChapterPageData } from "@/types/chapter";

interface ContactProps {
  pageData: ChapterPageData,
  saveFeedbackLoading: boolean,
  saveFeedbackResponse: any,
  saveFeedback: (data:any) => any
}

const Contact: React.FC<ContactProps> = ({ pageData, saveFeedbackLoading, saveFeedbackResponse, saveFeedback }) => {
  const primaryColor = `${pageData.primaryColor}b6` || "#000";
  const email = pageData.email || "";
  const fbLink = pageData.fb || "";

  const [focusedField, setFocusedField] = useState<string | null>(null);

  // New States
  const [modalMsg, setModalMsg] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Dynamic Input Border Styling
  const getFieldStyle = (field: string) => ({
    borderColor: focusedField === field ? primaryColor : "#d1d5db",
    boxShadow: focusedField === field ? `0 0 6px ${primaryColor}` : "none",
    transition: "all 0.25s ease",
  });

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setModalMsg("Please fill in all fields.");
      setShowModal(true);
      return;
    }

    try {
      await saveFeedback(form);

      setModalMsg(saveFeedbackResponse?.message || "Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (error:any) {
      setModalMsg(error.message || "An error occurred. Please try again.");
    } finally {
      setShowModal(true);
    }
  };

  return (
    <>
      <SectionHeading title="Contact" titleColor={primaryColor} underlineColor={primaryColor} />

      <div className="md:max-w-[1080px] w-full mx-auto my-10 px-5 space-y-6">
        {["name", "email", "message"].map((field) => (
          <FadeIn key={field}>
            <div>
              <label htmlFor={field} className="block text-lg font-medium mb-2 capitalize">
                {field === "message" ? "Your Message:" : `${field}:`}
              </label>

              {field === "message" ? (
                <textarea
                  id={field}
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Enter your message"
                  onFocus={() => setFocusedField(field)}
                  onBlur={() => setFocusedField(null)}
                  style={getFieldStyle(field)}
                  className="w-full px-4 py-3 text-lg border rounded-md bg-white focus:outline-none"
                />
              ) : (
                <input
                  id={field}
                  value={form[field as "name" | "email"]}
                  onChange={handleChange}
                  placeholder={`Enter your ${field}`}
                  onFocus={() => setFocusedField(field)}
                  onBlur={() => setFocusedField(null)}
                  style={getFieldStyle(field)}
                  className="w-full px-4 py-3 text-lg border rounded-md bg-white focus:outline-none"
                />
              )}
            </div>
          </FadeIn>
        ))}

        {/* Submit Button */}
        <FadeIn>
          <div className="flex justify-center my-16">
            <button
              onClick={handleSubmit}
              disabled={saveFeedbackLoading}
              className="cursor-pointer font-bold py-2 px-10 rounded-[4px] border duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                borderColor: primaryColor,
                color: primaryColor,
              }}
              onMouseEnter={(e) => {
                if (!saveFeedbackLoading) {
                  e.currentTarget.style.backgroundColor = primaryColor;
                  e.currentTarget.style.color = "white";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = primaryColor;
              }}
            >
              {saveFeedbackLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </FadeIn>

        {/* Contact Info */}
        <FadeIn>
          <div className="mt-6 text-left space-y-2">
            {email && (
              <p>
                Email Address:{" "}
                <a href={`mailto:${email}`} className="underline font-medium" style={{ color: primaryColor }}>
                  {email}
                </a>
              </p>
            )}
            {fbLink && (
              <p>
                Facebook Page:{" "}
                <a href={fbLink} target="_blank" rel="noopener noreferrer" className="underline font-medium" style={{ color: primaryColor }}>
                  {fbLink}
                </a>
              </p>
            )}
          </div>
        </FadeIn>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-[999]">
          <div className="bg-white px-8 py-6 rounded-lg shadow-lg text-center space-y-4 max-w-sm">
            <p className="text-lg font-medium">{modalMsg}</p>
            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-2 font-semibold rounded-md"
              style={{ backgroundColor: primaryColor, color: "white" }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;
