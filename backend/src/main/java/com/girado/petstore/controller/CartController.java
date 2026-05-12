package com.girado.petstore.controller;

import com.girado.petstore.dto.CartItemDTO;
import com.girado.petstore.service.CartItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/girado/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartItemService cartItemService;

    @PostMapping("/items")
    public ResponseEntity<CartItemDTO> addToCart(@RequestParam String cartKey, @RequestParam UUID petId) {
        CartItemDTO cartItem = cartItemService.addToCart(petId, cartKey);
        return ResponseEntity.ok(cartItem);
    }

    @GetMapping("/items")
    public ResponseEntity<List<CartItemDTO>> getCartItems(@RequestParam String cartKey) {
        List<CartItemDTO> cartItems = cartItemService.getCartItems(cartKey);
        return ResponseEntity.ok(cartItems);
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable UUID itemId) {
        cartItemService.removeFromCart(itemId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/items")
    public ResponseEntity<Void> clearCart(@RequestParam String cartKey) {
        cartItemService.clearCart(cartKey);
        return ResponseEntity.noContent().build();
    }
}