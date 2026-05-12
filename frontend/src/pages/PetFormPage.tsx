import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { usePetDetail } from '../hooks/usePetDetail'
import { petService, PetRequest } from '../services/petService'
import PetForm from '../components/PetForm'

export default function PetFormPage() {
  const { petId } = useParams<{ petId: string }>()
  const navigate = useNavigate()
  const isEditMode = Boolean(petId)
  const { pet, loading, error } = usePetDetail(petId || null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | undefined>()

  const handleSave = async (payload: PetRequest) => {
    setSubmitting(true)
    setSubmitError(undefined)
    try {
      if (isEditMode && petId) {
        await petService.updatePet(petId, payload)
        navigate(`/pets/${petId}`)
      } else {
        const created = await petService.createPet(payload)
        navigate(`/pets/${created.id}`)
      }
    } catch (err: any) {
      console.error(err)
      setSubmitError(err.response?.data?.error || 'Unable to save pet details.')
    } finally {
      setSubmitting(false)
    }
  }

  if (isEditMode && loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
          Loading pet data...
        </div>
      </main>
    )
  }

  if (isEditMode && error) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-rose-200 bg-rose-50 p-10 text-center text-rose-700 shadow-sm">
          <h1 className="text-xl font-semibold">Unable to load pet for edit.</h1>
          <p className="mt-3">{error.error || 'Please try again later.'}</p>
          <Link to="/" className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700">
            Back to gallery
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">
              {isEditMode ? 'Edit Pet Listing' : 'Add a New Pet'}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              {isEditMode
                ? 'Update the pet details and save the listing.'
                : 'Create a new pet listing for the gallery.'}
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Back to gallery
          </Link>
        </div>

        <PetForm
          initialPet={pet || undefined}
          onSubmit={handleSave}
          submitLabel={isEditMode ? 'Save changes' : 'Create pet'}
          submitting={submitting}
          errorMessage={submitError}
        />
      </div>
    </main>
  )
}
