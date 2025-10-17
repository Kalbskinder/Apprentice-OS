import { jwtVerify } from "jose"

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function verifySession(token?: string) {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch {
    return null
  }
}
