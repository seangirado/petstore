/// <reference types="vite/client" />
import axios from 'axios';
/**
 * Pet API client for frontend communication with backend.
 */
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/girado',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});
/**
 * Pet API endpoints
 */
export const petService = {
    /**
     * Get all pets
     */
    getAllPets: async () => {
        try {
            const response = await apiClient.get('/pets');
            return response.data;
        }
        catch (error) {
            console.error('Error fetching pets:', error);
            throw error;
        }
    },
    /**
     * Get a pet by ID
     */
    getPetById: async (petId) => {
        try {
            const response = await apiClient.get(`/pets/${petId}`);
            return response.data;
        }
        catch (error) {
            console.error(`Error fetching pet ${petId}:`, error);
            throw error;
        }
    },
    /**
     * Get filtered pets
     */
    getFilteredPets: async (params) => {
        try {
            const response = await apiClient.get('/pets/search', { params });
            return response.data;
        }
        catch (error) {
            console.error('Error searching pets:', error);
            throw error;
        }
    },
    /**
     * Search pets by term
     */
    searchPets: async (searchTerm) => {
        try {
            const response = await apiClient.get('/pets/search', {
                params: { search: searchTerm },
            });
            return response.data;
        }
        catch (error) {
            console.error('Error searching pets:', error);
            throw error;
        }
    },
    createPet: async (payload) => {
        try {
            const response = await apiClient.post('/pets', payload);
            return response.data;
        }
        catch (error) {
            console.error('Error creating pet:', error);
            throw error;
        }
    },
    updatePet: async (petId, payload) => {
        try {
            const response = await apiClient.put(`/pets/${petId}`, payload);
            return response.data;
        }
        catch (error) {
            console.error(`Error updating pet ${petId}:`, error);
            throw error;
        }
    },
    deletePet: async (petId) => {
        try {
            await apiClient.delete(`/pets/${petId}`);
        }
        catch (error) {
            console.error(`Error deleting pet ${petId}:`, error);
            throw error;
        }
    },
};
/**
 * Cart API endpoints
 */
export const cartService = {
    /**
     * Add a pet to the cart
     */
    addToCart: async (petId, cartKey) => {
        try {
            const response = await apiClient.post('/cart/items', {
                petId,
                cartKey,
            });
            return response.data;
        }
        catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    },
    /**
     * Get all items in the cart
     */
    getCart: async (cartKey) => {
        try {
            const response = await apiClient.get('/cart', {
                params: { cartKey },
            });
            return response.data;
        }
        catch (error) {
            console.error('Error fetching cart:', error);
            throw error;
        }
    },
    /**
     * Remove an item from the cart
     */
    removeFromCart: async (cartItemId) => {
        try {
            await apiClient.delete(`/cart/items/${cartItemId}`);
        }
        catch (error) {
            console.error('Error removing from cart:', error);
            throw error;
        }
    },
    /**
     * Clear the entire cart
     */
    clearCart: async (cartKey) => {
        try {
            await apiClient.delete('/cart', {
                params: { cartKey },
            });
        }
        catch (error) {
            console.error('Error clearing cart:', error);
            throw error;
        }
    },
};
/**
 * Wishlist API endpoints
 */
export const wishlistService = {
    /**
     * Add a pet to the wishlist
     */
    addToWishlist: async (petId, wishlistKey) => {
        try {
            const response = await apiClient.post('/wishlist/items', {
                petId,
                wishlistKey,
            });
            return response.data;
        }
        catch (error) {
            console.error('Error adding to wishlist:', error);
            throw error;
        }
    },
    /**
     * Get all items in the wishlist
     */
    getWishlist: async (wishlistKey) => {
        try {
            const response = await apiClient.get('/wishlist', {
                params: { wishlistKey },
            });
            return response.data;
        }
        catch (error) {
            console.error('Error fetching wishlist:', error);
            throw error;
        }
    },
    /**
     * Remove an item from the wishlist
     */
    removeFromWishlist: async (wishlistItemId) => {
        try {
            await apiClient.delete(`/wishlist/items/${wishlistItemId}`);
        }
        catch (error) {
            console.error('Error removing from wishlist:', error);
            throw error;
        }
    },
    /**
     * Clear the entire wishlist
     */
    clearWishlist: async (wishlistKey) => {
        try {
            await apiClient.delete('/wishlist', {
                params: { wishlistKey },
            });
        }
        catch (error) {
            console.error('Error clearing wishlist:', error);
            throw error;
        }
    },
};
export default apiClient;
//# sourceMappingURL=petService.js.map