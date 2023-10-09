"use server";

import { prisma } from "@/utils/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation'

async function createOrder(data) {
    let items = []

    for (const item of data.get("cartItems")) {
        items.push({ ...item.item })

    }

    await prisma.Order.create({
        data: {
            total: data.get("cartTotal"),
            status: data.get("status"),
            address: {
                create: {
                    data: {
                        type: data.get("type"),
                        street: data.get("street"),
                        number: data.get("number"),
                        complement: data.get("complement"),
                        neighborhood: data.get("neighborhood"),
                        city: data.get("city"),
                        state: data.get("state"),
                        country: data.get("country"),
                        zip_code: data.get("zip_code"),
                        complement2: data.get("complement2"),
                    }
                }
            },
            user: {
                connect: { id: data.get("userId") }
            },
            order_items: {
                createMany: { data: items }
            }
        }
    })

}

async function createAdress(data) {
    await prisma.address.create({
        data: {
            type: data.get("type"),
            street: data.get("street"),
            number: data.get("number"),
            complement: data.get("complement"),
            neighborhood: data.get("neighborhood"),
            city: data.get("city"),
            state: data.get("state"),
            country: data.get("country"),
            zip_code: data.get("zip_code"),
            complement2: data.get("complement2"),
            user: {
                connect: { id: data.get("userId") }
            },
        }
    })
}

export async function GetAddressesFromUserId(user) {
    return await prisma.address.findMany({
        where: {
            users_id: {
                equals: user
            }
        }
    })
}