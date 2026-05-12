import { CartItem, ErrorResponse } from '../services/petService';
/**
 * Custom hook for managing shopping cart.
 */
export declare const useCart: () => {
    items: CartItem[];
    loading: boolean;
    error: ErrorResponse | null;
    addToCart: (petId: string) => Promise<void>;
    removeFromCart: (cartItemId: string) => Promise<void>;
    clearCart: () => Promise<void>;
    itemCount: number;
    totalPrice: number;
    cartKey: string;
};
//# sourceMappingURL=useCart.d.ts.map