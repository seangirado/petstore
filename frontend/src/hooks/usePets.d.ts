import { Pet, ErrorResponse } from '../services/petService';
/**
 * Custom hook for fetching and managing pet data.
 */
export declare const usePets: () => {
    pets: Pet[];
    loading: boolean;
    error: ErrorResponse | null;
    refetch: () => Promise<void>;
};
/**
 * Custom hook for fetching a single pet by ID.
 */
export declare const usePetById: (petId: string | null) => {
    pet: Pet | null;
    loading: boolean;
    error: ErrorResponse | null;
};
/**
 * Custom hook for searching and filtering pets.
 */
export declare const usePetSearch: (initialQuery?: string) => {
    results: Pet[];
    loading: boolean;
    error: ErrorResponse | null;
    search: (query: string) => Promise<void>;
};
/**
 * Custom hook for filtered pet searches.
 */
export declare const useFilteredPets: (filters: {
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    minAge?: number;
    maxAge?: number;
    available?: boolean;
    search?: string;
}) => {
    results: Pet[];
    loading: boolean;
    error: ErrorResponse | null;
};
//# sourceMappingURL=usePets.d.ts.map