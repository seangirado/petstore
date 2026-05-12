---
description: "Task list for PetStore Product Gallery feature implementation"
---

# Tasks: PetStore Product Gallery

**Input**: Design documents from `/specs/001-petstore-gallery/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), data-model.md, contracts/petstore-api.md, quickstart.md

**Tests**: Tests are OPTIONAL and not included in this initial taskbreak. Implement with TDD if desired.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Backend**: `backend/src/main/java/com/girado/petstore/`, `backend/src/main/resources/`
- **Frontend**: `frontend/src/`, `frontend/public/`
- **Docker**: `backend/Dockerfile`, `frontend/Dockerfile`, `docker-compose.yml`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create backend directory structure per plan.md under `backend/` with pom.xml for Maven
- [x] T002 [P] Create frontend directory structure per plan.md under `frontend/` with package.json, tsconfig.json, vite.config.ts
- [x] T003 [P] Configure backend Maven dependencies for Spring Boot 3, Spring Data JPA, PostgreSQL driver in `backend/pom.xml`
- [x] T004 [P] Configure frontend npm dependencies for React, Vite, TypeScript, Tailwind, MUI in `frontend/package.json`
- [x] T005 Configure backend application.yml for development database connectivity in `backend/src/main/resources/application.yml`
- [x] T006 [P] Configure frontend Tailwind CSS in `frontend/tailwind.config.js` with responsive breakpoints: mobile (default), sm:640px, md:768px, lg:1024px, xl:1440px
- [x] T006a [P] Document responsive grid design specification in frontend README: grid-cols-1 (mobile), grid-cols-2 (md), grid-cols-3 (lg), grid-cols-4 (xl)
- [x] T007 [P] Create backend PetStoreApplication main class in `backend/src/main/java/com/girado/petstore/PetStoreApplication.java`
- [x] T008 [P] Create frontend main App component in `frontend/src/App.tsx` with routing setup

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T009 Configure JPA Hibernate DDL for automatic schema generation in `backend/src/main/resources/application.yml` with `spring.jpa.hibernate.ddl-auto=create-drop` for development (no Flyway/Liquibase migration tool required for MVP; schema is auto-generated from entities)
- [x] T010 [P] Create Pet JPA entity in `backend/src/main/java/com/girado/petstore/model/Pet.java` with fields: id, name, type, breed, ageMonths, price, description, available, imageUrl, createdAt, updatedAt
- [x] T011 [P] Create CartItem JPA entity in `backend/src/main/java/com/girado/petstore/model/CartItem.java` with fields: id, petId, cartKey, addedAt
- [x] T012 [P] Create WishlistItem JPA entity in `backend/src/main/java/com/girado/petstore/model/WishlistItem.java` with fields: id, petId, wishlistKey, addedAt
- [x] T013 [P] Create PetRepository interface in `backend/src/main/java/com/girado/petstore/repository/PetRepository.java` with basic findById, findAll methods
- [x] T014 [P] Create CartItemRepository interface in `backend/src/main/java/com/girado/petstore/repository/CartItemRepository.java`
- [x] T015 [P] Create WishlistItemRepository interface in `backend/src/main/java/com/girado/petstore/repository/WishlistItemRepository.java`
- [x] T016 Create PetService class in `backend/src/main/java/com/girado/petstore/service/PetService.java` with methods to fetch pets (used by US1, US2, US3)
- [x] T017 Create CartItemService class in `backend/src/main/java/com/girado/petstore/service/CartItemService.java` for adding/retrieving cart items (used by US4)
- [x] T018 [P] Create WishlistItemService class in `backend/src/main/java/com/girado/petstore/service/WishlistItemService.java` for adding/retrieving wishlist items (used by US4)
- [x] T019 Create PetDTO (Data Transfer Object) in `backend/src/main/java/com/girado/petstore/dto/PetDTO.java` for API responses
- [x] T020 [P] Create CartItemDTO in `backend/src/main/java/com/girado/petstore/dto/CartItemDTO.java`
- [x] T021 [P] Create WishlistItemDTO in `backend/src/main/java/com/girado/petstore/dto/WishlistItemDTO.java`
- [x] T021a Create ErrorResponseDTO in `backend/src/main/java/com/girado/petstore/dto/ErrorResponseDTO.java` for standardized error responses (fields: error, code, timestamp) used by all endpoints
- [x] T021b Create backend seed data SQL script in `backend/src/main/resources/data.sql` with 20-30 sample pets (various types, prices, ages, availability states) for development and demo use
- [x] T022 Configure CORS and global exception handling in `backend/src/main/java/com/girado/petstore/config/CorsConfig.java`
- [x] T023 Create frontend API client service in `frontend/src/api/petService.ts` with axios/fetch client configured for `http://localhost:8080/girado`
- [x] T024 [P] Create frontend hooks directory structure with custom hook for pet fetching in `frontend/src/hooks/usePets.ts`
- [x] T025 Create environment configuration file `frontend/.env.development` with API base URL

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Browse Pet Gallery (Priority: P1) 🎯 MVP

