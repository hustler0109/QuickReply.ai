import { useEffect, useState } from "react";
import Skeleton from "../components/Skeleton";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../utils/animations";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

// Match backend Express API on port 5000
const API = "http://localhost:5000/api/analytics";
const format = (v) => v?.replaceAll("_", " ");

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then(setData)
      .catch(() => toast.error("Failed to load analytics"));
  }, []);

  if (!data) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <Skeleton rows={6} />
      </div>
    );
  }

  /* ---------- Normalize backend data ---------- */

  const funnelData = Object.entries(data.funnel || {}).map(
    ([stage, count]) => ({
      stage,
      count,
    })
  );

  const trendData =
    data.trend || data.papersOverTime || [];

  const stackedData = data.stacked || [];

  const stageKeys =
    stackedData.length > 0
      ? Object.keys(stackedData[0]).filter((k) => k !== "domain")
      : [];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Reading Funnel */}
      <motion.div
        variants={fadeUp}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
      >
        <h3 className="font-semibold mb-3">Reading Funnel</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={funnelData}>
            <XAxis dataKey="stage" tickFormatter={format} />
            <YAxis />
            <Tooltip formatter={(v) => v} />
            <Bar dataKey="count" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Papers Over Time */}
      <motion.div
        variants={fadeUp}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
      >
        <h3 className="font-semibold mb-3">Papers Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              dataKey="count"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Domain × Stage (Stacked Bar) */}
      {stackedData.length > 0 && (
        <motion.div
          variants={fadeUp}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
        >
          <h3 className="font-semibold mb-3">Domain × Reading Stage</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={stackedData}>
              <XAxis
                dataKey="domain"
                tickFormatter={format}
              />
              <YAxis />
              <Tooltip />
              <Legend formatter={format} />

              {stageKeys.map((stage, i) => (
                <Bar
                  key={stage}
                  dataKey={stage}
                  stackId="a"
                  fill={[
                    "#6366f1",
                    "#22c55e",
                    "#f59e0b",
                    "#ef4444",
                    "#0ea5e9",
                    "#a855f7",
                  ][i % 6]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* Summary */}
      <motion.div
        variants={fadeUp}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
      >
        <h3 className="font-semibold mb-3">Summary</h3>
        <p>Total Papers: {data.summary.totalPapers}</p>
        <p>
          Completion Rate:{" "}
          {(data.summary.completionRate * 100).toFixed(1)}%
        </p>
      </motion.div>
    </motion.div>
  );
}
