"use client"

import { prisma } from "@/utils/prisma"
import emblaCarouselReact from "embla-carousel-react"
import { createContext, useContext, useEffect, useState, useTransition } from "react"
import { toast } from "react-toastify"
import { getProductsFromIds } from "./cart/actions"

const CartContext = createContext({
  cartItems: [],
  addToCart: () => { },
  removeFromCart: () => { },
  updateCartItemQuantity: () => { },
  cartTotal: 0,
  cartCount: 0,
})

export const useCart = () => {
  return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    loadCart()
  }, [])

  useEffect(() => {
    if (loaded && !isPending)
      saveCart()
  }, [cartItems])

  const addToCart = (product, qty = 1, silent = false) => {
    const existingCartItemIndex = cartItems.findIndex(
      (item) => item.product.id === product.id
    )
    if (existingCartItemIndex !== -1) {
      const existingCartItem = cartItems[existingCartItemIndex]
      const updatedCartItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + qty,
      }
      const updatedCartItems = [...cartItems]
      updatedCartItems[existingCartItemIndex] = updatedCartItem
      setCartItems(updatedCartItems)
    } else {
      setCartItems([...cartItems, { product, quantity: qty }])
    }
    if (!silent)
      toast.success(qty + "x " + product.name + " adicionado ao carrinho")
  }

  const addAllToCart = (products) => {
    const updatedCartItems = [...cartItems]
    products.forEach((el) => {

      const existingCartItemIndex = cartItems.findIndex(
        (item) => item.product.id === el.product.id
      )
      if (existingCartItemIndex !== -1) {
        const existingCartItem = cartItems[existingCartItemIndex]
        const updatedCartItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + el.quantity,
        }
        updatedCartItems[existingCartItemIndex] = updatedCartItem
      } else {
        updatedCartItems.push({ product: el.product, quantity: el.quantity })
      }
    })
    setCartItems(updatedCartItems)
  }

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.product.id !== productId
    )
    setCartItems(updatedCartItems)
  }

  const updateCartItemQuantity = (productId, quantity) => {
    const existingCartItemIndex = cartItems.findIndex(
      (item) => item.product.id === productId
    )
    if (existingCartItemIndex !== -1) {
      const existingCartItem = cartItems[existingCartItemIndex]
      const updatedCartItem = {
        ...existingCartItem,
        quantity,
      }
      const updatedCartItems = [...cartItems]
      updatedCartItems[existingCartItemIndex] = updatedCartItem
      setCartItems(updatedCartItems)
    }
  }

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  )

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  const saveCart = () => {
    if (localStorage) {
      let obj = []
      cartItems.forEach((el) => {
        obj.push({ id: el.product.id, quantity: el.quantity })
      })
      localStorage.setItem('cartItems', JSON.stringify(obj))
    }
  }

  const loadCart = () => {
    if (localStorage) {
      let loaded = localStorage.getItem('cartItems')
      if (loaded) {
        loaded = JSON.parse(loaded)
        let ids = []
        loaded.forEach((el) => {
          ids.push(el.id)
        })
        if (ids.length > 0) {
          startTransition(() => {
            getProductsFromIds(ids).then((data) => {
              const toAdd = []
              data.forEach((el) => {
                for (let i = 0; i < loaded.length; i++) {
                  if (loaded[i].id == el.id) {
                    console.log(el.id + ' - ' + loaded[i].quantity)
                    toAdd.push({ product: el, quantity: loaded[i].quantity })
                  }
                }
              })
              addAllToCart(toAdd)
            }).finally(() => {
              setLoaded(true)
            })
          })
        } else {
          setLoaded(true)
        }
      } else {
        setLoaded(true)
      }
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
