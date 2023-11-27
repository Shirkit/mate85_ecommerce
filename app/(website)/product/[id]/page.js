import RenderStars from '@/components/ui/stars'
import Carousel from '@/components/ui/carousel'
import ReviewCard from '@/components/ui/review'
import Link from 'next/link'
import { prisma } from '@/utils/prisma'
import AddReview from '@/components/ui/addReview'
import Filtros from '@/components/ui/filtros'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ref, getDownloadURL, listAll } from "@firebase/storage";
import { storage } from "@/firebase";

export default async function Produto({ params, searchParams }) {
    const page = searchParams.page ? parseInt(searchParams.page) : 1
    const take = 6
    let pages = await prisma.review.count({
        where: {
            products_id: parseInt(params.id)
        }
    })

	const getAllImageURLs = async () => {
		const folderRef = ref(storage, `${params.id}`);
		const images = await listAll(folderRef);
		
		const imageURLs = await Promise.all(
		  images.items.map(async (imageRef) => {
			return getDownloadURL(imageRef);
		  })
		);
		  
		return imageURLs;
	};

	const imageURLs = await getAllImageURLs();

    pages = Math.ceil(pages / take)
    const produto = await prisma.product.findFirst({
        where: {
            id: parseInt(params.id)
        }, include: {
            reviews: {
                take: take,
                skip: (page - 1) * take,
                orderBy: [{
                    rating: 'desc'
                }, {
                    id: 'desc'
                }],
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
		<article className="max-w-7xl w-full py-16 px-8 flex flex-col gap-16">
			<div className="flex flex-row gap-8">
				<div className="w-1/2">
				<Carousel
						images={imageURLs.length > 0 ? imageURLs : [
						"/static/images/default-image2.png",
						"/static/images/default-image2.png",
						"/static/images/default-image3.png",
						"/static/images/default-image1.png",
						"/static/images/default-image2.png",
						"/static/images/default-image3.png",
						]}
					/>
				</div>

				<section className="flex flex-col w-1/2 gap-4">
					<h1 className="text-4xl">{produto.name}</h1>
					<RenderStars rating={produto.rating}></RenderStars>
					<span className="text-lg">
						{minPrice != maxPrice ? (
							<>
								R${minPrice.toFixed(2)} - R${maxPrice.toFixed(2)}
							</>
						) : (
							<>R${minPrice.toFixed(2)}</>
						)}
					</span>
					<p>{produto.description}</p>
					<hr className="my-4"></hr>
					<Filtros produto={produto}></Filtros>
				</section>
			</div>

			<div id='reviews' className="flex flex-col gap-8">
				<h2 className="font-bold text-2xl">
					Todas as Avaliações{' '}
					{/*<span className="font-normal text-xl opacity-50">
						({produto.reviews.length})
						</span>*/}
				</h2>
				<div className="grid grid-cols-2 gap-8 grid-flow-row">
					{produto.reviews.map((review, index) => {
						return (
							<ReviewCard
								key={review.id}
								index={index}
								rating={review.rating}
								text={review.text}
								title={review.title}
								author={review.user.name}
							></ReviewCard>
						)
					})}
					{produto.reviews.length % 2 != 0 && <div></div>}
					<ActualBtn
						type="left"
						disabled={page <= 1}
						link={'/product/' + params.id + '/?page=' + (page - 1) + '#reviews'}
					></ActualBtn>
					<ActualBtn
						type="right"
						disabled={page >= pages}
						link={'/product/' + params.id + '/?page=' + (page + 1) + '#reviews'}
					></ActualBtn>
					<AddReview productId={parseInt(params.id)}></AddReview>
				</div>
			</div>
		</article>
	)

	function ActualBtn({ type, disabled, link }) {
		return (
			<Link
				href={link}
				className={`flex border rounded-lg w-max px-4 py-2 bg-black text-white border-black duration-300 ${
					type === 'left' ? 'mr-auto' : 'ml-auto'
				} ${
					disabled
						? 'cursor-not-allowed opacity-70'
						: 'hover:bg-transparent hover:text-black'
				}`}
				disabled={disabled}
			>
				{type === 'left' ? (
					<div className="flex gap-4">
						<ChevronLeft /> Avaliações Anteriores
					</div>
				) : (
					<div className="flex gap-4">
						Próximas Avaliações <ChevronRight />
					</div>
				)}
			</Link>
		)
	}
}
