import { Response, NextFunction } from "express"
import { prisma } from "../db/prisma"

export const requireOwnerOrAdmin = async (req: any, res: Response, next: NextFunction) => {
  const exp = await prisma.experience.findUnique({ where: { id: req.params.id } })
  if (!exp) {
    return res.status(404).json({
      error: { code: "NOT_FOUND", message: "Experience not found", details: [] }
    })
  }
  if (req.user.role === "admin" || exp.createdBy === req.user.userId) {
    return next()
  }
  return res.status(403).json({
    error: { code: "FORBIDDEN", message: "Not allowed", details: [] }
  })
}
