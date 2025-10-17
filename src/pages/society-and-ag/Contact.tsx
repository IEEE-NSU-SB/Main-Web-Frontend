import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { useState } from "react";

interface PageData {
  primaryColor?: string;
  email?: string;
  fb?: string;
}

interface ContactProps {
  pageData: PageData;
}

const Contact: React.FC<ContactProps> = ({ pageData }) => {
  const primaryColor = pageData.primaryColor || "#000";
  const email = pageData.email || "";
  const fbLink = pageData.fb || "";
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const getFieldStyle = (field: string) => ({
    borderColor: focusedField === field ? primaryColor : "#d1d5db",
    boxShadow: focusedField === field ? `0 0 5px ${primaryColor}80` : "none",
    transition: "all 0.2s ease",
  });

  return (
    <>
      <SectionHeading title="Contact" widthClass="w-33" titleColor={primaryColor} underlineColor={primaryColor} />
      <div className="md:max-w-[1080px] w-full mx-auto my-10 px-5 space-y-6">
        {["name", "email", "message"].map((field, idx) => (
          <FadeIn key={idx}>
            <div>
              <label htmlFor={field} className="block text-lg font-medium mb-2 capitalize">
                {field === "message" ? "Your Message:" : `${field}:`}
              </label>
              {field === "message" ? (
                <textarea
                  id={field}
                  rows={6}
                  placeholder="Enter your message"
                  onFocus={() => setFocusedField(field)}
                  onBlur={() => setFocusedField(null)}
                  style={getFieldStyle(field)}
                  className="w-full px-4 py-3 text-lg border rounded-md focus:outline-none"
                />
              ) : (
                <input
                  id={field}
                  placeholder={`Enter your ${field}`}
                  onFocus={() => setFocusedField(field)}
                  onBlur={() => setFocusedField(null)}
                  style={getFieldStyle(field)}
                  className="w-full px-4 py-3 text-lg border rounded-md focus:outline-none"
                />
              )}
            </div>
          </FadeIn>
        ))}

        <FadeIn>
          <div className="flex justify-center pt-4">
            <button className="px-8 py-2 bg-ieee-blue-75 text-white text-md border border-ieee-blue rounded hover:bg-ieee-white hover:text-ieee-blue transition-colors duration-200">
              SUBMIT
            </button>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mt-6 text-left space-y-2">
            {email && (
              <p>
                Email Address: <a href={`mailto:${email}`} className="text-ieee-blue underline">{email}</a>
              </p>
            )}
            {fbLink && (
              <p>
                Facebook Page: <a href={fbLink} target="_blank" rel="noopener noreferrer" className="text-ieee-blue underline">{fbLink}</a>
              </p>
            )}
          </div>
        </FadeIn>
      </div>
    </>
  );
};

export default Contact;
