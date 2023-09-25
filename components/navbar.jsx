import { Search, ShoppingCart, UserCircle2 } from 'lucide-react'
import Link from 'next/link'
import { SearchProduct } from './SearchProduct'
import Image from 'next/image'

export default function Navbar() {
	return (
		<header className="mx-auto flex justify-between items-center gap-10 max-w-7xl w-full text-zinc-900 border-b border-b-zinc-100 py-5">
				<Image src="/static/images/logo.png" alt="me" width="64" height="64" />
				<h1 className="font-primary font-black text-3xl">SHOPIC</h1>
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
			<SearchProduct placeholder="Busque por produto" />
			<div className="flex items-center gap-4">
				<div>
					<ShoppingCart className="text-xl cursor-pointer" />
				</div>
				<div>
					<UserCircle2 className="text-xl cursor-pointer" />
				</div>
			</div>
		</header>
	)
}
