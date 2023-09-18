import { prisma } from "@/utils/prisma"
import RenderStars, { renderStars } from "@/components/ui/stars"
import Carousel from "@/components/ui/carousel"
import Quantity from "@/components/ui/quantity"
import { CheckCircle2 } from "lucide-react"

export default async function Produto({ params }) {
    const produto = await prisma.product.findFirst({ where: { id: parseInt(params.id) }, include: { reviews: { include: { user: {} } } } })

    return (
        <article className="max-w-7xl mx-auto my-20">

            <div className="flex flex-row gap-8">
                <div className="w-1/2">
                    <Carousel images={[
                        `https://picsum.photos/id/${produto.id}/200`,
                        `https://picsum.photos/id/${Math.round(Math.random() * 1084)}/200`,
                        `https://picsum.photos/id/${Math.round(Math.random() * 1084)}/200`,
                        `https://picsum.photos/id/${Math.round(Math.random() * 1084)}/200`,
                        `https://picsum.photos/id/${Math.round(Math.random() * 1084)}/200`,
                        `https://picsum.photos/id/${Math.round(Math.random() * 1084)}/200`
                    ]} ></Carousel>

                </div>

                <section className="flex flex-col w-1/2 gap-4">
                    <h1 className="text-4xl">{produto.name}</h1>
                    <RenderStars rating={produto.rating}></RenderStars>
                    {/* <span className="text-2xl">R${produto.price.toFixed(2)}</span> */}
                    <p>{produto.description}</p>
                    <hr></hr>
                    Filtro 1
                    <hr></hr>
                    Filtro 2
                    <hr></hr>
                    <div className="flex flex-row text-black gap-4">
                        <Quantity></Quantity>
                        <button className="w-auto flex-grow py-4 px-8 rounded-full bg-black text-white">Adicionar ao carrinho</button>
                    </div>
                </section>
            </div>

            <div>
                <h2>Todas as Avaliações</h2>
                <div className="grid grid-cols-2 gap-8 grid-flow-row">
                    {produto.reviews.map((review, index) => {
                        return (
                            <div key={index} className="p-4 gap-y-2 flex flex-col border border-zinc-200 rounded-3xl">
                                <RenderStars rating={review.rating} hideNumber={true}></RenderStars>
                                <h3>{review.title}</h3>
                                <span className="flex flex-row gap-x-1">
                                    <h4>{review.user.name}</h4>
                                    <CheckCircle2 fill="green" stroke="white"></CheckCircle2>
                                </span>
                                <p>{review.text}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

        </article>
    )
}
