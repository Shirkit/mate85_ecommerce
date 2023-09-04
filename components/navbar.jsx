import { Search, ShoppingCart, UserCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function Navbar() {
	return (
		<header className="p-4">
			<div className="container mx-auto flex justify-between items-center gap-10 max-w-7xl text-zinc-900 ">
				<h1 className="font-primary font-black text-3xl">SHOP.CO</h1>
				<nav className="flex flex-row gap-6">
					<Link href="/" className="w-max">
						Shop
					</Link>
					<Link href="/" className="w-max">
						Em Promoção
					</Link>
					<Link href="/" className="w-max">
						Novos produtos
					</Link>
					<Link href="/" className="w-max">
						Marcas
					</Link>
				</nav>
				<div className="relative w-full">
					<input
						type="text"
						placeholder="Busque por produto"
						className="w-full border rounded-full px-12 py-3 bg-zinc-200 focus:outline-none focus:ring focus:border-blue-300"
					/>
					<div className="absolute inset-y-0 left-4 flex items-center">
						<Search className="text-gray-400" />
					</div>
				</div>
				<div className="flex items-center gap-4">
					<div>
						<ShoppingCart className="text-xl cursor-pointer" />
					</div>
					<div>
						<UserCircle2 className="text-xl cursor-pointer" />
					</div>
				</div>
			</div>
		</header>
	)
}
