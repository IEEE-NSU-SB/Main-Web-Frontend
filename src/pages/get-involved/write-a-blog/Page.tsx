// import React, { useState, useRef, useEffect } from "react";
import React, { useState, useRef } from "react";
import FadeIn from "@/components/ui/FadeIn";
import Wave from "@/components/Wave";
// import { useQuill } from "react-quilljs";
// import "quill/dist/quill.snow.css";

const chapters = [
  { id: 1, label: "IEEE NSU Student Branch" },
  { id: 2, label: "IEEE NSU Power and Energy Society Student Branch Chapter" },
  {
    id: 3,
    label: "IEEE NSU Robotics and Automation Society Student Branch Chapter",
  },
  {
    id: 4,
    label: "IEEE NSU Industry Application Society Student Branch Chapter",
  },
  {
    id: 5,
    label: "IEEE NSU Student Branch - Women in Engineering Affinity Group",
  },
];

const categories = [
  { id: 1, label: "Science & Technology" },
  { id: 2, label: "Robotics" },
  { id: 3, label: "Artificial Intelligence" },
  { id: 4, label: "Machine Learning" },
  { id: 5, label: "Neural Network" },
  { id: 6, label: "Life Science" },
  { id: 7, label: "Women Empowerment" },
  { id: 8, label: "Women in STEM" },
  { id: 9, label: "Power and Energy" },
  { id: 10, label: "Industry Automation" },
  { id: 11, label: "Tips & Tricks" },
  { id: 12, label: "News" },
];

