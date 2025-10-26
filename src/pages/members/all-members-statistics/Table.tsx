import { useState, useMemo } from "react";
import FadeIn from "@/components/ui/FadeIn";
import Skeleton from "@/components/skeeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useFetchDataAPI } from "@/hooks/fetchdata";

interface TableProps<T> {
  title?: string;
  headers: { key: keyof T; label: string }[];
}

const Table = <T extends Record<string, any>>({
  title,
  headers,
}: TableProps<T>) => {
  const { loading, data, error, refetch } = useFetchDataAPI<T[]>({
    apiUrl: 'main_website/get_all_members/',
  });

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [bloodFilter, setBloodFilter] = useState<string>("All");
  const rowsPerPage = 10;

  // Filter data by search + blood group
  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((row) => {
      const matchesSearch = Object.values(row).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      );

      const matchesBlood =
        bloodFilter === "All" || row.bloodGroup === bloodFilter;

      return matchesSearch && matchesBlood;
    });
  }, [data, search, bloodFilter]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentRows = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Get unique blood groups for dropdown
  const bloodGroups = useMemo(() => {
    if (!data) return [];
    const groups = Array.from(
      new Set(data.map((row) => row.bloodGroup))
    ).filter((g) => g && g !== "None");
    return ["All", ...groups];
  }, [data]);

  return (
    <FadeIn>
      <section className="max-w-[1080px] mx-auto py-6 pb-16 px-5 sm:px-12 lg:px-5 mt-8">
        <h2 className="text-center text-3xl font-bold mb-10 text-ieee-darkblue/90">
          {title}
        </h2>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>
        ) : error ? (
          <ErrorMessage message="Failed to load data" onRetry={refetch} />
        ) : data && data.length > 0 ? (
          <>
            {/* Search + Filter */}
            <div className="flex flex-col md:flex-row justify-between mb-6 gap-3">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full md:w-1/2 border border-ieee-black-15 rounded-md px-4 py-2 focus:ring-1 focus:ring-ieee-blue focus:outline-none shadow-sm"
              />
              <select
                value={bloodFilter}
                onChange={(e) => {
                  setBloodFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full md:w-1/4 border border-ieee-black-15 rounded-md px-4 py-2 focus:ring-1 focus:ring-ieee-blue focus:outline-none shadow-sm"
              >
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-ieee-white shadow-lg rounded-lg">
              <table className="w-full text-sm text-center">
                <thead>
                  <tr className="bg-gradient-to-r from-ieee-darkblue to-ieee-blue text-ieee-white">
                    {headers.map((header) => (
                      <th key={String(header.key)} className="px-4 py-3">
                        {header.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`transition hover:bg-ieee-gray-15 ${
                        idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      {headers.map((header) => {
                        const value = header.key === "sl" ? (currentPage - 1) * rowsPerPage + idx + 1 : row[header.key];
                        return (
                          <td key={String(header.key)} className="px-4 py-3">
                            {value !== null && value !== undefined ? String(value) : "-"}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-6 space-x-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="cursor-pointer px-4 py-2 rounded-full border border-ieee-black-15 bg-ieee-white hover:bg-ieee-gray-25 disabled:opacity-40 transition"
              >
                Prev
              </button>

              <span className="px-4 py-2 text-ieee-gray font-medium">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="cursor-pointer px-4 py-2 rounded-full border border-ieee-black-15 bg-ieee-white hover:bg-ieee-gray-25 disabled:opacity-40 transition"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-ieee-black-50 mt-6">No data found.</p>
        )}
      </section>
    </FadeIn>
  );
};

export default Table;
