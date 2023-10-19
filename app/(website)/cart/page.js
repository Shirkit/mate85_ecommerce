"use client"

import { CartItem } from "@/components/ui/cartItem"
import { useCart } from "@/components/CartContext"
import Link from "next/link"

export default function Cart() {
    const { cartItems, cartTotal } = useCart()

    return (
        <div className="max-w-screen-xl mx-auto mt-5 mb-5 grid grid-cols-5">
            <h1 className="mb-2 text-3xl col-span-5">Carrinho</h1>
            {(cartItems.length === 0) ? (
                <h2>Seu carrinho está vazio</h2>
            ) : (
                <>
                    <div className="grid [grid-template-columns:subgrid] col-span-5">
                        <div className="text-sm text-center font-bold border-b pb-2">Imagem</div>
                        <div className="text-sm text-center font-bold border-b pb-2">Nome do Produto</div>
                        <div className="text-sm text-center font-bold border-b pb-2">Quantidade</div>
                        <div className="text-sm text-center font-bold border-b pb-2">Preço</div>
                        <div className="text-sm text-center font-bold border-b pb-2">Subtotal</div>
                    </div>
                    <div className="grid [grid-template-columns:subgrid] col-span-5 gap-5 my-5">
                        {cartItems.map((item) => (
                            <CartItem key={item.item.sku} item={item} />
                        ))}
                    </div>

                    <span className="col-span-3"></span>
                    <div className="grid [grid-template-columns:subgrid] text-center col-span-2 bg-zinc-50 p-5">
                        <span className="">Total:</span>
                        <span>R${cartTotal.toFixed(2)}</span>
                    </div>
                    <span className="col-span-3"></span>
                    <div className="col-span-2 bg-zinc-50 p-5">
                        <Link href="/order" className="col-span-2">
                            <button className="bg-zinc-300 w-full rounded-full py-2 px-4">Finalizar compra</button>
                        </Link>
                    </div>
                </>
            )

            }
        </div>
    )
}