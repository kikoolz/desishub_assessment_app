import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateTier, type AssessmentAnswers } from "@/lib/tierCalculator";
import { sendTierResultEmail } from "@/lib/email";

// Use Node.js runtime for nodemailer compatibility
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      linkedIn,
      webTechnologies,
      canBuildCRUD,
      canImplementAuth,
      backendFrameworks,
      knowsGolang,
      hasDeployed,
      canBuildAuthAPI,
    } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    // Always calculate tier on the server from answers
    const assessmentAnswers: AssessmentAnswers = {
      webTechnologies: webTechnologies || [],
      canBuildCRUD: canBuildCRUD || "no",
      canImplementAuth: canImplementAuth || "no",
      backendFrameworks: backendFrameworks || [],
      knowsGolang: knowsGolang || "no",
      hasDeployed: hasDeployed || "no",
      canBuildAuthAPI: canBuildAuthAPI || "no",
    };
    const tierResult = calculateTier(assessmentAnswers);

    // Create candidate in database
    const candidate = await prisma.candidate.create({
      data: {
        name,
        email,
        phone,
        linkedIn: linkedIn || null,
        webTechnologies: webTechnologies || [],
        canBuildCRUD: canBuildCRUD || "no",
        canImplementAuth: canImplementAuth || "no",
        backendFrameworks: backendFrameworks || [],
        knowsGolang: knowsGolang || "no",
        hasDeployed: hasDeployed || "no",
        canBuildAuthAPI: canBuildAuthAPI || "no",
        assignedTier: tierResult.tier,
        tierName: tierResult.tierName,
        tierDescription: tierResult.description,
        recommendations: tierResult.recommendations,
      },
    });

    // Fire-and-forget email notification (do not block response)
    (async () => {
      try {
        await sendTierResultEmail({
          name,
          email,
          tier: tierResult.tier,
          tierName: tierResult.tierName,
          description: tierResult.description,
          recommendations: tierResult.recommendations,
        });
      } catch (err) {
        console.error("Failed to send tier result email:", err);
      }
    })();

    return NextResponse.json(
      {
        success: true,
        candidate,
        tierResult,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating candidate:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create candidate" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tier = searchParams.get("tier");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const where: any = {};

    // Filter by tier
    if (tier && tier !== "all") {
      where.assignedTier = parseInt(tier);
    }

    // Search by name or email
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    const candidates = await prisma.candidate.findMany({
      where,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    return NextResponse.json({ candidates });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return NextResponse.json(
      { error: "Failed to fetch candidates" },
      { status: 500 }
    );
  }
}
