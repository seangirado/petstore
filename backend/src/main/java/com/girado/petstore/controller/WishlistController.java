package com.girado.petstore.controller;

import com.girado.petstore.dto.WishlistItemDTO;
import com.girado.petstore.service.WishlistItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/girado/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistItemService wishlistItemService;

    @PostMapping("/items")
    public ResponseEntity<WishlistItemDTO> addToWishlist(@RequestParam String wishlistKey, @RequestParam UUID petId) {
        WishlistItemDTO wishlistItem = wishlistItemService.addToWishlist(petId, wishlistKey);
        return ResponseEntity.ok(wishlistItem);
    }

    @GetMapping("/items")
    public ResponseEntity<List<WishlistItemDTO>> getWishlistItems(@RequestParam String wishlistKey) {
        List<WishlistItemDTO> wishlistItems = wishlistItemService.getWishlistItems(wishlistKey);
        return ResponseEntity.ok(wishlistItems);
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Void> removeFromWishlist(@PathVariable UUID itemId) {
        wishlistItemService.removeFromWishlist(itemId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/items")
    public ResponseEntity<Void> clearWishlist(@RequestParam String wishlistKey) {
        wishlistItemService.clearWishlist(wishlistKey);
        return ResponseEntity.noContent().build();
    }
}