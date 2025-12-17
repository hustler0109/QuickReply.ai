import express from "express";
import { createPaper, getPapers } from "../controllers/papers.controller.js";
const r = express.Router();
r.post("/", createPaper);
r.get("/", getPapers);
export default r;
