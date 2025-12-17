// // import { PrismaClient } from "@prisma/client";
// // const prisma = new PrismaClient();

// // export const getAnalytics = async (req, res) => {
// //   const funnelRaw = await prisma.paper.groupBy({
// //     by: ["readingStage"],
// //     _count: { readingStage: true }
// //   });

// //   const funnel = {};
// //   funnelRaw.forEach(i => funnel[i.readingStage.replace(/_/g," ")] = i._count.readingStage);

// //   const scatter = (await prisma.paper.findMany({
// //     select: { citationCount: true, impactScore: true }
// //   })).map(p => ({
// //     citationCount: p.citationCount,
// //     impactScore: p.impactScore.replace(/_/g," ")
// //   }));

// //   const stackedRaw = await prisma.paper.groupBy({
// //     by: ["researchDomain", "readingStage"],
// //     _count: { _all: true }
// //   });

// //   const stackedMap = {};
// //   stackedRaw.forEach(i => {
// //     const d = i.researchDomain.replace(/_/g," ");
// //     const s = i.readingStage.replace(/_/g," ");
// //     stackedMap[d] = stackedMap[d] || { domain: d };
// //     stackedMap[d][s] = i._count._all;
// //   });

// //   const total = await prisma.paper.count();
// //   const fullyRead = await prisma.paper.count({ where: { readingStage: "Fully_Read" }});

// //   res.json({
// //     funnel,
// //     scatter,
// //     stacked: Object.values(stackedMap),
// //     summary: {
// //       totalPapers: total,
// //       fullyReadCount: fullyRead,
// //       completionRate: total ? fullyRead / total : 0
// //     }
// //   });
// // };

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// const IMPACT_MAP = {
//   High_Impact: 3,
//   Medium_Impact: 2,
//   Low_Impact: 1,
//   Unknown: 0
// };

// const STAGES = [
//   "Abstract_Read",
//   "Full_Paper_Read",
//   "Notes_Completed",
//   "Fully_Read"
// ];

// export const getAnalytics = async (req, res) => {
//   try {
//     /* ---------------- FUNNEL ---------------- */
//     const funnelRaw = await prisma.paper.groupBy({
//       by: ["readingStage"],
//       _count: { _all: true }
//     });

//     const funnel = {};
//     funnelRaw.forEach(i => {
//       funnel[i.readingStage.replace(/_/g, " ")] = i._count._all;
//     });

//     /* ---------------- SCATTER ---------------- */
//     const scatter = (await prisma.paper.findMany({
//       select: { citationCount: true, impactScore: true }
//     })).map(p => ({
//       citationCount: p.citationCount,
//       impactLabel: p.impactScore.replace(/_/g, " "),
//       impactValue: IMPACT_MAP[p.impactScore] ?? 0
//     }));

//     /* ---------------- STACKED (Domain × Stage) ---------------- */
//     const stackedRaw = await prisma.paper.groupBy({
//       by: ["researchDomain", "readingStage"],
//       _count: { _all: true }
//     });

//     const stackedMap = {};

//     stackedRaw.forEach(i => {
//       const domain = i.researchDomain.replace(/_/g, " ");
//       const stage = i.readingStage.replace(/_/g, " ");

//       if (!stackedMap[domain]) {
//         stackedMap[domain] = { domain };
//         STAGES.forEach(s =>
//           stackedMap[domain][s.replace(/_/g, " ")] = 0
//         );
//       }

//       stackedMap[domain][stage] = i._count._all;
//     });

//     /* ---------------- TREND (papers over time) ---------------- */
//     const trendRaw = await prisma.paper.groupBy({
//       by: ["dateAdded"],
//       _count: { _all: true },
//       orderBy: { dateAdded: "asc" }
//     });

//     const trend = trendRaw.map(i => ({
//       date: i.dateAdded.toISOString().slice(0, 10),
//       count: i._count._all
//     }));

//     /* ---------------- SUMMARY ---------------- */
//     const total = await prisma.paper.count();
//     const fullyRead = await prisma.paper.count({
//       where: { readingStage: "Fully_Read" }
//     });

