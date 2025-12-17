import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAnalytics = async (req, res) => {
  const funnelRaw = await prisma.paper.groupBy({
    by: ["readingStage"],
    _count: { readingStage: true }
  });

  const funnel = {};
  funnelRaw.forEach(i => funnel[i.readingStage.replace(/_/g," ")] = i._count.readingStage);

  const scatter = (await prisma.paper.findMany({
    select: { citationCount: true, impactScore: true }
  })).map(p => ({
    citationCount: p.citationCount,
    impactScore: p.impactScore.replace(/_/g," ")
  }));

  const stackedRaw = await prisma.paper.groupBy({
    by: ["researchDomain", "readingStage"],
    _count: { _all: true }
  });

  const stackedMap = {};
  stackedRaw.forEach(i => {
    const d = i.researchDomain.replace(/_/g," ");
    const s = i.readingStage.replace(/_/g," ");
    stackedMap[d] = stackedMap[d] || { domain: d };
    stackedMap[d][s] = i._count._all;
  });

  const total = await prisma.paper.count();
  const fullyRead = await prisma.paper.count({ where: { readingStage: "Fully_Read" }});

  res.json({
    funnel,
    scatter,
    stacked: Object.values(stackedMap),
    summary: {
      totalPapers: total,
      fullyReadCount: fullyRead,
      completionRate: total ? fullyRead / total : 0
    }
  });
};
