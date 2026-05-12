package com.girado.petstore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main entry point for the PetStore application.
 * Spring Boot automatically scans this package and subpackages for components.
 */
@SpringBootApplication
public class PetStoreApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(PetStoreApplication.class, args);
    }
}
