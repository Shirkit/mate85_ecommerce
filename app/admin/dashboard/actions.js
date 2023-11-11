'use server'

import { prisma } from '@/utils/prisma'
import { revalidatePath } from 'next/cache';

async function queryAllOrders() {
    const data = await prisma.order.findMany({
        select: {
            id: true,
            users_id: true,
            status: true,
            total: true
        }
    });

    return data;
}

async function updateStatus(orderId, orderStatus) {
    await prisma.order.update({
        where: {
            id: parseInt(orderId)
        },
        data: {
            status: orderStatus,
        },
    });

    revalidatePath('/admin/')
}

export { queryAllOrders, updateStatus }