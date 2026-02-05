import { Router } from "express"
import { requireAuth } from "../middlewares/requireAuth"
import { requireRole } from "../middlewares/requireRole"
import { requireOwnerOrAdmin } from "../middlewares/requireOwnerOrAdmin"
import { createExperienceSchema } from "../validators/experience.validator"
import * as service from "../services/experience.service"

const router = Router()

router.post(
  "/",
  requireAuth,
  requireRole("host", "admin"),
  async (req: any, res) => {
    const data = createExperienceSchema.parse(req.body)
    const exp = await service.createExperience(data, req.user.userId)
    res.json(exp)
  }
)

router.patch(
  "/:id/publish",
  requireAuth,
  requireOwnerOrAdmin,
  async (req, res) => {
    const exp = await service.publishExperience(req.params.id)
    res.json(exp)
  }
)

router.patch(
  "/:id/block",
  requireAuth,
  requireRole("admin"),
  async (req, res) => {
    const exp = await service.blockExperience(req.params.id)
    res.json(exp)
  }
)

router.get("/", async (req, res) => {
  const list = await service.listPublishedExperiences(req.query)
  res.json(list)
})

export default router
