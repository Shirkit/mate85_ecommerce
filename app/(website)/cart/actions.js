"use server"

const { prisma } = require("@/utils/prisma")

async function getProductsFromIds(data) {
    if (!data || !data.length)
        return []
    console.log("🚀 ~ file: actions.js:6 ~ getProductsFromIds ~ data:", data)
    return await prisma.product.findMany({
        where: {
            id: { in: data }
        },
        include: {
            product_item: {
                orderBy : {
                    _relevance: {
                        fields: ['size'],
                        search: ('P', 'M', 'G'),
                        sort: 'asc'
                    }
                    // size: 'asc',
                },
            },
        },
        orderBy: [
            {
                name: 'asc',
            },
        ],

        //   product_item 
        //   size 
    })
}

export { getProductsFromIds }