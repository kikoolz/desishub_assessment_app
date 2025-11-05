// Tier Calculator Logic
// This file contains the business logic for determining a candidate's skill tier
// based on their assessment responses

export interface AssessmentAnswers {
  webTechnologies: string[];
  canBuildCRUD: string;
  canImplementAuth: string;
  backendFrameworks: string[];
  knowsGolang: string;
  hasDeployed: string;
  canBuildAuthAPI: string;
}

export interface TierResult {
  tier: number;
  tierName: string;
  description: string;
  recommendations: string[];
}

interface TechnologyChecks {
  hasHTML: boolean;
  hasCSS: boolean;
  hasJS: boolean;
  hasReact: boolean;
  hasNextJS: boolean;
  knowsExpress: boolean;
  knowsHono: boolean;
  knowsLaravel: boolean;
  knowsBackendFramework: boolean;
  noBackendFramework: boolean;
}

function extractFrontendChecks(
  webTechnologies: string[]
): Partial<TechnologyChecks> {
  return {
    hasHTML: webTechnologies.includes("html"),
    hasCSS: webTechnologies.includes("css"),
    hasJS: webTechnologies.includes("javascript"),
    hasReact:
      webTechnologies.includes("react") || webTechnologies.includes("nextjs"),
    hasNextJS: webTechnologies.includes("nextjs"),
  };
}

function getBackendFrameworkFlags(backendFrameworks: string[]) {
  return {
    knowsExpress: backendFrameworks.includes("express"),
    knowsHono: backendFrameworks.includes("hono"),
    knowsLaravel: backendFrameworks.includes("laravel"),
  };
}

function evaluateBackendKnowledge(
  flags: { knowsExpress: boolean; knowsHono: boolean; knowsLaravel: boolean },
  backendFrameworks: string[]
) {
  const knowsBackendFramework =
    flags.knowsExpress || flags.knowsHono || flags.knowsLaravel;
  const noBackendFramework =
    backendFrameworks.includes("none") ||
    (!flags.knowsExpress && !flags.knowsHono && !flags.knowsLaravel);
  return { knowsBackendFramework, noBackendFramework };
}

function extractBackendChecks(
  backendFrameworks: string[]
): Partial<TechnologyChecks> {
  const flags = getBackendFrameworkFlags(backendFrameworks);
  const knowledge = evaluateBackendKnowledge(flags, backendFrameworks);
  return {
    ...flags,
    ...knowledge,
  };
}

function extractTechnologyChecks(answers: AssessmentAnswers): TechnologyChecks {
  return {
    ...extractFrontendChecks(answers.webTechnologies),
    ...extractBackendChecks(answers.backendFrameworks),
  } as TechnologyChecks;
}

function createTier4Result(): TierResult {
  return {
    tier: 4,
    tierName: "Advanced Full-Stack Developer",
    description:
      "You are an advanced developer proficient in multiple modern frameworks and languages! You can build complex applications across multiple stacks including Golang.",
    recommendations: [
      "Explore cloud architecture (AWS, GCP, Azure)",
      "Learn Kubernetes and containerization",
      "Study system design principles",
      "Mentor junior developers",
      "Contribute to open-source projects",
    ],
  };
}

function createTier3Result(): TierResult {
  return {
    tier: 3,
    tierName: "Multi-Framework Developer",
    description:
      "You are proficient in multiple frameworks and can build authenticated APIs with proper documentation! You have strong full-stack capabilities across Next.js and backend frameworks.",
    recommendations: [
      "Learn Golang basics",
      "Build a simple REST API with Go",
      "Study Go concurrency patterns",
      "Explore microservices architecture",
      "Learn GraphQL",
    ],
  };
}

function createTier2Result(): TierResult {
  return {
    tier: 2,
    tierName: "Full-Stack Next.js Developer",
    description:
      "You can build and deploy authenticated full-stack applications with Next.js! You have solid experience with modern React development and authentication.",
    recommendations: [
      "Learn Express.js or Hono for backend APIs",
      "Study RESTful API design principles",
      "Learn API documentation with Swagger/OpenAPI",
      "Build a standalone backend API",
      "Explore serverless architectures",
    ],
  };
}

