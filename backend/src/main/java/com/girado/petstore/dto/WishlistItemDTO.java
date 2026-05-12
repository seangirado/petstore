package com.girado.petstore.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * WishlistItemDTO for API responses.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WishlistItemDTO {
    private UUID id;
    private UUID petId;
    private String wishlistKey;
    private LocalDateTime addedAt;
    private PetDTO pet;  // Optional: populated when retrieving wishlist contents
}
