import { useState, useEffect, useMemo } from 'react'
import { db } from '../data/db'

export const useCart = () => { 

    const initialCart= () =>{
        const storedCart = localStorage.getItem('cart')
        return storedCart ? JSON.parse(storedCart) : []
    }
    const [data, setData] = useState(db)
    const [cart, setCart] = useState(initialCart)

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item) {
        const alreadyInCart = cart.findIndex(guitar => guitar.id === item.id)
        if (alreadyInCart >= 0) {
            const newCart = cart.map(guitar => {
                if (guitar.id === item.id && guitar.quantity + 1 <= 5) {
                    return {
                        ...guitar,
                        quantity: guitar.quantity + 1
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

    function removeFromCart(item) {
        const newCart = cart.filter(guitar => guitar.id !== item.id)
        setCart(newCart)
    }

    function clearCart() {
        setCart([])
    }

    function updateCartItemQuantity(item, quantity) {
        const newCart = cart.map(guitar => {
            if (guitar.id === item.id && guitar.quantity + quantity > 0 && guitar.quantity + quantity <= 5) {
                return {
                    ...guitar,
                    quantity: guitar.quantity + quantity
                }
            }
            return guitar
        })
        setCart(newCart)
    }

    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.quantity, 0), [cart]);

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
