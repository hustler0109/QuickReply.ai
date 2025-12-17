// export const toPrismaEnum = v => v.replace(/ /g, '_');

/**
 * Converts UI / query enum values to Prisma enum format
 * Examples:
 *  "Computer Science" → "Computer_Science"
 *  "computer science" → "Computer_Science"
 *  "Computer_Science" → "Computer_Science"
 */
export const toPrismaEnum = (value) => {
  if (!value || typeof value !== "string") return undefined;

  return value
    .trim()
    .replace(/\s+/g, "_")
    .replace(/-/g, "_")
    .toLowerCase()
    .replace(/(^|_)(\w)/g, (_, p1, p2) => p1 + p2.toUpperCase());
};
