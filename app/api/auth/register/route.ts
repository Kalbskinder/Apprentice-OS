import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
  const { username, password } = await req.json()

  if (!username || !password)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })

  const existing = await prisma.user.findUnique({ where: { username } })
  if (existing)
    return NextResponse.json({ error: "User already exists" }, { status: 400 })

  const hashed = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { username, password: hashed },
  })

  return NextResponse.json({ id: user.id, username: user.username })
}
