
import RenderStars from "@/components/ui/stars"
import Carousel from "@/components/ui/carousel"
import Quantity from "@/components/ui/quantity"
import ReviewCard from "@/components/ui/review"
import Link from "next/link"
import { prisma } from "@/utils/prisma"

export default async function Produto({ params, searchParams }) {
    const page = searchParams.page ? parseInt(searchParams.page) : 1
    const take = 6
    let pages = await prisma.review.count({
        where: {
            products_id: parseInt(params.id)
        }
    })
    pages = Math.ceil(pages / take)
    const produto = await prisma.product.findFirst({
        where: {
            id: parseInt(params.id)
        }, include: {
            reviews: {
                take: take,
                skip: (page - 1) * take,
                orderBy: {
                    rating: 'desc'
                },
                include: {
                    user: {}
                }
            }
        }
    })

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
                    <span className="text-2xl">R${produto.price.toFixed(2)}</span>
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
                        return <ReviewCard index={index} rating={review.rating} text={review.text} title={review.title} author={review.user.name}></ReviewCard>
                    })}
                    {(page > 1) &&
                        <Link href={"/product/" + params.id + "/?page=" + (page - 1)}>Página anterior</Link>
                    }
                    {(page < pages) &&
                        <Link href={"/product/" + params.id + "/?page=" + (page + 1)}>Próxima página</Link>
                    }
                </div>
            </div>

        </article>
    )
}