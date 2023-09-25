import './website.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'ShopIC',
	description: 'descricao',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	)
}
