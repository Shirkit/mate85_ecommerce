import Image from 'next/image'
import Card from '@/components/ui/Card'
import { prisma } from '@/utils/prisma'
import Link from 'next/link';

export default async function Home() {
	let products = [
		{ id: 1, name: 'seila', price: 1 },
		{ id: 2, name: 'seila2', price: 2 },
		{ id: 3, name: 'seila3', price: 3 },
		{ id: 4, name: 'seila4', price: 5 },
	]

	products = await prisma.product.findMany();

	return (
		<main>
			<div className="min-h-screen flex flex-col items-center justify-start py-8 ">
				<div className="text-center font-bold text-xl mb-4">
					NOVOS PRODUTOS
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{products.map((product) => {
						return (
							<Link href={"/product/" + product.id}>
								<Card
									key={product.id}
									name={product.name}
									image={`https://picsum.photos/id/${product.id}/200`}
									price={product.price}
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
