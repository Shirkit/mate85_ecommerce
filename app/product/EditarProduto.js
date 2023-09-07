import { Button } from "@/components/ui/button"
import { prisma } from "@/utils/prisma"
import { revalidatePath } from "next/cache"

export function EditarProduto(){
    async function editarProduto(data){
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

    return (
        <form action={editarProduto}>
            <h2>Editar Produto</h2>
            <input type="text" name="id" placeholder="Id do produto"/>
            <input type="text" name="nome" placeholder="Novo nome do produto"/>
            <Button>
                Atualizar
            </Button>
        </form>
    )
}