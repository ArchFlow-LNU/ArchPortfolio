import "../adminCss/ProjectFormPage.css";
import {Navigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../adminComponents/Menu.jsx";
import PhotosUploader from "../adminComponents/PhotosUploader.jsx";

export default function ProjectFormPage() {
    const {id}=useParams()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [area, setArea] = useState("");
    const [year, setYear] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const [redirect, setRedirect] = useState(false);

    const API = "http://localhost:5000";


    useEffect(() => {
        axios.get(`${API}/api/projectcategories`).then(res => {
            setCategories(res.data);
        }).catch(err => console.error("Error fetching categories", err));
    }, []);

    async function savePlace(e) {
        e.preventDefault();
        const projectData = { title, description, area, year, categoryId: parseInt(categoryId) };
        try {
            const res = await axios.post(`${API}/api/projects`, projectData);
            const projectId = res.data.id;
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

    if (redirect) return <Navigate to={"/admin/profile"} />;

    return (
        <div className="project-form-container">
            <Menu />
            <h1 className="main-title">New Project</h1>

            <form className="admin-form" onSubmit={savePlace}>
                <div className="form-header">
                    <h2>Let's start.</h2>
                    <p>Tell me about your project:</p>
                </div>

                <div className="form-grid">
                    {/* TITLE */}
                    <div className="form-group">
                        <label>Title</label>
                        <small>Short and catchy title</small>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ex: Modern Villa"
                            required
                        />
                    </div>

                    {/* CATEGORY */}
                    <div className="form-group">
                        <label>Category</label>
                        <small>Select project type</small>
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required
                        >
                            <option value="">Choose...</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* PHOTOS */}
                <div className="form-group-full">
                    <label>Photos</label>
                    <small>The more, the better (upload or URL)</small>
                    <div className="uploader-wrapper">
                        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                    </div>
                </div>

                {/* DESCRIPTION */}
                <div className="form-group-full">
                    <label>Description</label>
                    <small>Write what makes this project special</small>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Detailed description..."
                        required
                    />
                </div>

                <div className="form-grid">
                    {/* AREA */}
                    <div className="form-group">
                        <label>Area (m²)</label>
                        <input
                            type="text"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            placeholder="Ex: 150"
                            required
                        />
                    </div>

                    {/* YEAR */}
                    <div className="form-group">
                        <label>Year</label>
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            placeholder="2024"
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="save-btn">
                    Save Project
                </button>
            </form>
        </div>
    );
}