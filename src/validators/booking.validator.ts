import { z } from "zod"

export const createBookingSchema = z.object({
  seats: z.number().int().min(1)
})
