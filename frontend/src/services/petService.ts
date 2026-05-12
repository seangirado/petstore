/// <reference types="vite/client" />
import axios, { AxiosInstance } from 'axios';

/**
 * Pet API client for frontend communication with backend.
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/girado',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
export const petService = {
  /**
   * Get all pets
   */
  getAllPets: async (): Promise<Pet[]> => {
    try {
      const response = await apiClient.get('/pets');
      return response.data;
    } catch (error) {
      console.error('Error fetching pets:', error);
      throw error;
    }
  },

  /**
   * Get a pet by ID
   */
  getPetById: async (petId: string): Promise<Pet> => {
    try {
      const response = await apiClient.get(`/pets/${petId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching pet ${petId}:`, error);
      throw error;
    }
  },

  /**
   * Get filtered pets
   */
  getFilteredPets: async (params: {
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    minAge?: number;
    maxAge?: number;
    available?: boolean;
    search?: string;
  }): Promise<Pet[]> => {
    try {
      const response = await apiClient.get('/pets/search', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching pets:', error);
      throw error;
    }
  },

  /**
   * Search pets by term
   */
  searchPets: async (searchTerm: string): Promise<Pet[]> => {
    try {
      const response = await apiClient.get('/pets/search', {
        params: { search: searchTerm },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching pets:', error);
      throw error;
    }
  },

  createPet: async (payload: PetRequest): Promise<Pet> => {
    try {
      const response = await apiClient.post('/pets', payload);
      return response.data;
    } catch (error) {
      console.error('Error creating pet:', error);
      throw error;
    }
  },

  updatePet: async (petId: string, payload: PetRequest): Promise<Pet> => {
    try {
      const response = await apiClient.put(`/pets/${petId}`, payload);
      return response.data;
    } catch (error) {
      console.error(`Error updating pet ${petId}:`, error);
      throw error;
    }
  },

  deletePet: async (petId: string): Promise<void> => {
    try {
      await apiClient.delete(`/pets/${petId}`);
    } catch (error) {
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
  addToCart: async (petId: string, cartKey: string): Promise<CartItem> => {
    try {
      const response = await apiClient.post('/cart/items', {
        petId,
        cartKey,
      });
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  /**
   * Get all items in the cart
   */
  getCart: async (cartKey: string): Promise<CartItem[]> => {
    try {
      const response = await apiClient.get('/cart', {
        params: { cartKey },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  /**
   * Remove an item from the cart
   */
  removeFromCart: async (cartItemId: string): Promise<void> => {
    try {
      await apiClient.delete(`/cart/items/${cartItemId}`);
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  /**
   * Clear the entire cart
   */
  clearCart: async (cartKey: string): Promise<void> => {
    try {
      await apiClient.delete('/cart', {
        params: { cartKey },
      });
    } catch (error) {
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
  addToWishlist: async (petId: string, wishlistKey: string): Promise<WishlistItem> => {
    try {
      const response = await apiClient.post('/wishlist/items', {
        petId,
        wishlistKey,
      });
      return response.data;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  },

  /**
   * Get all items in the wishlist
   */
  getWishlist: async (wishlistKey: string): Promise<WishlistItem[]> => {
    try {
      const response = await apiClient.get('/wishlist', {
        params: { wishlistKey },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      throw error;
    }
  },

  /**
   * Remove an item from the wishlist
   */
  removeFromWishlist: async (wishlistItemId: string): Promise<void> => {
    try {
      await apiClient.delete(`/wishlist/items/${wishlistItemId}`);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  },

  /**
   * Clear the entire wishlist
   */
  clearWishlist: async (wishlistKey: string): Promise<void> => {
    try {
      await apiClient.delete('/wishlist', {
        params: { wishlistKey },
      });
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      throw error;
    }
  },
};

export default apiClient;
