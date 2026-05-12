package com.girado.petstore.dto;

import com.girado.petstore.model.PetType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * PetDTO for API responses.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PetDTO {
    private UUID id;
    private String name;
    private PetType type;
    private String breed;
    private Integer ageMonths;
    private BigDecimal price;
    private String description;
    private Boolean available;
    private String imageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
