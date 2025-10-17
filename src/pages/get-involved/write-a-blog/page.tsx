import React, { useState, useEffect } from "react";
import FadeIn from "@/components/ui/FadeIn";
import Wave from "@/components/Wave";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const chapters = [
  "IEEE NSU Student Branch",
  "IEEE NSU Power and Energy Society Student Branch Chapter",
  "IEEE NSU Robotics and Automation Society Student Branch Chapter",
  "IEEE NSU Industry Application Society Student Branch Chapter",
  "IEEE NSU Student Branch - Women in Engineering Affinity Group",
];

const categories = [
  "Science & Technology",
  "Robotics",
  "Artificial Intelligence",
  "Machine Learning",
  "Neural Network",
  "Life Science",
  "Women Empowerment",
  "Women in STEM",
  "Power and Energy",
  "Industry Automation",
  "Tips & Tricks",
  "News",
];

const WriteBlog: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    ieee_id: "",
    author_names: "",
    chapter: "",
    title: "",
    category: "",
    short_description: "",
    blogContent: "",
    blog_banner_picture: null as File | null,
  });

  const { quill, quillRef } = useQuill({
    theme: "snow",
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
    },
  });

  useEffect(() => {
    if (!quill) return;
    quill.on("text-change", () => {
      setFormData((prev) => ({ ...prev, blogContent: quill.root.innerHTML }));
    });
  }, [quill]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, bannerFile: file }));

      const reader = new FileReader();
      reader.onload = () => setBannerPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    const allFilled = Object.values(formData).every(
      (val) => val !== "" && val !== null
    );
    if (!allFilled) {
      e.preventDefault();
      alert("Please fill in all required fields!");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Blog publish request submitted successfully!");
      setBannerPreview(null);
      if (quill) quill.setText("");
    }, 2000);
  };

  return (
    <>
      <Wave
        title="Write a Blog"
        subtitle="Unleash your intellect on the realms of science and technology, guiding us towards a sustainable future with your insights on power and energy."
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

          {/* Form */}
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
                  name="ieee_id"
                  value={formData.ieeeId}
                  onChange={handleChange}
                  placeholder="Enter your IEEE ID"
                  className="w-full border border-ieee-black-15 bg-ieee-gray/5 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ieee-gray-15"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Writer Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="writer_name"
                  value={formData.writerName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full border border-ieee-black-15 bg-ieee-gray/5 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ieee-gray-15"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1 font-medium">
                  From which Chapter/Affinity Group?{" "}
                  <span className="text-red-600">*</span>
                </label>
                <select
                  name="chapter"
                  value={formData.chapter}
                  onChange={handleChange}
                  className="w-full border border-ieee-black-15 bg-ieee-gray/5 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ieee-gray-15"
                  required
                >
                  <option value="">Select Chapter/Affinity Group</option>
                  {chapters.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
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
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter blog title"
                  className="w-full border border-ieee-black-15 bg-ieee-gray/5 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ieee-gray-15"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Category <span className="text-red-600">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-ieee-black-15 bg-ieee-gray/5 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ieee-gray-15"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
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
                  name="short_description"
                  value={formData.shortDesc}
                  onChange={handleChange}
                  placeholder="Write a short description of your blog..."
                  className="w-full border border-ieee-black-15 bg-ieee-gray/5 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ieee-gray-15"
                  rows={3}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1 font-medium">
                  Write your blog <span className="text-red-600">*</span>
                </label>
                <div ref={quillRef} className="bg-ieee-gray/5 rounded h-60" />
              </div>

              <div className="md:col-span-2 mt-20">
                <label className="block mb-1 font-medium">
                  Blog Banner Picture <span className="text-red-600">*</span>
                </label>
                <input
                  type="file"
                  name="blog_banner_picture"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full border border-ieee-black-15 bg-ieee-gray/5 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ieee-gray-15"
                  required
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
                className="mt-6 w-full md:w-auto border-1 border-ieee-blue bg-ieee-blue text-white font-semibold cursor-pointer px-6 py-2 rounded hover:text-ieee-blue hover:bg-ieee-white transition-all 300"
                disabled={loading}
              >
                {loading ? "Publishing..." : "Place Publish Request"}
              </button>
            </div>
          </form>
        </section>
      </FadeIn>
    </>
  );
};

export default WriteBlog;
