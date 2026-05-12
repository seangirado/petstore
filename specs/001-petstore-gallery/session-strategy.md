# Session and Cart/Wishlist Strategy

## Overview

This document defines how cart and wishlist sessions are managed for anonymous users in the PetStore Product Gallery.

## Cart and Wishlist Key Generation

### Client-Side Generation (Recommended)

- When a user first accesses the application, the frontend generates a `cartKey` and `wishlistKey` as UUIDs using a cryptographic random function (e.g., `crypto.randomUUID()` in JavaScript).
- These keys are immediately persisted to the browser's `localStorage` under keys `petstore_cartKey` and `petstore_wishlistKey`.
- On every page load, the frontend checks `localStorage` for existing keys. If found, they are reused; otherwise, new keys are generated.

### Key Validation on Backend

- The backend does NOT validate the format of `cartKey` or `wishlistKey` strictly; any non-empty string is accepted.
- The backend treats these keys as opaque session identifiers and uses them to group CartItem and WishlistItem records in the database.
- No server-side session table is required; the database queries use cartKey/wishlistKey as filter conditions.

## Session Persistence and Expiration

### Expiration Strategy

- **No server-side expiration**: The backend does not enforce TTL; cart and wishlist items persist indefinitely in the database.
- **Client-side TTL in localStorage**: Frontend may optionally detect stale keys in localStorage (e.g., older than 7 days) and regenerate them, but this is not enforced.
- **Practical approach for MVP**: Assume localStorage survives for the lifetime of the browser session; longer-term persistence (7+ days) is a nice-to-have and can be added in v2.

### Data Cleanup (Future)

- For production scalability, a database cleanup job (e.g., nightly cron) can delete CartItem and WishlistItem records older than a specified retention period (e.g., 30 days).
- This cleanup is not required for v1.

## Deduplication Strategy

### Adding an Existing Pet to Cart/Wishlist

- If a user attempts to add a pet that is already in their cart or wishlist, the system OVERWRITES the existing entry rather than creating a duplicate.
- Implementation: Backend checks `SELECT * FROM CartItem WHERE cartKey = ? AND petId = ?` before INSERT; if a row exists, perform UPDATE (on addedAt timestamp) instead of INSERT.
- **No quantity tracking** in v1: each pet appears at most once per cart/wishlist.

## Error Handling

### Invalid Pet During Add

- If the petId does not exist in the database, the API returns a 404 Not Found with message "Pet not found".
- If the pet exists but `available` is false, the API returns a 400 Bad Request with message "Pet is unavailable and cannot be added to cart/wishlist".

### Retrieving Cart/Wishlist with Invalid Key

- If the cartKey or wishlistKey is missing or empty, the API returns a 400 Bad Request with message "Invalid or missing cartKey/wishlistKey".
- If the key is valid but has no associated items, the API returns a 200 OK with an empty array `[]`.

## Security Considerations

- **No authentication required for MVP**: Cart and wishlist keys are not tied to user identity; anyone with a key can access the corresponding cart/wishlist.
- **No encryption of keys in transit**: Keys are passed as plain strings in query parameters and request bodies; use HTTPS in production to prevent interception.
- **Data privacy**: Cart and wishlist contents are sensitive but not highly secret (e.g., knowing a pet is on a wishlist is not catastrophic); standard HTTPS/TLS protections are sufficient for v1.

## Example Implementation Flow

1. User visits gallery → Frontend generates `cartKey: "550e8400-e29b-41d4-a716-446655440000"` and stores in localStorage.
2. User adds pet X to cart → Frontend calls POST `/girado/cart/items` with `{ petId: "...", cartKey: "550e8400..." }`.
3. Backend creates CartItem record with cartKey and petId.
4. User navigates to cart page → Frontend retrieves localStorage cartKey and calls GET `/girado/cart?cartKey=550e8400...`.
5. Backend queries CartItem records filtered by cartKey and returns the list.
6. If user clears browser localStorage, cartKey is lost; cart becomes inaccessible (considered a separate session).

## Future Enhancements (Out of Scope for v1)

- User authentication and persistent carts tied to user accounts
- Shared carts via URL-based key exchange
- Server-side session table with explicit TTL
- Quantity tracking and cart item removal endpoints
- Wishlist sharing and notifications