**Goal**: Deliver a responsive gallery page where users can browse available pets with clear product cards showing name, type, price, age, and availability.

**Independent Test**: Load the gallery page on desktop and mobile viewports, verify that pet cards are displayed in a responsive grid with all required information visible and readable without horizontal scrolling.

### Implementation for User Story 1 - Backend

- [x] T026 Create PetController class in `backend/src/main/java/com/girado/petstore/controller/PetController.java` with GET /girado/pets endpoint that returns all pets
- [x] T027 Implement PetController.getPets() to call PetService.getAllPets() and map results to PetDTO list
- [x] T028 Add validation and error handling for empty pet list in PetController

### Implementation for User Story 1 - Frontend

- [x] T029 [P] Create PetGallery page component in `frontend/src/pages/PetGallery.tsx` that renders a responsive grid layout using Tailwind
- [x] T030 [P] Create PetCard component in `frontend/src/components/PetCard.tsx` to display individual pet information (name, type, price, age, availability, image)
- [x] T031 Create useGallery hook in `frontend/src/hooks/useGallery.ts` to fetch pets from backend and manage gallery state
- [x] T032 Wire PetGallery component to fetch and display pets using useGallery hook and map results to PetCard components
- [x] T033 Implement responsive grid layout in PetGallery using Tailwind CSS (e.g., grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4)
- [x] T034 Add loading state and empty state messaging in PetGallery component
- [x] T035 Create main routing in `frontend/src/App.tsx` to render PetGallery at root path

**Checkpoint**: User Story 1 should now be fully functional and testable independently - users can browse pets in a responsive gallery.

---

## Phase 4: User Story 2 - View Pet Details (Priority: P1)

**Goal**: Deliver a detail page where users can view complete information for a selected pet, including breed, age, price, description, and availability status.

**Independent Test**: Click on a pet card from the gallery, verify the detail page loads and displays all required information (name, type, breed, age, price, description, availability), and navigate back to gallery.

### Implementation for User Story 2 - Backend

- [x] T036 Create PetController.getPetById(petId) endpoint in `backend/src/main/java/com/girado/petstore/controller/PetController.java` that returns a single pet's details (GET /girado/pets/{petId})
- [x] T037 Implement PetService.getPetById(petId) method to fetch a single pet and handle not-found cases
- [x] T038 Add 404 error handling for missing pets in PetController.getPetById()

### Implementation for User Story 2 - Frontend

- [x] T039 [P] Create PetDetail page component in `frontend/src/pages/PetDetail.tsx` that displays full pet information
- [ ] T040 [P] Create PetDetailSection component in `frontend/src/components/PetDetailSection.tsx` to structure detail information layout
- [x] T041 Create route for pet details with dynamic parameter in `frontend/src/App.tsx` (e.g., `/pets/:petId`)
- [x] T042 Create usePetDetail hook in `frontend/src/hooks/usePetDetail.ts` to fetch single pet details
- [x] T043 Wire PetDetail component to fetch pet data using usePetDetail hook and extract petId from route params
- [x] T044 Display all pet attributes in PetDetail (name, type, breed, age, price, description, availability status, image)
- [x] T045 Add visual indicator (e.g., badge, color, text) showing availability status; disable purchase actions if unavailable
- [x] T046 Add back-to-gallery button or breadcrumb navigation in PetDetail page

**Checkpoint**: User Stories 1 AND 2 should now be fully functional and independently testable - users can browse and view details.

---

## Phase 5: User Story 3 - Search and Filter Pets (Priority: P2)

**Goal**: Enable users to narrow down the pet list by type, price range, age, and availability, with real-time gallery updates.

