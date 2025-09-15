import React, { useState } from "react";

interface Member {
  sl: number;
  ieeeId: string;
  nsuId: string;
  name: string;
  ieeeEmail: string;
  nsuEmail: string;
  bloodGroup: string;
}

interface TableProps {
  title?: string;
  data: Member[];
}

const Table: React.FC<TableProps> = ({ title = "Member List", data }) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const filteredData = data.filter(
    (m) =>
      m.ieeeId.toLowerCase().includes(search.toLowerCase()) ||
      m.nsuId.toLowerCase().includes(search.toLowerCase()) ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.ieeeEmail.toLowerCase().includes(search.toLowerCase()) ||
      m.nsuEmail.toLowerCase().includes(search.toLowerCase()) ||
      m.bloodGroup.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-center text-3xl font-bold mb-6 text-[#002855]">
        {title}
      </h2>

      {/* Search */}
      <div className="flex justify-baseline mb-6">
        <input
          type="text"
          placeholder="🔍 Search by ID, email, or blood group..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/2 border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-[#00629B] focus:outline-none shadow-sm"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full text-sm text-center">
          <thead>
            <tr className="bg-gradient-to-r from-[#002855] to-[#00629B] text-white">
              <th className="px-4 py-3">SL No.</th>
              <th className="px-4 py-3">IEEE ID</th>
              <th className="px-4 py-3">NSU ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">IEEE Email</th>
              <th className="px-4 py-3">NSU Email</th>
              <th className="px-4 py-3">Blood Group</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((m, idx) => (
              <tr
                key={m.sl}
                className={`transition hover:bg-blue-50 ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-4 py-3 text-center">{m.sl}</td>
                <td className="px-4 py-3 text-[#00629B] font-medium underline cursor-pointer hover:text-[#004080] transition">
                  {m.ieeeId}
                </td>
                <td className="px-4 py-3 text-center">{m.nsuId}</td>
                <td className="px-4 py-3 font-semibold">{m.name}</td>
                <td className="px-4 py-3">{m.ieeeEmail}</td>
                <td className="px-4 py-3">{m.nsuEmail}</td>
                <td className="px-4 py-3 text-center font-bold text-[#00629B]">
                  {m.bloodGroup}
                </td>
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
          className="cursor-pointer px-4 py-2 rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 transition"
        >
          Prev
        </button>

        <span className="px-4 py-2 text-gray-700 font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="cursor-pointer px-4 py-2 rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
