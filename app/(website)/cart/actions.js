"use server"

const { prisma } = require("@/utils/prisma")

async function getProductsFromIds(data) {
    if (!data || !data.length)
        return []
    console.log("🚀 ~ file: actions.js:6 ~ getProductsFromIds ~ data:", data)
    return await prisma.product.findMany({
        where: {
            id: { in: data }
        }
    })
}

export { getProductsFromIds }