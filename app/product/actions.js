'use server'

import { prisma } from "@/utils/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation'

async function remover(quem) {
    await prisma.produto.delete({ where: { id: +quem.get('id') } })

    redirect('/product')
}

export { remover }