function createTier1Result(): TierResult {
  return {
    tier: 1,
    tierName: "CRUD Developer",
    description:
      "You can build CRUD applications with databases using Next.js or React! You have a good understanding of data persistence and basic API interactions.",
    recommendations: [
      "Learn NextAuth.js for authentication",
      "Implement password-based login",
      "Add OAuth providers (Google, GitHub)",
      "Build an authenticated blog platform",
      "Learn about JWT tokens",
    ],
  };
}

function createTier0Result(): TierResult {
  return {
    tier: 0,
    tierName: "Beginner",
    description:
      "You have foundational knowledge in HTML, CSS, JavaScript, and basic React/Next.js. You are ready to start building CRUD applications with databases!",
    recommendations: [
      "Start building simple CRUD applications",
      "Learn database basics (SQL or NoSQL)",
      "Practice with Next.js tutorials",
      "Build a todo app with database integration",
      "Learn about REST APIs",
    ],
  };
}

function createDefaultTier0Result(): TierResult {
  return {
    tier: 0,
    tierName: "Beginner",
    description:
      "Welcome to your development journey! Focus on building strong fundamentals and gradually progress.",
    recommendations: [
      "Master HTML, CSS, and JavaScript",
      "Learn React fundamentals",
      "Complete beginner tutorials",
      "Build small projects to practice",
      "Join coding communities",
    ],
  };
}

function checkTier4(
  checks: TechnologyChecks,
  answers: AssessmentAnswers
): boolean {
  return (
    checks.hasNextJS &&
    checks.knowsBackendFramework &&
    answers.knowsGolang === "can-build-apis" &&
    (answers.canBuildAuthAPI === "express-hono" ||
      answers.canBuildAuthAPI === "multiple")
  );
}

function checkTier3(
  checks: TechnologyChecks,
  answers: AssessmentAnswers
): boolean {
  return (
    answers.canBuildCRUD === "with-db" &&
    answers.canImplementAuth === "oauth" &&
    answers.knowsGolang === "no" &&
    ((checks.hasNextJS &&
      checks.knowsBackendFramework &&
      (answers.canBuildAuthAPI === "express-hono" ||
        answers.canBuildAuthAPI === "multiple")) ||
      (checks.knowsLaravel && answers.canBuildAuthAPI === "express-hono"))
  );
}

function checkTier2(
  checks: TechnologyChecks,
  answers: AssessmentAnswers
): boolean {
  return (
    checks.hasNextJS &&
    answers.canBuildCRUD === "with-db" &&
    answers.canImplementAuth === "oauth" &&
    answers.hasDeployed !== "no" &&
    (checks.noBackendFramework ||
      answers.canBuildAuthAPI === "nextjs-only" ||
      answers.canBuildAuthAPI === "no")
  );
}

function checkTier1(
  checks: TechnologyChecks,
  answers: AssessmentAnswers
): boolean {
  return (
    (checks.hasNextJS || checks.hasReact) &&
    answers.canBuildCRUD === "with-db" &&
    answers.canImplementAuth === "no"
  );
}

function checkTier0(
  checks: TechnologyChecks,
  answers: AssessmentAnswers
): boolean {
  return (
    checks.hasHTML &&
    checks.hasCSS &&
    checks.hasJS &&
    checks.hasReact &&
    (answers.canBuildCRUD === "no" || answers.canBuildCRUD === "without-db")
  );
}

/**
 * Calculates the skill tier (0-4) based on assessment answers
 *
 * Tier 0: Beginner - Knows HTML, CSS, JS, basic React/Next.js, cannot build CRUD with DB
 * Tier 1: CRUD Developer - Can build CRUD apps with Next.js/React and DB, cannot implement auth
 * Tier 2: Full-Stack Next.js - Can build authenticated CRUD apps, deploy, no Express/Hono/Laravel API knowledge
 * Tier 3: Multi-Framework - Can build authenticated CRUD apps AND APIs with Express/Hono/Laravel, no Golang
 * Tier 4: Advanced - Proficient in Next.js, Express, Laravel/Hono AND knows Golang, can build APIs with Go
 */
export function calculateTier(answers: AssessmentAnswers): TierResult {
  const checks = extractTechnologyChecks(answers);

  if (checkTier4(checks, answers)) return createTier4Result();
  if (checkTier3(checks, answers)) return createTier3Result();
  if (checkTier2(checks, answers)) return createTier2Result();
  if (checkTier1(checks, answers)) return createTier1Result();
  if (checkTier0(checks, answers)) return createTier0Result();

  return createDefaultTier0Result();
}
