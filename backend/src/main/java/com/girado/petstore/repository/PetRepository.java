package com.girado.petstore.repository;

import com.girado.petstore.model.Pet;
import com.girado.petstore.model.PetType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

/**
 * Repository for Pet entity with custom query methods for filtering.
 */
@Repository
public interface PetRepository extends JpaRepository<Pet, UUID> {
    
    /**
     * Find all pets by type.
     */
    List<Pet> findByType(PetType type);
    
    /**
     * Find all pets by availability status.
     */
    List<Pet> findByAvailable(Boolean available);
    
    /**
     * Find all pets by type and availability.
     */
    List<Pet> findByTypeAndAvailable(PetType type, Boolean available);
    
    /**
     * Find pets within a price range.
     */
    @Query("SELECT p FROM Pet p WHERE p.price >= :minPrice AND p.price <= :maxPrice")
    List<Pet> findByPriceRange(@Param("minPrice") BigDecimal minPrice, 
                               @Param("maxPrice") BigDecimal maxPrice);
    
    /**
     * Find pets within an age range.
     */
    @Query("SELECT p FROM Pet p WHERE p.ageMonths >= :minAge AND p.ageMonths <= :maxAge")
    List<Pet> findByAgeRange(@Param("minAge") Integer minAge, 
                            @Param("maxAge") Integer maxAge);
    
    /**
     * Search pets by name, breed, or description (case-insensitive).
     */
    @Query("SELECT p FROM Pet p WHERE " +
           "LOWER(p.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.breed) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Pet> searchByTerm(@Param("searchTerm") String searchTerm);
}
