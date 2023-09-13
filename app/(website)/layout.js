import './website.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Breadcrumbs from "@marketsystems/nextjs13-appdir-breadcrumbs"
import "@marketsystems/nextjs13-appdir-breadcrumbs/dist/styles.css"
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Shop.CO',
	description: 'descricao',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Navbar />
				<Breadcrumbs useDefaultStyle rootLabel="Home" />
				{children}
				<Footer />
			</body>
		</html>
	)
}