//     res.json({
//       funnel,
//       scatter,
//       stacked: Object.values(stackedMap),
//       trend,
//       summary: {
//         totalPapers: total,
//         fullyReadCount: fullyRead,
//         completionRate: total ? Number((fullyRead / total).toFixed(2)) : 0
//       }
//     });
//   } catch (err) {
//     console.error("Analytics error:", err);
//     res.status(500).json({ error: "Failed to load analytics" });
//   }
// };

import { PrismaClient } from "@prisma/client";
import { toPrismaEnum } from "../utils/enumMapper.js";

const prisma = new PrismaClient();

export const getAnalytics = async (req, res) => {
  try {
    const { domain, stage, impact, dateRange } = req.query;

    const where = {};

    if (domain) {
      where.researchDomain = {
        in: domain.split(",").map(toPrismaEnum),
      };
    }

    if (stage) {
      where.readingStage = {
        in: stage.split(",").map(toPrismaEnum),
      };
    }

    if (impact) {
      where.impactScore = {
        in: impact.split(",").map(toPrismaEnum),
      };
    }

    if (dateRange && dateRange !== "all") {
      const now = new Date();
      let from;

      if (dateRange === "week") from = new Date(now.setDate(now.getDate() - 7));
      if (dateRange === "month") from = new Date(now.setMonth(now.getMonth() - 1));
      if (dateRange === "3months") from = new Date(now.setMonth(now.getMonth() - 3));

      where.dateAdded = { gte: from };
    }

    /* ---------------- Reading Funnel ---------------- */
    const funnelRaw = await prisma.paper.groupBy({
      by: ["readingStage"],
      _count: { _all: true },
      where,
    });

    const funnel = {};
    funnelRaw.forEach((i) => {
      funnel[i.readingStage.replace(/_/g, " ")] = i._count._all;
    });

    /* ---------------- Citations vs Impact (Scatter) ---------------- */
    const scatter = (
      await prisma.paper.findMany({
        where,
        select: {
          citationCount: true,
          impactScore: true,
        },
      })
    ).map((p) => ({
      citationCount: p.citationCount,
      impactScore: p.impactScore.replace(/_/g, " "),
    }));

    /* ---------------- Domain × Stage (Stacked Bar) ---------------- */
    const stackedRaw = await prisma.paper.groupBy({
      by: ["researchDomain", "readingStage"],
      _count: { _all: true },
      where,
    });

    const stackedMap = {};
    stackedRaw.forEach((row) => {
      const domainLabel = row.researchDomain.replace(/_/g, " ");
      const stageLabel = row.readingStage.replace(/_/g, " ");

      if (!stackedMap[domainLabel]) {
        stackedMap[domainLabel] = { domain: domainLabel };
      }

      stackedMap[domainLabel][stageLabel] = row._count._all;
    });

    /* ---------------- Trend Line (papers over time) ---------------- */
    const trendRaw = await prisma.paper.findMany({
      where,
      select: { dateAdded: true },
      orderBy: { dateAdded: "asc" },
    });

    const trendMap = {};
    trendRaw.forEach((p) => {
      const date = p.dateAdded.toISOString().split("T")[0];
      trendMap[date] = (trendMap[date] || 0) + 1;
    });

    const trend = Object.entries(trendMap).map(([date, count]) => ({
      date,
      count,
    }));

    /* ---------------- Summary ---------------- */
    const totalPapers = await prisma.paper.count({ where });
    const fullyRead = await prisma.paper.count({
      where: { ...where, readingStage: "Fully_Read" },
    });

    res.json({
      funnel,
      scatter,
      stacked: Object.values(stackedMap),
      trend,
      summary: {
        totalPapers,
        fullyReadCount: fullyRead,
        completionRate: totalPapers
          ? Number(((fullyRead / totalPapers) * 100).toFixed(2))
          : 0,
      },
    });
  } catch (err) {
    console.error("Analytics error:", err);
    res.status(500).json({ error: "Analytics failed" });
  }
};
