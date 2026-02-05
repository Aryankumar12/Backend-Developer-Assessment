import { Router } from "express"
import { signupSchema, loginSchema } from "../validators/auth.validator"
import * as service from "../services/auth.service"

const router = Router()

router.post("/signup", async (req, res) => {
  const data = signupSchema.parse(req.body)
  const user = await service.signup(data.email, data.password, data.role)
  res.json(user)
})

router.post("/login", async (req, res) => {
  const data = loginSchema.parse(req.body)
  const result = await service.login(data.email, data.password)
  res.json(result)
})

export default router
