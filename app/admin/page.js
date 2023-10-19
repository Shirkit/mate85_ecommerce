import Image from 'next/image'
import Card from '@/components/ui/Card'
import { prisma } from '@/utils/prisma'
import { getHidePricesDB } from '../(website)/actionsSettings'

export default async function Home() {
	const products = [
		{ id: 1, name: 'seila', price: 1 },
		{ id: 2, name: 'seila2', price: 2 },
		{ id: 3, name: 'seila3', price: 3 },
		{ id: 4, name: 'seila4', price: 5 },
	]

	// const products = await prisma.product.findMany();
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
							<Card
								key={product.id}
								name={product.name}
								image={`https://picsum.photos/id/${Math.round(
									Math.random() * 1084
								)}/200`}
								price={hidePrices ? null : product.price}
								rating={3}
							/>
						)
					})}
				</div>
			</div>
		</main>
	)
}
