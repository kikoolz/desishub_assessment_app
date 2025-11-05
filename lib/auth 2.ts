import { auth } from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function getSession() {
  return await auth();
}

export async function getCurrentAdmin() {
  const session = await getSession();
  if (!session?.user?.email) {
    return null;
  }

  const admin = await prisma.admin.findUnique({
    where: { email: session.user.email },
  });

  return admin;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

