// // // import { useEffect, useState } from "react";
// // // import {
// // //   BarChart, Bar, XAxis, YAxis, Tooltip,
// // //   PieChart, Pie, Cell, ScatterChart, Scatter
// // // } from "recharts";

// // // const API_URL = "http://localhost:5000/api/analytics";

// // // export default function Analytics() {
// // //   const [data, setData] = useState(null);

// // //   useEffect(() => {
// // //     fetch(API_URL).then(r => r.json()).then(setData);
// // //   }, []);

// // //   if (!data) return <p>Loading analytics...</p>;

// // //   return (
// // //     <div className="page">
// // //       <h2>Analytics</h2>

// // //       <h3>Reading Funnel</h3>
// // //       <BarChart width={500} height={250} data={data.funnel}>
// // //         <XAxis dataKey="stage" />
// // //         <YAxis />
// // //         <Tooltip />
// // //         <Bar dataKey="count" fill="#4f46e5" />
// // //       </BarChart>

// // //       <h3>Citations vs Impact</h3>
// // //       <ScatterChart width={500} height={250}>
// // //         <XAxis dataKey="citationCount" />
// // //         <YAxis dataKey="impact" />
// // //         <Tooltip />
// // //         <Scatter data={data.scatter} fill="#22c55e" />
// // //       </ScatterChart>

// // //       <h3>Summary</h3>
// // //       <ul>
// // //         <li>Total papers: {data.summary.total}</li>
// // //         <li>Completion rate: {data.summary.completionRate}%</li>
// // //       </ul>
// // //     </div>
// // //   );
// // // }

// // import { useEffect, useState } from "react";
// // import {
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   CartesianGrid,
// //   ScatterChart,
// //   Scatter,
// //   ResponsiveContainer,
// // } from "recharts";

// // const API_URL = "http://localhost:5000/api/analytics";

// // const formatLabel = (v) => v?.replaceAll("_", " ");

// // const impactToNumber = {
// //   High_Impact: 3,
// //   Medium_Impact: 2,
// //   Low_Impact: 1,
// //   Unknown: 0,
// // };

// // export default function Analytics() {
// //   const [data, setData] = useState(null);

// //   useEffect(() => {
// //     fetch(API_URL)
// //       .then((res) => res.json())
// //       .then(setData)
// //       .catch(console.error);
// //   }, []);

// //   if (!data) return <p className="page">Loading analytics...</p>;

// //   const funnelData = data.funnel || [];
// //   const scatterData =
// //     data.scatter?.map((d) => ({
// //       citationCount: d.citationCount,
// //       impactScore: impactToNumber[d.impactScore],
// //     })) || [];

// //   return (
// //     <div className="page">
// //       <h2>Analytics</h2>

// //       {/* Reading Funnel */}
// //       <section>
// //         <h3>Reading Funnel</h3>

// //         {funnelData.length === 0 ? (
// //           <p>No data available</p>
// //         ) : (
// //           <ResponsiveContainer width="100%" height={300}>
// //             <BarChart data={funnelData}>
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis dataKey="stage" tickFormatter={formatLabel} />
// //               <YAxis />
// //               <Tooltip formatter={(v) => v} labelFormatter={formatLabel} />
// //               <Bar dataKey="count" fill="#4f46e5" />
// //             </BarChart>
// //           </ResponsiveContainer>
// //         )}
// //       </section>

// //       {/* Citations vs Impact */}
// //       <section style={{ marginTop: 40 }}>
// //         <h3>Citations vs Impact</h3>

// //         {scatterData.length === 0 ? (
// //           <p>No data available</p>
// //         ) : (
// //           <ResponsiveContainer width="100%" height={300}>
// //             <ScatterChart>
// //               <CartesianGrid />
// //               <XAxis
// //                 type="number"
// //                 dataKey="citationCount"
// //                 name="Citations"
// //               />
// //               <YAxis
// //                 type="number"
// //                 dataKey="impactScore"
// //                 name="Impact"
// //                 domain={[0, 3]}
// //                 ticks={[0, 1, 2, 3]}
// //                 tickFormatter={(v) =>
// //                   Object.keys(impactToNumber).find(
// //                     (k) => impactToNumber[k] === v
// //                   )?.replaceAll("_", " ")
// //                 }
// //               />
// //               <Tooltip />
// //               <Scatter data={scatterData} fill="#22c55e" />
// //             </ScatterChart>
// //           </ResponsiveContainer>
// //         )}
// //       </section>

// //       {/* Summary */}
// //       <section style={{ marginTop: 40 }}>
// //         <h3>Summary</h3>
// //         <ul>
// //           <li>Total papers: {data.summary?.total ?? 0}</li>
// //           <li>
// //             Completion rate: {data.summary?.completionRate ?? 0}%
// //           </li>
// //         </ul>
// //       </section>
// //     </div>
// //   );
// // }



// import { useEffect, useState } from "react";
// import Skeleton from "../components/Skeleton";
// import toast from "react-hot-toast";
// import { motion } from "framer-motion";
// import { fadeUp, staggerContainer } from "../utils/animations";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   CartesianGrid,
// } from "recharts";

// const API = import.meta.env.VITE_API_URL + "/api/analytics";

// const format = (v) => v?.replaceAll("_", " ");

// export default function Analytics() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetch(API)
//       .then((r) => r.json())
//       .then(setData)
//       .catch(() => toast.error("Failed to load analytics"));
//   }, []);

//   if (!data) {
//     return (
//       <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
//         <Skeleton rows={6} />
//       </div>
//     );
//   }

//   /* ---------- Normalize backend data ---------- */

//   const funnelData = Object.entries(data.funnel).map(([stage, count]) => ({
//     stage,
//     count,
//   }));

//   const trendData = data.trend || [];

//   return (
//     <motion.div
//       variants={staggerContainer}
//       initial="hidden"
//       animate="visible"
//       className="space-y-8"
//     >
//       {/* Reading Funnel */}
//       <motion.div
//         variants={fadeUp}
//         className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
//       >
//         <h3 className="font-semibold mb-3">Reading Funnel</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={funnelData}>
//             <XAxis dataKey="stage" tickFormatter={format} />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="count" fill="#6366f1" />
//           </BarChart>
//         </ResponsiveContainer>
//       </motion.div>

//       {/* Papers Over Time */}
//       <motion.div
//         variants={fadeUp}
//         className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
//       >
//         <h3 className="font-semibold mb-3">Papers Over Time</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={trendData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Line dataKey="count" stroke="#22c55e" />
//           </LineChart>
//         </ResponsiveContainer>
//       </motion.div>

//       {/* Summary */}
//       <motion.div
//         variants={fadeUp}
//         className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
//       >
//         <h3 className="font-semibold mb-3">Summary</h3>
//         <p>Total Papers: {data.summary.totalPapers}</p>
//         <p>
//           Completion Rate:{" "}
//           {(data.summary.completionRate * 100).toFixed(1)}%
//         </p>
//       </motion.div>
//     </motion.div>
//   );
// }

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
