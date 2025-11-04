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
  const {
    webTechnologies,
    canBuildCRUD,
    canImplementAuth,
    backendFrameworks,
    knowsGolang,
    hasDeployed,
    canBuildAuthAPI,
  } = answers;

  // Check basic web knowledge
  const hasHTML = webTechnologies.includes("html");
  const hasCSS = webTechnologies.includes("css");
  const hasJS = webTechnologies.includes("javascript");
  const hasReact =
    webTechnologies.includes("react") || webTechnologies.includes("nextjs");
  const hasNextJS = webTechnologies.includes("nextjs");

  // Backend framework checks
  const knowsExpress = backendFrameworks.includes("express");
  const knowsHono = backendFrameworks.includes("hono");
  const knowsLaravel = backendFrameworks.includes("laravel");
  const knowsBackendFramework = knowsExpress || knowsHono || knowsLaravel;
  const noBackendFramework =
    backendFrameworks.includes("none") ||
    (!knowsExpress && !knowsHono && !knowsLaravel);

  // Tier 4: Advanced Full-Stack Developer
  // Proficient in Next.js, Express, Laravel/Hono AND knows Golang and can build APIs with Go
  if (
    hasNextJS &&
    knowsBackendFramework &&
    knowsGolang === "can-build-apis" &&
    (canBuildAuthAPI === "express-hono" || canBuildAuthAPI === "multiple")
  ) {
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

  // Tier 3: Multi-Framework Developer
  // Can build authenticated CRUD apps with Next.js AND build authenticated CRUD APIs with Express/Hono (with documentation)
  // OR can build authenticated CRUD apps with Laravel
  // Does NOT know Golang
  if (
    canBuildCRUD === "with-db" &&
    canImplementAuth === "oauth" &&
    knowsGolang === "no" &&
    // Option 1: Next.js + Express/Hono APIs
    ((hasNextJS &&
      knowsBackendFramework &&
      (canBuildAuthAPI === "express-hono" || canBuildAuthAPI === "multiple")) ||
      // Option 2: Laravel-only (Laravel can do both CRUD apps and APIs)
      (knowsLaravel && canBuildAuthAPI === "express-hono"))
  ) {
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

  // Tier 2: Full-Stack Next.js Developer
  // Can build authenticated (password + Google) CRUD App with Next.js
  // Can deploy applications
  // Knows basics of Express/Hono OR has no knowledge of backend frameworks to build authenticated CRUD APIs
  if (
    hasNextJS &&
    canBuildCRUD === "with-db" &&
    canImplementAuth === "oauth" &&
    hasDeployed !== "no" &&
    (noBackendFramework ||
      canBuildAuthAPI === "nextjs-only" ||
      canBuildAuthAPI === "no")
  ) {
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

  // Tier 1: CRUD Developer
  // Can build a CRUD app with Next.js using server actions or API routes
  // Can work with databases
  // Cannot implement authentication (password or Google OAuth)
  if (
    (hasNextJS || hasReact) &&
    canBuildCRUD === "with-db" &&
    canImplementAuth === "no"
  ) {
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

  // Tier 0: Beginner
  // Has done HTML, CSS, and basic JavaScript
  // Has basic knowledge of Next.js or React
  // Cannot build a CRUD app with a database yet
  if (
    hasHTML &&
    hasCSS &&
    hasJS &&
    hasReact &&
    (canBuildCRUD === "no" || canBuildCRUD === "without-db")
  ) {
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

  // Default fallback to Tier 0
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
