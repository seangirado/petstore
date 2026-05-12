# Data Model: PetStore Product Gallery

## Entities

### Pet
Represents an available animal listing in the store.

- `id` (UUID): unique pet identifier
- `name` (String): pet name or title
- `type` (String enum): category one of: `dog`, `cat`, `bird`, `fish` (no separate lookup table; stored as string)
- `breed` (String): breed or species details
- `ageMonths` (Integer): age of the pet in months
- `price` (Decimal): sale price in the store currency
- `description` (String): narrative details for the pet
- `available` (Boolean): whether the pet can be added to cart or wishlist
- `imageUrl` (String): URL to the pet image
- `createdAt` (Timestamp): record created timestamp
- `updatedAt` (Timestamp): record updated timestamp

### CartItem
Represents a selected pet saved for purchase intent.

- `id` (UUID): unique item identifier
- `petId` (UUID): foreign key to `Pet`
- `cartKey` (String): session or anonymous cart identifier
- `addedAt` (Timestamp): when the item was added

### WishlistItem
Represents a pet saved for later consideration.

- `id` (UUID): unique item identifier
- `petId` (UUID): foreign key to `Pet`
- `wishlistKey` (String): session or anonymous wishlist identifier
- `addedAt` (Timestamp): when the item was added

## Relationships

- Each `CartItem` references one `Pet`.
- Each `WishlistItem` references one `Pet`.
- `Pet` is the central domain object and is read by the gallery, detail, cart, and wishlist flows.

## Validation rules

- `name`, `type`, `price`, and `available` are required.
- `price` must be greater than or equal to 0.
- `ageMonths` must be non-negative.
- `type` must be one of the supported categories: `dog`, `cat`, `bird`, `fish`.
- `available` must be `true` for items added to cart or wishlist.

## Notes

- Authentication is out of scope for the first iteration, so cart and wishlist use lightweight keys rather than user accounts.
- The backend may support `cartKey` and `wishlistKey` as optional headers or request payload values for anonymous session tracking.
