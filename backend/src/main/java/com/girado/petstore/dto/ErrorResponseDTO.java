package com.girado.petstore.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

/**
 * ErrorResponseDTO for standardized error responses across all endpoints.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ErrorResponseDTO {
    private String error;
    private String code;
    private LocalDateTime timestamp;
    private String path;
    private int status;
}
