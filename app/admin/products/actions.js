'use server'

import { prisma } from "@/utils/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function createProduct(data){

    await prisma.product.create({
        data:{
            name: data.get("productName"),
            description: data.get("description"),
            price: parseFloat(data.get("price")),
            sku: "",
            product_categories_id: parseFloat(data.get("category"))    
        }
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