// import express from "express";
// import { createPaper, getPapers } from "../controllers/papers.controller.js";
// const r = express.Router();
// r.post("/", createPaper);
// r.get("/", getPapers);
// export default r;

import express from "express";
import { createPaper, getPapers } from "../controllers/papers.controller.js";
// import { requireAuth } from "../middleware/auth.js"; // enable later

const router = express.Router();

/**
 * POST /api/papers
 * Body:
 * {
 *   paperTitle,
 *   firstAuthor,
 *   researchDomain,
 *   readingStage,
 *   citationCount,
 *   impactScore,
 *   dateAdded
 * }
 */
router.post(
  "/",
  // requireAuth,
  createPaper
);

/**
 * GET /api/papers
 * Query params:
 * ?domain=Computer_Science,Mathematics
 * ?stage=Abstract_Read
 * ?impact=High_Impact
 * ?dateRange=week|month|3months|all
 * ?page=1
 * ?limit=20
 */
router.get(
  "/",
  // requireAuth,
  getPapers
);

export default router;
