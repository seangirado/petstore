# API Contracts: PetStore Product Gallery

All backend endpoints are exposed under `/girado` in compliance with project governance.

## GET /girado/pets

Returns a list of pets for the gallery with optional filters.

Query Parameters:
- `type` (optional): `dog`, `cat`, `bird`, `fish`
- `minPrice` (optional): minimum price filter
- `maxPrice` (optional): maximum price filter
- `minAge` (optional): minimum age in months
- `maxAge` (optional): maximum age in months
- `available` (optional): `true` or `false`
- `search` (optional): fuzzy search over name, breed, description

Response 200:
```json
[
  {
    "id": "uuid",
    "name": "Buddy",
    "type": "dog",
    "breed": "Golden Retriever",
    "ageMonths": 18,
    "price": 350.00,
    "available": true,
    "imageUrl": "https://..."
  }
]
```

## GET /girado/pets/{petId}

Returns detail information for a single pet.

Path Parameters:
- `petId` (required): UUID of the pet

Response 200:
```json
{
  "id": "uuid",
  "name": "Buddy",
  "type": "dog",
  "breed": "Golden Retriever",
  "ageMonths": 18,
  "price": 350.00,
  "description": "Friendly and energetic family dog.",
  "available": true,
  "imageUrl": "https://..."
}
```

Response 404:
```json
{
  "error": "Pet not found"
}
```

## POST /girado/cart/items

Adds an available pet to the shopping cart.

Request Body:
```json
{
  "petId": "uuid",
  "cartKey": "optional-session-key"
}
```

Response 201:
```json
{
  "id": "uuid",
  "petId": "uuid",
  "cartKey": "optional-session-key",
  "addedAt": "2026-05-06T12:00:00Z"
}
```

Response 400 (unavailable pet):
```json
{
  "error": "Pet is unavailable and cannot be added to cart"
}
```

## POST /girado/wishlist/items

Adds an available pet to the wishlist.

Request Body:
```json
{
  "petId": "uuid",
  "wishlistKey": "optional-session-key"
}
```

Response 201:
```json
{
  "id": "uuid",
  "petId": "uuid",
  "wishlistKey": "optional-session-key",
  "addedAt": "2026-05-06T12:00:00Z"
}
```

Response 400 (unavailable pet):
```json
{
  "error": "Pet is unavailable and cannot be added to wishlist"
}
```

## GET /girado/cart

Returns all items in the shopping cart for a given cart session.

Query Parameters:
- `cartKey` (required): unique cart session identifier

Response 200:
```json
[
  {
    "id": "uuid",
    "petId": "uuid",
    "addedAt": "2026-05-06T12:00:00Z",
    "pet": {
      "id": "uuid",
      "name": "Buddy",
      "type": "dog",
      "price": 350.00,
      "imageUrl": "https://..."
    }
  }
]
```

Response 400 (missing or invalid cartKey):
```json
{
  "error": "Invalid or missing cartKey"
}
```

## GET /girado/wishlist

Returns all items in the wishlist for a given wishlist session.

Query Parameters:
- `wishlistKey` (required): unique wishlist session identifier

Response 200:
```json
[
  {
    "id": "uuid",
    "petId": "uuid",
    "addedAt": "2026-05-06T12:00:00Z",
    "pet": {
      "id": "uuid",
      "name": "Whiskers",
      "type": "cat",
      "price": 200.00,
      "imageUrl": "https://..."
    }
  }
]
```

Response 400 (missing or invalid wishlistKey):
```json
{
  "error": "Invalid or missing wishlistKey"
}
```
