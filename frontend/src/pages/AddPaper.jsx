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
import { domainMap } from "./utils/enumMapper";
import { motion } from "framer-motion";
import { fadeUp } from "../animations";

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

    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      toast.error("Failed to add paper");
      return;
    }

    toast.success("Paper added successfully");
    e.target.reset();
  };
<motion.div
  variants={fadeUp}
  initial="hidden"
  animate="visible"
  className="max-w-xl bg-white dark:bg-gray-800 shadow rounded-lg p-6"
>
  <h2 className="text-xl font-semibold mb-4">Add Research Paper</h2>
  {/* form */}
</motion.div>

  return (
    <div className="max-w-xl bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add Research Paper</h2>

      <form className="space-y-3" onSubmit={submit}>
        <input
          className="w-full border p-2 rounded"
          placeholder="Paper Title"
          onChange={(e) =>
            setForm({ ...form, paperTitle: e.target.value })
          }
          required
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="First Author"
          onChange={(e) =>
            setForm({ ...form, firstAuthor: e.target.value })
          }
          required
        />

        <select
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, researchDomain: e.target.value })
          }
        >
          {Object.keys(domainMap).map((d) => (
            <option key={d} value={d}>
              {domainMap[d]}
            </option>
          ))}
        </select>

        <select
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, readingStage: e.target.value })
          }
        >
          {[
            "Abstract_Read",
            "Introduction_Done",
            "Methodology_Done",
            "Results_Analyzed",
            "Fully_Read",
            "Notes_Completed",
          ].map((s) => (
            <option key={s} value={s}>
              {s.replaceAll("_", " ")}
            </option>
          ))}
        </select>

        <input
          type="number"
          className="w-full border p-2 rounded"
          placeholder="Citation Count"
          onChange={(e) =>
            setForm({ ...form, citationCount: Number(e.target.value) })
          }
        />

        <select
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, impactScore: e.target.value })
          }
        >
          {["High_Impact", "Medium_Impact", "Low_Impact", "Unknown"].map(
            (i) => (
              <option key={i} value={i}>
                {i.replaceAll("_", " ")}
              </option>
            )
          )}
        </select>

        <input
          type="date"
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, dateAdded: e.target.value })
          }
          required
        />

        <button className="w-full bg-black text-white py-2 rounded">
          Add Paper
        </button>
      </form>
    </div>
  );
}
