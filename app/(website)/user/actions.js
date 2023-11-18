'use server'

import { getServerSession } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/utils/prisma'
import { revalidatePath } from 'next/cache'

async function getUserById(userId) {
    return await prisma.user.findFirst({
        where: {
            id: userId
        }
    })
}

async function getUserOrdersById(userId) {
    return await prisma.order.findMany({
        where: {
            users_id: userId
        }
    })
}

async function getUserAddressById() {
    return await prisma.address.findFirst({
        where: {
            users_id: (await getServerSession()).user.id
        }
    })
}
async function getOrderItemByOrderId(orderId) {
    return await prisma.orderItem.findMany({
        where: {
            orders_id: orderId
        }
    })
}

async function updateUser(data, address) {
    const updates = []
    
    updates.push(
        prisma.user.update({
            where: {
                id: (await getServerSession()).user.id
            },
            data: {
                name: data.name
            }
        })
    )
    const target = await prisma.address.findFirst({
        where: {
            users_id: (await getServerSession()).user.id
        }
    })

    if (target) {
        updates.push(
            prisma.address.update({
                where: {
                    id: target.id
                },
                data: {
                    street: address.street,
                    complement: address.complement,
                    type: 'billing_shipping',
                    city: address.city,
                    state: address.state,
                    country: address.country,
                    zip_code: address.zip_code,
                    number: address.number
                }
            })
        )
    } else {
        updates.push(
            prisma.address.create({
                data: {
                    street: address.street,
                    complement: address.complement,
                    type: 'billing_shipping',
                    city: address.city,
                    state: address.state,
                    country: address.country,
                    zip_code: address.zip_code,
                    number: address.number,
                    user: {
                      connect: {
                        id: (await getServerSession()).user.id
                      }
                    }
                }
            })
        )
    }

    prisma.$transaction(updates)
    return true
}

export {
    getUserById,
    getUserOrdersById,
    getOrderItemByOrderId,
    getUserAddressById,
    updateUser
}
