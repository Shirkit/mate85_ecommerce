import './website.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import AuthProvider from '../AuthProvider'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Shop.IC',
	description: 'descricao',
}

export default function RootLayout({ children }) {
	return (
		<AuthProvider>
			<html lang="en">
				<body className={inter.className}>
					<Navbar />
					{children}
					<Footer />
				</body>
			</html>
		</AuthProvider>
	)
}
