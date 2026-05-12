import { useState, type FormEvent } from 'react'
import { Pet, PetRequest } from '../services/petService'

interface PetFormProps {
  initialPet?: Pet
  onSubmit: (payload: PetRequest) => Promise<void>
  submitLabel: string
  submitting: boolean
  errorMessage?: string
}

const defaultPetRequest: PetRequest = {
  name: '',
  type: 'DOG',
  breed: '',
  ageMonths: 0,
  price: 0,
  description: '',
  available: true,
  imageUrl: '',
}

export default function PetForm({ initialPet, onSubmit, submitLabel, submitting, errorMessage }: PetFormProps) {
  const [petData, setPetData] = useState<PetRequest>(
    initialPet
      ? {
          name: initialPet.name,
          type: initialPet.type,
          breed: initialPet.breed,
          ageMonths: initialPet.ageMonths,
          price: initialPet.price,
          description: initialPet.description,
          available: initialPet.available,
          imageUrl: initialPet.imageUrl || '',
        }
      : defaultPetRequest,
  )

  const handleChange = (field: keyof PetRequest, value: string | boolean | number) => {
    setPetData((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await onSubmit({
      ...petData,
      ageMonths: Number(petData.ageMonths),
      price: Number(petData.price),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      {errorMessage && (
        <div className="rounded-2xl bg-rose-50 p-4 text-rose-700">
          {errorMessage}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Name</span>
          <input
            type="text"
            value={petData.name}
            onChange={(event) => handleChange('name', event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Type</span>
          <select
            value={petData.type}
            onChange={(event) => handleChange('type', event.target.value as Pet['type'])}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            required
          >
            <option value="DOG">DOG</option>
            <option value="CAT">CAT</option>
            <option value="BIRD">BIRD</option>
            <option value="FISH">FISH</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Breed</span>
          <input
            type="text"
            value={petData.breed}
            onChange={(event) => handleChange('breed', event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Age (months)</span>
          <input
            type="number"
            min={0}
            value={petData.ageMonths}
            onChange={(event) => handleChange('ageMonths', Number(event.target.value))}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Price</span>
          <input
            type="number"
            min={0}
            step="0.01"
            value={petData.price}
            onChange={(event) => handleChange('price', Number(event.target.value))}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Availability</span>
          <select
            value={petData.available ? 'true' : 'false'}
            onChange={(event) => handleChange('available', event.target.value === 'true')}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
          >
            <option value="true">Available</option>
            <option value="false">Sold Out</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-slate-700">Description</span>
        <textarea
          value={petData.description}
          onChange={(event) => handleChange('description', event.target.value)}
          rows={4}
          className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
          required
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-slate-700">Image URL</span>
        <input
          type="url"
          value={petData.imageUrl}
          onChange={(event) => handleChange('imageUrl', event.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
          placeholder="https://example.com/image.jpg"
        />
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {submitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  )
}
