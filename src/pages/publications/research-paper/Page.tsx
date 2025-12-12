import { useState, useMemo } from "react";
import Wave from "@/components/Wave";
import FadeIn from "@/components/ui/FadeIn";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useFetchDataAPI } from "@/hooks/fetchdata";

interface ResearchPaper {
  id: number;
  title: string;
  authors: string[];
  link: string;
  img?: string; // new optional image url
}

const DEFAULT_IMG = `${import.meta.env.VITE_API_URL}/static/images/default_paper_image.png`; // adjust if needed

const ResearchPapers = () => {
  const { loading, data, error, refetch } = useFetchDataAPI<ResearchPaper[]>({
    apiUrl: "main_website/get_research_papers/",
  });

  const [search, setSearch] = useState("");

  const filteredPapers = useMemo(() => {
    if (!data) return [];
    return data.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.authors.some((a) => a.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, data]);

  return (
    <>
      <Wave title="Research Papers" />
      <FadeIn>
        <section className="max-w-[1080px] mx-auto py-6 pb-16 px-5 sm:px-12 lg:px-5">
          {/* Search Bar */}
          <div className="flex justify-between items-center mb-8 flex-wrap gap-3">
            <input
              type="text"
              placeholder="Search by title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-ieee-black-25 rounded-lg px-4 py-2 w-full md:w-[300px] focus:outline-none focus:ring-2 focus:ring-ieee-blue"
            />
          </div>

          {/* Loading */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white/5 rounded-lg p-4 shadow-sm animate-pulse min-h-[12rem]"
                >
                  <div className="w-full h-40 rounded-md bg-ieee-gray-10 mb-4" />
                  <div className="h-4 w-3/4 rounded bg-ieee-gray-10 mb-2" />
                  <div className="h-3 w-1/2 rounded bg-ieee-gray-10" />
                </div>
              ))}
            </div>
          ) : error ? (
            <ErrorMessage message="Failed to load research papers" onRetry={refetch} />
          ) : filteredPapers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPapers.map((paper) => (
                <article
                  key={paper.id}
                  className="bg-ieee-white-5 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col"
                >
                  {/* Image */}
                  <div className="w-full h-44 sm:h-48 md:h-52 overflow-hidden bg-ieee-gray-10">
                    <img
                      src={paper.img || DEFAULT_IMG}
                      alt={paper.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.onerror = null;
                        target.src = DEFAULT_IMG;
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold text-ieee-black mb-2 line-clamp-2">
                      {paper.title}
                    </h3>

                    <div className="text-sm text-ieee-black-75 mb-3 flex-1">
                      <span className="font-medium">Authors:</span>
                      <ul className="list-disc list-inside mt-1 space-y-0.5">
                        {paper.authors.map((a, i) => (
                          <li key={i} className="text-sm">
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <a
                        href={paper.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 text-sm font-medium rounded-md border border-ieee-blue text-ieee-blue hover:bg-ieee-blue/10 transition"
                      >
                        View Paper
                      </a>

                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-center text-ieee-black-50 mt-6">
              No matching papers found.
            </p>
          )}
        </section>
      </FadeIn>
    </>
  );
};

export default ResearchPapers;
