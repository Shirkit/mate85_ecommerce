import { prisma } from '@/utils/prisma'
import { order_items, orders, orders_address, product_categoris, products, users, users_address, reviews } from '@/utils/sampledata';

// setar isso pra true para rodar uma vez. depois de rodar o servidor, feche o servidor NEXT, sete para falso novamente
var importarDadosMocks = false

export async function register() {

    if (importarDadosMocks) {
        importarDadosMocks = false

        for (let i = 0; i < users.length; i++) {
            users[i].id = parseInt(users[i].id)
        }

        for (let i = 0; i < product_categoris.length; i++) {
            product_categoris[i].id = parseInt(product_categoris[i].id)
        }

        for (let i = 0; i < products.length; i++) {
            products[i].id = parseInt(products[i].id)
            products[i].price = parseFloat(products[i].price)
            products[i].product_categories_id = parseInt(products[i].product_categories_id)
        }

        for (let i = 0; i < orders.length; i++) {
            orders[i].id = parseInt(orders[i].id)
            orders[i].users_id = parseInt(orders[i].users_id)
            orders[i].total = parseFloat(orders[i].total)
            orders[i].order_number = parseInt(orders[i].order_number)

        }

        for (let i = 0; i < order_items.length; i++) {
            order_items[i].orders_id = parseInt(order_items[i].orders_id)
            order_items[i].products_id = parseInt(order_items[i].products_id)
            order_items[i].price = parseFloat(order_items[i].price)
        }

        for (let i = 0; i < users_address.length; i++) {
            users_address[i].users_id = parseInt(users_address[i].users_id)
            users_address[i].orders_id = null
        }

        for (let i = 0; i < orders_address.length; i++) {
            orders_address[i].orders_id = parseInt(orders_address[i].orders_id)
            orders_address[i].number = toString(orders_address[i].number)
            orders_address[i].users_id = null
        }

        for (let i = 0; i < reviews.length; i++) {
            reviews[i].id = parseInt(reviews[i].id)
            reviews[i].rating = parseInt(reviews[i].rating)
            reviews[i].users_id = parseInt(reviews[i].users_id)
            reviews[i].products_id = parseInt(reviews[i].products_id)
        }

        await prisma.review.deleteMany({});
        await prisma.address.deleteMany({});
        await prisma.orderItem.deleteMany({});
        await prisma.order.deleteMany({});
        await prisma.product.deleteMany({});
        await prisma.productCategory.deleteMany({});
        await prisma.user.deleteMany({});

        await prisma.user.createMany({ data: users })
        await prisma.productCategory.createMany({ data: product_categoris })
        await prisma.product.createMany({ data: products })
        await prisma.order.createMany({ data: orders })
        await prisma.orderItem.createMany({ data: order_items })
        await prisma.address.createMany({ data: users_address })
        await prisma.address.createMany({ data: orders_address })
        await prisma.review.createMany({ data: reviews })

        let db_products = await prisma.product.findMany({
            include: {
                reviews: {}
            }
        })
        db_products.forEach((product) => {
            if (product.reviews.length > 0) {
                product.reviews.forEach((review) => {
                    product.rating += review.rating
                })
                product.rating /= product.reviews.length
                console.log(product.id + " = " + product.rating)
                let res = prisma.product.update({
                    where: {
                        id: product.id
                    },
                    data: {
                        rating: product.rating
                    }
                })
            }
        })
    }

}