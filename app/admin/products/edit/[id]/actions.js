'use server'

const { prisma } = require("@/utils/prisma")

async function queryProductByID(productID) {
    return await prisma.product.findUnique({
        where: {
            id: productID
        },
        include: {
            product_item: {
                select: {
                    id: true,
                    sku: true,
                    price: true,
                    size: true,
                    color: true,
                    amount: true
                }
            }
        }        
    })
}

export { queryProductByID }