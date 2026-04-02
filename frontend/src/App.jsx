import { Route, Routes } from "react-router-dom";
import "./App.css";

import MainPage from "./pages/MainPage.jsx";
import CatalogPage from "./pages/CatalogPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import HousePage from "./pages/HousePage.jsx";
import ReviewsPage from "./pages/ReviewPage.jsx";

import LoginPage from "./admin/adminPages/LoginPage.jsx";
import RegisterPage from "./admin/adminPages/RegisterPage.jsx";
import ProfilePage from "./admin/adminPages/ProfilePage.jsx";
import ProjectFormPage from "./admin/adminPages/ProjectFormPage.jsx";

import ProtectedRoute from "./admin/adminComponents/ProtectedRoute.jsx";

function App() {
    return (
        <Routes>

            {/* PUBLIC */}
            <Route path="/" element={<MainPage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contacts" element={<ContactPage />} />
            <Route path="/house/:id" element={<HousePage />} />
            <Route path="/reviews" element={<ReviewsPage />} />

            {/* AUTH */}
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin/register" element={<RegisterPage />} />

            {/* PROTECTED */}
            <Route
                path="/admin/profile"
                element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/profile/new"
                element={
                    <ProtectedRoute>
                        <ProjectFormPage />
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}

export default App;