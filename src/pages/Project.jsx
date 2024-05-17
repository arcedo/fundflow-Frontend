import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { getFullProject } from "../services";
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
    const userData = JSON.parse(localStorage.getItem('userData'));
    useEffect(() => {
        const fetchData = async () => {
            try {
                await getFullProject(projectUrl)
                    .then((data) => {
                        setProject(data);
                        if ((editMode && !userData) || (editMode && userData.userUrl !== data.userUrl)) {
                            navigate('/projects/' + projectUrl);
                        }
                    });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [projectUrl]);

    console.log(project);
    console.log(userData);
    const projectO = {
        projectId: 1,
        projectName: "Project One",
        projectUrl: "project_one",
        projectCreator: "User1",
        creatorUrl: "user1",
        projectCreatorId: 1,
        projectCategory: "art",
        shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        projectCover: 'https://images.unsplash.com/photo-1707046369773-8c781712d079?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        projectImage: [
            // 'https://images.unsplash.com/photo-1707046369773-8c781712d079?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            // 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            // 'https://images.unsplash.com/photo-1713145868370-0b9c9bb58465?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            // 'https://images.unsplash.com/photo-1713107101542-164858b1e836?q=80&w=1878&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        sponsors: 27,
        timeLeft: 187,
        currentFunding: 1023,
        goalFunding: 4000,
        views: 150,
        likes: 200,
        dislikes: 50,
        fundedPercentage: 64,
        tiers: [
            {
                tierId: 1,
                tierName: "Tier 1",
                tierImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                tierPrice: 10,
                tierDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            },
            {
                tierId: 2,
                tierName: "Tier 2",
                tierImage: "https://images.unsplash.com/photo-1713145868370-0b9c9bb58465?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                tierPrice: 20,
                tierDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            },
            {
                tierId: 3,
                tierName: "Tier 3",
                tierImage: "https://images.unsplash.com/photo-1713107101542-164858b1e836?q=80&w=1878&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                tierPrice: 30,
                tierDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            },
            {
                tierId: 4,
                tierName: "Tier 4",
                tierImage: "https://images.unsplash.com/photo-1707046369773-8c781712d079?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                tierPrice: 40,
                tierDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            }
        ],
        blog: [
            {
                blogTitle: "Blog 1",
                blogDate: "February 5th 2024",
                timeRead: "5 min",
                blogContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                blogImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                blogTitle: "Blog 2",
                blogDate: "February 2nd 2024",
                timeRead: "4 min",
                blogContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                blogImage: "https://images.unsplash.com/photo-1713145868370-0b9c9bb58465?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                blogTitle: "Blog 3",
                blogDate: "January 28th 2024",
                timeRead: " min",
                blogContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                blogImage: "https://images.unsplash.com/photo-1713107101542-164858b1e836?q=80&w=1878&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        ]
    };

    return (
        <div className="w-full bg-gray-200 min-h-screen overflow-hidden h-fit flex flex-col gap-10">
            <Header categoriesDisabled={true} />
            <div className="relative flex flex-col items-center justify-center gap-10 mt-20">
                <ProjectDetails project={project} editMode={editMode} />
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
                <ProjectGallery project={projectO} editMode={editMode} />
                <ProjectSection project={projectO} editMode={editMode} />
            </div>
            <Footer />
        </div>
    );
}

export default Project;