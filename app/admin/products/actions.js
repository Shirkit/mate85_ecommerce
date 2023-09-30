'use server'
import { prisma } from "@/utils/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { NextRequest } from 'next/server'

async function createProduct(data){
    // create to tables product and product_item 
    const newProduct = await prisma.product.create({
        data:{
            name: data.get("productName"),
            description: data.get("description"),
            product_categories_id: parseInt(data.get("category")), 
        },
    }) 

    const productId = newProduct.id;

    await createProductItem(data, productId);

    redirect(`/admin/products/${productId}/productsItem/add`)
}

async function createProductItem(data, productId){

    await prisma.productItem.create({ 
        data:{
            size : data.get("size"),
            sku: data.get("sku"),
            amout : parseInt(data.get("amout")),
            price: parseFloat(data.get("price")),
            productItem_product: {
                connect: {
                  id: productId
                }
            },
        },   
    }) 

    redirect("/admin/products/add")
}

async function updateProduct(data){
    await prisma.product.update({
        where: {
            id: parseInt(data.get("productID"))
        },
        data: {
            name: data.get("productName"),
            description: data.get("description"),
            // price: parseFloat(data.get("price")),
            // sku: "",
            product_categories_id: parseFloat(data.get("category"))
        }
    })
    redirect("/admin/products/")
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

export {createProduct, createProductItem, updateProduct, queryAllProducts}