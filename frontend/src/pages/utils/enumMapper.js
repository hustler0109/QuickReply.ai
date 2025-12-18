// export const domainMap = {
//   "Computer Science": "Computer_Science",
//   "Biology": "Biology",
//   "Physics": "Physics",
//   "Chemistry": "Chemistry",
//   "Mathematics": "Mathematics",
//   "Social Sciences": "Social_Sciences",
// };

// export const stageMap = {
//   "Abstract Read": "Abstract_Read",
//   "Introduction Done": "Introduction_Done",
//   "Methodology Done": "Methodology_Done",
//   "Results Analyzed": "Results_Analyzed",
//   "Fully Read": "Fully_Read",
//   "Notes Completed": "Notes_Completed",
// };

// export const impactMap = {
//   "High Impact": "High_Impact",
//   "Medium Impact": "Medium_Impact",
//   "Low Impact": "Low_Impact",
//   "Unknown": "Unknown",
// };


/* ---------------- DOMAIN ---------------- */
export const domainMap = {
  "Computer Science": "Computer_Science",
  "Biology": "Biology",
  "Physics": "Physics",
  "Chemistry": "Chemistry",
  "Mathematics": "Mathematics",
  "Social Sciences": "Social_Sciences",
};

export const domainReverseMap = Object.fromEntries(
  Object.entries(domainMap).map(([k, v]) => [v, k])
);

/* ---------------- STAGE ---------------- */
export const stageMap = {
  "Abstract Read": "Abstract_Read",
  "Introduction Done": "Introduction_Done",
  "Methodology Done": "Methodology_Done",
  "Results Analyzed": "Results_Analyzed",
  "Fully Read": "Fully_Read",
  "Notes Completed": "Notes_Completed",
};

export const stageReverseMap = Object.fromEntries(
  Object.entries(stageMap).map(([k, v]) => [v, k])
);

/* ---------------- IMPACT ---------------- */
export const impactMap = {
  "High Impact": "High_Impact",
  "Medium Impact": "Medium_Impact",
  "Low Impact": "Low_Impact",
  "Unknown": "Unknown",
};

export const impactReverseMap = Object.fromEntries(
  Object.entries(impactMap).map(([k, v]) => [v, k])
);

/* ---------------- SAFE HELPERS ---------------- */
export const toPrismaEnum = (label, map) =>
  map[label] ?? label?.replace(/ /g, "_");

export const toUILabel = (enumValue, reverseMap) =>
  reverseMap[enumValue] ?? enumValue?.replace(/_/g, " ");
