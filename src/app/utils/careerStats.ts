/**
 * Experience starts January 2025.
 * September reads 1.9+, October 1.10+. January drops the month and shows the new year: 2+.
 * Projects are 50+ in September 2026 and gain 2 at the start of each later month.
 */
const EXPERIENCE_START_YEAR = 2025;
const PROJECTS_ANCHOR = new Date(2026, 8, 1);
const PROJECTS_BASE = 50;

export function yearsExperience(now = new Date()): string {
  const years = now.getFullYear() - EXPERIENCE_START_YEAR;
  const month = now.getMonth() + 1;
  if (month === 1) return `${Math.max(years, 0)}+`;
  return `${Math.max(years, 0)}.${month}+`;
}

export function projectCount(now = new Date()): string {
  const months =
    (now.getFullYear() - PROJECTS_ANCHOR.getFullYear()) * 12 +
    (now.getMonth() - PROJECTS_ANCHOR.getMonth());
  const total = PROJECTS_BASE + Math.max(0, months) * 2;
  return `${total}+`;
}

export function careerStats(now = new Date()) {
  return [
    [yearsExperience(now), "Years exp."],
    [projectCount(now), "Projects"],
    ["B.Sc", "CSE · UITS"],
  ] as const;
}
