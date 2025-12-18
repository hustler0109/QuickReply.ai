// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import AddPaper from "./pages/AddPaper";
// import Library from "./pages/Library";
// import Analytics from "./pages/Analytics";
// import "./styles.css";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <nav>
//         <Link to="/">Library</Link>
//         <Link to="/add">Add</Link>
//         <Link to="/analytics">Analytics</Link>
//       </nav>

//       <Routes>
//         <Route path="/" element={<Library />} />
//         <Route path="/add" element={<AddPaper />} />
//         <Route path="/analytics" element={<Analytics />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/Layout";
import Library from "./pages/Library";
import AddPaper from "./pages/AddPaper";
import Analytics from "./pages/Analytics";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Library />} />
        <Route path="/add" element={<AddPaper />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="*" element={<div className="p-6">Page Not Found</div>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </BrowserRouter>
  );
}
