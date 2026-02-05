import { z } from "zod"

export const createExperienceSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  location: z.string().min(2),
  price: z.number().int().positive(),
  startTime: z.string().datetime()
})
