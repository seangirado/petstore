import { AxiosInstance } from 'axios';
/**
 * Pet API client for frontend communication with backend.
 */
declare const apiClient: AxiosInstance;
export interface Pet {
    id: string;
    name: string;
    type: 'DOG' | 'CAT' | 'BIRD' | 'FISH';
    breed: string;
    ageMonths: number;
    price: number;
    description: string;
    available: boolean;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}
export interface PetRequest {
    name: string;
    type: 'DOG' | 'CAT' | 'BIRD' | 'FISH';
    breed: string;
    ageMonths: number;
    price: number;
    description: string;
    available: boolean;
    imageUrl: string;
}
export interface CartItem {
    id: string;
    petId: string;
    cartKey: string;
    addedAt: string;
    pet?: Pet;
}
export interface WishlistItem {
    id: string;
    petId: string;
    wishlistKey: string;
    addedAt: string;
    pet?: Pet;
}
export interface ErrorResponse {
    error: string;
    code: string;
    timestamp: string;
    path: string;
    status: number;
}
/**
 * Pet API endpoints
 */
export declare const petService: {
    /**
     * Get all pets
     */
    getAllPets: () => Promise<Pet[]>;
    /**
     * Get a pet by ID
     */
    getPetById: (petId: string) => Promise<Pet>;
    /**
     * Get filtered pets
     */
    getFilteredPets: (params: {
        type?: string;
        minPrice?: number;
        maxPrice?: number;
        minAge?: number;
        maxAge?: number;
        available?: boolean;
        search?: string;
    }) => Promise<Pet[]>;
    /**
     * Search pets by term
     */
    searchPets: (searchTerm: string) => Promise<Pet[]>;
    createPet: (payload: PetRequest) => Promise<Pet>;
    updatePet: (petId: string, payload: PetRequest) => Promise<Pet>;
    deletePet: (petId: string) => Promise<void>;
};
/**
 * Cart API endpoints
 */
export declare const cartService: {
    /**
     * Add a pet to the cart
     */
    addToCart: (petId: string, cartKey: string) => Promise<CartItem>;
    /**
     * Get all items in the cart
     */
    getCart: (cartKey: string) => Promise<CartItem[]>;
    /**
     * Remove an item from the cart
     */
    removeFromCart: (cartItemId: string) => Promise<void>;
    /**
     * Clear the entire cart
     */
    clearCart: (cartKey: string) => Promise<void>;
};
/**
 * Wishlist API endpoints
 */
export declare const wishlistService: {
    /**
     * Add a pet to the wishlist
     */
    addToWishlist: (petId: string, wishlistKey: string) => Promise<WishlistItem>;
    /**
     * Get all items in the wishlist
     */
    getWishlist: (wishlistKey: string) => Promise<WishlistItem[]>;
    /**
     * Remove an item from the wishlist
     */
    removeFromWishlist: (wishlistItemId: string) => Promise<void>;
    /**
     * Clear the entire wishlist
     */
    clearWishlist: (wishlistKey: string) => Promise<void>;
};
export default apiClient;
//# sourceMappingURL=petService.d.ts.map