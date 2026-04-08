
import axios from "axios";

export default function PhotosUploader({ addedPhotos, onChange }) {

    const API = "http://localhost:5000";


    async function uploadPhoto(e) {
        const files = e.target.files;
        const uploadedUrls = [];
        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append("file", files[i]);
            try {
                const res = await axios.post(`${API}/api/upload`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                uploadedUrls.push(res.data.url); // або як бекенд повертає URL
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


            <div className="uploaded-photos">
                {addedPhotos.length > 0 &&
                    addedPhotos.map((url) => (
                        <div key={url} className="photo-item">
                            <img src={url} alt="Project" />
                            <button onClick={() => removePhoto(url)}>Remove</button>
                        </div>
                    ))}
            </div>

            <input type="file" multiple onChange={uploadPhoto} />
        </div>
    );
}