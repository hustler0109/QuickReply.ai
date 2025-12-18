// import { useState } from "react";

// const API_URL = "http://localhost:5000/api/papers";

// export default function AddPaper() {
//   const [form, setForm] = useState({
//     paperTitle: "",
//     firstAuthor: "",
//     researchDomain: "Computer Science",
//     readingStage: "Abstract Read",
//     citationCount: 0,
//     impactScore: "Unknown",
//     dateAdded: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await fetch(API_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });
//     alert("Paper added successfully");
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Add Research Paper</h2>

//       <form onSubmit={handleSubmit}>
//         <input name="paperTitle" placeholder="Paper Title" onChange={handleChange} required /><br />
//         <input name="firstAuthor" placeholder="First Author" onChange={handleChange} required /><br />

//         <select name="researchDomain" onChange={handleChange}>
//           {["Computer Science", "Biology", "Physics", "Chemistry", "Mathematics", "Social Sciences"].map(d =>
//             <option key={d}>{d}</option>
//           )}
//         </select><br />

//         <select name="readingStage" onChange={handleChange}>
//           {[
//             "Abstract Read",
//             "Introduction Done",
//             "Methodology Done",
//             "Results Analyzed",
//             "Fully Read",
//             "Notes Completed"
//           ].map(s => <option key={s}>{s}</option>)}
//         </select><br />

//         <input type="number" name="citationCount" placeholder="Citation Count" onChange={handleChange} /><br />

//         <select name="impactScore" onChange={handleChange}>
//           {["High Impact", "Medium Impact", "Low Impact", "Unknown"].map(i =>
//             <option key={i}>{i}</option>
//           )}
//         </select><br />

//         <input type="date" name="dateAdded" onChange={handleChange} required /><br /><br />

//         <button type="submit">Add Paper</button>
//       </form>
//     </div>
//   );
// }

import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { fadeUp } from "../utils/animations";
import { domainMap, stageMap, impactMap } from "./utils/enumMapper";

// Same backend API as Library.jsx
const API = "http://localhost:5000/api/papers";

export default function AddPaper() {
  const [form, setForm] = useState({
    paperTitle: "",
    firstAuthor: "",
    researchDomain: "Computer_Science",
    readingStage: "Abstract_Read",
    citationCount: 0,
    impactScore: "Unknown",
    dateAdded: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      toast.success("Paper added successfully");
      setForm({
        paperTitle: "",
        firstAuthor: "",
        researchDomain: "Computer_Science",
        readingStage: "Abstract_Read",
        citationCount: 0,
        impactScore: "Unknown",
        dateAdded: "",
      });
    } catch {
      toast.error("Failed to add paper");
    }
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="max-w-xl bg-white dark:bg-gray-800 shadow rounded-lg p-6"
    >
      <h2 className="text-xl font-semibold mb-4">Add Research Paper</h2>

      <form className="space-y-3" onSubmit={submit}>
        <input
          className="w-full border p-2 rounded"
          placeholder="Paper Title"
          value={form.paperTitle}
          onChange={(e) =>
            setForm({ ...form, paperTitle: e.target.value })
          }
          required
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="First Author"
          value={form.firstAuthor}
          onChange={(e) =>
            setForm({ ...form, firstAuthor: e.target.value })
          }
          required
        />

        {/* Research Domain */}
        <select
          className="w-full border p-2 rounded"
          value={form.researchDomain}
          onChange={(e) =>
            setForm({ ...form, researchDomain: e.target.value })
          }
        >
          {Object.entries(domainMap).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        {/* Reading Stage */}
        <select
          className="w-full border p-2 rounded"
          value={form.readingStage}
          onChange={(e) =>
            setForm({ ...form, readingStage: e.target.value })
          }
        >
          {Object.entries(stageMap).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <input
          type="number"
          className="w-full border p-2 rounded"
          placeholder="Citation Count"
          value={form.citationCount}
          onChange={(e) =>
            setForm({ ...form, citationCount: Number(e.target.value) })
          }
        />

        {/* Impact Score */}
        <select
          className="w-full border p-2 rounded"
          value={form.impactScore}
          onChange={(e) =>
            setForm({ ...form, impactScore: e.target.value })
          }
        >
          {Object.entries(impactMap).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="w-full border p-2 rounded"
          value={form.dateAdded}
          onChange={(e) =>
            setForm({ ...form, dateAdded: e.target.value })
          }
          required
        />

        <button className="w-full bg-black text-white py-2 rounded">
          Add Paper
        </button>
      </form>
    </motion.div>
  );
}
