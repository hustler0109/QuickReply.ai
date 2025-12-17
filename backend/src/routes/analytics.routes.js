// import express from "express";
// import { getAnalytics } from "../controllers/analytics.controller.js";
// const r = express.Router();
// r.get("/", getAnalytics);
// export default r;

import express from "express";
import { getAnalytics } from "../controllers/analytics.controller.js";
// import { requireAuth } from "../middleware/auth.js"; // optional later

const router = express.Router();

/**
 * GET /api/analytics
 * Query params supported:
 * ?dateRange=week|month|3months|all
 * ?domain=Computer_Science,Mathematics
 * ?stage=Abstract_Read,Fully_Read
 * ?impact=High_Impact
 */
router.get(
  "/",
  // requireAuth, // enable after Supabase auth
  getAnalytics
);

export default router;