**Independent Test**: Apply filter criteria (e.g., type=dog, price range, availability=true) and verify the gallery updates to show only matching pets; apply criteria with zero matches and verify helpful empty state message.

### Implementation for User Story 3 - Backend

- [ ] T047 Extend PetRepository with custom query methods in `backend/src/main/java/com/girado/petstore/repository/PetRepository.java`: findByType, findByPriceRange, findByAge, findByAvailable
- [ ] T048 [P] Create PetSpecification or PetQueryBuilder in `backend/src/main/java/com/girado/petstore/repository/PetSpecification.java` for complex filtering (combines type, price, age, availability)
- [ ] T049 Extend PetService.getAllPets() to accept filter parameters (type, minPrice, maxPrice, minAge, maxAge, available, search) in `backend/src/main/java/com/girado/petstore/service/PetService.java`
- [ ] T050 Implement PetService.searchPets(filterParams) to apply filters using PetSpecification
- [ ] T051 Update PetController.getPets() to accept query parameters and pass to PetService.searchPets() in `backend/src/main/java/com/girado/petstore/controller/PetController.java`
- [ ] T052 Add validation for filter parameter ranges (e.g., minPrice < maxPrice) in PetService
- [ ] T053 Add logging for filter operations in PetService

### Implementation for User Story 3 - Frontend

- [ ] T054 [P] Create PetFilter component in `frontend/src/components/PetFilter.tsx` with controls for type, price range, age range, and availability toggle
- [ ] T055 [P] Create TypeFilter sub-component in `frontend/src/components/filters/TypeFilter.tsx` (dropdown or checkbox group: dog, cat, bird, fish)
- [ ] T056 [P] Create PriceRangeFilter sub-component in `frontend/src/components/filters/PriceRangeFilter.tsx` (min/max sliders or inputs)
- [ ] T057 [P] Create AgeRangeFilter sub-component in `frontend/src/components/filters/AgeRangeFilter.tsx` (min/max sliders or inputs)
- [ ] T058 [P] Create AvailabilityFilter sub-component in `frontend/src/components/filters/AvailabilityFilter.tsx` (toggle or checkbox)
- [ ] T059 Create useFilteredGallery hook in `frontend/src/hooks/useFilteredGallery.ts` to manage filter state and fetch filtered pets
- [ ] T060 Update PetGallery component to include PetFilter and pass selected filters to useFilteredGallery hook
- [ ] T061 Implement filter parameter serialization in `frontend/src/api/petService.ts` to construct query strings
- [ ] T062 Add real-time gallery update on filter change (debounce API calls to avoid excessive requests)
- [ ] T063 Enhance empty state messaging in PetGallery to show when no pets match the applied filters

**Checkpoint**: User Story 3 complete - users can search and filter pets by type, price, age, and availability with responsive UI updates.

---

## Phase 6: User Story 4 - Add to Cart or Wishlist via REST API (Priority: P3)

**Goal**: Enable users to save selected available pets to their cart or wishlist, with backend persistence and API-backed state management.

**Independent Test**: Add an available pet to cart/wishlist via API, verify success response; attempt to add an unavailable pet and verify rejection; retrieve cart/wishlist contents via API.

### Implementation for User Story 4 - Backend

- [ ] T064 Create CartItemController class in `backend/src/main/java/com/girado/petstore/controller/CartItemController.java` with POST /girado/cart/items endpoint
- [ ] T065 [P] Create WishlistItemController class in `backend/src/main/java/com/girado/petstore/controller/WishlistItemController.java` with POST /girado/wishlist/items endpoint
- [ ] T066 Implement CartItemService.addToCart(petId, cartKey) in `backend/src/main/java/com/girado/petstore/service/CartItemService.java` with validation: pet must be available
- [ ] T067 [P] Implement WishlistItemService.addToWishlist(petId, wishlistKey) in `backend/src/main/java/com/girado/petstore/service/WishlistItemService.java` with validation: pet must be available
- [ ] T068 Create CartItemController.addToCart() to handle POST requests and call CartItemService.addToCart()
- [ ] T069 [P] Create WishlistItemController.addToWishlist() to handle POST requests and call WishlistItemService.addToWishlist()
- [ ] T070 Add availability check in both services: throw exception if pet.available == false
- [ ] T071 [P] Implement optional GET /girado/cart?cartKey={cartKey} endpoint to retrieve cart contents in CartItemController
- [ ] T072 [P] Implement optional GET /girado/wishlist?wishlistKey={wishlistKey} endpoint to retrieve wishlist contents in WishlistItemController
- [ ] T073 Add error responses for invalid petId, missing pet, and unavailable pet cases in both controllers
- [ ] T074 [P] Add logging for cart/wishlist operations in both services

