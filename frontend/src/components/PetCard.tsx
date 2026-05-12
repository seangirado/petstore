import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Pet, petService } from '../services/petService'
import { useCart } from '../hooks/useCart'
import { useWishlist } from '../hooks/useWishlist'

interface PetCardProps {
  pet: Pet
  onDelete?: (petId: string) => void
}

function availabilityLabel(available: boolean) {
  return available ? 'Available' : 'Sold Out'
}

function availabilityClass(available: boolean) {
  return available ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
}

export default function PetCard({ pet, onDelete }: PetCardProps) {
  const navigate = useNavigate()
  const { addToCart, loading: cartLoading } = useCart()
  const { addToWishlist, loading: wishlistLoading } = useWishlist()
  const [deleting, setDeleting] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(pet.id).then(() => {
      alert('Pet added to cart!')
    }).catch(() => {
      alert('Unable to add pet to cart. Please try again.')
    })
  }

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToWishlist(pet.id).then(() => {
      alert('Pet added to wishlist!')
    }).catch(() => {
      alert('Unable to add pet to wishlist. Please try again.')
    })
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(`/pets/${pet.id}/edit`)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const confirmed = window.confirm('Delete this pet listing? This cannot be undone.')
    if (!confirmed) return

    setDeleting(true)
    petService.deletePet(pet.id).then(() => {
      if (onDelete) onDelete(pet.id)
    }).catch(() => {
      alert('Unable to delete pet. Please try again.')
      setDeleting(false)
    })
  }

  return (
    <Link
      to={`/pets/${pet.id}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={pet.imageUrl || `https://placehold.co/400x300?text=${encodeURIComponent(pet.name)}`}
          alt={pet.name}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null
            event.currentTarget.src = `https://placehold.co/400x300?text=${encodeURIComponent(pet.name)}`
          }}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-slate-900">{pet.name}</h3>
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${availabilityClass(pet.available)}`}>
            {availabilityLabel(pet.available)}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <span className="rounded-full bg-slate-100 px-2 py-1">{pet.type}</span>
          <span className="rounded-full bg-slate-100 px-2 py-1">{pet.breed}</span>
        </div>
        <p className="text-sm text-slate-600 overflow-hidden truncate">{pet.description}</p>
        <div className="flex items-center justify-between gap-2 text-sm font-medium text-slate-900">
          <span>${pet.price.toFixed(2)}</span>
          <span>{pet.ageMonths} mo</span>
        </div>

        <div className="mt-auto space-y-2 pt-3">
          {pet.available && (
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                disabled={cartLoading}
                className="flex-1 rounded-full bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-500 disabled:opacity-50"
              >
                {cartLoading ? 'Adding...' : 'Cart'}
              </button>
              <button
                onClick={handleAddToWishlist}
                disabled={wishlistLoading}
                className="flex-1 rounded-full bg-pink-600 px-3 py-2 text-xs font-semibold text-white hover:bg-pink-500 disabled:opacity-50"
              >
                {wishlistLoading ? 'Adding...' : 'Wishlist'}
              </button>
            </div>
          )}
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="flex-1 rounded-full bg-slate-700 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex-1 rounded-full bg-rose-600 px-3 py-2 text-xs font-semibold text-white hover:bg-rose-500 disabled:opacity-50"
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
