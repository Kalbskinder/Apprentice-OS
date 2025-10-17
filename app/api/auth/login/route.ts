import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { SignJWT } from "jose"
import { Logger } from "@/lib/utils/Logger"

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function POST(req: Request) {
    const { username, password } = await req.json()
    const user = await prisma.user.findUnique({ where: { username } })

    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })

    const token = await new SignJWT({ id: user.id, username: user.username })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("7d")
        .sign(secret)


    Logger.log("New user logged in:", username + " (ID: " + user.id + ")");

    const res = NextResponse.json({ success: true })
    res.cookies.set("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return res
}
