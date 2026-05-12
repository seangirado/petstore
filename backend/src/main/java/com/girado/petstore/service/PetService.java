package com.girado.petstore.service;

import com.girado.petstore.dto.PetDTO;
import com.girado.petstore.dto.PetRequest;
import com.girado.petstore.exception.ResourceNotFoundException;
import com.girado.petstore.model.Pet;
import com.girado.petstore.model.PetType;
import com.girado.petstore.repository.PetRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Service for managing Pet entities and pet-related operations.
 */
@Slf4j
@Service
public class PetService {
    
    @Autowired
    private PetRepository petRepository;
    
    /**
     * Get all pets.
     */
    public List<PetDTO> getAllPets() {
        log.debug("Fetching all pets");
        return petRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get a pet by ID.
     */
    public PetDTO getPetById(UUID petId) {
        log.debug("Fetching pet with ID: {}", petId);
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> {
                    log.warn("Pet not found with ID: {}", petId);
                    return new ResourceNotFoundException("Pet not found with ID: " + petId);
                });
        return convertToDTO(pet);
    }
    
    @Transactional
    public PetDTO createPet(PetRequest request) {
        log.debug("Creating new pet: {}", request);
        validatePetRequest(request);
        Pet pet = Pet.builder()
                .name(request.getName())
                .type(request.getType())
                .breed(request.getBreed())
                .ageMonths(request.getAgeMonths())
                .price(request.getPrice())
                .description(request.getDescription())
                .available(request.getAvailable() != null ? request.getAvailable() : Boolean.TRUE)
                .imageUrl(request.getImageUrl())
                .build();
        return convertToDTO(petRepository.save(pet));
    }
    
    @Transactional
    public PetDTO updatePet(UUID petId, PetRequest request) {
        log.debug("Updating pet {} with payload: {}", petId, request);
        validatePetRequest(request);
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new ResourceNotFoundException("Pet not found with ID: " + petId));
        pet.setName(request.getName());
        pet.setType(request.getType());
        pet.setBreed(request.getBreed());
        pet.setAgeMonths(request.getAgeMonths());
        pet.setPrice(request.getPrice());
        pet.setDescription(request.getDescription());
        pet.setAvailable(request.getAvailable() != null ? request.getAvailable() : pet.getAvailable());
        pet.setImageUrl(request.getImageUrl());
        return convertToDTO(petRepository.save(pet));
    }
    
    @Transactional
    public void deletePet(UUID petId) {
        log.debug("Deleting pet with ID: {}", petId);
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new ResourceNotFoundException("Pet not found with ID: " + petId));
        petRepository.delete(pet);
    }
    
    private void validatePetRequest(PetRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("Pet request payload must not be null");
        }
        if (request.getName() == null || request.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Pet name is required");
        }
        if (request.getType() == null) {
            throw new IllegalArgumentException("Pet type is required");
        }
        if (request.getBreed() == null || request.getBreed().trim().isEmpty()) {
            throw new IllegalArgumentException("Pet breed is required");
        }
        if (request.getAgeMonths() == null || request.getAgeMonths() < 0) {
            throw new IllegalArgumentException("Pet ageMonths must be a non-negative integer");
        }
        if (request.getPrice() == null || request.getPrice().signum() < 0) {
            throw new IllegalArgumentException("Pet price must be a non-negative value");
        }
    }
    
    /**
     * Get pets by type.
     */
    public List<PetDTO> getPetsByType(PetType type) {
        log.debug("Fetching pets with type: {}", type);
        return petRepository.findByType(type).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get available pets only.
     */
    public List<PetDTO> getAvailablePets() {
        log.debug("Fetching available pets");
        return petRepository.findByAvailable(true).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get pets by price range.
     */
    public List<PetDTO> getPetsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        log.debug("Fetching pets in price range: {} - {}", minPrice, maxPrice);
        if (minPrice.compareTo(maxPrice) > 0) {
            throw new IllegalArgumentException("minPrice cannot be greater than maxPrice");
        }
        return petRepository.findByPriceRange(minPrice, maxPrice).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get pets by age range (in months).
     */
    public List<PetDTO> getPetsByAgeRange(Integer minAge, Integer maxAge) {
        log.debug("Fetching pets in age range: {} - {} months", minAge, maxAge);
        if (minAge < 0 || maxAge < 0 || minAge > maxAge) {
            throw new IllegalArgumentException("Invalid age range");
        }
        return petRepository.findByAgeRange(minAge, maxAge).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Search pets by term (name, breed, or description).
     */
    public List<PetDTO> searchPets(String searchTerm) {
        log.debug("Searching pets with term: {}", searchTerm);
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return getAllPets();
        }
        return petRepository.searchByTerm(searchTerm.trim()).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get filtered pets based on multiple criteria.
     */
    public List<PetDTO> getFilteredPets(PetType type, BigDecimal minPrice, BigDecimal maxPrice,
                                        Integer minAge, Integer maxAge, Boolean available,
                                        String searchTerm) {
        log.debug("Fetching filtered pets with criteria: type={}, price range={}-{}, age range={}-{}, available={}, search={}",
                type, minPrice, maxPrice, minAge, maxAge, available, searchTerm);
        
        List<Pet> pets = petRepository.findAll();
        
        // Apply filters
        if (type != null) {
            pets = pets.stream().filter(p -> p.getType() == type).collect(Collectors.toList());
        }
        if (minPrice != null && maxPrice != null) {
            pets = pets.stream()
                    .filter(p -> p.getPrice().compareTo(minPrice) >= 0 && p.getPrice().compareTo(maxPrice) <= 0)
                    .collect(Collectors.toList());
        }
        if (minAge != null && maxAge != null) {
            pets = pets.stream()
                    .filter(p -> p.getAgeMonths() >= minAge && p.getAgeMonths() <= maxAge)
                    .collect(Collectors.toList());
        }
        if (available != null) {
            pets = pets.stream().filter(p -> p.getAvailable().equals(available)).collect(Collectors.toList());
        }
        if (searchTerm != null && !searchTerm.trim().isEmpty()) {
            String term = searchTerm.toLowerCase();
            pets = pets.stream()
                    .filter(p -> (p.getName() != null && p.getName().toLowerCase().contains(term)) ||
                                (p.getBreed() != null && p.getBreed().toLowerCase().contains(term)) ||
                                (p.getDescription() != null && p.getDescription().toLowerCase().contains(term)))
                    .collect(Collectors.toList());
        }
        
        return pets.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Convert Pet entity to PetDTO.
     */
    private PetDTO convertToDTO(Pet pet) {
        return PetDTO.builder()
                .id(pet.getId())
                .name(pet.getName())
                .type(pet.getType())
                .breed(pet.getBreed())
                .ageMonths(pet.getAgeMonths())
                .price(pet.getPrice())
                .description(pet.getDescription())
                .available(pet.getAvailable())
                .imageUrl(pet.getImageUrl())
                .createdAt(pet.getCreatedAt())
                .updatedAt(pet.getUpdatedAt())
                .build();
    }
}
