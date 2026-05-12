package com.girado.petstore.repository;

import com.girado.petstore.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Repository for CartItem entity.
 */
@Repository
public interface CartItemRepository extends JpaRepository<CartItem, UUID> {
    
    /**
     * Find all cart items for a given cart key.
     */
    List<CartItem> findByCartKey(String cartKey);
    
    /**
     * Find a specific cart item by cart key and pet ID.
     */
    Optional<CartItem> findByCartKeyAndPetId(String cartKey, UUID petId);
    
    /**
     * Delete all cart items for a given cart key.
     */
    void deleteByCartKey(String cartKey);
}
