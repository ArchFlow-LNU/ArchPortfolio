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
                const isFirst = addedPhotos.length === 0 && uploadedUrls.length === 0;
                uploadedUrls.push({ imageUrl: res.data.url, isMain: isFirst  });
            } catch (err) {
                console.error(err);
            }
        }
        onChange([...addedPhotos, ...uploadedUrls]);
    }

    function selectMain(selectedUrl) {
        const updatedPhotos = addedPhotos.map(photo => ({
            ...photo,
            isMain: photo.imageUrl === selectedUrl
        }));
        onChange(updatedPhotos);
    }

    function removePhoto(url) {
        onChange(addedPhotos.filter(photo => photo.imageUrl !== url));
    }

    return (
        <div className="photos-uploader">
            <div className="uploaded-photos-grid">
                {addedPhotos.length > 0 &&  addedPhotos.map((url) => (
                    <div key={url.imageUrl} className="photo-card">
                        <img src={`${import.meta.env.VITE_API_URL}${url.imageUrl}`} alt="Project" />

                        <button
                            className={`photo-main-btn ${url.isMain ? "active" : ""}`}
                            onClick={() => selectMain(url.imageUrl)}
                            type="button"
                        >

                            <img
                                src={url.isMain ? "/imgs/yellowstar.png" : "/imgs/plus.png"}
                                alt="Main"
                                style={{ width: '20px', height: '20px', filter: url.isMain ? 'none' : 'grayscale(1)' }}
                            />
                        </button>

                        <button
                            className={`photo-main-btn ${url.isMain ? "active" : ""}`}
                            onClick={() => selectMain(url.imageUrl)}
                            type="button"
                        >
                            <img
                                src={url.isMain ? "/imgs/yellowstar.png" : "/imgs/yellowstarempty.png"}
                                alt="Main"
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    filter: url.isMain ? 'none' : 'grayscale(1)'
                                }}
                            />
                        </button>

                        <button className="remove-photo-btn" onClick={() => removePhoto(url.imageUrl)} type="button">
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