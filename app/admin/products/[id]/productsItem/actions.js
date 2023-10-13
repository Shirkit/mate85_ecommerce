'use server'

import { prisma } from "@/utils/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation'

async function updateProductItem(data){
    await prisma.productItem.update({
        where:{
            product_id: parseInt(data.get("product_id")),
            sku: data.get("sku")
        },
        data:{
            size: data.get("size"),
            amount: parseInt(data.get("amount")),
            price: parseFloat(data.get("price"))
        }
    })
    revalidatePath("products/[id]/productsItem")
}

export {updateProductItem}