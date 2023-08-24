import { prisma } from '@/utils/prisma'

export async function register() {
    
    if (await prisma.produto.count() == 0) {
        await prisma.produto.create({ data: { nome: 'Camisa 1', foto: 'https://picsum.photos/id/10/200' } })
        await prisma.produto.create({ data: { nome: 'Camisa 2', foto: 'https://picsum.photos/id/20/200' } })
        await prisma.produto.create({ data: { nome: 'Camisa 3', foto: 'https://picsum.photos/id/40/200' } })
        await prisma.produto.create({ data: { nome: 'Camisa 4', foto: 'https://picsum.photos/id/60/200' } })
    }
}