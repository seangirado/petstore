package com.girado.petstore.model;

/**
 * Pet type enumeration representing the category of pets.
 */
public enum PetType {
    DOG("dog"),
    CAT("cat"),
    BIRD("bird"),
    FISH("fish");
    
    private final String displayName;
    
    PetType(String displayName) {
        this.displayName = displayName;
    }
    
    public String getDisplayName() {
        return displayName;
    }
}
