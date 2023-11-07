'use client'

import { Search, ShoppingCart, UserCircle2 } from 'lucide-react'
import Link from 'next/link'
import { SearchProduct } from './SearchProduct'
import Image from 'next/image'
import { useEffect, useState, useTransition } from 'react'
import { getNameDB } from '@/app/(website)/actionsSettings'
import NavbarCart from './navbarCart'

export default function Navbar() {
	const [name, setName] = useState('')
	const [isPending, startTransition] = useTransition()

	async function getName() {
		if (!isPending)
			startTransition(async () => {
				const response = await getNameDB()
				if (response)
					setName(response.value)
			})
	}

	useEffect(() => {
		getName()
	}, [])
	return (
		<header className="flex justify-between items-center gap-10 max-w-7xl w-full text-zinc-900 border-b border-b-zinc-100 py-5 px-8">
			<Link href="/" className='flex items-center'>
				<Image src="/static/images/logo.png" alt="me" width="64" height="78" className='max-w-min' />
				<h1 className="font-primary font-black text-3xl">
					{name ? name : 'SHOPIC'}
				</h1>
			</Link>
			<nav className="flex flex-row gap-6">
				<Link
					href="/shop"
					className="w-max hover:opacity-60 transition-opacity"
				>
					Shop
				</Link>
				<Link
					href="/"
					className="w-max hover:opacity-60 transition-opacity"
				>
					Em Promoção
				</Link>
				<Link
					href="/"
					className="w-max hover:opacity-60 transition-opacity"
				>
					Novos produtos
				</Link>
				<Link
					href="/"
					className="w-max hover:opacity-60 transition-opacity"
				>
					Marcas
				</Link>
			</nav>
			<SearchProduct placeholder="Busque por produto" />
			<div className="flex items-center gap-4">
				<div className="relative">
					<Link href="/cart">
						<ShoppingCart className="text-xl cursor-pointer" />
						<NavbarCart></NavbarCart>
					</Link>
				</div>
				<div>
				<Link href="/user">
					<UserCircle2 className="text-xl cursor-pointer" />
				</Link>
				</div>
			</div>
		</header>
	)
}
