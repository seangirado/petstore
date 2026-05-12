import { useState, useEffect } from 'react';
import { petService } from '../services/petService';
export const usePetDetail = (petId) => {
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!petId) {
            setPet(null);
            setError(null);
            return;
        }
        const fetchPet = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await petService.getPetById(petId);
                setPet(data);
            }
            catch (err) {
                setError(err.response?.data || { error: err.message || 'Failed to load pet details', code: 'FETCH_ERROR' });
            }
            finally {
                setLoading(false);
            }
        };
        fetchPet();
    }, [petId]);
    return { pet, loading, error };
};
//# sourceMappingURL=usePetDetail.js.map