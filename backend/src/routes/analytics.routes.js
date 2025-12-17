import express from "express";
import { getAnalytics } from "../controllers/analytics.controller.js";
const r = express.Router();
r.get("/", getAnalytics);
export default r;
