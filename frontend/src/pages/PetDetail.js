import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate, useParams, Link } from 'react-router-dom';
import { usePetDetail } from '../hooks/usePetDetail';
import { petService } from '../services/petService';
export default function PetDetail() {
    const { petId } = useParams();
    const navigate = useNavigate();
    const { pet, loading, error } = usePetDetail(petId || null);
    const handleDelete = async () => {
        if (!petId || !pet)
            return;
        const confirmed = window.confirm('Delete this pet listing? This cannot be undone.');
        if (!confirmed)
            return;
        try {
            await petService.deletePet(petId);
            navigate('/');
        }
        catch (e) {
            console.error(e);
            alert('Unable to delete pet. Please try again.');
        }
    };
    if (loading) {
        return (_jsx("main", { className: "min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8", children: _jsx("div", { className: "mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm", children: "Loading pet details..." }) }));
    }
    if (error || !pet) {
        return (_jsx("main", { className: "min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8", children: _jsxs("div", { className: "mx-auto max-w-4xl rounded-3xl border border-rose-200 bg-rose-50 p-10 text-center text-rose-700 shadow-sm", children: [_jsx("h1", { className: "text-xl font-semibold", children: "Unable to load pet details." }), _jsx("p", { className: "mt-3", children: error?.error || 'Pet not found or there was a network error.' }), _jsx(Link, { to: "/", className: "mt-6 inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700", children: "Back to gallery" })] }) }));
    }
    const imageUrl = pet.imageUrl || `https://placehold.co/600x450?text=${encodeURIComponent(pet.name)}`;
    return (_jsx("main", { className: "min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8", children: _jsxs("div", { className: "mx-auto max-w-6xl space-y-6", children: [_jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-semibold text-slate-900", children: pet.name }), _jsx("p", { className: "mt-2 text-sm text-slate-600", children: "Detailed information for this pet." })] }), _jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsx(Link, { to: `/pets/${pet.id}/edit`, className: "inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700", children: "Edit Pet" }), _jsx("button", { type: "button", onClick: handleDelete, className: "inline-flex items-center justify-center rounded-full bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-500", children: "Delete Pet" })] })] }), _jsxs("div", { className: "grid gap-6 lg:grid-cols-[1.4fr_1fr]", children: [_jsx("div", { className: "overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm", children: _jsx("img", { src: imageUrl, alt: pet.name, onError: (event) => {
                                    event.currentTarget.src = `https://placehold.co/600x450?text=${encodeURIComponent(pet.name)}`;
                                }, className: "h-full w-full object-cover" }) }), _jsxs("div", { className: "space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [_jsx("span", { className: "rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600", children: pet.type }), _jsx("span", { className: "rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600", children: pet.breed }), _jsx("span", { className: `rounded-full px-3 py-1 text-xs font-semibold ${pet.available ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`, children: pet.available ? 'Available' : 'Sold Out' })] }), _jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [_jsxs("div", { className: "rounded-3xl bg-slate-50 p-5", children: [_jsx("p", { className: "text-sm text-slate-500", children: "Price" }), _jsxs("p", { className: "mt-2 text-2xl font-semibold text-slate-900", children: ["$", pet.price.toFixed(2)] })] }), _jsxs("div", { className: "rounded-3xl bg-slate-50 p-5", children: [_jsx("p", { className: "text-sm text-slate-500", children: "Age" }), _jsxs("p", { className: "mt-2 text-2xl font-semibold text-slate-900", children: [pet.ageMonths, " mo"] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h2", { className: "text-lg font-semibold text-slate-900", children: "About this pet" }), _jsx("p", { className: "text-slate-600", children: pet.description })] }), _jsxs("div", { className: "grid gap-4 rounded-3xl bg-slate-50 p-6 text-sm text-slate-600", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "font-medium text-slate-800", children: "Listing ID" }), _jsx("span", { children: pet.id })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "font-medium text-slate-800", children: "Created" }), _jsx("span", { children: new Date(pet.createdAt).toLocaleDateString() })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "font-medium text-slate-800", children: "Last updated" }), _jsx("span", { children: new Date(pet.updatedAt).toLocaleDateString() })] })] })] })] })] }) }));
}
//# sourceMappingURL=PetDetail.js.map