// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import useDarkMode from "../hooks/useDarkMode";

// export default function Layout({ children }) {
//   const [dark, setDark] = useDarkMode();

//   return (
//     <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
//       <aside className="w-64 bg-white dark:bg-gray-800 border-r p-5">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="font-bold text-xl">📚 Paper Tracker</h1>
//           <button onClick={() => setDark(!dark)}>
//             {dark ? "☀️" : "🌙"}
//           </button>
//         </div>

//         <nav className="space-y-3">
//           <Link className="block text-gray-700 hover:text-black" to="/">Library</Link>
//           <Link className="block text-gray-700 hover:text-black" to="/add">Add Paper</Link>
//           <Link className="block text-gray-700 hover:text-black" to="/analytics">Analytics</Link>
//         </nav>
//       </aside>

//       <motion.main
//         variants={fadeIn}
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -10 }}
//         className="flex-1 p-8"
//       >
//         {children}
//       </motion.main>
//     </div>
//   );
// }
import { Link, useLocation } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";

export default function Layout({ children }) {
  const [dark, setDark] = useDarkMode();
  const location = useLocation();

  const linkBase = "block rounded px-3 py-2 transition-colors";

  const linkStyle = (path) =>
    `${linkBase} ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
    }`;

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-5">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-bold text-xl">📚 Paper Tracker</h1>
          <button
            onClick={() => setDark(!dark)}
            aria-label="Toggle dark mode"
            className="text-lg"
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </div>

        <nav className="space-y-2">
          <Link to="/" className={linkStyle("/")}>
            Library
          </Link>
          <Link to="/add" className={linkStyle("/add")}>
            Add Paper
          </Link>
          <Link to="/analytics" className={linkStyle("/analytics")}>
            Analytics
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
