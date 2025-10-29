import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { useState } from "react";
import { type ChapterPageData } from "@/types/chapter";

interface ContactProps {
  pageData: ChapterPageData;
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
      <SectionHeading title="Contact" titleColor={primaryColor} underlineColor={primaryColor} />
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
            <div className="text-center flex justify-center my-16">
          <button
            className="cursor-pointer flex items-center gap-2 border-1 font-bold py-2 px-8 duration-300 rounded-[4px]"
            style={{
              backgroundColor: "white",
              borderColor: primaryColor,
              color: primaryColor,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = `${primaryColor}`,
              e.currentTarget.style.color = `white`)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = `white`,
              e.currentTarget.style.color = `${primaryColor}`)
            }
          >
            Submit
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
      </div>``
    </>
  );
};

export default Contact;
