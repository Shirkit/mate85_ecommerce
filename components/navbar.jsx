import Link from "next/link";


export default function Navbar() {
  return (
    <div>
      <h1>SHOP.CO</h1>
      <Link href = "/">Shop</Link>
      <Link href = "/">Em Promoção</Link>
      <Link href = "/">Novos produtos</Link>
      <Link href= "/">Marcas</Link>
    </div>
  )
}
