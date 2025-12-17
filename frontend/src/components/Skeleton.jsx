// export default function Skeleton({ rows = 6 }) {
//   return (
//     <div className="space-y-3">
//       {Array.from({ length: rows }).map((_, i) => (
//         <div
//           key={i}
//           className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
//         />
//       ))}
//     </div>
//   );
// }


import { motion } from "framer-motion";

export default function Skeleton({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <motion.div
          key={i}
          className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      ))}
    </div>
  );
}
