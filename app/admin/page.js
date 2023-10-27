import Image from 'next/image'
import Card from '@/components/ui/Card'
import { prisma } from '@/utils/prisma'
import { getHidePricesDB } from '../(website)/actionsSettings'

export default async function Home() {
  const hidePrices = await getHidePricesDB()

	return (
		<main>
			<div className="min-h-screen flex flex-col items-center justify-start">
				<div className="text-center font-bold text-xl mb-4">
					DASHBOARD
				</div>

			</div>
		</main>
	)
}
