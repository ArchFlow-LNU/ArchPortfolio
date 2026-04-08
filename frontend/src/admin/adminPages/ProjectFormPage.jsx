import "../adminCss/ProjectFormPage.css";
import { Navigate } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Menu from "../adminComponents/Menu.jsx";
import PhotosUploader from "../adminComponents/PhotosUploader.jsx";

export default function ProjectFormPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [area, setArea] = useState("");
    const [year, setYear] = useState("");
    const [redirect, setRedirect] = useState(false);

    const [categoryId, setCategoryId] = useState(""); // новий стан
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`${API}/api/projectcategories`)
            .then(res => setCategories(res.data))
            .catch(err => console.error(err));
    }, []);

    const API = "http://localhost:5000";

    async function savePlace(e) {
        e.preventDefault();

        const projectData = { title, description, area, year, categoryId: parseInt(categoryId) };

        try {
            // 1. Створюємо проект
            const res = await axios.post(`${API}/api/projects`, projectData);
            const projectId = res.data.id;

            // 2. Додаємо фото
            for (const url of addedPhotos) {
                await axios.post(`${API}/api/projects/${projectId}/images`, {
                    imageUrl: url,
                    isMain: false,
                });
            }

            setRedirect(true);
        } catch (err) {
            console.error(err);
            alert("Failed to save project");
        }
    }

    if (redirect) {
        return <Navigate to={"/admin/profile"} />;
    }

    return (
        <div className="project-form">
            <Menu />
            <form className="form" onSubmit={savePlace}>
                {/* TITLE */}
                <div className="form-group">
                    <h2>Title</h2>
                    <p>Title for your project</p>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title for your project"
                        required
                    />
                </div>
                <div className="form-group">
                    <h2>Category</h2>
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                    >
                        <option value="">Select category</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                {/* PHOTOS */}
                <div className="form-group-photo">
                    <h2>Photos</h2>
                    <p>Add photos for your project (upload or URL)</p>
                    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                </div>

                {/* DESCRIPTION */}
                <div className="form-group">
                    <h2>Description</h2>
                    <p>Description of the project</p>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your project"
                        required
                    />
                </div>

                {/* AREA */}
                <div className="form-group">
                    <h2>Area</h2>
                    <p>Your project size area</p>
                    <input
                        type="text"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="Project area"
                        required
                    />
                </div>

                {/* YEAR */}
                <div className="form-group">
                    <h2>Year</h2>
                    <p>Year of your project</p>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="Project year"
                        required
                    />
                </div>

                <button type="submit" className="save-btn">
                    Save
                </button>
            </form>
        </div>
    );
}