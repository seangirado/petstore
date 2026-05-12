import { WishlistItem, ErrorResponse } from '../services/petService';
/**
 * Custom hook for managing wishlist.
 */
export declare const useWishlist: () => {
    items: WishlistItem[];
    loading: boolean;
    error: ErrorResponse | null;
    addToWishlist: (petId: string) => Promise<void>;
    removeFromWishlist: (wishlistItemId: string) => Promise<void>;
    clearWishlist: () => Promise<void>;
    itemCount: number;
    isInWishlist: (petId: string) => boolean;
    wishlistKey: string;
};
//# sourceMappingURL=useWishlist.d.ts.map