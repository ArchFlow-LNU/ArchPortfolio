import '../adminCss/PhotosUploader.css'

import api from '../../api/axios.js'

export default function PhotosUploader({ addedPhotos, onChange }) {


    async function uploadPhoto(e) {
        const files = e.target.files;
        const uploadedUrls = [];
        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append("file", files[i]);
            try {
                const res = await api.post(`/api/upload`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                uploadedUrls.push(res.data.url);
            } catch (err) {
                console.error(err);
            }
        }
        onChange([...addedPhotos, ...uploadedUrls]);
    }

    function removePhoto(url) {
        onChange(addedPhotos.filter(photo => photo !== url));
    }

    return (
        <div className="photos-uploader">
            <div className="uploaded-photos-grid">
                {addedPhotos.length > 0 &&  addedPhotos.map((url) => (
                    <div key={url} className="photo-card">
                        <img src={`http://localhost:5000/uploads/${url}`} alt="Project" />
                        <button className="remove-photo-btn" onClick={() => removePhoto(url)} type="button">
                            <img src="/imgs/bin.png" alt="Delete" />
                        </button>
                    </div>

                    ))}


                <label className="upload-button">
                    <input type="file" multiple onChange={uploadPhoto} hidden />
                    <div className="upload-icon">
                        <span>+</span>
                        <p>Add photo</p>
                    </div>
                </label>
            </div>
        </div>
    );
}