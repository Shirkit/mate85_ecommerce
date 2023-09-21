'use server'

import { prisma } from "@/utils/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function createProduct(data){

    // create to tables product and product_item 
    await prisma.product.create({
        data:{
            name: data.get("productName"),
            description: data.get("description"),
            product_categories_id: parseInt(data.get("category")), 
            product_item : {
                create: {
                    size : data.get("size"),
                    sku: data.get("sku"),
                    amout : parseInt(data.get("amout")),
                    price: parseFloat(data.get("price")),
                },
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
            price: parseFloat(data.get("price")),
            sku: "",
            product_categories_id: parseFloat(data.get("category"))
        }
    })
    redirect("/admin/products/")
}

export {createProduct, updateProduct}