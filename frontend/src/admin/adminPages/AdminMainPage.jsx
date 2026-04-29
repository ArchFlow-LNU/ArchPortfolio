import Menu from "../adminComponents/Menu.jsx";
import '../adminCss/AdminMainPage.css'
import {useEffect, useMemo, useState} from "react";
import api from "../../api/axios.js";
import {Link} from "react-router-dom";

export default function AdminMainPage() {
    const [projects, setProjects] = useState([]);
    const [reviews, setReviews] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectsRes = await api.get("/api/projects");
                setProjects(projectsRes.data);

                const reviewsRes = await api .get("/api/reviews");
                setReviews(reviewsRes.data);
            } catch (e) {
                console.error("eror with data download:", e);
            }
        };
        fetchData();
    }, []);

    const avgRating = useMemo(()=>{
        if(reviews.length === 0)return 0
        const total = reviews.reduce((accum, current) => {
            return accum+current.rating;
        },0);
        return (total/reviews.length).toFixed(1);
    },[reviews]);


    const goodPer=useMemo(()=>{
        if (reviews.length === 0) return 0;
        const validReviews = reviews.filter(r => r.rating != null);
        if (validReviews.length === 0) return 0;

        const per = validReviews.reduce((acc, cur) => {
            return cur.rating >= 4 ? acc + 1 : acc;
        }, 0);

        return ((per / validReviews.length) * 100).toFixed(3);
    },[reviews]);

    const goodCount=useMemo(()=>{
        if(reviews.length === 0)return 0
        const per=reviews.reduce((accum, current) => {
            if(current.rating >=4){ return accum+1;}
            return accum;
        },0)
        return per;
    },[reviews]);

    const badCount=useMemo(()=>{
        if(reviews.length === 0)return 0
        const per=reviews.reduce((accum, current) => {
            if(current.rating <4){ return accum+1;}
            return accum;
        },0)
        return per;
    },[reviews]);

    return (
        <div className="admin-page-wrapper">
            <Menu></Menu>
            <h1 className="admin-title">MainAdminPanel</h1>

            <section className="why">
                <div className="why-header">
                    <div className="why-left">
                        <h1>Our<br /> Stats</h1>

                        <div className="review">
                                <div className="stars">★★★★★ <span>{avgRating}</span></div>
                            <p>
                                More details are here:
                            </p>
                            <span className="author">
             <ul className="why-list">
                            <li>+
                            <Link to='/admin/profile/new'>New Projects</Link>
                            </li>
                            <li>○
                            <Link to='/admin/reviews'>Reviews</Link>
                            </li>
                            <li>✦
                                <Link to='/admin/profile'>Projects</Link>
                            </li>
                        </ul>
              <small>Main architectors name, _NAME_</small>
            </span>
                        </div>
                    </div>

                    <div className="why-right">
                        <p>
                            Monitor project performance, track client feedback,
                            and manage your architectural portfolio efficiently.
                        </p>
                    </div>
                </div>

                <div className="stats">
                    <div className="card" style={{ "--stats-content": `"${projects.length}+"` }}>
                        <h2>{projects.length}+</h2>
                        <p> Count of added projects to the site</p>
                    </div>

                    <div className="card" style={{ "--stats-content": `"${goodPer}%"` }}>
                        <h2>{goodPer}%</h2>
                        <p>Client retention rate over the past 3 years</p>
                    </div>

                    <div className="card" style={{ "--stats-content": `"${goodCount}@/${badCount}@"` }}>
                        <h2>{goodCount}@ / {badCount}@</h2>
                        <p>Users reached through websites we’ve designed</p>
                    </div>
                </div>
            </section>
        </div>
    )
}