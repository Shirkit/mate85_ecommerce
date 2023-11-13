import AdminNavbar from '@/components/admin/navbar'
import './admin.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })
import { getServerSession } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'


export const metadata = {
	title: 'ShopIC',
	description: 'descricao',
}

export default async function RootLayout({ children }) {
	const session = await getServerSession()
	if (!session)
		redirect("/user")
	return (
		<html lang="en">
			<body className={inter.className + ' min-h-screen flex flex-col'}>
				<div className="flex flex-row flex-grow bg-neutral-100">
					<AdminNavbar></AdminNavbar>
					<div className="p-4">
						{children}
					</div>
				</div>
			</body>
		</html>
	)
}
