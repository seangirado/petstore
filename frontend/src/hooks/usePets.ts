import { useState, useEffect, useCallback } from 'react';
import { Pet, petService, ErrorResponse } from '../services/petService';

/**
 * Custom hook for fetching and managing pet data.
 */
export const usePets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorResponse | null>(null);

  const fetchPets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await petService.getAllPets();
      setPets(data);
    } catch (err: any) {
      const apiError = err?.response?.data;
      setError(
        apiError ||
          (err instanceof Error
            ? { error: err.message, code: 'FETCH_ERROR' }
            : { error: 'Failed to fetch pets', code: 'FETCH_ERROR' })
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  return { pets, loading, error, refetch: fetchPets };
};

/**
 * Custom hook for fetching a single pet by ID.
 */
export const usePetById = (petId: string | null) => {
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorResponse | null>(null);

  useEffect(() => {
    if (!petId) {
      setPet(null);
      return;
    }

    const fetchPet = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await petService.getPetById(petId);
        setPet(data);
      } catch (err: any) {
        setError(err.response?.data || { error: 'Failed to fetch pet', code: 'FETCH_ERROR' });
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [petId]);

  return { pet, loading, error };
};

/**
 * Custom hook for searching and filtering pets.
 */
export const usePetSearch = (initialQuery: string = '') => {
  const [results, setResults] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorResponse | null>(null);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await petService.searchPets(query);
      setResults(data);
    } catch (err: any) {
      setError(err.response?.data || { error: 'Search failed', code: 'SEARCH_ERROR' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    search(initialQuery);
  }, [initialQuery, search]);

  return { results, loading, error, search };
};

/**
 * Custom hook for filtered pet searches.
 */
export const useFilteredPets = (filters: {
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  minAge?: number;
  maxAge?: number;
  available?: boolean;
  search?: string;
}) => {
  const [results, setResults] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorResponse | null>(null);

  useEffect(() => {
    const fetchFiltered = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await petService.getFilteredPets(filters);
        setResults(data);
      } catch (err: any) {
        setError(err.response?.data || { error: 'Filter failed', code: 'FILTER_ERROR' });
      } finally {
        setLoading(false);
      }
    };

    fetchFiltered();
  }, [filters]);

  return { results, loading, error };
};
