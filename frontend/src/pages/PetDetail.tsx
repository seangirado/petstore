import { useNavigate, useParams, Link } from 'react-router-dom'
import { usePetDetail } from '../hooks/usePetDetail'
import { useCart } from '../hooks/useCart'
import { useWishlist } from '../hooks/useWishlist'
import { petService } from '../services/petService'

export default function PetDetail() {
  const { petId } = useParams<{ petId: string }>()
  const navigate = useNavigate()
  const { pet, loading, error } = usePetDetail(petId || null)
  const { addToCart, loading: cartLoading } = useCart()
  const { addToWishlist, loading: wishlistLoading } = useWishlist()

  const handleDelete = async () => {
    if (!petId || !pet) return
    const confirmed = window.confirm('Delete this pet listing? This cannot be undone.')
    if (!confirmed) return

    try {
      await petService.deletePet(petId)
      navigate('/')
    } catch (e) {
      console.error(e)
      alert('Unable to delete pet. Please try again.')
    }
  }

  const handleAddToCart = async () => {
    if (!petId) return
    try {
      await addToCart(petId)
      alert('Pet added to cart!')
    } catch (e) {
      console.error(e)
      alert('Unable to add pet to cart. Please try again.')
    }
  }

  const handleAddToWishlist = async () => {
    if (!petId) return
    try {
      await addToWishlist(petId)
      alert('Pet added to wishlist!')
    } catch (e) {
      console.error(e)
      alert('Unable to add pet to wishlist. Please try again.')
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
          Loading pet details...
        </div>
      </main>
    )
  }

  if (error || !pet) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-rose-200 bg-rose-50 p-10 text-center text-rose-700 shadow-sm">
          <h1 className="text-xl font-semibold">Unable to load pet details.</h1>
          <p className="mt-3">{error?.error || 'Pet not found or there was a network error.'}</p>
          <Link to="/" className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700">
            Back to gallery
          </Link>
        </div>
      </main>
    )
  }

  const imageUrl = pet.imageUrl || `https://placehold.co/600x450?text=${encodeURIComponent(pet.name)}`

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-600 transition"
        >
          ← Back to Gallery
        </Link>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">{pet.name}</h1>
            <p className="mt-2 text-sm text-slate-600">Detailed information for this pet.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to={`/pets/${pet.id}/edit`}
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Edit Pet
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center justify-center rounded-full bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-500"
            >
              Delete Pet
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <img
              src={imageUrl}
              alt={pet.name}
              onError={(event) => {
                event.currentTarget.src = `https://placehold.co/600x450?text=${encodeURIComponent(pet.name)}`
              }}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">{pet.type}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">{pet.breed}</span>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${pet.available ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                {pet.available ? 'Available' : 'Sold Out'}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Price</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">${pet.price.toFixed(2)}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Age</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{pet.ageMonths} mo</p>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900">About this pet</h2>
              <p className="text-slate-600">{pet.description}</p>
            </div>

            {pet.available && (
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={cartLoading}
                  className="flex-1 inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-50"
                >
                  {cartLoading ? 'Adding...' : 'Add to Cart'}
                </button>
                <button
                  onClick={handleAddToWishlist}
                  disabled={wishlistLoading}
                  className="flex-1 inline-flex items-center justify-center rounded-full bg-pink-600 px-5 py-3 text-sm font-semibold text-white hover:bg-pink-500 disabled:opacity-50"
                >
                  {wishlistLoading ? 'Adding...' : 'Add to Wishlist'}
                </button>
              </div>
            )}

            <div className="grid gap-4 rounded-3xl bg-slate-50 p-6 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-800">Listing ID</span>
                <span>{pet.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-800">Created</span>
                <span>{new Date(pet.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-800">Last updated</span>
                <span>{new Date(pet.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
