import { useState, useMemo } from "react";
import Wave from "@/components/Wave";
import FadeIn from "@/components/ui/FadeIn";
import Skeleton from "@/components/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useFetchDataAPI } from "@/hooks/fetchdata";

interface ResearchPaper {
  id: number;
  title: string;
  authors: string[];
  link: string;
}

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
            <div className="space-y-3">
              <Skeleton className="h-50 w-full" />
            </div>
          ) : error ? (
            <ErrorMessage message="Failed to load research papers" onRetry={refetch} />
          ) : filteredPapers.length > 0 ? (
            <div className="overflow-x-auto transition-shadow hover:shadow-[4px_4px_10px_theme(colors.ieee-black-50)] shadow-[2px_2px_8px_theme(colors.ieee-black-50)] rounded-lg">
              <table className="min-w-full border border-ieee-black-25 rounded-lg overflow-hidden text-center">
                <thead className="bg-ieee-blue/85 text-white">
                  <tr>
                    <th className="py-3 px-4">SL.</th>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Authors</th>
                    <th className="py-3 px-4">Link</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPapers.map((paper, idx) => (
                    <tr
                      key={paper.id}
                      className="bg-ieee-gray/5 even:bg-ieee-gray-10 hover:bg-ieee-gray-15 transition-colors"
                    >
                      <td className="py-3 px-4 text-ieee-black-75">{idx + 1}</td>
                      <td className="py-3 px-4 text-ieee-black font-medium">
                        {paper.title}
                      </td>
                      <td className="py-3 px-4 text-ieee-black-75 text-left">
                        <ul className="list-disc list-inside space-y-1">
                          {paper.authors.map((author, i) => (
                            <li key={i}>{author}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-3 px-4">
                        <a
                          href={paper.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ieee-blue hover:underline"
                        >
                          View Paper
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
