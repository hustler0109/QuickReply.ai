// export const domainMap = {
//   Computer_Science: "Computer Science",
//   Biology: "Biology",
//   Physics: "Physics",
//   Chemistry: "Chemistry",
//   Mathematics: "Mathematics",
//   Social_Sciences: "Social Sciences",
// };

/* ---------- ENUM → LABEL (for UI) ---------- */

export const domainMap = {
  Computer_Science: "Computer Science",
  Biology: "Biology",
  Physics: "Physics",
  Chemistry: "Chemistry",
  Mathematics: "Mathematics",
  Social_Sciences: "Social Sciences",
};

export const stageMap = {
  Abstract_Read: "Abstract Read",
  Introduction_Done: "Introduction Done",
  Methodology_Done: "Methodology Done",
  Results_Analyzed: "Results Analyzed",
  Fully_Read: "Fully Read",
  Notes_Completed: "Notes Completed",
};

export const impactMap = {
  High_Impact: "High Impact",
  Medium_Impact: "Medium Impact",
  Low_Impact: "Low Impact",
  Unknown: "Unknown",
};

/* ---------- SAFE FORMATTER (fallback) ---------- */

export const formatEnum = (value) => {
  if (!value) return "";
  return (
    domainMap[value] ||
    stageMap[value] ||
    impactMap[value] ||
    value.replaceAll("_", " ")
  );
};
