// // export default function Skeleton({ rows = 6 }) {
// //   return (
// //     <div className="space-y-3">
// //       {Array.from({ length: rows }).map((_, i) => (
// //         <div
// //           key={i}
// //           className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
// //         />
// //       ))}
// //     </div>
// //   );
// // }


// import { motion } from "framer-motion";

// export default function Skeleton({ rows = 5 }) {
//   return (
//     <div className="space-y-3">
//       {Array.from({ length: rows }).map((_, i) => (
//         <motion.div
//           key={i}
//           className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
//           animate={{ opacity: [0.4, 1, 0.4] }}
//           transition={{ duration: 1.2, repeat: Infinity }}
//         />
//       ))}
//     </div>
//   );
// }


import { motion, useReducedMotion } from "framer-motion";

export default function Skeleton({ rows = 5 }) {
  const shouldReduceMotion = useReducedMotion();

  const animation = shouldReduceMotion
    ? {}
    : { opacity: [0.4, 1, 0.4] };

  const transition = shouldReduceMotion
    ? {}
    : { duration: 1.2, repeat: Infinity, ease: "easeInOut" };

  return (
    <div
      className="space-y-3"
      role="status"
      aria-busy="true"
      aria-label="Loading"
    >
      {Array.from({ length: rows }).map((_, i) => (
        <motion.div
          key={i}
          className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
          animate={animation}
          transition={transition}
        />
      ))}
    </div>
  );
}
