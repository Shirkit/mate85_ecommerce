import { PrismaClient } from "@prisma/client"


if (!global.prisma) {
global.prisma = new PrismaClient()
}

export let prisma = global.prisma