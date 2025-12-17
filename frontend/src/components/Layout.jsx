import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useDarkMode from "../hooks/useDarkMode";

export default function Layout({ children }) {
  const [dark, setDark] = useDarkMode();

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <aside className="w-64 bg-white dark:bg-gray-800 border-r p-5">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-bold text-xl">📚 Paper Tracker</h1>
          <button onClick={() => setDark(!dark)}>
            {dark ? "☀️" : "🌙"}
          </button>
        </div>

        <nav className="space-y-3">
          <Link className="block text-gray-700 hover:text-black" to="/">Library</Link>
          <Link className="block text-gray-700 hover:text-black" to="/add">Add Paper</Link>
          <Link className="block text-gray-700 hover:text-black" to="/analytics">Analytics</Link>
        </nav>
      </aside>

      <motion.main
        variants={fadeIn}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="flex-1 p-8"
      >
        {children}
      </motion.main>
    </div>
  );
}
