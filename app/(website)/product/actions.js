'use server'

import { prisma } from "@/utils/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation'

async function removeProduct(data) {
    await prisma.produto.delete({ 
        where: { 
            id: +data.get('id') 
        } 
    })

    redirect('/product')
}

async function createProduct(data) {

    await prisma.produto.create({ 
        data: { nome: data.get("nome"), 
        foto: `https://picsum.photos/id/${Math.round(Math.random() * 1084)}/200` 
        }
    })

    revalidatePath("/product/")

}

async function updateProduct(data){
    'use server'

    await prisma.produto.update({
        where: {
            id: parseInt(data.get("id"))
        },
        data: {
            nome: data.get("nome"),
            foto: `https://picsum.photos/id/${Math.round(Math.random() * 1084)}/200`
        },
    })
    revalidatePath("/product/")
}

export { removeProduct, createProduct, updateProduct }
