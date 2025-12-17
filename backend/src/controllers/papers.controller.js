// import { PrismaClient } from "@prisma/client";
// import { toPrismaEnum } from "../utils/enumMapper.js";

// const prisma = new PrismaClient();

// export const createPaper = async (req, res) => {
//   try {
//     const paper = await prisma.paper.create({
//       data: {
//         ...req.body,
//         researchDomain: toPrismaEnum(req.body.researchDomain),
//         readingStage: toPrismaEnum(req.body.readingStage),
//         impactScore: toPrismaEnum(req.body.impactScore),
//         dateAdded: new Date(req.body.dateAdded)
//       }
//     });
//     res.status(201).json(paper);
//   } catch {
//     res.status(500).json({ error: "Create failed" });
//   }
// };

// export const getPapers = async (req, res) => {
//   const { domain, stage, impact, dateRange } = req.query;
//   let where = {};

//   if (domain) where.researchDomain = { in: domain.split(",").map(toPrismaEnum) };
//   if (stage) where.readingStage = { in: stage.split(",").map(toPrismaEnum) };
//   if (impact) where.impactScore = { in: impact.split(",").map(toPrismaEnum) };

//   if (dateRange && dateRange !== "all") {
//     const now = new Date();
//     let from;
//     if (dateRange === "week") from = new Date(now.setDate(now.getDate() - 7));
//     if (dateRange === "month") from = new Date(now.setMonth(now.getMonth() - 1));
//     if (dateRange === "3months") from = new Date(now.setMonth(now.getMonth() - 3));
//     where.dateAdded = { gte: from };
//   }

//   const papers = await prisma.paper.findMany({ where, orderBy: { dateAdded: "desc" } });
//   res.json(papers);
// };

import { PrismaClient } from "@prisma/client";
import { toPrismaEnum } from "../utils/enumMapper.js";

const prisma = new PrismaClient();

/* ---------------- CREATE PAPER ---------------- */
export const createPaper = async (req, res) => {
  try {
    const {
      paperTitle,
      firstAuthor,
      researchDomain,
      readingStage,
      citationCount,
      impactScore,
      dateAdded
    } = req.body;

    if (!paperTitle || !firstAuthor) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const paper = await prisma.paper.create({
      data: {
        paperTitle,
        firstAuthor,
        citationCount: Number(citationCount) || 0,
        researchDomain: toPrismaEnum(researchDomain),
        readingStage: toPrismaEnum(readingStage),
        impactScore: toPrismaEnum(impactScore),
        dateAdded: dateAdded ? new Date(dateAdded) : new Date()
      }
    });

    res.status(201).json(paper);
  } catch (err) {
    console.error("Create paper failed:", err);
    res.status(500).json({ error: "Create failed" });
  }
};

/* ---------------- GET PAPERS (filters + pagination) ---------------- */
export const getPapers = async (req, res) => {
  try {
    const {
      domain,
      stage,
      impact,
      dateRange = "all",
      page = 1,
      limit = 20
    } = req.query;

    const where = {};

    if (domain && domain !== "all") {
      where.researchDomain = {
        in: domain.split(",").map(toPrismaEnum)
      };
    }

    if (stage && stage !== "all") {
      where.readingStage = {
        in: stage.split(",").map(toPrismaEnum)
      };
    }

    if (impact && impact !== "all") {
      where.impactScore = {
        in: impact.split(",").map(toPrismaEnum)
      };
    }

    if (dateRange !== "all") {
      const now = new Date();
      let from = new Date();

      if (dateRange === "week") from.setDate(now.getDate() - 7);
      if (dateRange === "month") from.setMonth(now.getMonth() - 1);
      if (dateRange === "3months") from.setMonth(now.getMonth() - 3);

      where.dateAdded = { gte: from };
    }

    const [papers, total] = await Promise.all([
      prisma.paper.findMany({
        where,
        orderBy: { dateAdded: "desc" },
        skip: (page - 1) * limit,
        take: Number(limit)
      }),
      prisma.paper.count({ where })
    ]);

    res.json({
      data: papers,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error("Fetch papers failed:", err);
    res.status(500).json({ error: "Fetch failed" });
  }
};
