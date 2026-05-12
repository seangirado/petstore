import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { usePetDetail } from '../hooks/usePetDetail';
import { petService } from '../services/petService';
import PetForm from '../components/PetForm';
export default function PetFormPage() {
    const { petId } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(petId);
    const { pet, loading, error } = usePetDetail(petId || null);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState();
    const handleSave = async (payload) => {
        setSubmitting(true);
        setSubmitError(undefined);
        try {
            if (isEditMode && petId) {
                await petService.updatePet(petId, payload);
                navigate(`/pets/${petId}`);
            }
            else {
                const created = await petService.createPet(payload);
                navigate(`/pets/${created.id}`);
            }
        }
        catch (err) {
            console.error(err);
            setSubmitError(err.response?.data?.error || 'Unable to save pet details.');
        }
        finally {
            setSubmitting(false);
        }
    };
    if (isEditMode && loading) {
        return (_jsx("main", { className: "min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8", children: _jsx("div", { className: "mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm", children: "Loading pet data..." }) }));
    }
    if (isEditMode && error) {
        return (_jsx("main", { className: "min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8", children: _jsxs("div", { className: "mx-auto max-w-4xl rounded-3xl border border-rose-200 bg-rose-50 p-10 text-center text-rose-700 shadow-sm", children: [_jsx("h1", { className: "text-xl font-semibold", children: "Unable to load pet for edit." }), _jsx("p", { className: "mt-3", children: error.error || 'Please try again later.' }), _jsx(Link, { to: "/", className: "mt-6 inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700", children: "Back to gallery" })] }) }));
    }
    return (_jsx("main", { className: "min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8", children: _jsxs("div", { className: "mx-auto max-w-5xl space-y-6", children: [_jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-semibold text-slate-900", children: isEditMode ? 'Edit Pet Listing' : 'Add a New Pet' }), _jsx("p", { className: "mt-2 text-sm text-slate-600", children: isEditMode
                                        ? 'Update the pet details and save the listing.'
                                        : 'Create a new pet listing for the gallery.' })] }), _jsx(Link, { to: "/", className: "inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700", children: "Back to gallery" })] }), _jsx(PetForm, { initialPet: pet || undefined, onSubmit: handleSave, submitLabel: isEditMode ? 'Save changes' : 'Create pet', submitting: submitting, errorMessage: submitError })] }) }));
}
//# sourceMappingURL=PetFormPage.js.map