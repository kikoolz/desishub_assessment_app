// Questions Configuration
// This file contains all the assessment questions with their options
// Questions are displayed one at a time in a Google Forms-style interface

export interface QuestionOption {
  value: string;
  label: string;
  icon: string;
}

export interface Question {
  id: number;
  type:
    | "welcome"
    | "personal-info"
    | "single-choice"
    | "multiple-choice"
    | "completion";
  title?: string;
  question?: string;
  subtitle?: string;
  description?: string;
  options?: QuestionOption[];
  allowMultiple?: boolean;
  required?: boolean;
  fields?: string[];
  action?: string;
}

export const questions: Question[] = [
  {
    id: 1,
    type: "welcome",
    title: "Welcome to Desishub Technical Assessment",
    description:
      "This assessment will help us understand your skill level. It takes about 3-5 minutes.",
    action: "Start Assessment",
  },
  {
    id: 2,
    type: "personal-info",
    title: "Let's start with your basic information",
    fields: ["name", "email", "phone", "linkedin"],
  },
  {
    id: 3,
    type: "multiple-choice",
    question: "What web technologies do you know?",
    subtitle: "Select all that apply",
    options: [
      { value: "html", label: "HTML", icon: "🌐" },
      { value: "css", label: "CSS", icon: "🎨" },
      { value: "javascript", label: "JavaScript", icon: "⚡" },
      { value: "react", label: "React", icon: "⚛️" },
      { value: "nextjs", label: "Next.js", icon: "▲" },
    ],
    allowMultiple: true,
    required: true,
  },
  {
    id: 4,
    type: "single-choice",
    question: "Can you build a CRUD application?",
    options: [
      {
        value: "no",
        label: "No, I haven't built one yet",
        icon: "📚",
      },
      {
        value: "without-db",
        label: "Yes, but without database integration",
        icon: "🔨",
      },
      {
        value: "with-db",
        label: "Yes, with database integration",
        icon: "🚀",
      },
    ],
    required: true,
  },
  {
    id: 5,
    type: "single-choice",
    question: "Can you implement authentication?",
    options: [
      { value: "no", label: "No", icon: "❌" },
      {
        value: "basic",
        label: "Yes, basic password authentication only",
        icon: "🔐",
      },
      {
        value: "oauth",
        label: "Yes, with both password and OAuth (Google/GitHub)",
        icon: "✅",
      },
    ],
    required: true,
  },
  {
    id: 6,
    type: "multiple-choice",
    question: "What backend frameworks do you know?",
    subtitle: "Select all that apply",
    options: [
      { value: "none", label: "None", icon: "⭕" },
      { value: "express", label: "Express.js", icon: "🚂" },
      { value: "hono", label: "Hono", icon: "🔥" },
      { value: "laravel", label: "Laravel", icon: "🎯" },
    ],
    allowMultiple: true,
    required: true,
  },
  {
    id: 7,
    type: "single-choice",
    question: "Do you know Golang?",
    options: [
      { value: "no", label: "No", icon: "❌" },
      { value: "basics", label: "Yes, basics", icon: "📖" },
      {
        value: "can-build-apis",
        label: "Yes, can build APIs with Go",
        icon: "🦫",
      },
    ],
    required: true,
  },
  {
    id: 8,
    type: "single-choice",
    question: "Have you deployed applications to production?",
    options: [
      { value: "no", label: "No", icon: "❌" },
      { value: "frontend-only", label: "Yes, frontend only", icon: "🎨" },
      {
        value: "fullstack",
        label: "Yes, full-stack applications",
        icon: "🌐",
      },
    ],
    required: true,
  },
  {
    id: 9,
    type: "single-choice",
    question: "Can you build authenticated CRUD APIs with documentation?",
    options: [
      { value: "no", label: "No", icon: "❌" },
      {
        value: "nextjs-only",
        label: "With Next.js only",
        icon: "▲",
      },
      {
        value: "express-hono",
        label: "With Express/Hono/Laravel",
        icon: "🚀",
      },
      {
        value: "multiple",
        label: "With multiple frameworks",
        icon: "⭐",
      },
    ],
    required: true,
  },
  {
    id: 10,
    type: "completion",
    title: "Assessment Complete! 🎉",
    description:
      "Thank you for completing the assessment. We are calculating your tier...",
  },
];
