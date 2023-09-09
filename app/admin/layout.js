import AdminNavbar from '@/components/admin/navbar'
import './admin.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Shop.CO',
	description: 'descricao',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className + " min-h-screen flex flex-col"}>
				<header className="items-center text-zinc-100 mx-auto flex justify-between w-full bg-zinc-900 p-1 pl-3">
					<Link href="/admin" className="w-max">
						<h1 className="font-primary font-black text-3xl">SHOP.CO</h1>
					</Link>
				</header>
				<div className="flex flex-row flex-grow bg-zinc-800">
					<AdminNavbar></AdminNavbar>
					{children}
				</div>
			</body>
		</html>
	)
}
