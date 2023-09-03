import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-semibold">SHOP.CO</h1>
        <nav className="space-x-4">
          <Link href="/">Shop</Link>
          <Link href="/">Em Promoção</Link>
          <Link href="/">Novos produtos</Link>
          <Link href="/">Marcas</Link>
        </nav>
      </div>
    </div>
  );
}
