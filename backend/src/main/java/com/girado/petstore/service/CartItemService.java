package com.girado.petstore.service;

import com.girado.petstore.dto.CartItemDTO;
import com.girado.petstore.model.CartItem;
import com.girado.petstore.model.Pet;
import com.girado.petstore.repository.CartItemRepository;
import com.girado.petstore.repository.PetRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Service for managing CartItem entities and cart operations.
 */
@Slf4j
@Service
public class CartItemService {
    
    @Autowired
    private CartItemRepository cartItemRepository;
    
    @Autowired
    private PetRepository petRepository;
    
    @Autowired
    private PetService petService;
    
    /**
     * Add a pet to the cart (or overwrite if already exists).
     * Validates that the pet exists and is available.
     */
    public CartItemDTO addToCart(UUID petId, String cartKey) {
        log.debug("Adding pet {} to cart with key {}", petId, cartKey);
        
        // Validate cart key
        if (cartKey == null || cartKey.trim().isEmpty()) {
            throw new IllegalArgumentException("Cart key cannot be empty");
        }
        
        // Fetch the pet
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> {
                    log.warn("Pet not found: {}", petId);
                    return new RuntimeException("Pet not found with ID: " + petId);
                });
        
        // Validate availability
        if (!pet.getAvailable()) {
            log.warn("Cannot add unavailable pet {} to cart", petId);
            throw new RuntimeException("Pet is unavailable and cannot be added to cart");
        }
        
        // Check if item already exists in cart
        Optional<CartItem> existingItem = cartItemRepository.findByCartKeyAndPetId(cartKey, petId);
        
        CartItem cartItem;
        if (existingItem.isPresent()) {
            // Update existing item (overwrite scenario)
            cartItem = existingItem.get();
            log.debug("Cart item already exists, updating timestamp");
            // Update is handled by JPA entity lifecycle
        } else {
            // Create new cart item
            cartItem = CartItem.builder()
                    .petId(petId)
                    .cartKey(cartKey)
                    .build();
        }
        
        CartItem savedItem = cartItemRepository.save(cartItem);
        log.info("Pet {} added to cart with key {}", petId, cartKey);
        
        return convertToDTO(savedItem, pet);
    }
    
    /**
     * Get all items in a cart.
     */
    public List<CartItemDTO> getCartItems(String cartKey) {
        log.debug("Fetching cart items for cart key: {}", cartKey);
        
        if (cartKey == null || cartKey.trim().isEmpty()) {
            throw new IllegalArgumentException("Cart key cannot be empty");
        }
        
        return cartItemRepository.findByCartKey(cartKey).stream()
                .map(item -> {
                    Pet pet = petRepository.findById(item.getPetId())
                            .orElse(null);
                    return convertToDTO(item, pet);
                })
                .collect(Collectors.toList());
    }
    
    /**
     * Remove a pet from the cart.
     */
    public void removeFromCart(UUID cartItemId) {
        log.debug("Removing cart item: {}", cartItemId);
        cartItemRepository.deleteById(cartItemId);
        log.info("Cart item {} removed", cartItemId);
    }
    
    /**
     * Clear all items from a cart.
     */
    public void clearCart(String cartKey) {
        log.debug("Clearing cart with key: {}", cartKey);
        
        if (cartKey == null || cartKey.trim().isEmpty()) {
            throw new IllegalArgumentException("Cart key cannot be empty");
        }
        
        cartItemRepository.deleteByCartKey(cartKey);
        log.info("Cart {} cleared", cartKey);
    }
    
    /**
     * Convert CartItem and Pet to CartItemDTO.
     */
    private CartItemDTO convertToDTO(CartItem item, Pet pet) {
        return CartItemDTO.builder()
                .id(item.getId())
                .petId(item.getPetId())
                .cartKey(item.getCartKey())
                .addedAt(item.getAddedAt())
                .pet(pet != null ? petService.getPetById(pet.getId()) : null)
                .build();
    }
}
