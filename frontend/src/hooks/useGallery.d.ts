/**
 * Featured gallery hook for the Pet Gallery page.
 */
export declare const useGallery: () => {
    pets: import("../services/petService").Pet[];
    loading: boolean;
    error: import("../services/petService").ErrorResponse | null;
    refetch: () => Promise<void>;
};
//# sourceMappingURL=useGallery.d.ts.map