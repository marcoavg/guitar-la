import { useEffect, useState } from "react";
import type { MenuItemType, OrderItem } from "../types";

export default function useOrder() {

    const [order, setOrder] = useState<OrderItem[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [tip, setTip] = useState<number>(0);

    const addItem = (item: MenuItemType) => {
        const existingItemIndex = order.findIndex(orderItem => orderItem.id === item.id);
        if (existingItemIndex >= 0) {
            const newOrder = order.map((orderItem, index) => {
                if (index === existingItemIndex) {
                    return { ...orderItem, quantity: orderItem.quantity + 1 };
                }
                return orderItem;
            });
            setOrder(newOrder);
        } else {
            setOrder((prev) => [...prev, { ...item, quantity: 1 }]);
        }
        

    };

    const removeItem = (id: number) => {
        setOrder((prev) => prev.filter(item => item.id !== id));
    }; 

    useEffect(() => {
        const newTotal = order.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(newTotal);
        console.log(order);
    }, [order]);

    return {
        addItem,
        order,
        total,
        tip,
        setTip,
        removeItem
    };
}