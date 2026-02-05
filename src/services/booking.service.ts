import { prisma } from "../db/prisma"

export const bookExperience = async (
  experienceId: string,
  userId: string,
  seats: number
) => {
  const exp = await prisma.experience.findUnique({
    where: { id: experienceId }
  })

  if (!exp || exp.status !== "published") {
    throw new Error("NOT_PUBLISHED")
  }

  if (exp.createdBy === userId) {
    throw new Error("OWN_EXPERIENCE")
  }

  return prisma.booking.create({
    data: {
      experienceId,
      userId,
      seats
    }
  })
}
