import Link from "next/link";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-semibold">SHOP.CO</h1>
        <div className="flex items-center space-x-4">
          <nav className="space-x-4">
            <Link href="/">Shop</Link>
            <Link href="/">Em Promoção</Link>
            <Link href="/">Novos produtos</Link>
            <Link href="/">Marcas</Link>
          </nav>
          <div className="relative">
            <input
              type="text"
              placeholder="Busque por Produto"
              className="border rounded-lg px-3 py-1 focus:outline-none focus:ring focus:border-blue-300"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <FaSearch className="text-gray-400" />
            </div>
          </div>
          <div>
            <FaShoppingCart className="text-white text-xl cursor-pointer" />
          </div>
          <div>
            <FaUser className="text-white text-xl cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}
