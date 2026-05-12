import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
function availabilityLabel(available) {
    return available ? 'Available' : 'Sold Out';
}
function availabilityClass(available) {
    return available ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800';
}
export default function PetCard({ pet }) {
    return (_jsxs(Link, { to: `/pets/${pet.id}`, className: "group block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg", children: [_jsx("div", { className: "aspect-[4/3] w-full overflow-hidden bg-slate-100", children: _jsx("img", { src: pet.imageUrl || `https://placehold.co/400x300?text=${encodeURIComponent(pet.name)}`, alt: pet.name, loading: "lazy", onError: (event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = `https://placehold.co/400x300?text=${encodeURIComponent(pet.name)}`;
                    }, className: "h-full w-full object-cover transition duration-300 group-hover:scale-105" }) }), _jsxs("div", { className: "space-y-3 p-4", children: [_jsxs("div", { className: "flex items-center justify-between gap-2", children: [_jsx("h3", { className: "text-lg font-semibold text-slate-900", children: pet.name }), _jsx("span", { className: `inline-flex rounded-full px-3 py-1 text-xs font-semibold ${availabilityClass(pet.available)}`, children: availabilityLabel(pet.available) })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-2 text-sm text-slate-500", children: [_jsx("span", { className: "rounded-full bg-slate-100 px-2 py-1", children: pet.type }), _jsx("span", { className: "rounded-full bg-slate-100 px-2 py-1", children: pet.breed })] }), _jsx("p", { className: "text-sm text-slate-600 overflow-hidden truncate", children: pet.description }), _jsxs("div", { className: "flex items-center justify-between gap-2 text-sm font-medium text-slate-900", children: [_jsxs("span", { children: ["$", pet.price.toFixed(2)] }), _jsxs("span", { children: [pet.ageMonths, " mo"] })] })] })] }));
}
//# sourceMappingURL=PetCard.js.map