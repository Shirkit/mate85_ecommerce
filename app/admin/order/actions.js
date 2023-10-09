'use server'

import { prisma } from '@/utils/prisma'

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

export { queryAllOrders }