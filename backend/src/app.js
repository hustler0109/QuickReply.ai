import express from "express";
import cors from "cors";
import papers from "./routes/papers.routes.js";
import analytics from "./routes/analytics.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/papers", papers);
app.use("/api/analytics", analytics);
export default app;
