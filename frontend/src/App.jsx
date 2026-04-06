import {Route,Routes} from 'react-router-dom'
import "./App.css"
import MainPage from "./pages/MainPage.jsx";
import CatalogPage from "./pages/CatalogPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import LoginPage from "./admin/adminPages/LoginPage.jsx";
import RegisterPage from "./admin/adminPages/RegisterPage.jsx";
import ProfilePage from "./admin/adminPages/ProfilePage.jsx";
import ProjectFormPage from "./admin/adminPages/ProjectFormPage.jsx";
import HousePage from "./pages/HousePage.jsx";
import ReviewsPage from "./pages/ReviewsPage.jsx";

function App() {
    return (
        <Routes>
                <Route path="/" element={<MainPage></MainPage>}></Route>
                <Route path='/catalog' element={<CatalogPage></CatalogPage>}></Route>
                <Route path='/about' element={<AboutPage></AboutPage>}></Route>
                <Route path='/contacts' element={<ContactPage></ContactPage>}></Route>
                <Route path="/admin/login" element={<LoginPage></LoginPage>}></Route>
                <Route path="/admin/register" element={<RegisterPage></RegisterPage>}></Route>
                <Route path="/admin/profile" element={<ProfilePage></ProfilePage>}></Route>
                <Route path="/admin/profile/new" element={<ProjectFormPage></ProjectFormPage>}></Route>
                <Route path="/house/:id" element={<HousePage />} />
                <Route path="/reviews" element={<ReviewsPage />} />
        </Routes>

    )
}

export default App