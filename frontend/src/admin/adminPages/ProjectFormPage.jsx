import "../adminCss/ProjectFormPage.css"
import {Navigate} from "react-router-dom";
import { useState} from "react";
import Menu from "../adminComponents/Menu.jsx";


export default function ProjectFormPage (){



    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [area,setArea]=useState()
    const [year,setYear]=useState()
    const [redirect, setRedirect] = useState(false);




    async function savePlace(e){


    }

    if (redirect) {
        return <Navigate to={'/admin/profile'} />;
    }

    return(
        <div className="project-form">
            <Menu></Menu>

                <form className="form" onSubmit={savePlace}>

                    <div className="perks">
                        <h2 >Title</h2>
                        <p >Title for your project</p>
                        <input type="text"
                               value={title}
                               onChange={e => setTitle(e.target.value)}
                               placeholder="Title for your place" />
                    </div>
                    {/*=====================================PHOTOS=====================================*/}
                    <div className="perks">
                        here will be photos component
                        {/*<PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />*/}
                    </div>

                    {/*=====================================DESCRIPTION=====================================*/}
                    <div className="perks">
                        <h2 className="text-2xl mt-4">Description</h2>
                        <p className="text-gray-500 text-sm">description of the place</p>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}/>
                    </div>

                    {/*=====================================YEAR=====================================*/}
                    <div className="perks">
                        <h2 className="text-2xl mt-4">Area</h2>
                        <p className="text-gray-500 text-sm">Your project size area</p>
                        <input type="text"
                               value={area}
                               onChange={e => setArea(e.target.value)}
                               placeholder="Your project size area" />
                    </div>

                    {/*=====================================YEAR=====================================*/}
                    <div className="perks">
                        <h2 className="text-2xl mt-4">Year</h2>
                        <p className="text-gray-500 text-sm">Year of your project</p>
                        <input type="number"
                               value={year}
                               onChange={e => setYear(e.target.value)}
                               placeholder="Year of your project" />
                    </div>



                    {/*=====================================SAVE=====================================*/}
                    <button className='save-btn '>
                        <span className="font-bold" >Save</span>
                    </button>
                </form>

        </div>
    )
}