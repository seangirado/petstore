import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const defaultPetRequest = {
    name: '',
    type: 'DOG',
    breed: '',
    ageMonths: 0,
    price: 0,
    description: '',
    available: true,
    imageUrl: '',
};
export default function PetForm({ initialPet, onSubmit, submitLabel, submitting, errorMessage }) {
    const [petData, setPetData] = useState(initialPet
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
        : defaultPetRequest);
    const handleChange = (field, value) => {
        setPetData((current) => ({
            ...current,
            [field]: value,
        }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        await onSubmit({
            ...petData,
            ageMonths: Number(petData.ageMonths),
            price: Number(petData.price),
        });
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm", children: [errorMessage && (_jsx("div", { className: "rounded-2xl bg-rose-50 p-4 text-rose-700", children: errorMessage })), _jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [_jsxs("label", { className: "block", children: [_jsx("span", { className: "text-sm font-semibold text-slate-700", children: "Name" }), _jsx("input", { type: "text", value: petData.name, onChange: (event) => handleChange('name', event.target.value), className: "mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white", required: true })] }), _jsxs("label", { className: "block", children: [_jsx("span", { className: "text-sm font-semibold text-slate-700", children: "Type" }), _jsxs("select", { value: petData.type, onChange: (event) => handleChange('type', event.target.value), className: "mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white", required: true, children: [_jsx("option", { value: "DOG", children: "DOG" }), _jsx("option", { value: "CAT", children: "CAT" }), _jsx("option", { value: "BIRD", children: "BIRD" }), _jsx("option", { value: "FISH", children: "FISH" })] })] }), _jsxs("label", { className: "block", children: [_jsx("span", { className: "text-sm font-semibold text-slate-700", children: "Breed" }), _jsx("input", { type: "text", value: petData.breed, onChange: (event) => handleChange('breed', event.target.value), className: "mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white", required: true })] }), _jsxs("label", { className: "block", children: [_jsx("span", { className: "text-sm font-semibold text-slate-700", children: "Age (months)" }), _jsx("input", { type: "number", min: 0, value: petData.ageMonths, onChange: (event) => handleChange('ageMonths', Number(event.target.value)), className: "mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white", required: true })] }), _jsxs("label", { className: "block", children: [_jsx("span", { className: "text-sm font-semibold text-slate-700", children: "Price" }), _jsx("input", { type: "number", min: 0, step: "0.01", value: petData.price, onChange: (event) => handleChange('price', Number(event.target.value)), className: "mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white", required: true })] }), _jsxs("label", { className: "block", children: [_jsx("span", { className: "text-sm font-semibold text-slate-700", children: "Availability" }), _jsxs("select", { value: petData.available ? 'true' : 'false', onChange: (event) => handleChange('available', event.target.value === 'true'), className: "mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white", children: [_jsx("option", { value: "true", children: "Available" }), _jsx("option", { value: "false", children: "Sold Out" })] })] })] }), _jsxs("label", { className: "block", children: [_jsx("span", { className: "text-sm font-semibold text-slate-700", children: "Description" }), _jsx("textarea", { value: petData.description, onChange: (event) => handleChange('description', event.target.value), rows: 4, className: "mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white", required: true })] }), _jsxs("label", { className: "block", children: [_jsx("span", { className: "text-sm font-semibold text-slate-700", children: "Image URL" }), _jsx("input", { type: "url", value: petData.imageUrl, onChange: (event) => handleChange('imageUrl', event.target.value), className: "mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white", placeholder: "https://example.com/image.jpg" })] }), _jsx("button", { type: "submit", disabled: submitting, className: "inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400", children: submitting ? 'Saving...' : submitLabel })] }));
}
//# sourceMappingURL=PetForm.js.map