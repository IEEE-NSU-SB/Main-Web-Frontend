import React, { useState, useEffect } from "react";
import FadeIn from "@/components/ui/FadeIn";
import Wave from "@/components/waave";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

// Chapters with numeric IDs
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

// Categories with numeric IDs
const categories = [
  { id: 1, label: "Artificial Intelligence" },
  { id: 2, label: "Machine Learning" },
  { id: 3, label: "Robotics" },
];

const AddResearchPaper: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [modalMsg, setModalMsg] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    authors: "",
    chapter: "", // will store numeric ID as string
    title: "",
    category: "", // will store numeric ID as string
    abstract: "",
    publicationLink: "",
    bannerFile: null as File | null,
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
      setFormData((prev) => ({ ...prev, abstract: quill.root.innerHTML }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allFilled =
      formData.authors &&
      formData.chapter &&
      formData.title &&
      formData.category &&
      formData.abstract &&
      formData.publicationLink &&
      formData.bannerFile;

    if (!allFilled) {
      setModalMsg("Please fill in all required fields!");
      setShowModal(true);
      return;
    }

    // Prepare FormData
    const fd = new FormData();
    fd.append("authors", formData.authors);
    fd.append("chapter", formData.chapter); // numeric ID as string
    fd.append("title", formData.title);
    fd.append("category", formData.category); // numeric ID as string
    fd.append("abstract", formData.abstract);
    fd.append("publicationLink", formData.publicationLink);
    fd.append("bannerFile", formData.bannerFile!);

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
      const res = await fetch("https://dummyapi.io/research-papers", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      setModalMsg(data?.message || "Research Paper submitted successfully!");
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
        title="Add a Research Paper"
        // subtitle="Contribute your authentic research and insights to our IEEE NSU Student Branch community!"
      />
      <FadeIn>
        <section className="max-w-[900px] mx-auto py-6 px-5 sm:px-12 lg:px-5 mb-30">
          {/* Instructions */}
          <div className="mb-8 px-4 bg-ieee-gray-10 rounded-lg">
            <h2 className="text-xl font-bold mb-3 text-ieee-darkblue">
              Read Instructions before submitting your Research Paper
            </h2>
            <ul className="list-disc list-inside text-ieee-black-75 space-y-1">
              <li>
                You must be a Registered IEEE NSU Student Branch Member to get
                your Research Paper added!
              </li>
              <li>
                IEEE NSU Student Branch holds the right to decline or delete
                your Research Paper.
              </li>
              <li>
                IEEE NSU Student Branch will not publish any Research that is
                not authentic!
              </li>
              <li>Keep Grinding! 😃 😁</li>
            </ul>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-ieee-gray/1 shadow-[2px_2px_8px_theme(colors.ieee-black-25)] transition-all duration-300 rounded-lg p-6"
          >
            <h3 className="text-2xl font-semibold mb-4 text-ieee-darkblue text-center">
              Author Information
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-3 font-medium">
                  Authors <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="authors"
                  value={formData.authors}
                  onChange={handleChange}
                  placeholder="Enter authors' names"
                  className="w-full border border-ieee-black-15 bg-ieee-gray/5 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ieee-gray-15"
                  required
                />
              </div>

              <div>
                <label className="block mb-3 mt-2 font-medium">
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
              Research Paper Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-3 font-medium">
                  Title <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter paper title"
                  className="w-full border border-ieee-black-15 bg-ieee-gray/5 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ieee-gray-15"
                  required
                />
              </div>

              <div>
                <label className="block mb-3 font-medium">
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
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block mb-3 mt-2 font-medium">
                  Abstract <span className="text-red-600">*</span>
                </label>
                <div ref={quillRef} className="bg-ieee-gray/5 rounded h-60" />
              </div>

              <div className="md:col-span-2 mt-24">
                <label className="block mb-3 font-medium">
                  Paper Publication Link <span className="text-red-600">*</span>
                </label>
                <input
                  type="url"
                  name="publicationLink"
                  value={formData.publicationLink}
                  onChange={handleChange}
                  placeholder="Enter publication URL"
                  className="w-full border border-ieee-black-15 bg-ieee-gray/5 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ieee-gray-15"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-3 mt-2 font-medium">
                  Research Banner Picture{" "}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="file"
                  name="bannerFile"
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
                className="mt-6 w-full md:w-auto border-1 border-ieee-blue hover:bg-ieee-blue hover:text-white font-semibold cursor-pointer px-6 py-2 rounded text-ieee-blue bg-transparent transition-all 300"
                disabled={loading}
              >
                {loading ? "Adding..." : "Place Add Request"}
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

export default AddResearchPaper;
