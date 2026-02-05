import { prisma } from "../db/prisma"

export const createExperience = async (data: any, userId: string) => {
  return prisma.experience.create({
    data: {
      ...data,
      startTime: new Date(data.startTime),
      createdBy: userId
    }
  })
}

export const publishExperience = async (id: string) => {
  return prisma.experience.update({
    where: { id },
    data: { status: "published" }
  })
}

export const blockExperience = async (id: string) => {
  return prisma.experience.update({
    where: { id },
    data: { status: "blocked" }
  })
}

export const listPublishedExperiences = async (query: any) => {
  const { location, from, to, page = "1", limit = "10", sort = "asc" } = query
  return prisma.experience.findMany({
    where: {
      status: "published",
      ...(location && { location }),
      ...(from || to
        ? {
            startTime: {
              ...(from && { gte: new Date(from) }),
              ...(to && { lte: new Date(to) })
            }
          }
        : {})
    },
    orderBy: { startTime: sort === "desc" ? "desc" : "asc" },
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit)
  })
}
