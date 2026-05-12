package com.girado.petstore.controller;

import com.girado.petstore.dto.PetDTO;
import com.girado.petstore.dto.PetRequest;
import com.girado.petstore.service.PetService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/girado/pets")
@RequiredArgsConstructor
public class PetController {

    private static final Logger logger = LoggerFactory.getLogger(PetController.class);
    private final PetService petService;

    @GetMapping
    public ResponseEntity<List<PetDTO>> getPets() {
        List<PetDTO> pets = petService.getAllPets();
        if (pets.isEmpty()) {
            logger.warn("Pet gallery is empty. Returning an empty list.");
            return ResponseEntity.ok(Collections.emptyList());
        }
        return ResponseEntity.ok(pets);
    }

    @GetMapping("/{petId}")
    public ResponseEntity<PetDTO> getPetById(@PathVariable UUID petId) {
        return ResponseEntity.ok(petService.getPetById(petId));
    }

    @PostMapping
    public ResponseEntity<PetDTO> createPet(@RequestBody PetRequest petRequest, UriComponentsBuilder uriBuilder) {
        PetDTO createdPet = petService.createPet(petRequest);
        URI location = uriBuilder.path("/girado/pets/{petId}")
                .buildAndExpand(createdPet.getId())
                .toUri();
        return ResponseEntity.created(location).body(createdPet);
    }

    @PutMapping("/{petId}")
    public ResponseEntity<PetDTO> updatePet(@PathVariable UUID petId, @RequestBody PetRequest petRequest) {
        return ResponseEntity.ok(petService.updatePet(petId, petRequest));
    }

    @DeleteMapping("/{petId}")
    public ResponseEntity<Void> deletePet(@PathVariable UUID petId) {
        petService.deletePet(petId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<PetDTO>> searchPets(@RequestParam(value = "search", required = false) String searchTerm) {
        List<PetDTO> pets = petService.searchPets(searchTerm);
        if (pets.isEmpty()) {
            logger.info("Search returned no pets for term: {}", searchTerm);
        }
        return ResponseEntity.ok(pets);
    }
}
