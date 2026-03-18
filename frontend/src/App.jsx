import {Route,Routes} from 'react-router-dom'
import "./App.css"
import MainPage from "./pages/MainPage.jsx";
import CatalogPage from "./pages/CatalogPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";

function App() {
    return (
        <Routes>
                <Route path="/" element={<MainPage></MainPage>}></Route>
                <Route path='/catalog' element={<CatalogPage></CatalogPage>}></Route>
                <Route path='/about' element={<MainPage></MainPage>}></Route>
                <Route path='/contacts' element={<ContactPage></ContactPage>}></Route>
        </Routes>

    )
}

export default App