import { useState, useEffect } from 'react'
import { Pet, petService, ErrorResponse } from '../services/petService'

export const usePetDetail = (petId: string | null) => {
  const [pet, setPet] = useState<Pet | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<ErrorResponse | null>(null)

  useEffect(() => {
    if (!petId) {
      setPet(null)
      setError(null)
      return
    }

    const fetchPet = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await petService.getPetById(petId)
        setPet(data)
      } catch (err: any) {
        setError(err.response?.data || { error: err.message || 'Failed to load pet details', code: 'FETCH_ERROR' })
      } finally {
        setLoading(false)
      }
    }

    fetchPet()
  }, [petId])

  return { pet, loading, error }
}
