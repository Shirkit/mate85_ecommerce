"use server"

import { prisma } from "@/utils/prisma"
import { revalidatePath } from "next/cache"

async function processReview(formData) {
    // TODO pegar o usuário atual
    const currentUserId = (await prisma.user.findFirst({})).id
    const productsId = parseInt(formData.get('productId'))
    if (await canAddReview(currentUserId, productsId)) {
        await prisma.review.create({
            data: {
                products_id: productsId,
                users_id: currentUserId,
                rating: parseInt(formData.get('rating')),
                title: formData.get('title'),
                text: formData.get('text'),
            }
        })
        return revalidatePath(`/product/${productsId}`)
    }
    return { message: 'Não autorizado!' }
}

async function canAddReview(userId, productId) {
    return await prisma.order.findFirst({
        where: {
            users_id: userId,
            order_items: {
                some: {
                    products_id: {
                        equals: productId
                    }
                }
            },
            status: {
                equals: 'completed'
            }
        }
    }) != null
}

export { processReview }