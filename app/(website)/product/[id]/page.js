import { Button } from "@/components/ui/button"
import { prisma } from "@/utils/prisma"
import { remover } from "../actions"

export default async function Produto({ params }) {
    const produto = await prisma.produto.findFirst({ where: { id: +params.id } })

    return (
        <div>
            <h1>O Produto é = {produto.nome} quem tem o ID = {produto.id}</h1>
            <img src={produto.foto}></img>

            <form action={remover}>
                <input type="hidden" name="id" value={produto.id}></input>
                <button type="submit">remover</button>
            </form>
        </div>
    )
}
