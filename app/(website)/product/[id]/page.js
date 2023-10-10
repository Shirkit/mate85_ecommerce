
import RenderStars from "@/components/ui/stars"
import Carousel from "@/components/ui/carousel"
import ReviewCard from "@/components/ui/review"
import Link from "next/link"
import { prisma } from "@/utils/prisma"
import AddReview from "@/components/ui/addReview"
import Filtros from "@/components/ui/filtros"

export default async function Produto({ params, searchParams }) {
    const page = searchParams.page ? parseInt(searchParams.page) : 1
    const take = 6
    let pages = await prisma.review.count({
        where: {
            products_id: parseInt(params.id)
        }
    })

    // ! Isso não está funcionando por algum motivo, quando passa pra segunda página, ele está repetindo alguns dos campos da primeira página
    // TODO procurar entender porque isso acontece

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
            },
            product_item: {}
        }
    })

    let maxPrice = -1, minPrice = Number.MAX_SAFE_INTEGER
    produto.product_item.forEach(item => {
        maxPrice = Math.max(maxPrice, item.price)
        minPrice = Math.min(minPrice, item.price)
    });

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
                    <span className="text-lg">
                        {(minPrice != maxPrice) ?
                            <>R${minPrice.toFixed(2)} - R${maxPrice.toFixed(2)}</>
                            : <>R${minPrice.toFixed(2)}</>
                        }
                    </span>
                    <p>{produto.description}</p>
                    <hr></hr>
                    <Filtros produto={produto}></Filtros>
                </section>
            </div>

            <div>
                <h2>Todas as Avaliações</h2>
                <div className="grid grid-cols-2 gap-8 grid-flow-row">
                    {produto.reviews.map((review, index) => {
                        return <ReviewCard key={review.id} index={index} rating={review.rating} text={review.text} title={review.title} author={review.user.name}></ReviewCard>
                    })}
                    {(produto.reviews.length % 2 != 0) && <div></div>}
                    <PaginationButton className="outline outline-2 outline-zinc-200 justify-self-start p-4 rounded-lg shadow-lg hover:bg-zinc-50" text="Avaliações anteriores" disabled={page <= 1} link={"/product/" + params.id + "/?page=" + (page - 1)}></PaginationButton>
                    <PaginationButton className="outline outline-2 outline-zinc-200 justify-self-end p-4 rounded-lg shadow-lg hover:bg-zinc-50" text="Próximas avaliações" disabled={page >= pages} link={"/product/" + params.id + "/?page=" + (page + 1)} ></PaginationButton>
                </div>
                <AddReview productId={parseInt(params.id)}></AddReview>
            </div>

        </article>
    )

    function PaginationButton({ text, link, disabled = false, className = "" }) {
        if (!disabled)
            return <Link className={className} href={link}>{ActualBtn(text, disabled)}</Link>
        else
            return ActualBtn(text, disabled, className)
    }

    function ActualBtn(text, disabled, className = "") {
        return <button className={className + (disabled ? " bg-zinc-50" : " underline")} type="button" disabled={disabled}>{text}</button>
    }
}