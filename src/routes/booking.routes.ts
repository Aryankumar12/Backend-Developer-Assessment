import { Router } from "express"
import { requireAuth } from "../middlewares/requireAuth"
import { requireRole } from "../middlewares/requireRole"
import { createBookingSchema } from "../validators/booking.validator"
import { bookExperience } from "../services/booking.service"

const router = Router()

router.post(
  "/experiences/:id/book",
  requireAuth,
  requireRole("user", "admin"),
  async (req: any, res) => {
    const data = createBookingSchema.parse(req.body)
    const booking = await bookExperience(
      req.params.id,
      req.user.userId,
      data.seats
    )
    res.json(booking)
  }
)

export default router
