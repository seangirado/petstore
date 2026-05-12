package com.girado.petstore.repository;

import com.girado.petstore.model.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Repository for WishlistItem entity.
 */
@Repository
public interface WishlistItemRepository extends JpaRepository<WishlistItem, UUID> {
    
    /**
     * Find all wishlist items for a given wishlist key.
     */
    List<WishlistItem> findByWishlistKey(String wishlistKey);
    
    /**
     * Find a specific wishlist item by wishlist key and pet ID.
     */
    Optional<WishlistItem> findByWishlistKeyAndPetId(String wishlistKey, UUID petId);
    
    /**
     * Delete all wishlist items for a given wishlist key.
     */
    void deleteByWishlistKey(String wishlistKey);
}
