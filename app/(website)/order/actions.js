"use server";

import { prisma } from "@/utils/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation'

function updateMulti(tableName, fields, values, id) {
    const setSql = fields
        .map((field) => `"${field}" = "t"."${field}"`)
        .join(", ");
    const fieldsSql = fields.map((f) => `"${f}"`).join(", ");

    let paramIndex = 0;
    const valuesSql = values
        .map((row) => `(${row.map(() => `\$${++paramIndex}`)})`)
        .join(",");

    const sql = `UPDATE "${tableName}" SET ${setSql} FROM (VALUES ${valuesSql}) AS t("${id}", ${fieldsSql}) WHERE "${tableName}"."${id}" = "t"."${id}"`;

    return prisma.$executeRawUnsafe(sql, ...values.flat());
}

export async function createOrder({ billing_address, shipping_same_as_billing, shipping_address, gateway, cart, total }) {
    const ids = [], orderItems = []

    cart.forEach(cartItem => {
        ids.push(cartItem.item.sku)
    })

    const items = await prisma.productItem.findMany({
        where: {
            sku: {
                in: ids
            }
        }
    })

    console.log("🚀 ~ file: actions.js:37 ~ createOrder ~ items:", items)

    const updates = []

    // TODO se uma próxima compra chegar enquanto essa executa, ou seja enquanto essa execução espera o prisma retornar o valor, vai terminar vendendo itens que não tem em estoque o suficiente

    let found
    for (let i = 0; i < cart.length; i++) {
        const cartItem = cart[i];
        found = false
        for (let k = 0; k < items.length; k++) {
            const productItem = items[k];
            if (cartItem.item.sku == productItem.sku && cartItem.item.price == productItem.price) {
                found = true
                if (cartItem.quantity > productItem.amount)
                    return { error: `Quantidade de ${cartItem.product.name} indisponível para venda. Temos ${productItem.amount} em estoque mas tentou-se comprar ${cartItem.quantity}` }
                // Nem tente criar um Pedido caso tenham tentado alterar o preço
                orderItems.push({
                    price: productItem.price,
                    sku: productItem.sku,
                    quantity: cartItem.quantity
                })  
                updates.push([productItem.sku, productItem.amount - cartItem.quantity])
                
            }

        }
        if (!found)
            return { error: "Produto não bate com a base de dados" }
    }

    // TODO Precisa de validação ?

    const addresses = []

    addresses.push({
        street: billing_address.street,
        city: billing_address.city,
        complement: billing_address.complement,
        complement2: billing_address.complement2,
        country: billing_address.country,
        neighborhood: billing_address.neighborhood,
        number: billing_address.number,
        state: billing_address.state,
        zip_code: billing_address.zip_code,
        type: "billing"
    })

    if (!shipping_same_as_billing) {
        addresses.push({
            street: shipping_address.street,
            city: shipping_address.city,
            complement: shipping_address.complement,
            complement2: shipping_address.complement2,
            country: shipping_address.country,
            neighborhood: shipping_address.neighborhood,
            number: shipping_address.number,
            state: shipping_address.state,
            zip_code: shipping_address.zip_code,
            type: "shipping"
        })
    }

    console.log('Transação')

    const [order] = await prisma.$transaction([
        prisma.Order.create({
            data: {
                total: total,
                status: "payment-pending",
                address: {
                    createMany: {
                        data: addresses,
                    }
                },
                user: {
                    connect: { id: billing_address.users_id }
                },
                order_items: {
                    createMany: { data: orderItems }
                }
            }
        }),
        updateMulti("ProductItem", ["amount"], updates, "sku")
    ])

    const items2 = await prisma.productItem.findMany({
        where: {
            sku: {
                in: ids
            }
        }
    })

    console.log("🚀 ~ file: actions.js:129 ~ createOrder ~ items2:", items2)

    return { order: order }

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