import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import GridProjectSection from "./GridProjectSection";
import ProfileFeedback from "./ProfileFeedback";
import { getProjectByCreator, getProjectsByUserStatus } from "../services/index";

function ProfileSection({ belongingUser, ownerProjects, collaboratingProjects, likedProjects, dislikedProjects, user, setOwnerProjects, setCollaboratingProjects, setLikedProjects, setDislikedProjects }) {
    const [activeTab, setActiveTab] = useState("projects");
    const [noMoreProjects, setNoMoreProjects] = useState({ owned: true, collaborating: true, liked: true, disliked: true });
    const location = useLocation();

    useEffect(() => {
        setActiveTab("projects");
    }, [location.pathname]);

    async function getCreatedProjects(skip, limit, setProjects, projects) {
        await getProjectByCreator(user.id, skip, limit)
            .then(data => {
                if (data.length > 0) {
                    setProjects([...projects, ...data]);
                } else {
                    setNoMoreProjects({ ...noMoreProjects, owned: false });
                }
            });
    };

    async function getCollaboratingProjects(skip, limit) {
        await getProjectsByUserStatus(localStorage.getItem('token'), 'both', skip, limit, user.id)
            .then(data => {
                if (data.length > 0) {
                    setCollaboratingProjects([...collaboratingProjects, ...data]);
                } else {
                    setNoMoreProjects({ ...noMoreProjects, collaborating: false });
                }
            });
    };

    async function getLikedProjects(skip, limit) {
        await getProjectsByUserStatus(localStorage.getItem('token'), 'like', skip, limit)
            .then(data => {
                if (data.length > 0) {
                    setLikedProjects([...likedProjects, ...data]);
                } else {
                    setNoMoreProjects({ ...noMoreProjects, liked: false });
                }
            });
    };

    async function getDislikedProjects(skip, limit) {
        await getProjectsByUserStatus(localStorage.getItem('token'), 'dislike', skip, limit)
            .then(data => {
                if (data.length > 0) {
                    setDislikedProjects([...dislikedProjects, ...data]);
                } else {
                    setNoMoreProjects({ ...noMoreProjects, disliked: false });
                }
            });
    };

    const renderSection = () => {
        switch (activeTab) {
            case "collaborating":
                return (<GridProjectSection search={4} key="collab" projectsFound={collaboratingProjects} setProjectsFound={setCollaboratingProjects} belongingUser={belongingUser} onEmptyMessage={'This user isn\'t involved in any projects.'} imageEmptyVisible={true} getMoreProjects={(skip, limit) => getCollaboratingProjects(skip, limit)} userProfile={noMoreProjects.collaborating} />);
            case "feedback":
                return (<ProfileFeedback key={'feedback'} user={user} />);
            case "liked":
                return (<GridProjectSection search={4} key="liked" projectsFound={likedProjects} setProjectsFound={setLikedProjects} belongingUser={belongingUser} onEmptyMessage={'You are so dull.'} getMoreProjects={(skip, limit) => getLikedProjects(skip, limit)} userProfile={noMoreProjects.liked} />);
            case "disliked":
                return (<GridProjectSection search={4} key="disliked" projectsFound={dislikedProjects} setProjectsFound={setDislikedProjects} belongingUser={belongingUser} onEmptyMessage={'So wholesome!'} getMoreProjects={(skip, limit) => getDislikedProjects(skip, limit)} userProfile={noMoreProjects.disliked} />);
            default:
                return (<GridProjectSection search={4} key="projects" projectsFound={ownerProjects} setProjectsFound={setOwnerProjects} belongingUser={belongingUser} onEmptyMessage={'This user has no projects.'} imageEmptyVisible={true} getMoreProjects={(skip, limit) => getCreatedProjects(skip, limit, setOwnerProjects, ownerProjects)} userProfile={noMoreProjects.owned} />);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-full gap-5 mt-7 fade-in" style={{ animationDelay: `0.15s` }}>
            <div className="flex justify-start items-end gap-8 w-10/12 overflow-auto pb-1.5">
                <button
                    onClick={() => setActiveTab("projects")}
                    className={`bg-transparent text-black font-dmsans font-semibold border-b-2 hover:border-black transition-all duration-200 ${activeTab === "projects" ? "border-black" : "border-transparent"}`}
                >
                    projects
                </button>
                <button
                    onClick={() => setActiveTab("collaborating")}
                    className={`bg-transparent text-black font-dmsans font-semibold border-b-2 hover:border-black transition-all duration-200 ${activeTab === "collaborating" ? "border-black" : "border-transparent"}`}
                >
                    collaborating
                </button>
                <button
                    onClick={() => setActiveTab("feedback")}
                    className={`bg-transparent text-black font-dmsans font-semibold border-b-2 hover:border-black transition-all duration-200 ${activeTab === "feedback" ? "border-black" : "border-transparent"}`}
                >
                    feedback
                </button>
                {belongingUser && (
                    <>
                        <button
                            onClick={() => setActiveTab("liked")}
                            className={`bg-transparent text-black font-dmsans font-semibold border-b-2 hover:border-black transition-all duration-200 ${activeTab === "liked" ? "border-black" : "border-transparent"}`}
                        >
                            liked
                        </button>
                        <button
                            onClick={() => setActiveTab("disliked")}
                            className={`bg-transparent text-black font-dmsans font-semibold border-b-2 hover:border-black transition-all duration-200 ${activeTab === "disliked" ? "border-black" : "border-transparent"}`}
                        >
                            disliked
                        </button>
                    </>
                )}
            </div>
            <div className="flex justify-center items-center bg-white w-full min-h-64">
                <div className="flex justify-between items-center pt-7 pb-10 w-10/12 mx-auto">
                    {renderSection()}
                </div>
            </div>
        </div>
    );
}

export default ProfileSection;
