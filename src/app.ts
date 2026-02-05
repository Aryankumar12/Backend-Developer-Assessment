import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.route"

const app = express()
app.use(cors())
app.use(express.json())

import bookingRoutes from "./routes/booking.routes"

app.use("/", bookingRoutes)

import { logger } from "./middlewares/logger"
import healthRoutes from "./routes/health.routes"

app.use(logger)
app.use("/", healthRoutes)


import experienceRoutes from "./routes/experience.route"
app.use("/experiences", experienceRoutes)

app.use("/auth", authRoutes)

export default app

