import { PrismaClient } from "@prisma/client";
import { toPrismaEnum } from "../utils/enumMapper.js";

const prisma = new PrismaClient();

export const createPaper = async (req, res) => {
  try {
    const paper = await prisma.paper.create({
      data: {
        ...req.body,
        researchDomain: toPrismaEnum(req.body.researchDomain),
        readingStage: toPrismaEnum(req.body.readingStage),
        impactScore: toPrismaEnum(req.body.impactScore),
        dateAdded: new Date(req.body.dateAdded)
      }
    });
    res.status(201).json(paper);
  } catch {
    res.status(500).json({ error: "Create failed" });
  }
};

export const getPapers = async (req, res) => {
  const { domain, stage, impact, dateRange } = req.query;
  let where = {};

  if (domain) where.researchDomain = { in: domain.split(",").map(toPrismaEnum) };
  if (stage) where.readingStage = { in: stage.split(",").map(toPrismaEnum) };
  if (impact) where.impactScore = { in: impact.split(",").map(toPrismaEnum) };

  if (dateRange && dateRange !== "all") {
    const now = new Date();
    let from;
    if (dateRange === "week") from = new Date(now.setDate(now.getDate() - 7));
    if (dateRange === "month") from = new Date(now.setMonth(now.getMonth() - 1));
    if (dateRange === "3months") from = new Date(now.setMonth(now.getMonth() - 3));
    where.dateAdded = { gte: from };
  }

  const papers = await prisma.paper.findMany({ where, orderBy: { dateAdded: "desc" } });
  res.json(papers);
};
