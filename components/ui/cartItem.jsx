"use client"

import { useCart } from "@/components/CartContext";
import Image from "next/image";
import { Fragment, useState } from "react";

export const CartItem = ({ item }) => {
  const { removeFromCart, updateCartItemQuantity } = useCart();
  const [qty, setQty] = useState(item.quantity)

  const handleQuantityChange = (qty) => {
    const quantity = Number(qty);
    if (quantity >= 0) {
      updateCartItemQuantity(item.product.id, quantity);
    }
  };

  const handleRemoveClick = () => {
    removeFromCart(item.product.id);
  };

  function addQty() {
    handleQuantityChange(qty + 1)
    setQty(qty + 1)

  }

  function decQty() {
    if (qty > 0) {
      handleQuantityChange(qty - 1)
      setQty(qty - 1)
    }
  }

  return (
    <Fragment key={item.product.sku}>
      <div className="flex justify-center"><Image width={100} height={100} src={`https://picsum.photos/id/${item.product.id}/100`}></Image></div>
      <div className="flex justify-center items-center">
        <div>
          <div className="inline-block">{item.product.name}</div><br />
          <div className="inline-block text-xs">{item.product.sku}</div><br />
          <div className="inline-block text-xs text-red-400 cursor-pointer" onClick={handleRemoveClick}>Remover</div>
        </div>
      </div>
      <div className="text-lg flex-grow-0 flex flex-col justify-center items-center">
        <div className="">
          <button onClick={decQty} className="bg-zinc-300 px-2 py-1 rounded-l-full">-</button>
          <input className="bg-zinc-300 px-1 py-1 text-center remove-arrow w-10" type="number" disabled value={qty}></input>
          <button onClick={addQty} className="bg-zinc-300 px-2 py-1 rounded-r-full">+</button>
        </div>
      </div>
      <div className="text-center self-center">R${item.product.price.toFixed(2)}</div>
      <div className="text-center self-center">R${(item.product.price * qty).toFixed(2)}</div>
    </Fragment>
  )
};
