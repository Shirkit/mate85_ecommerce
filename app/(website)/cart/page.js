"use client"

import { CartItem } from "@/components/ui/cartItem"
import { useCart } from "../CartContext"

export default function Cart() {
    const { cartItems, cartTotal } = useCart()

    return (
        <div className="max-w-7xl mx-auto mt-10">
            <h1 className="mb-10 text-3xl">Carrinho</h1>
            {(cartItems.length === 0) ? (
                <h2>Seu carrinho está vazio</h2>
            ) : (
                <>
                    <div className="grid grid-cols-5 gap-5">
                    <div className="text-sm font-bold border-b pb-2">Imagem</div>
                    <div className="text-sm font-bold border-b pb-2">Nome do Produto</div>
                    <div className="text-sm font-bold border-b pb-2">Quantidade</div>
                    <div className="text-sm font-bold border-b pb-2">Preço</div>
                    <div className="text-sm font-bold border-b pb-2">Subtotal</div>
                        {cartItems.map((item) => (
                            <CartItem item={item} />
                        ))}
                    </div>
                    <div className="w-full mt-5">
                        Total: R${cartTotal.toFixed(2)}
                    </div>
                    <button>Checkout</button>
                </>
            )

            }
        </div>
    )
}