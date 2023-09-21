import './website.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Shop.IC',
	description: 'descricao',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Navbar />
				<ToastContainer></ToastContainer>
				{children}
				<Footer />
			</body>
		</html>
	)
}
