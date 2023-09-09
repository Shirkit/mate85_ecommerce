import { Button } from "@/components/ui/button";
import { prisma } from "@/utils/prisma"
import Link from 'next/link'
import { CreateProduct } from './CreateProduct'
import { UpdateProduct } from "./UpdateProduct";


export default async function Produtos() {

    const produtos = await prisma.produto.findMany();
    return (
        <div>
            <h1>Lista de Produtos</h1>

            {produtos.map((produto) => {
                return (
                    <div key={produto.id}>
                        <img src={produto.foto}></img>

                        <Link href={`/product/${produto.id}`}>{produto.nome}</Link>
                    </div>
                )
            })}

            <CreateProduct></CreateProduct>

            <UpdateProduct></UpdateProduct>

        </div>
    )
}
