import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function StockCartprovider({ children }) {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => {
            const productIndex = prevCart.findIndex(
                (product) => product.id === productId
            );
            if (productIndex >= 0) {
                const newCart = [...prevCart];
                newCart.splice(productIndex, 1);
                return newCart;
            }
            return prevCart;
        });
    };

    const emptyCart = () => {
        setCart([]);
    };

    const calculateTotalPrice = () => {
        return cart.reduce(
            (total, product) => total + Number(product.price),
            0
        );
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                emptyCart,
                calculateTotalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export { CartContext };
