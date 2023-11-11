import Image from 'next/image'
import Card from '@/components/ui/Card'
import { prisma } from '@/utils/prisma'
import Link from 'next/link'
import { getHidePricesDB } from './actionsSettings'

export default async function Home() {
	const products = await prisma.product.findMany()
	const hidePrices = await getHidePricesDB()

	return (
		<main className="px-8 w-full">
			<div className="min-h-screen flex flex-col items-center justify-start py-16 gap-16">
				<div className="text-center font-black text-5xl">
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-8">
					{products.map((product) => {
						return (
							<Link key={product.id} href={'/product/' + product.id}>
								<Card
									key={product.id}
									name={product.name}
									image={`https://picsum.photos/id/${product.id}/200`}
									price={hidePrices ? null : product.price}
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
