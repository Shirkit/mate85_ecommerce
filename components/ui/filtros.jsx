'use client'

import { useEffect, useState } from 'react'
import { ToggleGroup } from './toggleGroup'
import { useCart } from '@/components/CartContext'
import { toast } from 'react-toastify'

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

	const { addToCart } = useCart()
	function handleClick() {
		if (!sku) toast.error('Selecione um tamanho primeiro')
		else addToCart(sku, produto, qty)
	}

	const [qty, setQty] = useState(1)

	function addQty() {
		setQty(qty + 1)
	}

	function decQty() {
		if (qty !== 0) {
			setQty(qty - 1)
		}
	}

	return (
		<>
			<div className="flex flex-col gap-4">
				<h3>Escolha o tamanho</h3>
				<ToggleGroup.Root
					value={sku}
					onChange={setSku}
					className="flex gap-4"
				>
					{produto.product_item.map((item, index) => {
						return (
							<ToggleGroup.Button
								key={item.sku}
								value={item.sku}
                                onClick={() => setEnable(item.amount < 1)}
								className="px-6 rounded-full"
							>
								{item.size}
							</ToggleGroup.Button>
						)
					})}
				</ToggleGroup.Root>
			</div>
			{price && (
				<span className="text-2xl">
					Preço: R${(price * qty).toFixed(2)}
				</span>
			)}
			<hr className="my-4"></hr>
			<div className="flex flex-row text-black gap-4">
				<div className="text-xl flex-grow-0">
					<button
						onClick={decQty}
						className="bg-zinc-300 px-4 py-2 rounded-l-full"
					>
						-
					</button>
					<input
						className="bg-zinc-300 px-4 py-2 text-center remove-arrow w-20"
						type="number"
						disabled
						value={qty}
					></input>
					<button
						onClick={addQty}
						className="bg-zinc-300 px-4 py-2 rounded-r-full"
					>
						+
					</button>
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
