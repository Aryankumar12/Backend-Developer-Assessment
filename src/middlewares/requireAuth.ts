import { Response, NextFunction } from "express"
import { verifyToken } from "../utils/jwt"

export const requireAuth = (req: any, res: Response, next: NextFunction) => {
  const header = req.headers.authorization
  if (!header) {
    return res.status(401).json({
      error: { code: "UNAUTH", message: "Missing token", details: [] }
    })
  }
  const token = header.split(" ")[1]
  const payload = verifyToken(token) as any
  req.user = payload
  next()
}


