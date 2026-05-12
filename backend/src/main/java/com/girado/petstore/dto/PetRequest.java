package com.girado.petstore.dto;

import com.girado.petstore.model.PetType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

/**
 * Pet request payload for create and update operations.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PetRequest {
    private String name;
    private PetType type;
    private String breed;
    private Integer ageMonths;
    private BigDecimal price;
    private String description;
    private Boolean available;
    private String imageUrl;
}
