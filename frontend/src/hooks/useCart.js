import { useState, useCallback, useEffect } from 'react';
import { cartService } from '../services/petService';
/**
 * Generate a unique cart key for anonymous carts.
 */
const generateCartKey = () => {
    return `cart_${crypto.randomUUID()}`;
};
/**
 * Get or create cart key from localStorage.
 */
const getOrCreateCartKey = () => {
    let cartKey = localStorage.getItem('petstore_cart_key');
    if (!cartKey) {
        cartKey = generateCartKey();
        localStorage.setItem('petstore_cart_key', cartKey);
    }
    return cartKey;
};
/**
 * Custom hook for managing shopping cart.
 */
export const useCart = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cartKey, setCartKey] = useState('');
    // Initialize cart key on mount
    useEffect(() => {
        setCartKey(getOrCreateCartKey());
    }, []);
    // Fetch cart items
    const fetchCart = useCallback(async (key) => {
        if (!key)
            return;
        setLoading(true);
        setError(null);
        try {
            const data = await cartService.getCart(key);
            setItems(data);
        }
        catch (err) {
            setError(err.response?.data || { error: 'Failed to fetch cart', code: 'FETCH_ERROR' });
        }
        finally {
            setLoading(false);
        }
    }, []);
    // Fetch cart when cartKey changes
    useEffect(() => {
        if (cartKey) {
            fetchCart(cartKey);
        }
    }, [cartKey, fetchCart]);
    const addToCart = useCallback(async (petId) => {
        if (!cartKey)
            return;
        setError(null);
        try {
            const newItem = await cartService.addToCart(petId, cartKey);
            setItems((prev) => {
                const existing = prev.find((item) => item.petId === petId);
                if (existing) {
                    return prev.map((item) => (item.petId === petId ? newItem : item));
                }
                return [...prev, newItem];
            });
        }
        catch (err) {
            setError(err.response?.data || { error: 'Failed to add to cart', code: 'ADD_ERROR' });
        }
    }, [cartKey]);
    const removeFromCart = useCallback(async (cartItemId) => {
        setError(null);
        try {
            await cartService.removeFromCart(cartItemId);
            setItems((prev) => prev.filter((item) => item.id !== cartItemId));
        }
        catch (err) {
            setError(err.response?.data || { error: 'Failed to remove from cart', code: 'REMOVE_ERROR' });
        }
    }, []);
    const clearCart = useCallback(async () => {
        if (!cartKey)
            return;
        setError(null);
        try {
            await cartService.clearCart(cartKey);
            setItems([]);
        }
        catch (err) {
            setError(err.response?.data || { error: 'Failed to clear cart', code: 'CLEAR_ERROR' });
        }
    }, [cartKey]);
    const itemCount = items.length;
    const totalPrice = items.reduce((sum, item) => sum + (item.pet?.price || 0), 0);
    return {
        items,
        loading,
        error,
        addToCart,
        removeFromCart,
        clearCart,
        itemCount,
        totalPrice,
        cartKey,
    };
};
//# sourceMappingURL=useCart.js.map