### Implementation for User Story 4 - Frontend

- [ ] T075 [P] Create AddToCartButton component in `frontend/src/components/AddToCartButton.tsx` that triggers cart API call
- [ ] T076 [P] Create AddToWishlistButton component in `frontend/src/components/AddToWishlistButton.tsx` that triggers wishlist API call
- [ ] T077 Create useCart hook in `frontend/src/hooks/useCart.ts` to manage cart state and API calls
- [ ] T078 [P] Create useWishlist hook in `frontend/src/hooks/useWishlist.ts` to manage wishlist state and API calls
- [ ] T079 Add cartService.addToCart(petId, cartKey) method in `frontend/src/api/petService.ts` (POST /girado/cart/items)
- [ ] T080 [P] Add wishlistService.addToWishlist(petId, wishlistKey) method in `frontend/src/api/petService.ts` (POST /girado/wishlist/items)
- [ ] T081 Integrate AddToCartButton and AddToWishlistButton into PetCard component (with disabled state if unavailable)
- [ ] T082 Integrate AddToCartButton and AddToWishlistButton into PetDetail component
- [ ] T083 [P] Add success toast or notification when item is added to cart/wishlist
- [ ] T084 [P] Add error handling and messaging if add-to-cart/wishlist fails (e.g., unavailable pet, network error)
- [ ] T085 Generate or retrieve persistent cartKey and wishlistKey in frontend (e.g., via localStorage or session)

**Checkpoint**: User Story 4 complete - users can add available pets to cart or wishlist with API persistence.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories, deployment readiness, and documentation.

- [ ] T086 [P] Create `backend/Dockerfile` with multi-stage build for optimized image size, base on eclipse-temurin Java 17+
- [ ] T087 [P] Create `frontend/Dockerfile` with multi-stage build (Node build stage, then nginx static serve)
- [ ] T088 Create `docker-compose.yml` for local development with backend service, frontend service, and PostgreSQL service
- [ ] T089 [P] Add `.dockerignore` files to both backend and frontend to exclude unnecessary files from Docker images
- [ ] T090 Create or update `backend/README.md` with build, run, and test instructions
- [ ] T091 [P] Create or update `frontend/README.md` with build, run, and test instructions
- [ ] T092 Add performance logging and metrics to PetService and CartItemService for monitoring query times
- [ ] T093 [P] Add input validation and sanitization to all filter parameters in PetService (prevent SQL injection, XSS)
- [ ] T094 Verify CORS configuration allows frontend origin (localhost:5173 in dev, production origin in prod)
- [ ] T095 [P] Add environment variable documentation for database URL, port, API base URL in `.env.example` files
- [ ] T095a Create `backend/.env.example` with Render-compatible variables: DATABASE_URL (auto-populated by Render), SPRING_DATASOURCE_URL, SPRING_PROFILES_ACTIVE=prod
- [ ] T095b Create `frontend/.env.example` with Render-compatible variables: VITE_API_BASE_URL (set to backend Render URL), VITE_APP_ENV=production
- [ ] T096 Run quickstart.md validation: verify local backend and frontend start, database connects, gallery loads, pet operations work
- [ ] T097 [P] Add basic loading spinners and skeleton loaders in frontend for all API call states
- [ ] T098 [P] Add accessibility features: ARIA labels, semantic HTML, keyboard navigation in gallery and filters
- [ ] T099 Test responsive layout on multiple viewports (mobile 320px, tablet 768px, desktop 1024px, large desktop 1440px+)
- [ ] T099a Validate Success Criteria SC-001 (3-action maximum): Measure user journey time from gallery load → click pet → detail view open; document result (expect 10–15 seconds for human action)
- [ ] T099b Validate Success Criteria SC-002 (2-second filter): Run backend query performance test for filtered pet list (500-pet catalog); measure response time; log results
- [ ] T099c Validate Success Criteria SC-003 (no horizontal scroll): Automated screenshot comparison on 4 standard viewports (320px, 768px, 1024px, 1440px); verify no horizontal scroll bars present
- [ ] T099d Document Success Criteria achievement in `TESTING.md` or feature completion report with metrics for SC-001–SC-006
- [ ] T100 [P] Document API versioning strategy and plan for future /girado/v2 if needed

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User Stories 1 & 2 (P1) should be completed together as they enable core browsing
  - User Story 3 (P2) extends US1 & US2 with filtering
  - User Story 4 (P3) adds cart/wishlist to US1 & US2
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 & 2 (P1)**: Can start after Foundational - No dependencies on each other but share Pet entity
- **User Story 3 (P2)**: Can start after Foundational - Extends PetService and US1 gallery component with filters
- **User Story 4 (P3)**: Can start after Foundational - Integrates cart/wishlist buttons into US1 & US2 components

