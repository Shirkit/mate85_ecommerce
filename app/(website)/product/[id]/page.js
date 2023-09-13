import { Button } from "@/components/ui/button"
import { prisma } from "@/utils/prisma"
import { removeProduct } from "../actions"
import { renderStars } from "@/components/ui/stars"
import Carousel from "@/components/ui/carousel"

export default async function Produto({ params }) {
    const produto = await prisma.product.findFirst({ where: { id: parseInt(params.id) } })

    return (
        <article>

            <div className="flex flex-row gap-8">
                <div className="w-1/2">
                    <Carousel images={[
                        `https://picsum.photos/id/${Math.round(Math.random() * 1084)}/200`,
                        `https://picsum.photos/id/${Math.round(Math.random() * 1084)}/200`,
                        `https://picsum.photos/id/${Math.round(Math.random() * 1084)}/200`
                    ]} ></Carousel>

                </div>

                <section className="flex flex-col w-1/2 gap-4">
                    <h1 className="text-4xl">{produto.name}</h1>
                    {renderStars(Math.random() * 5)}
                    <span>R${produto.price.toFixed(2)}</span>
                    <p>{produto.description}</p>
                    <hr></hr>
                    Filtro 1
                    <hr></hr>
                    Filtro 2
                    <hr></hr>
                    quantidade
                    botão add cart
                    <div className="flex flex-row text-black gap-4">
                        <div className="text-3xl flex-grow-0">
                            <button className="bg-zinc-300 px-4 py-4 rounded-l-full">-</button>
                            <input className="bg-zinc-300 px-4 py-4 text-center remove-arrow w-20" type="number" defaultValue="1"></input>
                            <button className="bg-zinc-300 px-4 py-4 rounded-r-full">+</button>
                        </div>
                        <button className="w-auto flex-grow py-4 px-8 rounded-full bg-black text-white">Adicionar ao carrinho</button>
                    </div>
                </section>
            </div>

            <div>
                <div>
                    detalhes do produto
                </div>
                <div>
                    classificações
                </div>
                <div>
                    FAQ
                </div>
            </div>


        </article>
    )
}
