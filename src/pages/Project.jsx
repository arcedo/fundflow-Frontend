import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { getFullProject, viewProject, getProjectStatsFromUser, getProjectTiers, getProjectBlogs } from "../services";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProjectDetails from "../components/ProjectDetails";
import ProjectGallery from "../components/ProjectGallery";
import ProjectSection from "../components/ProjectSection";
import edit from "../assets/icons/edit.svg";
import save from "../assets/icons/checkBlack.svg";

function Project() {
    let navigate = useNavigate();
    const { projectUrl } = useParams();
    const editMode = useLocation().pathname.includes('/edit');
    const [project, setProject] = useState({});
    const [userStats, setUserStats] = useState({});
    const userData = JSON.parse(localStorage.getItem('userData'));

    let today = new Date();
    let deadline = new Date(project.deadlineDate);
    const timeDiff = deadline.getTime() - today.getTime();
    const hoursDiff = Math.ceil(timeDiff / (1000 * 60 * 60));
    const remainingHours = hoursDiff > 0 ? hoursDiff : 0;

    const fetchData = async () => {
        try {
            await getFullProject(projectUrl)
                .then(async (data) => {
                    setProject(data);
                    if (data.id) {
                        const tiers = [];
                        const blogs = [];
                        await getProjectTiers(data.id)
                            .then((res) => {
                                tiers.push(...res);
                            });
                        await getProjectBlogs(data.id)
                            .then((res) => {
                                blogs.push(...res);
                            });
                        setProject({ ...data, tiers, blogs });                        
                        document.title = (data.title ?? 'unknown project') + ' · fundflow';
                    }
                    if ((editMode && !userData) || (editMode && userData.userUrl !== data.userUrl)) {
                        navigate('/projects/' + projectUrl);
                    } else if (!editMode && userData) {
                        await viewProject(localStorage.getItem('token'), data.id, data.idCategory)
                            .then((res) => {
                                if (res.code === 201) {
                                    data.stats = { ...data.stats, views: (data.stats.views || 0) + 1 };
                                    setProject(data);
                                }
                            });
                        if (userData.verifiedEmail) {
                            await getProjectStatsFromUser(localStorage.getItem('token'), data.id)
                                .then((res) => {
                                    setUserStats(res);
                                });
                        }
                    }
                });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [projectUrl]);

    return (
        <div className="w-full bg-gray-200 min-h-screen overflow-hidden h-fit flex flex-col gap-10">
            <Header categoriesDisabled={true} />
            <div className="relative flex flex-col items-center justify-center gap-10 mt-20">
                <ProjectDetails project={project} editMode={editMode} setProject={setProject} userStats={userStats} setUserStats={setUserStats} remainingHours={remainingHours}/>
                {!editMode && project && userData && project.userUrl === userData.userUrl ? <Link to={`/projects/${project.projectUrl}/edit`} className="fixed top-20 right-0 m-8 z-20 bg-gradient-to-r from-primary to-secondary rounded-full group">
                    <div className="flex justify-center items-center p-3 bg-white shadow-xl border-none rounded-full group-hover:scale-90 transition-all duration-200">
                        <img className="h-8" src={edit} alt="edit button" />
                    </div>
                </Link> : null}
                {editMode && project && userData && project.userUrl === userData.userUrl ? <Link to={`/projects/${project.projectUrl}`} className="fixed top-20 right-0 m-8 z-20 bg-gradient-to-r from-primary to-secondary rounded-full group">
                    <div className="flex justify-center items-center p-3 bg-white shadow-xl border-none rounded-full group-hover:scale-90 transition-all duration-200">
                        <img className="h-8" src={save} alt="save button" />
                    </div>
                </Link> : null}
                <ProjectGallery project={project} editMode={editMode} setProject={setProject} />
                <ProjectSection project={project} editMode={editMode} setProject={setProject} userStats={userStats} setUserStats={setUserStats} remainingHours={remainingHours}/>
            </div>
            <Footer />
        </div>
    );
}

export default Project;