import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PetGallery from './pages/PetGallery';
import PetDetail from './pages/PetDetail';
import PetFormPage from './pages/PetFormPage';
export default function App() {
    return (_jsx(Router, { children: _jsx("div", { className: "min-h-screen bg-gray-50", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(PetGallery, {}) }), _jsx(Route, { path: "/pets/new", element: _jsx(PetFormPage, {}) }), _jsx(Route, { path: "/pets/:petId/edit", element: _jsx(PetFormPage, {}) }), _jsx(Route, { path: "/pets/:petId", element: _jsx(PetDetail, {}) })] }) }) }));
}
//# sourceMappingURL=App.js.map