import { Link } from 'react-router-dom'
import PetCard from '../components/PetCard'
import { useGallery } from '../hooks/useGallery'

export default function PetGallery() {
  const { pets, loading, error, refetch } = useGallery()

  const handlePetDeleted = () => {
    refetch()
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Pet Gallery</h1>
            <p className="mt-2 text-sm text-slate-600">
              Browse adoptable pets with price, age, breed, and availability details.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={refetch}
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Refresh
            </button>
            <Link
              to="/pets/new"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Add New Pet
            </Link>
          </div>
        </div>

        {loading && (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
            Loading pets... please wait.
          </div>
        )}

        {error && (
          <div className="rounded-3xl border border-slate-300 bg-slate-100 p-8 text-center text-slate-700 shadow-sm">
            <p className="text-base font-semibold">Unable to load pets.</p>
            <p>{error.error || 'Please try again later.'}</p>
          </div>
        )}

        {!loading && !error && pets.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-700 shadow-sm">
            <p className="text-lg font-semibold">No pets available right now.</p>
            <p className="mt-2 text-sm text-slate-500">Check back later for new arrivals.</p>
          </div>
        )}

        {!loading && !error && pets.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} onDelete={handlePetDeleted} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
