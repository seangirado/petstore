package com.girado.petstore.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * CartItemDTO for API responses.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemDTO {
    private UUID id;
    private UUID petId;
    private String cartKey;
    private LocalDateTime addedAt;
    private PetDTO pet;  // Optional: populated when retrieving cart contents
}
