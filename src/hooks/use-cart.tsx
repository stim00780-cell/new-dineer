'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { demoCart } from '@/lib/data';

interface CartContextType {
    cart: { [key: string]: number };
    addToCart: (itemId: string) => void;
    removeFromCart: (itemId: string) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<{ [key: string]: number }>({});
    
    useEffect(() => {
        // Initialize cart with demo data for demo purposes
        setCart(demoCart);
    }, []);

    const addToCart = (itemId: string) => {
        setCart(prevCart => ({
            ...prevCart,
            [itemId]: (prevCart[itemId] || 0) + 1,
        }));
    };

    const removeFromCart = (itemId: string) => {
        setCart(prevCart => {
            const newCart = { ...prevCart };
            if (newCart[itemId] > 1) {
                newCart[itemId] -= 1;
            } else {
                delete newCart[itemId];
            }
            return newCart;
        });
    };

    const clearCart = () => {
        setCart({});
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
