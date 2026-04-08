import Menu from "../adminComponents/Menu.jsx";
import Projects from "../adminComponents/Projects.jsx";
import "../adminCss/ProfilePage.css"

export default function ProfilePage() {
    return (
        <div className="profile-page">
            <div><Menu></Menu></div>
            <div> <Projects></Projects></div>

        </div>
    )
}