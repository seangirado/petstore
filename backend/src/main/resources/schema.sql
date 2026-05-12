-- Schema for PetStore database
-- This creates the tables explicitly for H2 database

CREATE TABLE pets (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    breed VARCHAR(255) NOT NULL,
    age_months INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    available BOOLEAN NOT NULL,
    image_url VARCHAR(500),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);

CREATE TABLE cart_items (
    id UUID PRIMARY KEY,
    pet_id UUID NOT NULL,
    cart_key VARCHAR(255) NOT NULL,
    added_at TIMESTAMP NOT NULL,
    UNIQUE(cart_key, pet_id)
);

CREATE TABLE wishlist_items (
    id UUID PRIMARY KEY,
    pet_id UUID NOT NULL,
    wishlist_key VARCHAR(255) NOT NULL,
    added_at TIMESTAMP NOT NULL,
    UNIQUE(wishlist_key, pet_id)
);