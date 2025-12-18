import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Skeleton from "../components/Skeleton";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../utils/animations";
import {
  domainMap,
  stageMap,
  impactMap,
  toUILabel,
  domainReverseMap,
  stageReverseMap,
  impactReverseMap,
} from "./utils/enumMapper";
import { exportToCSV } from "../utils/csv";
import { exportTablePDF } from "../utils/pdf";

// Simple, explicit API base – matches your backend on port 5000
const API = "http://localhost:5000/api/papers";

const columns = [
  { key: "paperTitle", label: "Title" },
  { key: "firstAuthor", label: "Author" },
  { key: "researchDomain", label: "Domain" },
  { key: "readingStage", label: "Stage" },
  { key: "citationCount", label: "Citations" },
  { key: "impactScore", label: "Impact" },
];

export default function Library() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    domain: "",
    stage: "",
    impact: "",
  });

  useEffect(() => {
    setLoading(true);

    fetch(API)
      .then((r) => r.json())
      .then((res) => setPapers(res.data ?? res))
      .catch(() => toast.error("Failed to load papers"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = papers.filter((p) => {
    const domainOk =
      !filters.domain ||
      p.researchDomain === domainMap[filters.domain];

    const stageOk =
      !filters.stage ||
      p.readingStage === stageMap[filters.stage];

    const impactOk =
      !filters.impact ||
      p.impactScore === impactMap[filters.impact];

    return domainOk && stageOk && impactOk;
  });

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <Skeleton rows={8} />
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4"
    >
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h2 className="text-xl font-semibold">Library</h2>

        <div className="flex gap-2">
          <button
            className="bg-black text-white px-4 py-2 rounded"
            onClick={() => exportToCSV(papers, "library.csv")}
          >
            Export CSV
          </button>

          <button
            className="bg-gray-700 text-white px-4 py-2 rounded"
            onClick={() =>
              exportTablePDF("Research Library", columns, papers)
            }
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <select
          className="border p-2 rounded"
          onChange={(e) =>
            setFilters({ ...filters, domain: e.target.value })
          }
        >
          <option value="">All Domains</option>
          {Object.keys(domainMap).map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          onChange={(e) =>
            setFilters({ ...filters, stage: e.target.value })
          }
        >
          <option value="">All Stages</option>
          {Object.keys(stageMap).map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          onChange={(e) =>
            setFilters({ ...filters, impact: e.target.value })
          }
        >
          <option value="">All Impact</option>
          {Object.keys(impactMap).map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <table className="w-full border">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Author</th>
            <th className="p-2">Domain</th>
            <th className="p-2">Stage</th>
            <th className="p-2">Citations</th>
            <th className="p-2">Impact</th>
          </tr>
        </thead>

        <motion.tbody variants={staggerContainer}>
          {filtered.map((p) => (
            <motion.tr
              key={p.id}
              variants={fadeUp}
              className="border-t hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <td className="p-2">{p.paperTitle}</td>
              <td className="p-2">{p.firstAuthor}</td>
              <td className="p-2">
                {toUILabel(p.researchDomain, domainReverseMap)}
              </td>
              <td className="p-2">
                {toUILabel(p.readingStage, stageReverseMap)}
              </td>
              <td className="p-2">{p.citationCount}</td>
              <td className="p-2">
                {toUILabel(p.impactScore, impactReverseMap)}
              </td>
            </motion.tr>
          ))}
        </motion.tbody>
      </table>
    </motion.div>
  );
}
