// import express from "express";
// import cors from "cors";
// import papers from "./routes/papers.routes.js";
// import analytics from "./routes/analytics.routes.js";

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use("/api/papers", papers);
// app.use("/api/analytics", analytics);
// export default app;


import express from "express";
import cors from "cors";
import papers from "./routes/papers.routes.js";
import analytics from "./routes/analytics.routes.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true
  })
);

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/papers", papers);
app.use("/api/analytics", analytics);

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

export default app;
