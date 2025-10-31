import { useState, useEffect, useMemo } from 'react'
import { db } from '../data/db'
import type { CartItem } from '../types'

export const useCart = () => { 

    const initialCart= (): CartItem[] =>{
        const storedCart = localStorage.getItem('cart')
        return storedCart ? JSON.parse(storedCart) : []
    }
    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item: CartItem) {
        const alreadyInCart = cart.findIndex((guitar: CartItem) => guitar.id === item.id)
        if (alreadyInCart >= 0) {
            const newCart = cart.map((guitar: CartItem) => {
                if (guitar.id === item.id && guitar.quantity! + 1 <= 5) {
                    return {
                        ...guitar,
                        quantity: guitar.quantity! + 1
                    }
                }
                return guitar
            })
            setCart(newCart)
            return
        }else{
            item.quantity = 1
            setCart([...cart, item])
        }
    }

    function removeFromCart(item: CartItem) {
        const newCart = cart.filter((guitar: CartItem) => guitar.id !== item.id)
        setCart(newCart)
    }

    function clearCart() {
        setCart([])
    }

    function updateCartItemQuantity(item: CartItem, quantity: number) {
        const newCart = cart.map((guitar: CartItem) => {
            if (guitar.id === item.id && guitar.quantity! + quantity > 0 && guitar.quantity! + quantity <= 5) {
                return {
                    ...guitar,
                    quantity: guitar.quantity! + quantity
                }
            }
            return guitar
        })
        setCart(newCart)
    }

    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo(() => cart.reduce((acc: number, item: CartItem) => acc + item.price * item.quantity!, 0), [cart]);

    return {
        data,
        cart,
        addToCart,  
        removeFromCart,
        clearCart,
        updateCartItemQuantity,
        isEmpty,
        cartTotal
    }
}
