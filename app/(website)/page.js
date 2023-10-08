import Image from 'next/image'
import Card from '@/components/ui/Card'
import { prisma } from '@/utils/prisma'
import Link from 'next/link'
import { getHidePricesDB } from './actionsSettings'

export default async function Home() {
	const products = await prisma.product.findMany()
	const hidePrices = await getHidePricesDB()

	return (
		<main>
			<div className="min-h-screen flex flex-col items-center justify-start py-8 ">
				<div className="text-center font-bold text-xl mb-4">
					NOVOS PRODUTOS
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{products.map((product) => {
						return (
							<Link key={product.id} href={'/product/' + product.id}>
								<Card
									key={product.id}
									name={product.name}
									image={`https://picsum.photos/id/${product.id}/200`}
									price={hidePrices ? product.price : 'R$ **, *'}
									rating={product.rating}
								/>
							</Link>
						)
					})}
				</div>
			</div>
		</main>
	)
}