const WriteBlog: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [modalMsg, setModalMsg] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  const ieeeRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const chapterRef = useRef<HTMLSelectElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const shortDescRef = useRef<HTMLTextAreaElement>(null);
  const bannerRef = useRef<HTMLInputElement>(null);

  // const { quill } = useQuill({
  //   theme: "snow",
  //   modules: {
  //     toolbar: [
  //       [{ header: [1, 2, false] }],
  //       ["bold", "italic", "underline", "strike"],
  //       [{ list: "ordered" }, { list: "bullet" }],
  //       ["link", "image"],
  //       ["clean"],
  //     ],
  //   },
  // });

  // const [blogContent, setBlogContent] = useState("");
  // useEffect(() => {
  //   if (!quill) return;
  //   quill.on("text-change", () => setBlogContent(quill.root.innerHTML));
  // }, [quill]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => setBannerPreview(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !ieeeRef.current?.value ||
      !authorRef.current?.value ||
      !chapterRef.current?.value ||
      !titleRef.current?.value ||
      !categoryRef.current?.value ||
      !shortDescRef.current?.value ||
      // !blogContent ||
      !bannerRef.current?.files?.[0]
    ) {
      setModalMsg("Please fill in all required fields!");
      setShowModal(true);
      return;
    }

    const fd = new FormData();
    fd.append("ieee_id", ieeeRef.current.value);
    fd.append("writer_name", authorRef.current.value);
    fd.append("branch_or_society", chapterRef.current.value);
    fd.append("title", titleRef.current.value);
    fd.append("category", categoryRef.current.value);
    fd.append("short_description", shortDescRef.current.value);
    // fd.append("description", blogContent);
    fd.append("blog_banner_picture", bannerRef.current.files[0]);
    console.log("FormData contents:");

    for (let [key, value] of fd.entries()) {
      if (value instanceof File) {
        console.log(key, value.name, value.type, value.size + " bytes");
      } else {
        console.log(key, value);
      }
    }

    setLoading(true);
    try {
      // Dummy backend URL
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/main_website/get_blogs/`,
        {
          method: "POST",
          body: fd,
        }
      );
      const data = await res.json();
      setModalMsg(data?.message || "Blog submitted successfully!");
    } catch (err: any) {
      setModalMsg(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
      setShowModal(true);
    }
  };

  return (
    <>
      <Wave
        title="Write a Blog"
        // subtitle="Unleash your intellect on the realms of science and technology, guiding us towards a sustainable future with your insights on power and energy."
      />
      <FadeIn>
        <section className="max-w-[900px] mx-auto py-6 px-5 sm:px-12 lg:px-5 mb-10">
          {/* Instructions */}
          <div className="mb-8 px-4 bg-ieee-gray-10 rounded-lg">
            <h2 className="text-xl font-bold mb-3 text-ieee-darkblue">
              Read Instructions before submitting your Blog
            </h2>
            <ul className="list-disc list-inside text-ieee-black-75 space-y-1">
              <li>
                You must be a Registered IEEE NSU Student Branch Member to get
                your blogs published in our website!
              </li>
              <li>
                IEEE NSU Student Branch holds the right to decline or delete
                your Blog.
              </li>
              <li>
                IEEE NSU Student Branch will not publish any Blog that does not
                go with the Code of Conduct!
              </li>
              <li>Keep Blogging! 😃 😁</li>
            </ul>
          </div>

          <form
            method="POST"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="bg-ieee-gray/1 shadow-[2px_2px_8px_theme(colors.ieee-black-25)] transition-all duration-300 rounded-lg p-6"
          >
            <h3 className="text-2xl font-semibold mb-4 text-ieee-darkblue text-center">
              Write Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">
                  IEEE ID <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  ref={ieeeRef}
                  placeholder="Enter your IEEE ID"
                  className="w-full border border-ieee-black-15 bg-ieee-gray/5 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ieee-gray-15"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Writer Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  ref={authorRef}
                  placeholder="Enter your full name"
                  className="w-full border border-ieee-black-15 bg-ieee-gray/5 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ieee-gray-15"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1 font-medium">
                  From which Chapter/Affinity Group?{" "}
                  <span className="text-red-600">*</span>
                </label>
                <select
                  ref={chapterRef}
                  className="w-full border border-ieee-black-15 bg-ieee-gray/5 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ieee-gray-15"
                >
                  <option value="">Select Chapter/Affinity Group</option>
                  {chapters.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <hr className="my-10 border-ieee-gray-15" />

            <h3 className="text-2xl font-semibold mb-4 text-ieee-darkblue text-center">
              Blog Description
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">
                  Title <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  ref={titleRef}
                  placeholder="Enter blog title"
                  className="w-full border border-ieee-black-15 bg-ieee-gray/5 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ieee-gray-15"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Category <span className="text-red-600">*</span>
                </label>
                <select
                  ref={categoryRef}
                  className="w-full border border-ieee-black-15 bg-ieee-gray/5 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ieee-gray-15"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1 font-medium">
                  Short Description of Blog{" "}
                  <span className="text-red-600">*</span>
                </label>
                <textarea
                  ref={shortDescRef}
                  placeholder="Write a short description of your blog..."
                  className="w-full border border-ieee-black-15 bg-ieee-gray/5 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ieee-gray-15"
                  rows={3}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1 font-medium">
                  Write your blog <span className="text-red-600">*</span>
                </label>
                <textarea
                  
                  placeholder="Write a short description of your blog..."
                  className="w-full border border-ieee-black-15 bg-ieee-gray/5 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ieee-gray-15"
                  rows={6}
                />
                {/* <div ref={quillRef} className="bg-ieee-gray/5 rounded h-60" /> */}
              </div>

              <div className="md:col-span-2 mt-0">
                <label className="block mb-1 font-medium">
                  Blog Banner Picture <span className="text-red-600">*</span>
                </label>
                <input
                  type="file"
                  ref={bannerRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full border border-ieee-black-15 bg-ieee-gray/5 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ieee-gray-15"
                />
                {bannerPreview && (
                  <img
                    src={bannerPreview}
                    alt="Banner Preview"
                    className="mt-3 w-full max-h-60 object-contain rounded-lg border border-ieee-black-15"
                  />
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                name="submit_blog"
                className="mt-6 w-full md:w-auto border-1 border-ieee-blue hover:bg-ieee-blue hover:text-white font-semibold cursor-pointer px-6 py-2 rounded text-ieee-blue bg-transparent transition-all 300"
                disabled={loading}
              >
                {loading ? "Publishing..." : "Place Publish Request"}
              </button>
            </div>
          </form>
        </section>
      </FadeIn>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 w-80 text-center">
            <p className="mb-4">{modalMsg || "Request sent successfully!"}</p>
            <button
              className="px-4 py-2 bg-ieee-blue text-white rounded hover:bg-ieee-darkblue"
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

export default WriteBlog;
