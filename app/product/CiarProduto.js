import { Button } from '@/components/ui/button';
import { prisma } from '@/utils/prisma';
import { revalidatePath } from 'next/cache';

export function CriarProduto() {


    async function criarProduto(data) {
        'use server'

        await prisma.produto.create({ data: { nome: data.get("nome"), foto: `https://picsum.photos/id/${Math.round(Math.random() * 1084)}/200` } })

        revalidatePath("/product/")

    }

    return (
        <form action={criarProduto}>
            <h2>Novo produto</h2>
            <input
                type="text"
                name="nome"
                placeholder="Nome do produto"
            />
            <Button>
                Criar
            </Button>
        </form>
    );
}
