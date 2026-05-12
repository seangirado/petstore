import { useState, useCallback, useEffect } from 'react';
import { WishlistItem, wishlistService, ErrorResponse } from '../services/petService';

/**
 * Generate a unique wishlist key for anonymous wishlists.
 */
const generateWishlistKey = (): string => {
  return `wishlist_${crypto.randomUUID()}`;
};

/**
 * Get or create wishlist key from localStorage.
 */
const getOrCreateWishlistKey = (): string => {
  let wishlistKey = localStorage.getItem('petstore_wishlist_key');
  if (!wishlistKey) {
    wishlistKey = generateWishlistKey();
    localStorage.setItem('petstore_wishlist_key', wishlistKey);
  }
  return wishlistKey;
};

/**
 * Custom hook for managing wishlist.
 */
export const useWishlist = () => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [wishlistKey, setWishlistKey] = useState<string>('');

  // Initialize wishlist key on mount
  useEffect(() => {
    setWishlistKey(getOrCreateWishlistKey());
  }, []);

  // Fetch wishlist items
  const fetchWishlist = useCallback(async (key: string) => {
    if (!key) return;
    setLoading(true);
    setError(null);
    try {
      const data = await wishlistService.getWishlist(key);
      setItems(data);
    } catch (err: any) {
      setError(err.response?.data || { error: 'Failed to fetch wishlist', code: 'FETCH_ERROR' });
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch wishlist when wishlistKey changes
  useEffect(() => {
    if (wishlistKey) {
      fetchWishlist(wishlistKey);
    }
  }, [wishlistKey, fetchWishlist]);

  const addToWishlist = useCallback(
    async (petId: string) => {
      if (!wishlistKey) return;
      setError(null);
      try {
        const newItem = await wishlistService.addToWishlist(petId, wishlistKey);
        setItems((prev) => {
          const existing = prev.find((item) => item.petId === petId);
          if (existing) {
            return prev.map((item) => (item.petId === petId ? newItem : item));
          }
          return [...prev, newItem];
        });
      } catch (err: any) {
        setError(err.response?.data || { error: 'Failed to add to wishlist', code: 'ADD_ERROR' });
      }
    },
    [wishlistKey]
  );

  const removeFromWishlist = useCallback(
    async (wishlistItemId: string) => {
      setError(null);
      try {
        await wishlistService.removeFromWishlist(wishlistItemId);
        setItems((prev) => prev.filter((item) => item.id !== wishlistItemId));
      } catch (err: any) {
        setError(err.response?.data || { error: 'Failed to remove from wishlist', code: 'REMOVE_ERROR' });
      }
    },
    []
  );

  const clearWishlist = useCallback(async () => {
    if (!wishlistKey) return;
    setError(null);
    try {
      await wishlistService.clearWishlist(wishlistKey);
      setItems([]);
    } catch (err: any) {
      setError(err.response?.data || { error: 'Failed to clear wishlist', code: 'CLEAR_ERROR' });
    }
  }, [wishlistKey]);

  const itemCount = items.length;
  const isInWishlist = (petId: string): boolean => {
    return items.some((item) => item.petId === petId);
  };

  return {
    items,
    loading,
    error,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    itemCount,
    isInWishlist,
    wishlistKey,
  };
};
