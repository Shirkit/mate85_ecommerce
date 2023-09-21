import { prisma } from '@/utils/prisma'
import { order_items, orders, orders_address, product_categoris, products, users, users_address, reviews } from '@/utils/sampledata';

var importarDadosMocks = true

export async function register() {

    if (process.env.APP_ENV && process.env.APP_ENV == 'schema' && importarDadosMocks) {
        importarDadosMocks = false

        console.debug('\nAtualizando Prisma - ao final, o processo vai terminar com erro mas é o comportamento esperado\n')

        console.debug('Preparando dados')

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

        console.debug('Limpando DB')

        await prisma.review.deleteMany({});
        await prisma.address.deleteMany({});
        await prisma.orderItem.deleteMany({});
        await prisma.order.deleteMany({});
        await prisma.product.deleteMany({});
        await prisma.productCategory.deleteMany({});
        await prisma.user.deleteMany({});

        console.debug('Atualizando DB')

        await prisma.user.createMany({ data: users })
        await prisma.productCategory.createMany({ data: product_categoris })
        await prisma.product.createMany({ data: products })
        await prisma.order.createMany({ data: orders })
        await prisma.orderItem.createMany({ data: order_items })
        await prisma.address.createMany({ data: users_address })
        await prisma.address.createMany({ data: orders_address })
        await prisma.review.createMany({ data: reviews })

        console.debug('Atualizando reviews')

        let db_products = await prisma.product.findMany({
            include: {
                reviews: {}
            }
        })
        for (let i = 0; i < db_products.length; i++) {
            const product = db_products[i]
            
            if (product.reviews.length > 0) {
                for (let k = 0; k < product.reviews.length; k++) {
                    product.rating += product.reviews[k].rating
                }
                product.rating /= product.reviews.length
                
                await prisma.product.update({
                    where: {
                        id: product.id
                    },
                    data: {
                        rating: product.rating
                    }
                })
                
            }
        }
        console.log('Atualizando autoincrements')
        await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Order"', 'id'), coalesce(max(id)+1, 1), false) FROM "Order";`
        await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Review"', 'id'), coalesce(max(id)+1, 1), false) FROM "Review";`
        await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"User"', 'id'), coalesce(max(id)+1, 1), false) FROM "User";`
        await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"OrderItem"', 'id'), coalesce(max(id)+1, 1), false) FROM "OrderItem";`
        await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Address"', 'id'), coalesce(max(id)+1, 1), false) FROM "Address";`
        await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Product"', 'id'), coalesce(max(id)+1, 1), false) FROM "Product";`
        await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"ProductCategory"', 'id'), coalesce(max(id)+1, 1), false) FROM "ProductCategory";`

        console.debug('Concluído - o processo vai terminar com erro mas é o comportamento esperado\n')
        console.debug(' - Se o processo não encerrar, por favor aperte CTRL+C\n')

        process.stdout._write('\x03')
        
    }

}