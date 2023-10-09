"use server"

import { prisma } from "@/utils/prisma";

export async function GetAddressesFromUserId(user) {
    return await prisma.address.findMany({
        where: {
            users_id: {
                equals: user
            }
        }
    })
}