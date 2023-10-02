'use server'
import { prisma } from "@/utils/prisma"
import { product_categories } from "@/utils/sampledata"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function createProduct(data){
    // create to tables product and product_item 
    const newProduct = await prisma.product.create({
        data:{
            name: data.get("productName"),
            description: data.get("description"),
            product_categories_id: parseInt(data.get("category")), 
        },
    }) 

    revalidatePath("/admin/products/[id]/productsItem/add")
}

async function createProductItem(data){
    await prisma.productItem.create({ 
        data:{
            size : data.get("size"),
            sku: data.get("sku"),
            amout : parseInt(data.get("amout")),
            price: parseFloat(data.get("price")),
            productItem_product: {
                connect: {
                  id: parseInt(data.get("product_id")),
                }
            },
        },   
    }) 

    revalidatePath("/admin/products/[id]/productsItem/add")
}

async function updateProduct(data){
    await prisma.product.update({
        where: {
            id: parseInt(data)
        },
        data: {
            name: data.get("productName"),
            description: data.get("description"),
            product_categories_id: parseFloat(data.get("category"))
        }

    })

revalidatePath(`/admin`)
}

async function queryProduct(data) {
    return await prisma.product.findMany({
        where: {
            id: parseInt(data)
        },
        select: {
            id: true,
            name: true,
            description: true,
            product_categories_id: true
        },
    })
}

async function queryProductCategory(data) {
    return await prisma.productCategory.findMany({
        where: {
            id: parseInt(data)
        },
        select: {
            id: true,
            name: true,
        },
    })
}

async function queryAllProducts() {
    return await prisma.product.findMany({
        select: {
            id: true,
            name: true,
            rating: true,
        },
    })
}

async function queryAllProductsItem(data) {
    return await prisma.productItem.findMany({
        where: {
            product_id: parseInt(data)
        },
        select: {
            size: true,
            amout: true,
            price: true,
        },
    })
}

export {createProduct, createProductItem, updateProduct, queryProduct, queryAllProducts, queryAllProductsItem, queryProductCategory}