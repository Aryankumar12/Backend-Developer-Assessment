import bcrypt from "bcrypt"
import { prisma } from "../db/prisma"
import { signToken } from "../utils/jwt"

export const signup = async (email: string, password: string, role: any) => {
  const hash = await bcrypt.hash(password, 10)
  return prisma.user.create({
    data: { email, passwordHash: hash, role }
  })
}

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) throw new Error()
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) throw new Error()
  const token = signToken({ userId: user.id, role: user.role })
  return { token, user: { id: user.id, role: user.role } }
}
