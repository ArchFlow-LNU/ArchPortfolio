import HouseVariants from "../components/HouseVariants.jsx";
import BestProjects from "../components/BestProjects.jsx";
import NavBar from "../components/NavBar.jsx";

export default function CatalogPage(){
    return (
        <div className="catalog-page">
            <NavBar cl="catalog" />
            <HouseVariants />
        </div>
    )
}