### Within Each Phase

- All tasks marked [P] can run in parallel
- Tasks without [P] may depend on earlier tasks in the same phase

### Parallel Opportunities

- **Phase 1**: All backend and frontend setup tasks can run in parallel
- **Phase 2**: All entity, repository, and service tasks marked [P] can run in parallel; DTO tasks can run in parallel
- **Phase 3**: Frontend gallery and backend controller tasks can run in parallel
- **Phase 4**: Frontend detail components and backend detail endpoint can run in parallel
- **Phase 5**: Backend filtering and frontend filter UI tasks can run in parallel
- **Phase 6**: Cart and Wishlist implementations can run in parallel (CartItemController/Service vs WishlistItemController/Service)
- **Phase 7**: Docker, documentation, and polish tasks marked [P] can run in parallel

---

## Parallel Example: Phase 2 Foundational

```
# Launch all backend entities in parallel:
- T010 (Pet JPA entity)
- T011 (CartItem JPA entity)
- T012 (WishlistItem JPA entity)

# Launch all repositories in parallel:
- T013 (PetRepository)
- T014 (CartItemRepository)
- T015 (WishlistItemRepository)

# Launch all DTOs in parallel:
- T019 (PetDTO)
- T020 (CartItemDTO)
- T021 (WishlistItemDTO)

# Then proceed sequentially:
- T016 (PetService - depends on T010, T013)
- T017 (CartItemService - depends on T011, T014)
- T018 (WishlistItemService - depends on T012, T015)
```

---

## Parallel Example: Phase 6 Cart/Wishlist

```
# Launch cart and wishlist implementations in parallel:
- Cart tasks: T064, T066, T068, T071, T073, T077, T079, T081
- Wishlist tasks: T065, T067, T069, T072, T074, T078, T080, T082

# Then wire them into components:
- T083, T084, T085 (notification, error handling, persistent keys)
```

---

## Implementation Strategy

### MVP First (User Stories 1 & 2 Only)

1. Complete Phase 1: Setup (all infrastructure)
2. Complete Phase 2: Foundational (database, services, API client)
3. Complete Phase 3: User Story 1 (gallery browsing)
4. Complete Phase 4: User Story 2 (pet details)
5. **STOP and VALIDATE**: Test browsing and details independently
6. Deploy to Render if ready; consider this a complete MVP feature

### Full Feature (Add Search/Filter and Cart/Wishlist)

7. Complete Phase 5: User Story 3 (search and filter)
8. Complete Phase 6: User Story 4 (cart and wishlist)
9. Complete Phase 7: Polish & Deployment
10. **VALIDATE**: Full feature with all stories working together
11. Deploy to Render production

---

## Summary

- **Total Tasks**: 109 (updated after issue resolution)
- **Phase 1 (Setup)**: 9 tasks (added T006a for responsive breakpoint documentation)
- **Phase 2 (Foundational)**: 19 tasks (added T021a error DTO, T021b seed data)
- **Phase 3 (US1 Browse Gallery)**: 10 tasks
- **Phase 4 (US2 View Details)**: 9 tasks
- **Phase 5 (US3 Search/Filter)**: 17 tasks
- **Phase 6 (US4 Cart/Wishlist)**: 22 tasks
- **Phase 7 (Polish & Deployment)**: 22 tasks (added T095a–T095b environment vars, T099a–T099d success criteria validation)

**Parallelizable Tasks**: 47 tasks marked [P] (updated)

**Suggested MVP Scope**: Complete Phases 1, 2, 3, 4 (47 tasks total) to deliver browsing and details functionality.

**Estimated Time**: MVP 1–2 weeks with 1 backend + 1 frontend developer; Full feature 2–3 weeks.
