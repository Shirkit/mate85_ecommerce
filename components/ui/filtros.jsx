"use client"

import { useState } from "react"
import { ToggleGroup } from "./toggleGroup"
import AddToCartButton from "./addToCartButton"

export default function Filtros({ produto }) {

    const [sku, setSku] = useState()

    return (
        <>
            <p>Tamanho:</p>
            <ToggleGroup.Root value={sku} onChange={setSku}>
                {produto.product_item.map((item, index) => {
                    return <ToggleGroup.Button key={item.sku} value={item.sku}> {item.size} </ToggleGroup.Button>
                })}
            </ToggleGroup.Root>
            <hr></hr>
            <div className="flex flex-row text-black gap-4">
                <AddToCartButton sku={sku} produto={produto} ></AddToCartButton>
            </div>
        </>
    )
}
