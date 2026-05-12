package com.girado.petstore.service;

import com.girado.petstore.dto.WishlistItemDTO;
import com.girado.petstore.model.WishlistItem;
import com.girado.petstore.model.Pet;
import com.girado.petstore.repository.WishlistItemRepository;
import com.girado.petstore.repository.PetRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Service for managing WishlistItem entities and wishlist operations.
 */
@Slf4j
@Service
public class WishlistItemService {
    
    @Autowired
    private WishlistItemRepository wishlistItemRepository;
    
    @Autowired
    private PetRepository petRepository;
    
    @Autowired
    private PetService petService;
    
    /**
     * Add a pet to the wishlist (or overwrite if already exists).
     * Validates that the pet exists.
     */
    public WishlistItemDTO addToWishlist(UUID petId, String wishlistKey) {
        log.debug("Adding pet {} to wishlist with key {}", petId, wishlistKey);
        
        // Validate wishlist key
        if (wishlistKey == null || wishlistKey.trim().isEmpty()) {
            throw new IllegalArgumentException("Wishlist key cannot be empty");
        }
        
        // Fetch the pet
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> {
                    log.warn("Pet not found: {}", petId);
                    return new RuntimeException("Pet not found with ID: " + petId);
                });
        
        // Check if item already exists in wishlist
        Optional<WishlistItem> existingItem = wishlistItemRepository.findByWishlistKeyAndPetId(wishlistKey, petId);
        
        WishlistItem wishlistItem;
        if (existingItem.isPresent()) {
            // Update existing item (overwrite scenario)
            wishlistItem = existingItem.get();
            log.debug("Wishlist item already exists, updating timestamp");
            // Update is handled by JPA entity lifecycle
        } else {
            // Create new wishlist item
            wishlistItem = WishlistItem.builder()
                    .petId(petId)
                    .wishlistKey(wishlistKey)
                    .build();
        }
        
        WishlistItem savedItem = wishlistItemRepository.save(wishlistItem);
        log.info("Pet {} added to wishlist with key {}", petId, wishlistKey);
        
        return convertToDTO(savedItem, pet);
    }
    
    /**
     * Get all items in a wishlist.
     */
    public List<WishlistItemDTO> getWishlistItems(String wishlistKey) {
        log.debug("Fetching wishlist items for wishlist key: {}", wishlistKey);
        
        if (wishlistKey == null || wishlistKey.trim().isEmpty()) {
            throw new IllegalArgumentException("Wishlist key cannot be empty");
        }
        
        return wishlistItemRepository.findByWishlistKey(wishlistKey).stream()
                .map(item -> {
                    Pet pet = petRepository.findById(item.getPetId())
                            .orElse(null);
                    return convertToDTO(item, pet);
                })
                .collect(Collectors.toList());
    }
    
    /**
     * Remove a pet from the wishlist.
     */
    public void removeFromWishlist(UUID wishlistItemId) {
        log.debug("Removing wishlist item: {}", wishlistItemId);
        wishlistItemRepository.deleteById(wishlistItemId);
        log.info("Wishlist item {} removed", wishlistItemId);
    }
    
    /**
     * Clear all items from a wishlist.
     */
    public void clearWishlist(String wishlistKey) {
        log.debug("Clearing wishlist with key: {}", wishlistKey);
        
        if (wishlistKey == null || wishlistKey.trim().isEmpty()) {
            throw new IllegalArgumentException("Wishlist key cannot be empty");
        }
        
        wishlistItemRepository.deleteByWishlistKey(wishlistKey);
        log.info("Wishlist {} cleared", wishlistKey);
    }
    
    /**
     * Convert WishlistItem and Pet to WishlistItemDTO.
     */
    private WishlistItemDTO convertToDTO(WishlistItem item, Pet pet) {
        return WishlistItemDTO.builder()
                .id(item.getId())
                .petId(item.getPetId())
                .wishlistKey(item.getWishlistKey())
                .addedAt(item.getAddedAt())
                .pet(pet != null ? petService.getPetById(pet.getId()) : null)
                .build();
    }
}
