"use client"

import { useEffect, useState } from "react"
import { ToggleGroup } from "./toggleGroup"
import { useCart } from "@/components/CartContext";
import { toast } from "react-toastify";

export default function Filtros({ produto }) {

    const [sku, setSku] = useState()
    const [price, setPrice] = useState()
    const [enable, setEnable] = useState()

    useEffect(() => {
        for (let i = 0; i < produto.product_item.length; i++) {
            if (produto.product_item[i].sku == sku)
                setPrice(produto.product_item[i].price)
        }
    }, [sku])

    const { addToCart } = useCart();
    function handleClick() {
        if (!sku)
            toast.error("Selecione um tamanho primeiro")
        else
            addToCart(sku, produto, qty);
    }

    const [qty, setQty] = useState(1)

    function addQty() {
        setQty(qty + 1)
    }

    function decQty() {
        setQty(qty - 1)
    }

    return (
        <>
            <p>Tamanho:</p>
            <ToggleGroup.Root value={sku} onChange={setSku}>
                {produto.product_item.map((item, index) => {
                    return <ToggleGroup.Button key={item.sku} value={item.sku} onClick={() => setEnable(item.amount < 1)}> {item.size} </ToggleGroup.Button>     
                })}
            </ToggleGroup.Root>
            {price && (
                <span className="text-2xl">Preço: R${(price * qty).toFixed(2)}</span>
            )}
            <hr></hr>
            <div className="flex flex-row text-black gap-4">
                <div className="text-3xl flex-grow-0">
                    <button onClick={decQty} className="bg-zinc-300 px-4 py-4 rounded-l-full">-</button>
                    <input className="bg-zinc-300 px-4 py-4 text-center remove-arrow w-20" type="number" disabled value={qty}></input>
                    <button onClick={addQty} className="bg-zinc-300 px-4 py-4 rounded-r-full">+</button>
                </div>
                <button onClick={handleClick} disabled={enable ? true : false} className="w-auto flex-grow py-4 px-8 rounded-full bg-black text-white"                >
                    {enable && (
                        <>
                            Tamanho não disponível
                        </>
                    )}
                    {!enable && (
                        <>
                           Adicionar ao carrinho
                        </>
                    )}
                    
                </button>
            </div>
        </>
    )
}
